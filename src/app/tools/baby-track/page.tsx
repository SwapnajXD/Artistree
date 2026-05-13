"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sun, Moon, User, Upload, Video, Image, Download, ArrowLeft, Home, Loader2 } from "lucide-react";

const API_URL = "http://localhost:8000";

function ToolSidebar({
  onClose,
  mediaType, setMediaType,
  videoSpeed, setVideoSpeed,
  shape, setShape,
  regionStyle, setRegionStyle,
  connectionRate, setConnectionRate,
  strokeWidth, setStrokeWidth,
  blobCount, setBlobCount,
  selectedFilters, setSelectedFilters,
  textPosition, setTextPosition,
  fontSize, setFontSize,
  processedUrl, onClearMedia,
}: {
  onClose?: () => void;
  mediaType: "video" | "image";
  setMediaType: (v: "video" | "image") => void;
  videoSpeed: number;
  setVideoSpeed: (v: number) => void;
  shape: string;
  setShape: (v: string) => void;
  regionStyle: string;
  setRegionStyle: (v: string) => void;
  connectionRate: number;
  setConnectionRate: (v: number) => void;
  strokeWidth: number;
  setStrokeWidth: (v: number) => void;
  blobCount: number;
  setBlobCount: (v: number) => void;
  selectedFilters: string[];
  setSelectedFilters: (v: string[]) => void;
  textPosition: string;
  setTextPosition: (v: string) => void;
  fontSize: string;
  setFontSize: (v: string) => void;
  processedUrl: string | null;
  onClearMedia: () => void;
}) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };

  const toggleFilter = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(newFilters);
  };

  const handleShapeChange = (value: string | null) => { if (value) setShape(value); };
  const handleRegionChange = (value: string | null) => { if (value) setRegionStyle(value); };
  const handleTextPositionChange = (value: string | null) => { if (value) setTextPosition(value); };
  const handleFontSizeChange = (value: string | null) => { if (value) setFontSize(value); };
  const handleStrokeWidthChange = (value: string | null) => { if (value) setStrokeWidth(Number(value)); };

  const shapes = ["Basic", "Cross", "Label", "Frame", "L-Frame", "X-Frame", "Grid", "Particle", "Dash", "Scope", "Win2K", "Label 2", "Glow", "Backdrop"];
  const filters = ["Invert", "Fusion", "Inv", "Glitch", "Thermal", "Pixel", "Tone", "Blur", "Dither", "Zoom", "X-Ray", "Water", "Mask", "CRT", "Edge", "Blink"];

  return (
    <div className="flex h-full w-full flex-col bg-sidebar overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col gap-2 p-2 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="size-8" onClick={onClose}>
              <ArrowLeft className="size-4" />
            </Button>
            <div className="grid flex-1 text-left text-2xl leading-tight">
              <span className="font-bold uppercase text-sidebar-foreground">BabyTrack</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-[28px] w-[28px] rounded-full border-2 border-primary/50 bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-black" /> : <Moon className="h-4 w-4 text-black" />}
          </Button>
        </div>
      </div>

      {/* Back to Home */}
      <div className="p-2">
        <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-sidebar-accent text-sm w-full">
          <Home className="size-4" />
          Back to Home
        </Link>
      </div>

      {/* Controls */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {/* Media Type */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase">Media Type</Label>
          <div className="flex gap-1">
            <Button variant={mediaType === "video" ? "default" : "outline"} size="sm" className="flex-1" onClick={() => setMediaType("video")}>
              <Video className="size-4 mr-1" /> Video
            </Button>
            <Button variant={mediaType === "image" ? "default" : "outline"} size="sm" className="flex-1" onClick={() => setMediaType("image")}>
              <Image className="size-4 mr-1" /> Image
            </Button>
          </div>
        </div>

        {mediaType === "video" && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase">Video Speed</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(speed => (
                <Button key={speed} variant={videoSpeed === speed ? "default" : "outline"} size="sm" className="flex-1" onClick={() => setVideoSpeed(speed)}>
                  {speed}X
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase">Shape</Label>
          <Select value={shape} onValueChange={handleShapeChange}>
            <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
            <SelectContent>{shapes.map(s => <SelectItem key={s.toLowerCase()} value={s.toLowerCase()}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase">Region Style</Label>
          <Select value={regionStyle} onValueChange={handleRegionChange}>
            <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="random">Random</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="edges">Edges</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase">Filter Effects</Label>
          <div className="flex flex-wrap gap-1">
            {filters.map(filter => (
              <Button key={filter} variant={selectedFilters.includes(filter) ? "default" : "outline"} size="sm" className="text-xs px-2 py-0 h-6" onClick={() => toggleFilter(filter)}>
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase">Connection Rate</Label>
          <Slider value={[connectionRate]} onValueChange={(v) => setConnectionRate(typeof v === "number" ? v : v[0])} min={0} max={1} step={0.25} />
          <div className="flex justify-between text-xs text-muted-foreground"><span>0</span><span>0.5</span><span>1</span></div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase">Stroke Width</Label>
          <Select value={String(strokeWidth)} onValueChange={handleStrokeWidthChange}>
            <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map(n => <SelectItem key={n} value={String(n)}>{n}px</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase">Blob Count</Label>
          <div className="flex flex-wrap gap-1">
            {[16, 32, 64, 128, 256, 512].map(count => (
              <Button key={count} variant={blobCount === count ? "default" : "outline"} size="sm" className="text-xs px-2 py-0 h-6" onClick={() => setBlobCount(count)}>{count}</Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase">Text Position</Label>
          <Select value={textPosition} onValueChange={handleTextPositionChange}>
            <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase">Font Size</Label>
          <Select value={fontSize} onValueChange={handleFontSizeChange}>
            <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["10px", "12px", "16px", "18px", "20px"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Export */}
      <div className="p-2 border-t space-y-2">
        <Button
          className="w-full"
          disabled={!processedUrl}
          onClick={() => {
            if (processedUrl) {
              const a = document.createElement("a");
              a.href = processedUrl;
              a.download = "processed.mp4";
              a.click();
            }
          }}
        >
          <Download className="size-4 mr-2" /> Export MP4
        </Button>
        <Button variant="outline" className="w-full" disabled={!processedUrl}>
          <Download className="size-4 mr-2" /> Export WebM
        </Button>
      </div>

      {/* Footer */}
      <div className="p-2 border-t">
        <Button variant="ghost" className="w-full justify-start" onClick={onClearMedia}>
          <ArrowLeft className="size-4 mr-2" /> {processedUrl ? "Back to Original" : "Back to Home"}
        </Button>
      </div>
    </div>
  );
}

export default function BabyTrackPage() {
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

  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processError, setProcessError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<"checking" | "ok" | "error">("checking");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check server status on mount
  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then(() => setServerStatus("ok"))
      .catch(() => setServerStatus("error"));
  }, []);

  const processMedia = async () => {
    if (!uploadedFile || isProcessing) return;

    setIsProcessing(true);
    setProcessError(null);

    try {
      console.log("Processing file:", uploadedFile.name, uploadedFile.type);

      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("shape", shape);
      formData.append("region_style", regionStyle);
      formData.append("connection_rate", String(connectionRate));
      formData.append("stroke_width", String(strokeWidth));
      formData.append("blob_count", String(blobCount));
      formData.append("text_position", textPosition);
      formData.append("font_size", String(parseInt(fontSize)));
      formData.append("filters", selectedFilters.join(","));
      formData.append("min_area", "100");
      formData.append("max_blobs", "500");

      const endpoint = mediaType === "video"
        ? "/api/tools/baby-track/process"
        : "/api/tools/baby-track/process-frame";

      console.log("Sending to:", `${API_URL}${endpoint}`);

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Processing failed: ${response.status} - ${errorText}`);
      }

      const blob = await response.blob();
      console.log("Got blob:", blob.type, blob.size);
      const url = URL.createObjectURL(blob);
      setProcessedUrl(url);
    } catch (error) {
      console.error("Processing error:", error);
      setProcessError(error instanceof Error ? error.message : "Failed to process. Make sure the server is running at localhost:8000");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
      setUploadedFile(file);
      setProcessedUrl(null);
      setIsPlaying(false);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('video/') || file.type.startsWith('image/'))) {
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
      setIsPlaying(false);
    }
  }, []);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (mediaUrl && videoRef.current && mediaType === "video") {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, mediaUrl, mediaType]);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <div className="w-[280px] shrink-0 hidden md:block">
        <ToolSidebar
          onClose={() => {}}
          mediaType={mediaType}
          setMediaType={setMediaType}
          videoSpeed={videoSpeed}
          setVideoSpeed={setVideoSpeed}
          shape={shape}
          setShape={setShape}
          regionStyle={regionStyle}
          setRegionStyle={setRegionStyle}
          connectionRate={connectionRate}
          setConnectionRate={setConnectionRate}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
          blobCount={blobCount}
          setBlobCount={setBlobCount}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          textPosition={textPosition}
          setTextPosition={setTextPosition}
          fontSize={fontSize}
          setFontSize={setFontSize}
          processedUrl={processedUrl}
          onClearMedia={() => { setMediaUrl(null); setProcessedUrl(null); setIsPlaying(false); }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {/* Preview Area */}
        <div
          className="relative aspect-video bg-black/80 rounded-lg overflow-hidden max-w-4xl mx-auto"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {processedUrl ? (
            mediaType === "video" ? (
              <video
                ref={videoRef}
                src={processedUrl}
                className="w-full h-full object-contain"
                onClick={() => setIsPlaying(!isPlaying)}
                playsInline
                controls
                autoPlay
              />
            ) : (
              <img
                src={processedUrl}
                alt="Processed"
                className="w-full h-full object-contain"
              />
            )
          ) : mediaUrl ? (
            mediaType === "video" ? (
              <video
                ref={videoRef}
                src={mediaUrl}
                className="w-full h-full object-contain"
                onClick={() => setIsPlaying(!isPlaying)}
                playsInline
              />
            ) : (
              <img
                src={mediaUrl}
                alt="Uploaded"
                className="w-full h-full object-contain"
              />
            )
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <Upload className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">Upload {mediaType === "video" ? "Video" : "Image"}</p>
              <p className="text-sm">Drag and drop or click to upload</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button className="mt-4" onClick={() => fileInputRef.current?.click()}>
                <Upload className="size-4 mr-2" /> Choose File
              </Button>
            </div>
          )}

          {/* Overlay controls */}
          {mediaUrl && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={processMedia}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-4 mr-1 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Video className="size-4 mr-1" /> Process
                  </>
                )}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => {
                setMediaUrl(null);
                setProcessedUrl(null);
                setIsPlaying(false);
              }}>
                Clear
              </Button>
              {mediaType === "video" && !processedUrl && (
                <Button variant="secondary" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? "Pause" : "Play"}
                </Button>
              )}
              <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
                Replace
              </Button>
            </div>
          )}

          {/* Error Message */}
          {processError && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg text-sm">
              {processError}
            </div>
          )}

          {/* Server Status */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${serverStatus === "ok" ? "bg-green-500" : serverStatus === "error" ? "bg-red-500" : "bg-yellow-500"}`} />
            <span className="text-xs text-muted-foreground">
              {serverStatus === "ok" ? "Server Connected" : serverStatus === "error" ? "Server Offline" : "Checking..."}
            </span>
          </div>

          {/* Canvas for effects (hidden for now) */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Mobile Controls Toggle */}
        <div className="md:hidden mt-4">
          <details className="border rounded-lg">
            <summary className="p-3 cursor-pointer font-medium">Show Controls</summary>
            <div className="p-3 space-y-4">
              {/* Media Type */}
              <div className="space-y-2">
                <Label className="text-sm">Media Type</Label>
                <div className="flex gap-2">
                  <Button variant={mediaType === "video" ? "default" : "outline"} size="sm" className="flex-1" onClick={() => setMediaType("video")}>
                    <Video className="size-4 mr-1" /> Video
                  </Button>
                  <Button variant={mediaType === "image" ? "default" : "outline"} size="sm" className="flex-1" onClick={() => setMediaType("image")}>
                    <Image className="size-4 mr-1" /> Image
                  </Button>
                </div>
              </div>
              {!mediaUrl && (
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Upload {mediaType} to start</p>
                  <Button size="sm" className="mt-2" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="size-4 mr-2" /> Choose File
                  </Button>
                </div>
              )}
            </div>
          </details>
        </div>

        {/* Info */}
        <div className="max-w-4xl mx-auto mt-6">
          <Card>
            <CardHeader>
              <CardTitle>BabyTrack</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Video art effects implemented based on blob tracking algorithm, with many rich customization options.
              </p>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">Video</Badge>
                <Badge variant="outline">Under Construction</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}