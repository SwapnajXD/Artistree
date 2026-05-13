"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const toolsData: Record<string, { name: string; description: string; badges: string[]; gradient: string; icon: string }> = {
  "baby-track": {
    name: "BabyTrack",
    description: "Video art effects implemented based on blob tracking algorithm, with many rich customization options.",
    badges: ["Video"],
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  "tonekit": {
    name: "ToneKit",
    description: "Retro halftone effect generator, creating vintage dot-matrix patterns and screen printing aesthetics with customizable density and angles.",
    badges: ["Video", "Image"],
    gradient: "from-pink-500 via-rose-500 to-red-500",
    icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  },
  "trigger-wave": {
    name: "TriggerWave",
    description: "Beat-synced visual effects that react to music in real time. Upload audio, detect beats, and export with audio.",
    badges: ["Experimental"],
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    icon: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z",
  },
  "asciikit": {
    name: "ASCIIKit",
    description: "Convert images into ASCII art with customizable character sets, fonts, and visual parameters for retro-style text representations.",
    badges: ["Video", "Image"],
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    icon: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
  },
  "retroman": {
    name: "Retroman",
    description: "One-click generation of pixel dithering textures that inject retro noise into images, perfect for creating high-quality retro pixel art and dithering effects.",
    badges: ["Image"],
    gradient: "from-amber-500 via-orange-500 to-red-500",
    icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4z",
  },
  "glassify": {
    name: "Glassify",
    description: "Transform images into glass-like viewing effects by simulating light refraction and distortion, as if viewing through textured glass surfaces.",
    badges: ["Video", "Image"],
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
  },
  "blur-suite": {
    name: "BlurSuite",
    description: "Multiple blur modes (linear, radial, zoom, wave) for creating motion blur effects on images and videos.",
    badges: ["Video", "Image"],
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    icon: "M6 13c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-3 .5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5z",
  },
  "super-g": {
    name: "Super-G",
    description: "Super-G is a tool focused on creating glitch aesthetics, allowing you to easily generate unique glitch effects.",
    badges: ["Video", "Image"],
    gradient: "from-red-500 via-pink-500 to-purple-500",
    icon: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
  },
  "scanline": {
    name: "Scanline",
    description: "Add analog CRT, VHS glitch, and digital block corruption effects to your images and videos in real time.",
    badges: ["Video", "Image"],
    gradient: "from-gray-500 via-slate-500 to-zinc-500",
    icon: "M3 3h18v18H3V3zm16 16V5H5v14h14z",
  },
  "image-track": {
    name: "ImageTrack",
    description: "Image version of BabyTrack, applying blob tracking algorithms to static images for artistic visual effects and pattern generation.",
    badges: ["Image"],
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    icon: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z",
  },
  "recolor": {
    name: "ReColor",
    description: "Remap the colors of your images and videos using hue mapping and animation controls.",
    badges: ["Video", "Image"],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    icon: "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
  },
  "loop-flow": {
    name: "LoopFlow",
    description: "Create psychedelic Droste effects on your images and videos.",
    badges: ["Experimental"],
    gradient: "from-teal-500 via-cyan-500 to-blue-500",
    icon: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z",
  },
};

export default function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const [tool, setTool] = useState<{ name: string; description: string; badges: string[]; gradient: string; icon: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setTool(toolsData[resolvedParams.id] || null);
      setMounted(true);
    };
    loadParams();
  }, [params]);

  if (!mounted || !tool) return null;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--gradient-1)] to-[var(--gradient-2)] flex items-center justify-center">
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-bold">ARTISTREE</span>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-elevated)] text-sm transition-colors"
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Tool Hero */}
          <div className="text-center mb-12 animate-slide-up">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center`}>
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d={tool.icon} />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold section-title mb-4">
              <span className="gradient-text">{tool.name}</span>
            </h1>
            <div className="flex justify-center gap-2 mb-6">
              {tool.badges.map((badge) => (
                <span
                  key={badge}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    badge === "Video"
                      ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                      : badge === "Image"
                      ? "bg-[var(--gradient-3)]/20 text-[var(--gradient-3)]"
                      : "bg-[var(--gradient-4)]/20 text-[var(--gradient-4)]"
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              {tool.description}
            </p>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 text-center animate-scale-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--gradient-1)] to-[var(--gradient-2)] flex items-center justify-center animate-pulse-glow">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
            <p className="text-[var(--muted)] mb-6">
              This tool is under development. Stay tuned for updates!
            </p>
            <Link
              href="/"
              className="btn-primary inline-block"
            >
              Explore Other Tools
            </Link>
          </div>

          {/* Features Preview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[var(--surface-elevated)] flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Real-time Preview</h3>
              <p className="text-sm text-[var(--muted)]">See your changes instantly as you adjust parameters</p>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[var(--surface-elevated)] flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[var(--gradient-3)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Export Options</h3>
              <p className="text-sm text-[var(--muted)]">Download in multiple formats with customizable quality</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}