import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lucasterry.com"),
  title: "Lucas Terry",
  description: "A website about Lucas",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Lucas Terry",
    description: "A website about Lucas",
    type: "website",
    url: "https://lucasterry.com/",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary",
    title: "Lucas Terry",
    description: "A website about Lucas",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="grain" />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
