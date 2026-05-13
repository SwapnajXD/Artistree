"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { LayoutDashboard, Info, Sun, Moon, Menu, User, Upload, Video, Image, Download } from "lucide-react";

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
              <a key={i} href={social.url} className="flex aspect-square h-6 items-center justify-center rounded-sm opacity-50 transition-opacity hover:opacity-100" title={social.name}>
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

export default function BabyTrackPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mediaType, setMediaType] = useState<"video" | "image">("video");
  const [videoSpeed, setVideoSpeed] = useState(1);
  const [shape, setShape] = useState("basic");
  const [regionStyle, setRegionStyle] = useState("random");
  const [connectionRate, setConnectionRate] = useState(0.5);
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [blobCount, setBlobCount] = useState(64);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [textPosition, setTextPosition] = useState("center");
  const [fontSize, setFontSize] = useState("16px");

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const handleShapeChange = (value: string | null) => {
    if (value) setShape(value);
  };

  const handleRegionChange = (value: string | null) => {
    if (value) setRegionStyle(value);
  };

  const handleTextPositionChange = (value: string | null) => {
    if (value) setTextPosition(value);
  };

  const handleFontSizeChange = (value: string | null) => {
    if (value) setFontSize(value);
  };

  const handleStrokeWidthChange = (value: string | null) => {
    if (value) setStrokeWidth(Number(value));
  };

  const shapes = ["Basic", "Cross", "Label", "Frame", "L-Frame", "X-Frame", "Grid", "Particle", "Dash", "Scope", "Win2K", "Label 2", "Glow", "Backdrop"];
  const filters = ["Invert", "Fusion", "Inv", "Glitch", "Thermal", "Pixel", "Tone", "Blur", "Dither", "Zoom", "X-Ray", "Water", "Mask", "CRT", "Edge", "Blink"];

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:flex">
        <div className="sticky top-0 h-screen w-[16rem] flex-col border-r">
          <SidebarContent />
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 z-50 flex h-screen w-[16rem] flex-col border-r">
            <SidebarContent onItemClick={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 p-2 md:p-4 md:px-6 overflow-auto">
        <div className="w-full">
          {/* Mobile header */}
          <div className="flex items-center space-x-1 border-b p-2 md:hidden">
            <Button variant="ghost" size="icon" className="size-6" onClick={() => setSidebarOpen(true)}>
              <Menu className="size-4" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <div className="text-xl font-semibold">BabyTrack</div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mt-4">
            {/* Preview Area */}
            <div className="flex-1">
              <Card className="aspect-video bg-black/50 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Upload Video</p>
                  <p className="text-sm">or</p>
                  <Button variant="outline" className="mt-2">
                    <Video className="w-4 h-4 mr-2" />
                    Open Camera
                  </Button>
                </div>
              </Card>
            </div>

            {/* Controls */}
            <div className="lg:w-[400px] space-y-4">
              {/* Media Type Toggle */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Media Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant={mediaType === "video" ? "default" : "outline"}
                      onClick={() => setMediaType("video")}
                      className="flex-1"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </Button>
                    <Button
                      variant={mediaType === "image" ? "default" : "outline"}
                      onClick={() => setMediaType("image")}
                      className="flex-1"
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Image
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Video Settings */}
              {mediaType === "video" && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Video Speed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map(speed => (
                        <Button
                          key={speed}
                          variant={videoSpeed === speed ? "default" : "outline"}
                          size="sm"
                          onClick={() => setVideoSpeed(speed)}
                          className="flex-1"
                        >
                          {speed}X
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Shape */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Shape</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={shape} onValueChange={handleShapeChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {shapes.map(s => (
                        <SelectItem key={s.toLowerCase()} value={s.toLowerCase()}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Region Style */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Region Style</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={regionStyle} onValueChange={handleRegionChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="random">Random</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="edges">Edges</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Filter Effects */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Filter Effects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {filters.map(filter => (
                      <Button
                        key={filter}
                        variant={selectedFilters.includes(filter) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter(filter)}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Connection */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Connection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm">Connection Rate</Label>
                    <Slider
                      value={[connectionRate]}
                      onValueChange={([v]) => setConnectionRate(v)}
                      min={0}
                      max={1}
                      step={0.25}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0</span><span>0.25</span><span>0.5</span><span>0.75</span><span>1</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm">Stroke Width</Label>
                    <Select value={String(strokeWidth)} onValueChange={handleStrokeWidthChange}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1px</SelectItem>
                        <SelectItem value="2">2px</SelectItem>
                        <SelectItem value="3">3px</SelectItem>
                        <SelectItem value="4">4px</SelectItem>
                        <SelectItem value="5">5px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Blob Count */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Blob Count Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[16, 32, 64, 128, 256, 512].map(count => (
                      <Button
                        key={count}
                        variant={blobCount === count ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBlobCount(count)}
                      >
                        {count}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Text & Color */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Color and Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm">Text Position</Label>
                    <Select value={textPosition} onValueChange={handleTextPositionChange}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm">Font Size</Label>
                    <Select value={fontSize} onValueChange={handleFontSizeChange}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10px">10px</SelectItem>
                        <SelectItem value="12px">12px</SelectItem>
                        <SelectItem value="16px">16px</SelectItem>
                        <SelectItem value="18px">18px</SelectItem>
                        <SelectItem value="20px">20px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Export */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Export</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export MP4
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export WebM
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}