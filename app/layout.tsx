import type { Metadata } from "next";
import { Michroma, Manrope } from "next/font/google";
import "./globals.css";

// Michroma is the brand display face (headings, labels, buttons, numbers). It only ships in one
// weight and is very wide, so long paragraphs use Manrope for comfortable reading.
const display = Michroma({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Al Zaad Cars | Quality pre-owned vehicles in Ajman",
  description: "Buy, sell, and trade quality pre-owned vehicles with confidence at Al Zaad Cars, Ajman, UAE.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-paper font-sans antialiased">{children}</body>
    </html>
  );
}
