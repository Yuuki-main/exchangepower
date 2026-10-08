// Checks WCAG contrast for every text/background pair the design system uses.
// Reads colour tokens from src/app/globals.css, so it stays correct after a
// palette change. Exits with code 1 if any pair fails.
//
//   npm run check:contrast             -> table + pass/fail
//   npm run check:contrast -- --md     -> Markdown table for docs/DESIGN-TOKENS.md

import { readFileSync } from "node:fs";

const css = readFileSync(
  new URL("../src/app/globals.css", import.meta.url),
  "utf8",
);

/** @type {Record<string, string>} */
const tokens = {};
for (const [, name, value] of css.matchAll(
  /--color-([a-z0-9-]+):\s*([^;]+);/g,
)) {
  tokens[name] = value.trim();
}

/** @param {string} name @returns {string} */
function resolve(name) {
  const value = tokens[name];
  if (!value) throw new Error(`Unknown colour token: ${name}`);
  const ref = value.match(/^var\(--color-([a-z0-9-]+)\)$/);
  return ref ? resolve(ref[1]) : value;
}

/** @param {string} hex */
function luminance(hex) {
  const n = hex.replace("#", "");
  const channels = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** @param {string} a @param {string} b */
function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [foreground, background, minimum ratio, where it is used]
// 4.5 = body text, 3 = large text (24px+ or 18.66px+ bold) and UI parts.
const pairs = [
  ["foreground", "background", 4.5, "Body text on page"],
  ["foreground", "surface", 4.5, "Body text on muted section"],
  ["foreground", "surface-muted", 4.5, "Body text on muted card"],
  ["foreground-muted", "background", 4.5, "Secondary text, hints"],
  ["foreground-muted", "surface", 4.5, "Secondary text on muted section"],
  ["foreground-muted", "surface-muted", 4.5, "Secondary text on muted card"],
  ["brand-700", "background", 4.5, "Links, ghost button text"],
  ["brand-700", "surface", 4.5, "Links on muted section"],
  ["brand-950", "accent-400", 4.5, "Primary button"],
  ["brand-950", "accent-300", 4.5, "Primary button hover"],
  ["white", "brand-700", 4.5, "Secondary button"],
  ["white", "brand-800", 4.5, "Secondary button hover"],
  ["foreground-inverse", "surface-inverse", 4.5, "Text on dark section"],
  [
    "foreground-inverse-muted",
    "surface-inverse",
    4.5,
    "Muted text on dark section",
  ],
  ["accent-300", "surface-inverse", 4.5, "Accent text on dark section"],
  ["brand-800", "brand-50", 4.5, "Brand badge"],
  ["accent-900", "accent-100", 4.5, "Accent badge"],
  ["neutral-700", "neutral-100", 4.5, "Neutral badge"],
  ["success-700", "success-50", 4.5, "Success badge / message"],
  ["warning-700", "warning-50", 4.5, "Warning badge / message"],
  ["error-700", "error-50", 4.5, "Error badge / message"],
  ["error-600", "background", 4.5, "Field error text"],
  ["neutral-500", "background", 4.5, "Input placeholder text"],
  ["border-strong", "background", 3, "Input border (UI component)"],
  ["brand-600", "background", 3, "Focus ring on light surfaces"],
  ["brand-600", "surface-muted", 3, "Focus ring on muted surfaces"],
  ["accent-300", "surface-inverse", 3, "Focus ring on dark section"],
  ["accent-700", "background", 3, "Accent icon on light surface (non-text)"],
  ["accent-400", "surface-inverse", 3, "Accent icon or fill on dark section"],
];

const rows = pairs.map(([fg, bg, min, use]) => {
  const r = ratio(resolve(String(fg)), resolve(String(bg)));
  return {
    fg,
    bg,
    fgHex: resolve(String(fg)),
    bgHex: resolve(String(bg)),
    min,
    use,
    r,
    pass: r >= Number(min),
  };
});

if (process.argv.includes("--md")) {
  console.log("| Foreground | Background | Use | Ratio | Needs | Result |");
  console.log("|---|---|---|---|---|---|");
  for (const x of rows) {
    console.log(
      `| \`${x.fg}\` ${x.fgHex} | \`${x.bg}\` ${x.bgHex} | ${x.use} | ${x.r.toFixed(2)}:1 | ${x.min}:1 | ${x.pass ? "Pass" : "**Fail**"} |`,
    );
  }
} else {
  for (const x of rows) {
    console.log(
      `${x.pass ? "PASS" : "FAIL"}  ${x.r.toFixed(2).padStart(5)}:1 (needs ${x.min})  ${x.fg} on ${x.bg}  - ${x.use}`,
    );
  }
}

const failed = rows.filter((x) => !x.pass);
console.log(
  `\n${rows.length - failed.length}/${rows.length} pairs pass WCAG AA.`,
);
if (failed.length) process.exit(1);
