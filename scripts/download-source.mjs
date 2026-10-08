// Downloads the raw HTML of every page on the live site into .cache/source-html/
// (git-ignored). scripts/import-content.mjs reads these files.
//
//   npm run content:download

import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { SOURCE_DIR, SOURCE_PAGES, sourceFile } from "./source-pages.mjs";

mkdirSync(SOURCE_DIR, { recursive: true });

for (const page of SOURCE_PAGES) {
  const url = `https://exchangepower.com.au${page.path}`;
  const status = execFileSync(
    "curl",
    [
      "-sSL",
      "-A",
      "Mozilla/5.0",
      "-o",
      sourceFile(page),
      "-w",
      "%{http_code}",
      url,
    ],
    { encoding: "utf8" },
  );
  console.log(`${status}  ${page.path}`);
  if (status !== "200") process.exitCode = 1;
}
