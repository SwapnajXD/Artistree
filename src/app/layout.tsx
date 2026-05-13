import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "ARTISTREE - Creative Tools for Digital Art & Design",
  description: "Discover creative tools for digital art and design. BabyTrack, ToneKit, TriggerWave, ASCIIKit, Retroman, Glassify, BlurSuite, Super-G, Scanline, ImageTrack, ReColor, LoopFlow and more.",
  keywords: "digital art, creative tools, video effects, image processing, ASCII art, glitch effects, halftone, blob tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}