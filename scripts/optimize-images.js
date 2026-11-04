const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  const cultivusDir = path.join(publicDir, 'cultivus');

  console.log('Optimizing images to ensure all are under 300 KB...');

  // 1. Optimize foto.png (Original: 1.95 MB, 1086x1448)
  const fotoPath = path.join(publicDir, 'foto.png');
  if (fs.existsSync(fotoPath)) {
    const fotoBuffer = fs.readFileSync(fotoPath);
    // Resize to max width 800 (plenty for max 250px container @ 3x retina) and compress PNG
    const optimizedFoto = await sharp(fotoBuffer)
      .resize({ width: 800, withoutEnlargement: true })
      .png({ quality: 82, compressionLevel: 9, palette: true })
      .toBuffer();

    fs.writeFileSync(fotoPath, optimizedFoto);
    console.log(`Optimized foto.png: ${(optimizedFoto.length / 1024).toFixed(1)} KB`);
  }

  // 2. Optimize cultivus-1.png, cultivus-2.png, cultivus-3.png
  const cultivusFiles = ['cultivus-1.png', 'cultivus-2.png', 'cultivus-3.png'];
  for (const filename of cultivusFiles) {
    const filePath = path.join(cultivusDir, filename);
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      // Resize to max width 1600 and optimize PNG with palette quantization
      const optimized = await sharp(fileBuffer)
        .resize({ width: 1600, withoutEnlargement: true })
        .png({ quality: 80, compressionLevel: 9, palette: true })
        .toBuffer();

      fs.writeFileSync(filePath, optimized);
      console.log(`Optimized ${filename}: ${(optimized.length / 1024).toFixed(1)} KB`);
    }
  }

  console.log('All images optimized successfully!');
}

optimizeImages().catch((err) => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});

