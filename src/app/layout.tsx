import type { Metadata, Viewport } from "next";
import { Inter, Rajdhani } from "next/font/google";
import { SiteProviders } from "@/components/SiteProviders";
import { COMPANY_NAME } from "@/lib/site-brand";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** Wide geometric tech sans for paragraphs — closer to the Jaxpat logotype than generic UI sans. */
const rajdhani = Rajdhani({
  variable: "--font-jaxpat-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: COMPANY_NAME,
  description:
    `${COMPANY_NAME} — product engineering: AI, full-stack, mobile, embedded, VR/AR, and blockchain. Chennai, Tamil Nadu.`,
  icons: {
    icon: [{ url: "/icon.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{color-scheme:dark}html{background-color:#020202}body{margin:0;background-color:#020202;color:#f5f5f5}`,
          }}
        />
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${rajdhani.variable} font-sans min-h-svh min-w-0 antialiased`}
      >
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
