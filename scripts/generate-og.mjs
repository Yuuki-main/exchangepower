// Generates a 1200×630 social card (PNG) for every public route into
// public/og/ (git-ignored). Runs automatically before `npm run build`
// ("prebuild"), so Vercel builds them too.
//
//   npm run og:generate
//
// Why static files: with trailingSlash: true, the URLs Next.js generates for
// opengraph-image routes (e.g. /contact/opengraph-image?…) get a 308
// redirect, which social crawlers handle poorly. A .png path is never
// redirected and is served straight from the CDN.
//
// Design: the site tokens (brand-900, accent, brand-100) and the typeset
// wordmark (the logo isn't approved yet, PLAN Part C item 7). Font: next/og's
// bundled Geist (next/font only ships WOFF2, which next/og can't read).

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og.js";
import { createElement as h } from "react";
import { SITE } from "../src/content/site.js";
import { ogImagePath } from "../src/lib/content-schema.js";
import { ogRoutes } from "../src/lib/og-routes.js";

const OUT = path.resolve(import.meta.dirname, "../public");
const SIZE = { width: 1200, height: 630 };
const BRAND_900 = "#0b2b33";
const BRAND_100 = "#d5eaed";
const ACCENT_300 = "#ffc24d";
const ACCENT_400 = "#ffab1f";

/** @param {{ title: string, eyebrow?: string }} card */
function cardElement({ title, eyebrow }) {
  const size = title.length > 60 ? 60 : title.length > 36 ? 72 : 88;
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: BRAND_900,
        color: "#ffffff",
        position: "relative",
      },
    },
    // The sun's arc, as on the site
    h("div", {
      style: {
        position: "absolute",
        right: -160,
        bottom: -420,
        width: 760,
        height: 760,
        borderRadius: 9999,
        border: `3px solid ${ACCENT_400}`,
        opacity: 0.35,
        display: "flex",
      },
    }),
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "baseline",
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: -1,
        },
      },
      h("span", null, "Exchange"),
      h("span", { style: { color: ACCENT_300, marginLeft: 12 } }, "Power"),
    ),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", maxWidth: 980 } },
      eyebrow
        ? h(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                fontSize: 26,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: ACCENT_300,
                marginBottom: 24,
              },
            },
            h("div", {
              style: {
                width: 48,
                height: 3,
                background: ACCENT_300,
                marginRight: 20,
                display: "flex",
              },
            }),
            eyebrow,
          )
        : null,
      h(
        "div",
        {
          style: {
            fontSize: size,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -2,
          },
        },
        title,
      ),
    ),
    h(
      "div",
      { style: { display: "flex", fontSize: 26, color: BRAND_100 } },
      `Solar and battery installers · ${SITE.address.suburb}, Western Australia`,
    ),
  );
}

rmSync(path.join(OUT, "og"), { recursive: true, force: true });
mkdirSync(path.join(OUT, "og"), { recursive: true });
const routes = ogRoutes();
for (const route of routes) {
  const response = new ImageResponse(cardElement(route), SIZE);
  writeFileSync(
    path.join(OUT, ogImagePath(route.path)),
    Buffer.from(await response.arrayBuffer()),
  );
}
console.log(`Generated ${routes.length} social cards in public/og/.`);
