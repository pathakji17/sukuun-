import type { Metadata, Viewport } from "next";
import { Crimson_Text, Inter } from "next/font/google";
import "./globals.css";

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sukuun — For Myra ji ♡",
  description:
    "A private, immersive, emotionally-driven digital experience designed to preserve memories.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FBF8F3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimsonText.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-dvh flex flex-col bg-sukuun-cream text-sukuun-text font-sans">
        {children}
      </body>
    </html>
  );
}
