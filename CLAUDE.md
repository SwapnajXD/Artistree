# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ARTISTREE is a Next.js-based creative tools platform for digital art and design. The platform offers 12 interactive tools for image and video processing.

## Development Commands

- **Development**: `npm run dev` - Start development server at http://localhost:3000
- **Build**: `npm run build` - Create production build
- **Lint**: `npm run lint` - Run ESLint
- **Preview**: `npm run start` - Preview production build

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **Fonts**: Clash Display, DM Sans, Space Mono (via CDN)

## Architecture

The main code is in `src/app/`:
- `layout.tsx` - Root layout with metadata and fonts
- `page.tsx` - Landing page with sidebar, hero, tools grid, features, and footer
- `globals.css` - Custom design system with dark/light themes, animations, and utility classes

### Key Components (in page.tsx)
- Sidebar navigation with theme toggle
- Hero section with gradient background and animations
- Tools grid (12 creative tools with badges)
- Features section
- Footer with social links

### Tools Available
BabyTrack, ToneKit, TriggerWave, ASCIIKit, Retroman, Glassify, BlurSuite, Super-G, Scanline, ImageTrack, ReColor, LoopFlow

## Design System

- Dark theme (default): Black background with orange/amber accents
- Light theme: Toggle via sidebar button, persisted to localStorage
- Custom animations: float, slide-up, scale-in, pulse-glow
- Noise texture overlay for visual depth
- Gradient backgrounds on tool cards