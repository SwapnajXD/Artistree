"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const tools = [
  {
    id: "baby-track",
    name: "BabyTrack",
    description: "Video art effects implemented based on blob tracking algorithm, with many rich customization options.",
    badges: ["Video"],
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  {
    id: "tonekit",
    name: "ToneKit",
    description: "Retro halftone effect generator, creating vintage dot-matrix patterns and screen printing aesthetics with customizable density and angles.",
    badges: ["Video", "Image"],
    gradient: "from-pink-500 via-rose-500 to-red-500",
    icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  },
  {
    id: "trigger-wave",
    name: "TriggerWave",
    description: "Beat-synced visual effects that react to music in real time. Upload audio, detect beats, and export with audio.",
    badges: ["Experimental"],
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    icon: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z",
  },
  {
    id: "asciikit",
    name: "ASCIIKit",
    description: "Convert images into ASCII art with customizable character sets, fonts, and visual parameters for retro-style text representations.",
    badges: ["Video", "Image"],
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    icon: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
  },
  {
    id: "retroman",
    name: "Retroman",
    description: "One-click generation of pixel dithering textures that inject retro noise into images, perfect for creating high-quality retro pixel art and dithering effects.",
    badges: ["Image"],
    gradient: "from-amber-500 via-orange-500 to-red-500",
    icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4z",
  },
  {
    id: "glassify",
    name: "Glassify",
    description: "Transform images into glass-like viewing effects by simulating light refraction and distortion, as if viewing through textured glass surfaces.",
    badges: ["Video", "Image"],
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
  },
  {
    id: "blur-suite",
    name: "BlurSuite",
    description: "Multiple blur modes (linear, radial, zoom, wave) for creating motion blur effects on images and videos.",
    badges: ["Video", "Image"],
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    icon: "M6 13c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-3 .5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM6 5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm15 5.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM14 7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-3.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm-11 10c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm7 7c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm0-17c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM10 7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 5.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm8 .5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3 8.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM14 17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 3.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm-4-12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0 8.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4-4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-4c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z",
  },
  {
    id: "super-g",
    name: "Super-G",
    description: "Super-G is a tool focused on creating glitch aesthetics, allowing you to easily generate unique glitch effects.",
    badges: ["Video", "Image"],
    gradient: "from-red-500 via-pink-500 to-purple-500",
    icon: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
  },
  {
    id: "scanline",
    name: "Scanline",
    description: "Add analog CRT, VHS glitch, and digital block corruption effects to your images and videos in real time.",
    badges: ["Video", "Image"],
    gradient: "from-gray-500 via-slate-500 to-zinc-500",
    icon: "M3 3h18v18H3V3zm16 16V5H5v14h14z",
  },
  {
    id: "image-track",
    name: "ImageTrack",
    description: "Image version of BabyTrack, applying blob tracking algorithms to static images for artistic visual effects and pattern generation.",
    badges: ["Image"],
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    icon: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z",
  },
  {
    id: "recolor",
    name: "ReColor",
    description: "Remap the colors of your images and videos using hue mapping and animation controls.",
    badges: ["Video", "Image"],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    icon: "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
  },
  {
    id: "loop-flow",
    name: "LoopFlow",
    description: "Create psychedelic Droste effects on your images and videos.",
    badges: ["Experimental"],
    gradient: "from-teal-500 via-cyan-500 to-blue-500",
    icon: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z",
  },
];

const navItems = [
  { name: "Explore", href: "#explore", active: true },
  { name: "Articles", href: "#articles", soon: true },
  { name: "Tutorials", href: "#tutorials", soon: true },
  { name: "Pricing", href: "#pricing", soon: false },
  { name: "About", href: "#about", soon: false },
  { name: "Privacy", href: "#privacy", soon: false },
  { name: "Contact", href: "#contact", soon: false },
  { name: "FAQ", href: "#faq", soon: false },
];

