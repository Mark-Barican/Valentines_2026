import type { Metadata } from "next";
import "./globals.css";
import { cormorant, playfair } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Will You Be My Valentine?",
  description: "A romantic, immersive Valentine's Day experience.",
  openGraph: {
    title: "Will You Be My Valentine?",
    description: "A romantic, immersive Valentine's Day experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Will You Be My Valentine?",
    description: "A romantic, immersive Valentine's Day experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
