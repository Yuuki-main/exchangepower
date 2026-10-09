import { Inter, Sora } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SITE } from "@/content/site.js";
import "./globals.css";

// Body text. Variable font, self-hosted by next/font. Not preloaded: the
// largest text in the first screen is a Sora heading, so Sora gets the early
// bandwidth; body text shows in the size-matched fallback and swaps when
// Inter arrives (Step 9, LCP).
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Headings and display text. Variable font, self-hosted by next/font.
const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

/** @type {import("next").Metadata} */
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} WA | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  // Fallback card for pages without their own (for example the 404 page).
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: SITE.name,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: SITE.name }],
  },
  formatDetection: { telephone: false },
};

/** @type {import("next").Viewport} */
export const viewport = {
  themeColor: "#0b2b33", // brand-900
};

/** @param {{ children: React.ReactNode }} props */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-accent-400 px-4 py-3 font-semibold text-brand-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
