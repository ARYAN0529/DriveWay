import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

// Serif display font + clean sans body = the classic "premium" pairing.
const display = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });

export const metadata: Metadata = {
  title: "DriveWay | Doorstep car wash in Jaipur",
  description: "We wash your car where you park it. Book online, pay after the shine.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}