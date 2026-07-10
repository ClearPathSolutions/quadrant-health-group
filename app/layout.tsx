import type { Metadata, Viewport } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

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
    default: "Addiction & Mental Health Treatment Network | Quadrant Health",
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
  openGraph: {
    title: "Addiction & Mental Health Treatment Network | Quadrant Health",
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: ["/images/photos/hero-aerial.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  robots: { index: true, follow: true },
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
        {/* Enable scroll-reveal only when JS is available — runs before paint
            so content is never hidden for no-JS users or before hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a href="#main" className="sr-only">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
