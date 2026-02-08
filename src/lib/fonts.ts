import { DM_Serif_Display, Manrope } from "next/font/google";

export const playfair = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400"],
});

export const cormorant = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
});