const socials = [
  { name: "Threads", url: "#", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z" },
  { name: "Instagram", url: "#", icon: "M12 2c2.5 0 4.5 2 4.5 4.5S14.5 11 12 11s-4.5-2-4.5-4.5S9.5 2 12 2zm0 18c-2.8 0-5-2.2-5-5h2c0 1.7 1.3 3 3 3s3-1.3 3-3h2c0 2.8-2.2 5-5 5z" },
  { name: "X", url: "#", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126h1.997z" },
];

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("artistree-theme");
    if (saved) {
      setTheme(saved as "dark" | "light");
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("artistree-theme", newTheme);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Sidebar */}
      <aside
        className={`sidebar transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gradient-1)] to-[var(--gradient-2)] flex items-center justify-center">
                <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold section-title">ARTISTREE</span>
            </a>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-[var(--surface-elevated)] rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-3 mb-6 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--border)] transition-colors"
          >
            <span className="text-sm text-[var(--muted)]">Toggle theme</span>
            <div className="w-10 h-6 rounded-full bg-[var(--border)] relative transition-colors">
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-[var(--accent)] transition-transform ${theme === "light" ? "translate-x-5" : "translate-x-1"}`}
              />
            </div>
          </button>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`sidebar-link ${item.active ? "active" : ""}`}
              >
                {item.name}
                {item.soon && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[var(--surface-elevated)] text-[var(--muted)]">
                    Soon
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Socials at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--muted)] mb-3">Socials</p>
          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--border)] transition-colors"
                title={social.name}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-elevated)] transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-[280px] min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
          <div className="hero-bg" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="section-title text-5xl md:text-7xl font-bold mb-6 animate-slide-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <span className="gradient-text">ARTISTREE</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--muted)] mb-8 animate-slide-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              Discover creative tools for digital art and design
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <a href="#explore" className="btn-primary">
                Explore Tools
              </a>
              <button
                className="px-6 py-3 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-elevated)] transition-colors"
              >
                Login
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
            <svg className="w-6 h-6 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Tools Section */}
        <section id="explore" className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="section-title text-3xl md:text-4xl font-bold">
                Explore <span className="gradient-text">Tools</span>
              </h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-[var(--accent)] text-black font-medium text-sm">
                  All
                </button>
                <button className="px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-elevated)] text-sm">
                  Video
                </button>
                <button className="px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-elevated)] text-sm">
                  Image
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="tool-card group animate-scale-in opacity-0"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <div className="tool-card-image relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-80`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d={tool.icon} />
                        </svg>
                      </div>
                    </div>
                    {tool.badges.map((badge) => (
                      <span
                        key={badge}
                        className={`tool-badge ${
                          badge === "Video"
                            ? "badge-video"
                            : badge === "Image"
                            ? "badge-image"
                            : "badge-experimental"
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-[var(--muted)] line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex items-center text-[var(--accent)] text-sm font-medium">
                      <span>Try it now</span>
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20 bg-[var(--surface)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-16">
              Why <span className="gradient-text-2">ARTISTREE</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--gradient-1)] to-[var(--gradient-2)] flex items-center justify-center">
                  <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Processing</h3>
                <p className="text-sm text-[var(--muted)]">
                  Apply effects instantly with our powerful real-time processing engine
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--gradient-3)] to-[var(--gradient-4)] flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Export with Audio</h3>
                <p className="text-sm text-[var(--muted)]">
                  Export your creations with synchronized audio for videos
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--gradient-4)] to-[var(--gradient-1)] flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Highly Customizable</h3>
                <p className="text-sm text-[var(--muted)]">
                  Fine-tune every parameter to get the exact look you want
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden">
          <div className="hero-bg" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="section-title text-3xl md:text-5xl font-bold mb-6">
              Start Creating Today
            </h2>
            <p className="text-lg text-[var(--muted)] mb-8">
              Join thousands of artists using ARTISTREE to create stunning digital art and effects.
            </p>
            <button className="btn-primary inline-block">
              Get Started Free
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 md:px-12 lg:px-20 border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--gradient-1)] to-[var(--gradient-2)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-lg font-bold">ARTISTREE</span>
              </div>
              <div className="flex gap-6 text-sm text-[var(--muted)]">
                <a href="#about" className="hover:text-[var(--foreground)] transition-colors">About</a>
                <a href="#privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy</a>
                <a href="#contact" className="hover:text-[var(--foreground)] transition-colors">Contact</a>
                <a href="#faq" className="hover:text-[var(--foreground)] transition-colors">FAQ</a>
              </div>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-elevated)] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--muted)]">
              © 2026 ARTISTREE. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}