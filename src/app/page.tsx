"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Newspaper,
  School,
  CreditCard,
  Info,
  ShieldCheck,
  MessageSquare,
  CircleHelp,
  Sun,
  Moon,
  Menu,
} from "lucide-react";

const tools = [
  {
    id: "baby-track",
    name: "BabyTrack",
    description: "Video art effects implemented based on blob tracking algorithm, with many rich customization options.",
    badges: ["Video"],
    image: "https://assets.artistree.cc/cover/baby-track.jpeg",
    popular: true,
  },
  {
    id: "tonekit",
    name: "ToneKit",
    description: "Retro halftone effect generator, creating vintage dot-matrix patterns and screen printing aesthetics with customizable density and angles.",
    badges: ["Video", "Image"],
    image: "https://assets.artistree.cc/cover/tonekit.jpeg?t=1",
  },
  {
    id: "trigger-wave",
    name: "TriggerWave",
    description: "Beat-synced visual effects that react to music in real time. Upload audio, detect beats, and export with audio.",
    badges: ["Video"],
    experimental: true,
    image: "https://assets.artistree.cc/cover/trigger-wave.jpeg",
  },
  {
    id: "asciikit",
    name: "ASCIIKit",
    description: "Convert images into ASCII art with customizable character sets, fonts, and visual parameters for retro-style text representations.",
    badges: ["Video", "Image"],
    image: "https://assets.artistree.cc/cover/asciikit.jpeg",
  },
  {
    id: "retroman",
    name: "Retroman",
    description: "One-click generation of pixel dithering textures that inject retro noise into images, perfect for creating high-quality retro pixel art and dithering effects.",
    badges: ["Image"],
    image: "https://assets.artistree.cc/cover/retro-man.jpeg",
  },
  {
    id: "glassify",
    name: "Glassify",
    description: "Transform images into glass-like viewing effects by simulating light refraction and distortion, as if viewing through textured glass surfaces.",
    badges: ["Video", "Image"],
    image: "https://assets.artistree.cc/cover/cut-it.jpeg",
  },
  {
    id: "blur-suite",
    name: "BlurSuite",
    description: "Multiple blur modes (linear, radial, zoom, wave) for creating motion blur effects on images and videos.",
    badges: ["Video", "Image"],
    image: "https://assets.artistree.cc/cover/blursuite.jpeg",
  },
  {
    id: "super-g",
    name: "Super-G",
    description: "Super-G is a tool focused on creating glitch aesthetics, allowing you to easily generate unique glitch effects.",
    badges: ["Video", "Image"],
    image: "https://assets.artistree.cc/cover/superg.jpeg",
  },
  {
    id: "scanline",
    name: "Scanline",
    description: "Add analog CRT, VHS glitch, and digital block corruption effects to your images and videos in real time.",
    badges: ["Video", "Image"],
    image: "https://assets.artistree.cc/cover/scanline.jpeg",
  },
  {
    id: "image-track",
    name: "ImageTrack",
    description: "Image version of BabyTrack, applying blob tracking algorithms to static images for artistic visual effects and pattern generation.",
    badges: ["Image"],
    image: "https://assets.artistree.cc/cover/image-track.jpeg",
  },
  {
    id: "recolor",
    name: "ReColor",
    description: "Remap the colors of your images and videos using hue mapping and animation controls.",
    badges: ["Video", "Image"],
    image: "https://assets.artistree.cc/cover/recolor2.jpeg",
  },
  {
    id: "loop-flow",
    name: "LoopFlow",
    description: "Create psychedelic Droste effects on your images and videos.",
    badges: ["Video"],
    experimental: true,
    image: "https://assets.artistree.cc/cover/loop-flow.jpeg",
  },
];

const navItems = [
  { name: "Explore", icon: LayoutDashboard, href: "#explore", active: true },
  { name: "Articles", icon: Newspaper, href: "#", soon: true },
  { name: "Tutorials", icon: School, href: "#", soon: true },
  { name: "Pricing", icon: CreditCard, href: "#pricing" },
];

