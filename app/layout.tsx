import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://nordkom.se";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nordkom: Kostnadsöversyn för företag",
  description:
    "Nordkom går igenom vad ert företag betalar för mobilabonnemang, växel, hemsida och SEO, och säger rakt ut om ni betalar för mycket. En second opinion, inte en säljpitch.",
  applicationName: "Nordkom",
  authors: [{ name: "Nordkom" }],
  openGraph: {
    title: "Nordkom: Kostnadsöversyn för företag",
    description:
      "Vi går igenom vad ni redan betalar för företagstelefoni, växel, hemsida och SEO, och säger om ni betalar för mycket.",
    url: siteUrl,
    siteName: "Nordkom",
    locale: "sv_SE",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nordkom: Kostnadsöversyn för företag",
      },
    ],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#132A31",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
