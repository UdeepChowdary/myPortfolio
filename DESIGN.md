---
name: "Udeep Chowdary AI Engineering Portfolio"
description: "Computational AI Research Console: Precision slate surfaces, electric neural signals, and evidence-dense proof"
colors:
  neutral-bg: "#070810"
  neutral-surface: "#0d1122"
  neutral-surface-hover: "#161c36"
  text-primary: "#f8fafc"
  text-secondary: "#cbd5e1"
  text-muted: "#64748b"
  primary: "#00f0ff"
  primary-dim: "rgba(0, 240, 255, 0.15)"
  secondary: "#9d4edd"
  accent-emerald: "#10b981"
  accent-amber: "#f59e0b"
typography:
  display:
    fontFamily: "Bricolage Grotesque, -apple-system, sans-serif"
    fontSize: "clamp(2.8rem, 5.2vw, 4.4rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 3.8vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, -apple-system, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Bricolage Grotesque, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, Fira Code, monospace"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "18px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#030712"
    rounded: "{rounded.full}"
    padding: "12px 26px"
  button-outline:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "12px 26px"
---

# Design System

## Overview
The design system embodies the **Computational AI Research Console**: a rigorous, tactile, and evidence-dense visual world tailored for AI and Machine Learning recruiters. It completely discards generic templates, floating gradient orbs, and emoji clutter in favor of high-contrast editorial typography (Bricolage Grotesque), precise monospace telemetry (JetBrains Mono), and deep obsidian slate surfaces accented by electric cyan and deep violet signals.

## Colors
- **Ground Obsidian (`#070810`)**: The core dark backdrop providing an infinite computational depth with zero eye-strain.
- **Neural Slate Surface (`#0d1122`)**: Frosted glass panels layered with subtle 1px border illumination.
- **Electric Cyan (`#00f0ff`)**: Primary telemetry signal representing active models, verified links, and key CTA highlights.
- **Deep Violet (`#9d4edd`)**: Secondary harmonic signal for deep learning, NLP, and multimodal system indicators.
- **Emerald Pulse (`#10b981`)**: Used exclusively for verified states, live inference passes, and recruiter availability.
- **Amber Gold (`#f59e0b`)**: Reserved for national competition victories (AIFT 3rd Place) and hackathon awards.

## Typography
- **Display & Headings**: `Bricolage Grotesque` — commanding, technical, human, and distinct with optical sizing from 12..96 and weights from 400 to 800.
- **Code, Data & Telemetry**: `JetBrains Mono` — authentic developer and machine learning monospace with tabular numerals (`tabular-nums`) enabled across all metric readouts.
- **Rule of Weight**: Emphasis is conveyed strictly through weight and scale, refusing decorative gradient text on headings.

## Layout
- Maximum container width capped at 1240px with 1.75rem safety margin.
- 12-column responsive grid transitioning into symmetrical 2x2 and bento matrix patterns.
- Responsive breakpoints: Mobile (<580px), Tablet (<768px), Desktop (<968px), and Ultra-wide (>1240px).

## Elevation & Depth
- Offset glass shadows: `0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)`.
- Interactive hover transitions with spring physics (`framer-motion`) and subtle 3D cursor tilt on project and telemetry cards.

## Shapes
- Micro badges & buttons: Fully rounded (`9999px`) pill geometry for tactile feel.
- Glass cards: `18px` border radius with smooth inner padding.
- Inner elements (code lines, tags): `6px` to `12px` rounded geometry.

## Components
- **AI Command Center (Hero)**: Features dual-column layout with status telemetry matrix and interactive 3D code console supporting live simulated model execution.
- **Flagship Project Bento**: Spotlights Derm-AI with national award ribbon, validation metrics (98.2%), and technical architecture modal.
- **Skills Matrix**: Prioritizes AI & Data Systems first, supported by interactive filter pills and brand-accurate SVG icons.
- **Journey Timeline**: Chronological path line with glowing nodes, milestone dates, and academic/competition highlights.
- **Interactive Terminal**: Virtual CLI environment (`UdeepOS`) with virtual filesystem, system telemetry, and keyboard accessibility.

## Do's and Don'ts
- **DO** let headings speak with solid contrast, weight, and size.
- **DO** use real SVG icons drawn in a consistent stroke weight; never use Unicode emoji as system icons.
- **DO** provide verified links (Coursera certification IDs, GitHub repositories, live demo deployments, and downloadable resume).
- **DON'T** use gradient text on headings or metrics.
- **DON'T** use kickers/eyebrow labels above headings.
- **DON'T** use monospace as a decorative costume for non-code elements.
