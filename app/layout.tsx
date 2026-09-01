import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarksCertify — Issue, Distribute & Verify Certificates in Minutes",
  description:
    "MarksCertify helps African training academies and bootcamps issue, distribute, and verify trusted digital certificates in minutes. Join the early access waitlist.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-ink">{children}</body>
    </html>
  );
}
