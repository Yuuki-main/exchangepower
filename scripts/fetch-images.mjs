// Downloads every image in src/content/images.js into public/ and optimises it.
//
//   npm run images:fetch               -> download missing images
//   npm run images:fetch -- --dry-run  -> list what would be downloaded
//   npm run images:fetch -- --force    -> download again, overwriting
//
// DO NOT RUN until the business confirms it owns these images
// (PLAN.md Part C item 7).
//
// Each file keeps its format and pixel size, so images.js stays correct.
// JPEG/PNG/WebP files are re-encoded with sharp (metadata stripped, sensible
// quality). Format conversion for browsers (AVIF/WebP) is done by next/image
// at request time, so it isn't done here. SVGs are saved as-is.

import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { IMAGES } from "../src/content/images.js";

const PUBLIC = path.resolve(import.meta.dirname, "../public");
const DRY = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force");

let downloaded = 0;
let skipped = 0;
let failed = 0;

for (const [key, img] of Object.entries(IMAGES)) {
  const target = path.join(PUBLIC, img.localPath);
  if (existsSync(target) && !FORCE) {
    skipped++;
    continue;
  }
  if (DRY) {
    console.log(`would fetch  ${key}  ${img.src}  →  public${img.localPath}`);
    continue;
  }
  try {
    const res = await fetch(img.src, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());
    mkdirSync(path.dirname(target), { recursive: true });

    const ext = path.extname(target).toLowerCase();
    if (ext === ".svg") {
      writeFileSync(target, input);
    } else {
      const image = sharp(input);
      const meta = await image.metadata();
      if (meta.width !== img.width || meta.height !== img.height) {
        console.warn(
          `! ${key}: size is ${meta.width}x${meta.height}, images.js says ${img.width}x${img.height}. Update images.js.`,
        );
      }
      const optimised =
        ext === ".png"
          ? image.png({ compressionLevel: 9, palette: true })
          : ext === ".webp"
            ? image.webp({ quality: 82 })
            : image.jpeg({ quality: 82, mozjpeg: true });
      const output = await optimised.toBuffer();
      // Keep whichever is smaller.
      writeFileSync(target, output.length < input.length ? output : input);
    }
    downloaded++;
    console.log(
      `ok  ${key}  public${img.localPath}  ${Math.round(statSync(target).size / 1024)} KB`,
    );
  } catch (e) {
    failed++;
    console.error(
      `FAIL  ${key}  ${img.src}: ${/** @type {Error} */ (e).message}`,
    );
  }
}

console.log(
  `\nDownloaded ${downloaded}, already present ${skipped}, failed ${failed}.`,
);
if (failed) process.exit(1);
