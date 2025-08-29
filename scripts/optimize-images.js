const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const inputPath = path.join(__dirname, '../public/images/hero.png');
  const outputDir = path.join(__dirname, '../public/images');
  
  try {
    // 生成 WebP 格式
    await sharp(inputPath)
      .resize(1920, 500, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(path.join(outputDir, 'hero.webp'));
    
    console.log('✅ Generated hero.webp');

    // 生成 AVIF 格式
    await sharp(inputPath)
      .resize(1920, 500, { fit: 'cover' })
      .avif({ quality: 80 })
      .toFile(path.join(outputDir, 'hero.avif'));
    
    console.log('✅ Generated hero.avif');

    // 生成压缩的 PNG 作为后备
    await sharp(inputPath)
      .resize(1920, 500, { fit: 'cover' })
      .png({ quality: 85 })
      .toFile(path.join(outputDir, 'hero-optimized.png'));
    
    console.log('✅ Generated hero-optimized.png');
    
    console.log('🎉 All images optimized successfully!');
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
  }
}

optimizeImages();
