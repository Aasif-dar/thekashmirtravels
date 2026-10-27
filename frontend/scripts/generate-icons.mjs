// Regenerates the raster favicons from src/app/icon.svg (the single source of truth).
//
//   node scripts/generate-icons.mjs
//
// Writes src/app/favicon.ico (16/32/48), src/app/icon.png (512) and
// src/app/apple-icon.png (180, full-bleed square: iOS applies its own mask and
// fills transparency with black). Uses `sharp`, which ships with Next.js.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const app = (file) => fileURLToPath(new URL(`../src/app/${file}`, import.meta.url));
const svg = readFileSync(app("icon.svg"), "utf8");

// Same artwork on a square, un-rounded tile for the Apple touch icon.
const squareSvg = svg.replace(/(<rect[^>]*) rx="\d+"/, "$1");

// Render at the exact pixel size (density scales the 64-unit viewBox) so edges
// stay crisp instead of being downsampled from a large bitmap.
const render = (source, size) =>
  sharp(Buffer.from(source), { density: (72 * size) / 64 })
    .resize(size, size)
    .png()
    .toBuffer();

// ICO container holding PNG-encoded images (supported by every current browser).
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0); // width
    entry.writeUInt8(size, 1); // height
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map(async (size) => ({ size, data: await render(svg, size) }))
);

writeFileSync(app("favicon.ico"), ico(images));
writeFileSync(app("icon.png"), await render(svg, 512));
writeFileSync(
  app("apple-icon.png"),
  await sharp(await render(squareSvg, 180)).removeAlpha().png().toBuffer()
);

console.log("Wrote favicon.ico (16, 32, 48), icon.png (512), apple-icon.png (180)");
