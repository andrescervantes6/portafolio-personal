const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const os = require('os');

const PORT = 3009;
const CDP_PORT = 9223;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

class CdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runDiagnosis(urlPath = '') {
  console.log(`\n=== Iniciando diagnóstico: http://localhost:${PORT}${urlPath} (360px, CPU 6x Throttled) ===`);

  const nextBin = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next');
  const projectRoot = path.join(__dirname, '..');

  const nextProcess = spawn(process.execPath, [nextBin, 'start', '-p', String(PORT)], {
    cwd: projectRoot,
    stdio: 'pipe',
  });

  nextProcess.stdout.on('data', (d) => {
    // console.log('[Next.js]', d.toString().trim());
  });
  nextProcess.stderr.on('data', (d) => {
    console.error('[Next.js Err]', d.toString().trim());
  });

  // Esperar a que el servidor esté listo
  let serverReady = false;
  for (let i = 0; i < 30; i++) {
    await wait(400);
    try {
      await new Promise((resolve, reject) => {
        http.get(`http://localhost:${PORT}/`, (res) => resolve(res.statusCode)).on('error', reject);
      });
      serverReady = true;
      break;
    } catch {}
  }

  if (!serverReady) {
    console.error('No se pudo iniciar el servidor Next.js');
    nextProcess.kill();
    return;
  }

  console.log('Servidor Next.js listo en puerto', PORT);

  const browserPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProcess = spawn(
    browserPath,
    [
      `--remote-debugging-port=${CDP_PORT}`,
      '--headless=new',
      '--disable-extensions',
      '--no-first-run',
      '--no-default-browser-check',
      '--user-data-dir=' + path.join(os.tmpdir(), 'cdp_diag_' + Date.now()),
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  let versionInfo = null;
  for (let i = 0; i < 30; i++) {
    await wait(300);
    try {
      versionInfo = await getJson(`http://127.0.0.1:${CDP_PORT}/json/version`);
      break;
    } catch {}
  }

  if (!versionInfo) {
    console.error('No se pudo conectar a Chrome CDP');
    chromeProcess.kill();
    nextProcess.kill();
    return;
  }

  const targets = await getJson(`http://127.0.0.1:${CDP_PORT}/json/list`);
  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  const client = new CdpClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();

  try {
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 360,
      height: 640,
      deviceScaleFactor: 2,
      mobile: true,
      screenOrientation: { angle: 0, type: 'portraitPrimary' },
    });

    await client.send('Emulation.setCPUThrottlingRate', { rate: 6 });
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    const scriptToEvaluateOnNewDocument = `
      window.__perfData = {
        longTasks: [],
        totalLongTaskDuration: 0
      };

      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__perfData.longTasks.push({
              duration: Math.round(entry.duration),
              startTime: Math.round(entry.startTime)
            });
            window.__perfData.totalLongTaskDuration += entry.duration;
          }
        });
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {}
    `;
    await client.send('Page.addScriptToEvaluateOnNewDocument', {
      source: scriptToEvaluateOnNewDocument,
    });

    const start = Date.now();
    await client.send('Page.navigate', { url: `http://localhost:${PORT}${urlPath}` });

    await wait(7000);

    const evalResult = await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const nav = performance.getEntriesByType('navigation')[0];
          const paint = performance.getEntriesByType('paint');
          const fcp = paint.find(p => p.name === 'first-contentful-paint');
          
          return {
            fcp: fcp ? Math.round(fcp.startTime) : null,
            domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
            loadComplete: nav ? Math.round(nav.loadEventEnd) : null,
            longTasksCount: window.__perfData.longTasks.length,
            totalLongTaskDurationMs: Math.round(window.__perfData.totalLongTaskDuration),
            longTasksDetails: window.__perfData.longTasks,
            elementsCount: document.getElementsByTagName('*').length,
            hasCanvas: !!document.querySelector('canvas'),
            heroOpacity: (() => {
              const el = document.querySelector('#inicio h1');
              return el ? window.getComputedStyle(el).opacity : 'missing';
            })()
          };
        })()
      `,
      returnByValue: true,
    });

    console.log('Resultados de diagnóstico móvil (360px, 6x CPU Throttling):');
    console.log(JSON.stringify(evalResult.result.value, null, 2));
  } finally {
    client.close();
    chromeProcess.kill();
    nextProcess.kill();
  }
}

const arg = process.argv[2] || '';
runDiagnosis(arg);
