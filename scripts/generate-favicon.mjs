/**
 * Builds favicons from the brand logo into src/app/ (Next.js metadata file convention).
 * Logo only — transparent canvas, no glow or extra effects.
 *
 * Run when the logo changes: `npm run favicon`
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logoPath = join(root, "public/logo/logo-original.png");
const appDir = join(root, "src/app");

/**
 * @param {number} size
 * @param {string} outName
 */
async function buildIcon(size, outName) {
  const pad = Math.max(2, Math.round(size * 0.08));
  const logoSize = size - pad * 2;

  const logo = await sharp(logoPath)
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toFile(join(appDir, outName));

  console.log(`Wrote ${outName} (${size}px)`);
}

await mkdir(appDir, { recursive: true });
await buildIcon(32, "icon.png");
await buildIcon(180, "apple-icon.png");
console.log("Done. Icons: src/app/icon.png, src/app/apple-icon.png");
