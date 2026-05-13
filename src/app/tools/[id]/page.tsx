"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Info, Sun, Moon, Menu, User, ArrowLeft } from "lucide-react";

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
    badges: ["Video"],
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
    badges: ["Video"],
    gradient: "from-teal-500 via-cyan-500 to-blue-500",
    icon: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z",
  },
};

const navItems = [
  { name: "Explore", icon: LayoutDashboard, href: "/", active: false },
];

const footerItems = [
  { name: "About", icon: Info, href: "#about" },
];

const socials = [
  { name: "Threads", url: "#" },
  { name: "Instagram", url: "#" },
  { name: "X", url: "#" },
];

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex h-full w-full flex-col bg-sidebar">
      {/* Header */}
      <div className="flex flex-col gap-2 p-2">
        <div className="mb-1 h-9 p-2 py-1">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <div className="grid flex-1 text-left text-3xl leading-tight">
                <span className="font-bold uppercase text-sidebar-foreground">ARTISTREE</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="h-[28px] w-[28px] rounded-full border-2 border-primary/50 bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg hover:from-orange-600 hover:to-amber-600"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-black" />
              ) : (
                <Moon className="h-4 w-4 text-black" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto px-2">
        <nav className="flex w-full min-w-0 flex-col gap-1">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="flex w-full items-center gap-2 justify-start h-9 px-2 text-sm"
              onClick={onItemClick}
            >
              <item.icon className="size-6" />
              <span>{item.name}</span>
            </Button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-2 border-t p-2">
        <nav className="flex w-full min-w-0 flex-col gap-1">
          {footerItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="flex w-full items-center gap-2 justify-start h-9 px-2 text-sm"
              onClick={onItemClick}
            >
              <item.icon className="size-6" />
              <span>{item.name}</span>
            </Button>
          ))}
        </nav>
        <div className="flex items-center justify-between pl-2">
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <span>Socials</span>
          </div>
          <div className="flex space-x-2">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.url}
                className="flex aspect-square h-6 items-center justify-center rounded-sm opacity-50 transition-opacity hover:opacity-100"
                title={social.name}
              >
                <span className="text-xs text-sidebar-foreground">{social.name[0]}</span>
              </a>
            ))}
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start h-auto">
          <a href="#" className="flex items-center space-x-2 p-1 rounded-lg hover:bg-muted w-full justify-start">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">Login</span>
          </a>
        </Button>
      </div>
    </div>
  );
}

export default function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const [tool, setTool] = useState<{ name: string; description: string; badges: string[]; gradient: string; icon: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <div className="sticky top-0 h-screen w-[16rem] flex-col border-r">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 z-50 flex h-screen w-[16rem] flex-col border-r">
            <SidebarContent onItemClick={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 p-2 md:p-4 md:px-6">
        <div className="w-full">
          {/* Mobile header */}
          <div className="flex items-center space-x-1 border-b p-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-4" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <div className="text-xl font-semibold">ARTISTREE</div>
          </div>

          {/* Tool Hero */}
          <div className="mt-8 text-center mb-12">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center`}>
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d={tool.icon} />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {tool.name}
            </h1>
            <div className="flex justify-center gap-2 mb-6">
              {tool.badges.map((badge) => (
                <Badge key={badge} variant="secondary">{badge}</Badge>
              ))}
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {tool.description}
            </p>
          </div>

          {/* Coming Soon Card */}
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle className="text-2xl">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                This tool is under development. Stay tuned for updates!
              </p>
              <Button asChild>
                <Link href="/">
                  Explore Other Tools
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-lg">Real-time Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">See your changes instantly as you adjust parameters</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <CardTitle className="text-lg">Export Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Download in multiple formats with customizable quality</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}