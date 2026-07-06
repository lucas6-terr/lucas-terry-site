import type { Metadata } from "next";
import { Inter_Tight, Inter } from "next/font/google";
import "./globals.css";

const tight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-tight",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lucas Terry — Growth & Marketing Operator",
  description:
    "Growth & marketing operator — zero-to-one GTM for technical products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tight.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
