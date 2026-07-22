import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const serifFont = Instrument_Serif({
  weight: "400",
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CO LAB — Digital & Creative Studio",
  description: "The digital-first partner for next-generation brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${serifFont.variable} ${sansFont.variable} font-sans bg-colab-bg text-colab-dark antialiased selection:bg-colab-dark selection:text-colab-bg`}
      >
        {children}
      </body>
    </html>
  );
}