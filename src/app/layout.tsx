import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteProviders } from "@/components/SiteProviders";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jaxpat Technology",
  description:
    "Jaxpat Technology — a product-based company delivering AI integration, full-stack development, mobile apps, embedded services, and VR/AR. Based in Chennai, Tamil Nadu.",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
