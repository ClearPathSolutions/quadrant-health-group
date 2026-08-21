import type { Metadata, Viewport } from "next";
import { Montserrat, Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import AttributionTracker from "@/components/AttributionTracker";
import { site, canonical, isIndexable } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-N4W4LCGV";

const CLARION_SITE_KEY =
  process.env.NEXT_PUBLIC_CLARION_SITE_KEY ||
  "cpx_-vOkPf-M2Zq1tmLgDgXOFblwF1FOh4sC";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Addiction & Mental Health Treatment Network | Quadrant Health Group",
    template: "%s | Quadrant Health Group",
  },
  description: site.description,
  keywords: [
    "addiction treatment",
    "drug rehab",
    "alcohol rehab",
    "detox center",
    "mental health treatment",
    "dual diagnosis",
    "residential treatment",
    "intensive outpatient",
  ],
  // T1.4 / V0092 — the homepage self-canonical. Every other route sets its own
  // in `generateMetadata`; Next does not inherit `alternates`, so a page with
  // no override would emit none rather than the wrong one.
  alternates: { canonical: canonical("/") },
  openGraph: {
    title: "Addiction & Mental Health Treatment Network | Quadrant Health Group",
    description: site.description,
    // T2.1 / V0093 — was `site.url` site-wide, which is what produced the 53
    // pages pointing at the bare domain root. Per-page values are set in each
    // `generateMetadata`; this one is the homepage's own.
    url: canonical("/"),
    siteName: site.name,
    type: "website",
    images: ["/images/photos/laguna-coast.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  // F-03 — see `isIndexable`. Off until SITE_INDEXABLE=true is set on the
  // production deployment, so the preview cannot compete with the live site.
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0f2b56",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body>
        {/* Google Tag Manager. The noscript iframe is first inside <body> per
            Google's snippet; the loader runs afterInteractive so it never
            competes with first paint. dataLayer is initialised inline so any
            push before GTM finishes loading is still picked up. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* CallTrackingMetrics — loads site-wide for dynamic number insertion
            and must load eagerly, so a visitor never reads and dials a number
            that has not been swapped yet. Absolute https, not the
            protocol-relative form. */}
        <Script
          src="https://264810.tctm.co/t.js"
          strategy="beforeInteractive"
        />
        {/* Enable scroll-reveal only when JS is available — runs before paint
            so content is never hidden for no-JS users or before hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {/* F-06 — the organisation node every other schema block references
            by @id, so the graph resolves on any single page a crawler lands on. */}
        <JsonLd data={organizationSchema()} />
        <a href="#main" className="sr-only">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <AttributionTracker />
        {/* Clarion live-chat widget — themed to the Quadrant brand blue
            (widget default is teal #0d9488). */}
        <Script
          src="https://www.clarionlabs.ai/widget.v1.js"
          strategy="afterInteractive"
          data-site-key={CLARION_SITE_KEY}
          data-api="https://api.clarionlabs.ai"
          data-color="#0396d0"
          data-position="bottom-right"
          data-title="Quadrant Health Group"
          data-header-text="We're here 24/7 — how can we help?"
        />
        {/* Clarion Form Capture (forms-capture.v1.js) is deliberately NOT
            loaded. It attaches its own submit listener to every
            data-clarion-form element and does not check defaultPrevented, so
            running it alongside LeadForm's own POST filed every lead twice — as
            a Form Submission and again as a webchat conversation. /api/lead is
            the single path; it forwards to the same /forms/public/submit
            endpoint the vendor script used, and reports real delivery so a
            rejected lead is never shown a thank-you. */}
      </body>
    </html>
  );
}
