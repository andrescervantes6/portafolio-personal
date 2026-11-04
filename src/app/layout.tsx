import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { portfolioContent } from "@/data/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://andrescervantes.dev"),
  title: {
    default: portfolioContent.meta.title,
    template: `%s | ${portfolioContent.meta.author}`,
  },
  description: portfolioContent.meta.description,
  authors: [{ name: portfolioContent.meta.author }],
  creator: portfolioContent.meta.author,
  publisher: portfolioContent.meta.author,
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
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://andrescervantes.dev",
    title: portfolioContent.meta.title,
    description: portfolioContent.meta.description,
    siteName: portfolioContent.meta.author,
    images: [
      {
        url: portfolioContent.meta.ogImage,
        width: 1200,
        height: 630,
        alt: portfolioContent.meta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioContent.meta.title,
    description: portfolioContent.meta.description,
    images: [portfolioContent.meta.ogImage],
    creator: "@andrescervantes_",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-[#0284c7] selection:text-white">
        {children}
      </body>
    </html>
  );
}
