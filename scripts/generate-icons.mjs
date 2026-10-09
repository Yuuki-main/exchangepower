// Generates the PLACEHOLDER brand icons: an "EP" monogram in the brand
// colours, drawn with shapes (no font needed). Replace with the real logo
// once it is approved (PLAN.md Part C item 7), then delete this script's
// outputs or change the SVG below.
//
//   npm run icons:generate
//
// Outputs (committed, served statically):
//   src/app/icon.svg          favicon for modern browsers
//   src/app/favicon.ico       32×32 + 16×16 for older browsers and /favicon.ico requests
//   src/app/apple-icon.png    180×180 Apple touch icon
//   public/icons/icon-192.png, icon-512.png, icon-maskable-512.png  (manifest)

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const BRAND_900 = "#0b2b33";
const ACCENT_400 = "#ffab1f";
const WHITE = "#ffffff";

/**
 * The monogram on a 512 grid. `inset` shrinks the letters toward the centre
 * (maskable icons need a safe zone); `radius` rounds the background.
 * @param {{ radius?: number, inset?: number }} [o]
 */
function monogram({ radius = 112, inset = 0 } = {}) {
  const scale = (512 - inset * 2) / 512;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${radius}" fill="${BRAND_900}"/>
  <g transform="translate(${inset} ${inset}) scale(${scale})">
    <!-- E -->
    <rect x="112" y="136" width="44" height="240" fill="${WHITE}"/>
    <rect x="112" y="136" width="128" height="44" fill="${WHITE}"/>
    <rect x="112" y="234" width="108" height="44" fill="${WHITE}"/>
    <rect x="112" y="332" width="128" height="44" fill="${WHITE}"/>
    <!-- P -->
    <path fill="${ACCENT_400}" d="M276 136h80a74 74 0 0 1 0 148h-36v92h-44zM320 180v60h36a30 30 0 0 0 0-60z"/>
  </g>
</svg>
`;
}

/** Wraps PNG images in an .ico container (PNG-in-ICO, supported everywhere). */
function ico(/** @type {{ size: number, png: Buffer }[]} */ images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, png }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)]);
}

const png = (/** @type {string} */ svg, /** @type {number} */ size) =>
  sharp(Buffer.from(svg))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

const rounded = monogram();
const square = monogram({ radius: 0 });
const maskable = monogram({ radius: 0, inset: 64 }); // keep letters inside the 80% safe zone

mkdirSync(path.join(ROOT, "public/icons"), { recursive: true });
writeFileSync(path.join(ROOT, "src/app/icon.svg"), rounded);
writeFileSync(
  path.join(ROOT, "src/app/favicon.ico"),
  ico([
    { size: 32, png: await png(rounded, 32) },
    { size: 16, png: await png(rounded, 16) },
  ]),
);
writeFileSync(
  path.join(ROOT, "src/app/apple-icon.png"),
  await png(square, 180),
);
writeFileSync(
  path.join(ROOT, "public/icons/icon-192.png"),
  await png(rounded, 192),
);
writeFileSync(
  path.join(ROOT, "public/icons/icon-512.png"),
  await png(rounded, 512),
);
writeFileSync(
  path.join(ROOT, "public/icons/icon-maskable-512.png"),
  await png(maskable, 512),
);
console.log("Placeholder icons written.");
