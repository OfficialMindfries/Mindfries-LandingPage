import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ── SEO Metadata ────────────────────────────────────────────────────────────
const SITE_URL = "https://mindfries.vercel.app";
const SITE_NAME = "Mindfries";
const TITLE = "Mindfries — Hiring Intelligence, Not Another ATS";
const DESCRIPTION =
  "Mindfries ranks engineers on real work — GitHub, portfolios, live code — then runs an adaptive assessment on a real codebase. A ranked shortlist with a plain-English reason for every name. You decide.";
const OG_IMAGE = `${SITE_URL}/og-image.png`; // Place a 1200×630 image in /public

export const metadata: Metadata = {
  // ── Basic ──────────────────────────────────────────────────────────────
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "hiring intelligence",
    "ATS alternative",
    "engineer hiring",
    "technical recruiting",
    "GitHub screening",
    "code assessment",
    "developer hiring",
    "portfolio ranking",
    "adaptive assessment",
    "engineering shortlist",
    "Mindfries",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  // ── Canonical & Robots ─────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ──────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  // ── Open Graph ─────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description:
      "Rank engineers on what they've actually built. Evidence over keywords, real work over memorized DSA, explainable and human-final.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Hiring Intelligence`,
      },
    ],
  },

  // ── Twitter / X Card ───────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@mindfries",
    creator: "@mindfries",
    title: TITLE,
    description:
      "Rank engineers on what they've actually built. Evidence over keywords, real work over memorized DSA.",
    images: [OG_IMAGE],
  },

  // ── Verification placeholders ──────────────────────────────────────────
  // TODO: Add values once you verify ownership in Search Console / Bing
  // verification: {
  //   google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
  //   yandex: "YOUR_YANDEX_TOKEN",
  //   bing: "YOUR_BING_TOKEN",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
