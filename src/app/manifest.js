import { SITE } from "@/content/site.js";

// Web app manifest. Icons are PLACEHOLDERS (EP monogram) until the real logo
// is approved (PLAN.md Part C item 7); regenerate with `npm run icons:generate`.

/** @returns {import("next").MetadataRoute.Manifest} */
export default function manifest() {
  return {
    name: `${SITE.name} WA`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0b2b33", // brand-900
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