const footerItems = [
  { name: "About", icon: Info, href: "#about" },
  { name: "Privacy", icon: ShieldCheck, href: "#privacy" },
  { name: "Contact", icon: MessageSquare, href: "#contact" },
  { name: "FAQ", icon: CircleHelp, href: "#faq" },
];

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <div className="flex flex-col gap-2 p-2">
        <div className="mb-1 flex h-9 items-center justify-between px-2 py-1">
          <div className="grid flex-1 text-left text-3xl leading-tight">
            <span className="font-bold uppercase">ARTISTREE</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-[24px] w-[24px]"
          >
            {theme === "dark" ? (
              <Sun className="h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            ) : (
              <Moon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto px-2">
        <nav className="flex w-full min-w-0 flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={onItemClick}
              className={`flex w-full items-center gap-2 justify-start h-9 px-2 rounded-sm transition-colors ${
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="size-6" />
              <span>{item.name}</span>
              {item.soon && (
                <span className="ml-auto inline-flex items-center rounded-full border bg-secondary px-2.5 py-0.5 text-xs font-semibold">
                  Soon
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-2 border-t p-2">
        <nav className="flex w-full min-w-0 flex-col gap-1">
          {footerItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="flex w-full items-center gap-2 justify-start h-9"
              asChild={false}
              onClick={onItemClick}
            >
              <a href={item.href}>
                <item.icon className="size-6" />
                <span>{item.name}</span>
              </a>
            </Button>
          ))}
        </nav>
        <div className="flex items-center justify-between border-t px-2 py-2">
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <span>Socials</span>
          </div>
          <div className="flex space-x-2">
            {["T", "I", "X"].map((s, i) => (
              <a
                key={i}
                href="#"
                className="flex aspect-square h-6 items-center justify-center rounded-sm opacity-50 transition-opacity hover:opacity-100"
              >
                <span className="text-xs">{s}</span>
              </a>
            ))}
          </div>
        </div>
        <Button className="w-full" asChild={false}>
          <a href="#">Login</a>
        </Button>
      </div>
    </>
  );
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <div className="flex h-svh w-[16rem] flex-col bg-sidebar text-sidebar-foreground border-r">
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
          <div className="fixed left-0 top-0 z-50 flex h-svh w-[16rem] flex-col bg-sidebar text-sidebar-foreground border-r">
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

          {/* Page content */}
          <div className="mt-2">
            <div className="text-2xl font-semibold text-foreground">Explore</div>
            <p className="text-muted-foreground">Discover creative tools for digital art and design</p>

            <Tabs defaultValue="all" className="mt-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="image">Image</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-2">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                    <Card key={tool.id} className="group flex flex-col border transition-all duration-300 hover:border-primary/50">
                      <Link href={`/tools/${tool.id}`}>
                        <div className="relative aspect-video overflow-hidden border-b">
                          <img
                            alt=""
                            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-102 group-hover:grayscale-0"
                            src={tool.image}
                          />
                          <div
                            className="pointer-events-none absolute inset-0"
                            style={{ background: "radial-gradient(transparent 40%, rgba(0, 0, 0, 0.3) 100%)" }}
                          />
                          {tool.popular && (
                            <span className="absolute top-3 right-3 z-10 flex items-center space-x-1 rounded-full bg-green-300/80 px-2.5 py-0.5 text-xs font-semibold text-black backdrop-blur-3xl">
                              <span>★</span>
                              <span>Most Popular</span>
                            </span>
                          )}
                          {tool.experimental && (
                            <span className="absolute top-3 right-3 z-10 flex items-center space-x-1 rounded-full bg-orange-300/80 px-2.5 py-0.5 text-xs font-semibold text-black backdrop-blur-3xl">
                              <span>Experimental</span>
                            </span>
                          )}
                        </div>
                      </Link>
                      <div className="flex-1 p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-foreground">{tool.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            {tool.badges.map((badge) => (
                              <span
                                key={badge}
                                className="inline-flex items-center rounded-full border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      <Link href={`/tools/${tool.id}`}>
                        <div className="flex items-center justify-between border-t px-6 py-4 text-sm transition-all duration-300 hover:bg-muted/50">
                          <span className="font-medium text-foreground">Try it now</span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="video" className="mt-2">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.filter(t => t.badges.includes("Video")).map((tool) => (
                    <Card key={tool.id} className="group flex flex-col border transition-all duration-300 hover:border-primary/50">
                      <Link href={`/tools/${tool.id}`}>
                        <div className="relative aspect-video overflow-hidden border-b">
                          <img
                            alt=""
                            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-102 group-hover:grayscale-0"
                            src={tool.image}
                          />
                          {tool.popular && (
                            <span className="absolute top-3 right-3 z-10 flex items-center space-x-1 rounded-full bg-green-300/80 px-2.5 py-0.5 text-xs font-semibold text-black backdrop-blur-3xl">
                              <span>★</span>
                              <span>Most Popular</span>
                            </span>
                          )}
                          {tool.experimental && (
                            <span className="absolute top-3 right-3 z-10 flex items-center space-x-1 rounded-full bg-orange-300/80 px-2.5 py-0.5 text-xs font-semibold text-black backdrop-blur-3xl">
                              <span>Experimental</span>
                            </span>
                          )}
                        </div>
                      </Link>
                      <div className="flex-1 p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-foreground">{tool.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            {tool.badges.map((badge) => (
                              <span
                                key={badge}
                                className="inline-flex items-center rounded-full border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      <Link href={`/tools/${tool.id}`}>
                        <div className="flex items-center justify-between border-t px-6 py-4 text-sm transition-all duration-300 hover:bg-muted/50">
                          <span className="font-medium text-foreground">Try it now</span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="image" className="mt-2">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.filter(t => t.badges.includes("Image")).map((tool) => (
                    <Card key={tool.id} className="group flex flex-col border transition-all duration-300 hover:border-primary/50">
                      <Link href={`/tools/${tool.id}`}>
                        <div className="relative aspect-video overflow-hidden border-b">
                          <img
                            alt=""
                            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-102 group-hover:grayscale-0"
                            src={tool.image}
                          />
                          {tool.popular && (
                            <span className="absolute top-3 right-3 z-10 flex items-center space-x-1 rounded-full bg-green-300/80 px-2.5 py-0.5 text-xs font-semibold text-black backdrop-blur-3xl">
                              <span>★</span>
                              <span>Most Popular</span>
                            </span>
                          )}
                          {tool.experimental && (
                            <span className="absolute top-3 right-3 z-10 flex items-center space-x-1 rounded-full bg-orange-300/80 px-2.5 py-0.5 text-xs font-semibold text-black backdrop-blur-3xl">
                              <span>Experimental</span>
                            </span>
                          )}
                        </div>
                      </Link>
                      <div className="flex-1 p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-foreground">{tool.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            {tool.badges.map((badge) => (
                              <span
                                key={badge}
                                className="inline-flex items-center rounded-full border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      <Link href={`/tools/${tool.id}`}>
                        <div className="flex items-center justify-between border-t px-6 py-4 text-sm transition-all duration-300 hover:bg-muted/50">
                          <span className="font-medium text-foreground">Try it now</span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}