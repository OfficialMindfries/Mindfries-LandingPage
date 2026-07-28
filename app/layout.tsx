import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Mindfries — Hiring intelligence, not another ATS",
  description:
    "Mindfries ranks engineers on real work — GitHub, portfolios, live code — then runs an adaptive assessment on a real codebase. A ranked shortlist with a plain-English reason for every name. You decide.",
  openGraph: {
    title: "Mindfries — Hiring intelligence, not another ATS",
    description:
      "Rank engineers on what they've actually built. Evidence over keywords, real work over memorized DSA, explainable and human-final.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="grain min-h-full">{children}</body>
    </html>
  );
}
