const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createCrcTable() {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  return table;
}

const crcTable = createCrcTable();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const typeAndData = buf.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function createPng(width, height, pixelFn) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  const scanlineLength = 1 + width * 4;
  const rawData = Buffer.alloc(height * scanlineLength);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0;
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = pixelFn(x, y, width, height);
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a !== undefined ? a : 255;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// 1. Open Graph banner (1200x630) with Sky Blue ambient glow
const ogImagePng = createPng(1200, 630, (x, y, w, h) => {
  const dx = x - w / 2;
  const dy = y - h / 2;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  const glow = Math.max(0, 1 - dist / 500);
  const r = Math.floor(8 + glow * 14);
  const g = Math.floor(10 + glow * 55);
  const b = Math.floor(14 + glow * 85);
  
  // Sky blue top border accent
  if (y < 4) return [56, 189, 248, 255];

  return [r, g, b, 255];
});

// 2. Favicon (32x32) Sky Blue
const faviconIco = createPng(32, 32, (x, y, w, h) => {
  const dx = x - 16;
  const dy = y - 16;
  if (Math.abs(dx) <= 12 && Math.abs(dy) <= 12) {
    if (Math.abs(dx) === 12 || Math.abs(dy) === 12) return [56, 189, 248, 255];
    return [2, 132, 199, 255];
  }
  return [0, 0, 0, 0];
});

const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogImagePng);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconIco);
console.log('Updated og-image.png and favicon.ico with sky blue accents');
