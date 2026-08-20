# DAY ZERO (HDZ) — SAFE RESTORE POINT (SAFE_CHECKPOINT_V1)

**Checkpoint Name**: `SAFE_CHECKPOINT_V1` (Updated - Synchronized Chapter Navigation & Blueprint Edition)  
**Git Branch**: `main`  
**Date**: 2026-08-15  

---

## Overview of Implemented Features & Architecture

This checkpoint saves the complete, production-ready implementation of **DAY ZERO — Interactive Architectural Blueprint & Gamified Workstation Platform**.

1. **Opening Cinematic Intro Sequence (`IntroSequence.jsx`)**:
   - Marvel Studio-style cinematic logo stroke animation (horizontal line drawing -> 322° circular arc sweep -> tangent arrowhead reveal).
   - Integrated Web Audio API sound engine (55Hz & 82.5Hz sub-bass drones with dynamic lowpass filter sweeps and sub-impact hits).
   - Full accessibility: ESC/Space/Enter key press or click anywhere skips intro smoothly into the homepage.

2. **Interactive SVG Blueprint Stream (`BlueprintCanvas.jsx` & `CinematicHomepage.jsx`)**:
   - Continuous 5200px SVG blueprint path dynamically drawing as the user scrolls.
   - Multi-layered line stream glow effect with real-time coordinate tracking head showing active `X` and `Y` values.
   - Binary search algorithm mapping scroll Y coordinates to exact path lengths for 60FPS synchronization.
   - Camera tracking lerp loop smoothing horizontal camera movement along the path.

3. **Illuminated Editorial Chapter Content & Start Anchors (`ChapterContent.jsx` & `chapters.js`)**:
   - High-contrast editorial typography with dynamic illumination states (`isLit`) as the drawing head reaches each section.
   - Dedicated structural start anchors (`chapter-XX-start`) and 1:1 journey-line animation synchronization.
   - 7 Core Chapters:
     - **01**: THE FIRST COMMIT (Start Y: 600px)
     - **02**: THE PROBLEM (Start Y: 1250px)
     - **03**: OUR BELIEF (Start Y: 1900px)
     - **04**: BUILD IN PUBLIC (Start Y: 2550px)
     - **05**: CURRENT MISSIONS (Start Y: 3200px)
     - **06**: FUTURE ECOSYSTEM (Start Y: 3850px)
     - **07**: MANIFESTO (Start Y: 4500px)
   - Bottom Call-to-Action: "YOUR DAY ZERO STARTS NOW".

4. **Sticky Header Navigation & Synchronized Chapter Jump (`Navigation.jsx`)**:
   - Animated vector brand mark logo.
   - Segmented chapter pill navigator (`01` to `07`) with dynamic Lenis smooth scroll targeting chapter `startY` entrances.

5. **Gamified Workstation & macOS Terminal Overlay (`ContactSection.jsx`)**:
   - 60:40 viewport split overlay triggered from footer or chapter buttons.
   - **Left Panel (60%)**: macOS Light Theme Terminal with authentic Git/Vite build output typing sequence and auto-scroll.
   - **Right Panel (40%)**: Editorial tab interface featuring `CONTACT` transmission form and `QUEST` Initiative Zero CTA.

6. **Architectural Grid & Technical Design Tokens (`BlueprintGrid.jsx` & `index.css`)**:
   - Fixed architectural blueprint grid overlay with 35mm film grain and subtle scanning light beam.

---

## How to Restore to This Checkpoint

### Method A: Using Git (Recommended)
```bash
# 1. Reset all modified files to the latest commit:
git reset --hard HEAD

# 2. Clean any untracked build artifacts if needed:
git clean -fd
```

---

### Method B: Copy-Paste Restoration

Below are the complete source code files for this working state. You can copy and paste them back into their respective files.

---

### File 1: `src/App.jsx`
```jsx
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import IntroSequence from './components/motion/IntroSequence';
import BlueprintGrid from './components/layout/BlueprintGrid';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ContactSection from './components/layout/ContactSection';
import CinematicHomepage from './components/blueprint/CinematicHomepage';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [showContact, setShowContact] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      delete window.lenis;
      lenis.destroy();
    };
  }, []);

  const handleReplayIntro = () => {
    setReplayKey((prev) => prev + 1);
    setShowIntro(true);
    setShowContact(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F3F4F6] selection:bg-white selection:text-black flex flex-col justify-between">
      {/* Background Architectural Blueprint Grid & Film Grain */}
      <BlueprintGrid />

      {/* Opening Cinematic Logo Stroke Intro Sequence */}
      {showIntro && (
        <IntroSequence
          key={replayKey}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* Fixed Sticky Header Navigation */}
      {!showIntro && <Navigation />}

      {/* Main Interactive Blueprint Documentary Homepage */}
      {!showIntro && (
        <main className="relative z-10 flex-1">
          <CinematicHomepage onOpenContact={() => setShowContact(true)} />
        </main>
      )}

      {/* Contact Workstation Overlay - Triggered from Footer or Homepage CTAs */}
      <AnimatePresence>
        {!showIntro && showContact && (
          <ContactSection onClose={() => setShowContact(false)} />
        )}
      </AnimatePresence>

      {/* Minimal Editorial Footer */}
      {!showIntro && (
        <Footer
          onReplayIntro={handleReplayIntro}
          onOpenContact={() => setShowContact(true)}
        />
      )}
    </div>
  );
}


```

---

### File 2: `src/components/blueprint/CinematicHomepage.jsx`
```jsx
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlueprintCanvas from './BlueprintCanvas';
import ChapterContent from './ChapterContent';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHomepage({ onOpenContact }) {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const [pathProgress, setPathProgress] = useState(0);
  const [currentPoint, setCurrentPoint] = useState({ x: 500, y: 120 });

  // Camera tracking state (smoothed via RAF lerp)
  const camState = useRef({ x: 0, targetX: 0 });

  // Scaled SVG blueprint path fitting medium 5200px height canvas
  const mainPathD = `
    M 500 120 
    L 640 120 
    A 80 80 0 0 1 720 200 
    L 720 380 
    L 500 520 
    L 500 750 
    L 450 920 
    C 400 1080 500 1250 450 1400 
    C 400 1520 600 1580 550 1680 
    C 500 1740 450 1880 480 2050 
    L 450 2280 
    L 500 2450 
    L 440 2580 
    L 490 2700 
    L 500 2920 
    L 450 3350 
    L 450 3680 
    L 450 4000 
    L 600 4280 
    L 450 4450 
    L 450 4650 
    C 400 4850 650 4950 500 5050
  `.replace(/\s+/g, ' ').trim();

  // Perfect Y-synchronization binary search algorithm
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create temporary SVG path element to compute getPointAtLength
    const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('d', mainPathD);
    tempSvg.appendChild(pathEl);
    document.body.appendChild(tempSvg);
    const totalLen = pathEl.getTotalLength();

    // Fast binary search to find exact point on path matching target Y coordinate
    const findPointByY = (targetY) => {
      let low = 0;
      let high = totalLen;
      let bestPt = pathEl.getPointAtLength(0);
      let bestDist = totalLen;

      for (let i = 0; i < 16; i++) {
        const mid = (low + high) / 2;
        const pt = pathEl.getPointAtLength(mid);
        if (pt.y < targetY) {
          low = mid;
        } else {
          high = mid;
        }
        const diff = Math.abs(pt.y - targetY);
        if (diff < bestDist) {
          bestDist = diff;
          bestPt = pt;
        }
      }
      const mid = (low + high) / 2;
      return { point: bestPt, progress: mid / totalLen };
    };

    const updatePointFromScroll = (scrollRatio) => {
      const clamped = Math.max(0, Math.min(1, scrollRatio));
      // Target Y ranges from 120 (Hero) to 5050 (CTA end)
      const targetY = 120 + clamped * 4930;
      const { point, progress } = findPointByY(targetY);

      setPathProgress(progress);
      setCurrentPoint({ x: point.x, y: point.y });

      // Smooth Camera Pan Target based on head X
      camState.current.targetX = (500 - point.x) * 0.14;
    };

    // GSAP ScrollTrigger for 60FPS sync
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        updatePointFromScroll(self.progress);
      },
    });

    // Native scroll handler for instant update tick
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll > 0) {
        const ratio = Math.max(0, Math.min(1, -rect.top / maxScroll));
        updatePointFromScroll(ratio);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Camera pan animation loop
    let animationFrameId;
    const animLoop = () => {
      const cs = camState.current;
      cs.x += (cs.targetX - cs.x) * 0.15;

      if (cameraRef.current) {
        cameraRef.current.style.transform = `translate3d(${cs.x.toFixed(2)}px, 0, 0)`;
      }
      animationFrameId = requestAnimationFrame(animLoop);
    };
    animLoop();

    return () => {
      st.kill();
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (tempSvg.parentNode) {
        document.body.removeChild(tempSvg);
      }
    };
  }, [mainPathD]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] text-[#F3F4F6] overflow-hidden select-none">
      {/* Camera Tracking Wrapper */}
      <div ref={cameraRef} className="relative w-full h-[5200px] transition-transform duration-75 ease-out">
        {/* SVG Blueprint Canvas */}
        <BlueprintCanvas
          pathProgress={pathProgress}
          currentPoint={currentPoint}
          mainPathD={mainPathD}
        />

        {/* Editorial Text & Chapters Content */}
        <ChapterContent
          currentPoint={currentPoint}
          onOpenContact={onOpenContact}
        />
      </div>
    </div>
  );
}

```

---

### File 3: `src/components/blueprint/BlueprintCanvas.jsx`
```jsx
import React from 'react';

/**
 * BlueprintCanvas renders the continuous SVG path with medium chapter spacing (5200px canvas height),
 * multi-layered line stream flow, and surroundings illumination ("Light Up") as the line travels down.
 */
export default function BlueprintCanvas({ pathProgress, currentPoint, mainPathD }) {
  const headX = currentPoint?.x ?? 500;
  const headY = currentPoint?.y ?? 120;

  /**
   * Returns opacity and illumination style based on distance from drawing head Y
   */
  const getLitState = (elementY, offset = 120) => {
    const dist = headY - elementY;
    if (dist < -offset) {
      return { opacity: 0.15, isLit: false, style: { opacity: 0.15, transition: 'all 0.3s ease-out' } };
    }
    if (dist < 0) {
      const progress = (dist + offset) / offset;
      const opacity = 0.15 + progress * 0.85;
      return {
        opacity,
        isLit: false,
        style: {
          opacity,
          transition: 'all 0.3s ease-out',
        },
      };
    }
    return {
      opacity: 1,
      isLit: true,
      style: {
        opacity: 1,
        filter: 'drop-shadow(0px 0px 9px rgba(255, 255, 255, 0.75))',
        transition: 'all 0.4s ease-out',
      },
    };
  };

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-visible z-0"
      viewBox="0 0 1000 5200"
      preserveAspectRatio="xMidYMin meet"
    >
      <defs>
        {/* Core head point glow filter */}
        <filter id="point-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur1" />
          <feGaussianBlur stdDeviation="11" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Stream flow line glow filter */}
        <filter id="line-stream-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Ambient deep line aura */}
        <filter id="ambient-aura" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="12" result="blur" />
        </filter>
      </defs>

      {/* ========================================================================= */}
      {/* BACKGROUND BLUEPRINT GUIDES & AXES                                        */}
      {/* ========================================================================= */}
      <line x1="500" y1="0" x2="500" y2="5200" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="4 8" />
      <line x1="250" y1="0" x2="250" y2="5200" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
      <line x1="750" y1="0" x2="750" y2="5200" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />

      {/* Chapter Baseline Guides (Medium Spacing: Every 650px) */}
      {[750, 1400, 2050, 2700, 3350, 4000, 4650].map((yVal, idx) => {
        const lit = getLitState(yVal, 110);
        return (
          <g key={idx} style={lit.style}>
            <line x1="50" y1={yVal} x2="950" y2={yVal} stroke={lit.isLit ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)'} strokeWidth="1" strokeDasharray="2 6" />
            <text x="60" y={yVal - 8} fill={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.25)'} fontSize="9" fontFamily="JetBrains Mono, monospace">
              DATUM BASELINE H-{yVal} // SEC 0{idx + 1}
            </text>
          </g>
        );
      })}

      {/* ========================================================================= */}
      {/* MAIN DRAFTING PATH (DYNAMIC STREAM FLOW STROKE)                           */}
      {/* ========================================================================= */}

      {/* Background Dim Guide Path */}
      <path
        d={mainPathD}
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="1.5"
        strokeDasharray="2 4"
      />

      {/* Layer 1: Ambient Wide Deep Aura */}
      <path
        d={mainPathD}
        fill="none"
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - pathProgress}
        filter="url(#ambient-aura)"
      />

      {/* Layer 2: Glowing Stream Flow Line */}
      <path
        d={mainPathD}
        fill="none"
        stroke="#ffffff"
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - pathProgress}
        filter="url(#line-stream-glow)"
        opacity="0.8"
      />

      {/* Layer 3: Core Crisp White Path */}
      <path
        id="main-blueprint-path"
        d={mainPathD}
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - pathProgress}
      />

      {/* ========================================================================= */}
      {/* HERO & CHAPTER 01 GRAPHICS (Y = 120 to 750)                               */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(120);
        return (
          <g className="chapter-01-graphics" style={lit.style}>
            <g transform="translate(500, 120)">
              <circle r="6" fill="#ffffff" filter="url(#point-glow)" />
              <circle r="15" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />
              <line x1="20" y1="0" x2="65" y2="0" stroke="#ffffff" strokeWidth="1" />
              <text x="72" y="-4" fill="#ffffff" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                POINT 0001
              </text>
              <text x="72" y="12" fill="rgba(255,255,255,0.8)" fontSize="9" fontFamily="JetBrains Mono, monospace">
                The first idea.
              </text>
            </g>

            {/* Turn Arc & Radius Measurement R 120 */}
            <g transform="translate(640, 200)">
              <circle r="50" fill="none" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="0" x2="35" y2="-35" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'} strokeWidth="1" />
              <text x="40" y="-38" fill={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'} fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                R 120
              </text>
            </g>
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* CHAPTER 02 GRAPHICS (The Problem - Y = 1400)                               */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(1400);
        return (
          <g className="chapter-02-graphics" style={lit.style}>
            <g transform="translate(450, 1280)">
              <circle r="60" fill="none" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1" strokeDasharray="4 4" />
              <circle r="85" fill="none" stroke={lit.isLit ? 'rgba(255,255,255,0.6)' : 'rgba(255, 255, 255, 0.08)'} strokeWidth="1" />
            </g>

            <path d="M 450 1280 C 350 1230 300 1320 250 1300" fill="none" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'} strokeWidth="1" strokeDasharray="3 3" />
            <text x="170" y="1295" fill={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'} fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              REJECTED IDEA
            </text>

            <g transform="translate(100, 1200)">
              <rect width="110" height="65" fill="rgba(11, 11, 11, 0.9)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'} strokeWidth="1.5" />
              <text x="12" y="22" fill="#ffffff" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                DRAFT
              </text>
              <text x="12" y="36" fill={lit.isLit ? 'rgba(255,255,255,0.9)' : 'rgba(255, 255, 255, 0.4)'} fontSize="9" fontFamily="JetBrains Mono, monospace">
                v0.1
              </text>
              <text x="12" y="50" fill={lit.isLit ? 'rgba(255,255,255,0.7)' : 'rgba(255, 255, 255, 0.3)'} fontSize="8" fontFamily="JetBrains Mono, monospace">
                DATE: DAY ZERO
              </text>
            </g>

            <g transform="translate(100, 1450)">
              <rect width="155" height="65" fill="rgba(11, 11, 11, 0.9)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'} strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="12" y="22" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                NOTE
              </text>
              <text x="12" y="40" fill={lit.isLit ? 'rgba(255,255,255,0.9)' : 'rgba(255, 255, 255, 0.4)'} fontSize="8.5" fontFamily="Inter, sans-serif">
                Uncertainty is part of process.
              </text>
            </g>

            <g transform="translate(240, 1550)">
              <text x="0" y="0" fill={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'} fontSize="14" fontFamily="serif" fontStyle="italic" fontWeight="600">
                This is the hard part.
              </text>
            </g>
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* CHAPTER 03 GRAPHICS (Our Belief - Y = 2050)                                */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(2050);
        return (
          <g className="chapter-03-graphics" style={lit.style}>
            {[
              { x: 450, y: 1880, label: "COMMITMENT", rev: "REV 01" },
              { x: 500, y: 1980, label: "DISCIPLINE", rev: "REV 02" },
              { x: 440, y: 2080, label: "LEARNING", rev: "REV 03" },
              { x: 490, y: 2180, label: "ITERATION", rev: "REV 04" },
              { x: 500, y: 2280, label: "GROWTH", rev: "REV 05" }
            ].map((pt, idx) => {
              const ptLit = getLitState(pt.y, 70);
              return (
                <g key={idx} transform={`translate(${pt.x}, ${pt.y})`} style={ptLit.style}>
                  <circle r="4" fill="#ffffff" filter="url(#point-glow)" />
                  <circle r="13" fill="none" stroke={ptLit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'} strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="0" y1="0" x2="32" y2="-13" stroke={ptLit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'} strokeWidth="1" />
                  <text x="38" y="-15" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                    {pt.label}
                  </text>
                </g>
              );
            })}

            <circle cx="500" cy="2050" r="100" fill="none" stroke={lit.isLit ? 'rgba(255,255,255,0.3)' : 'rgba(255, 255, 255, 0.05)'} strokeWidth="1" />
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* CHAPTER 04 GRAPHICS (Build In Public - Y = 2700)                          */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(2700);
        return (
          <g className="chapter-04-graphics" style={lit.style}>
            <g transform="translate(450, 2700)">
              <circle r="20" fill="#050505" stroke="#ffffff" strokeWidth="2.5" filter="url(#point-glow)" />
              <circle r="28" fill="none" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'} strokeWidth="1" strokeDasharray="3 3" />
              <circle r="5" fill="#ffffff" />
            </g>

            {[
              { yEnd: 2580, label: "DOCUMENTATION" },
              { yEnd: 2620, label: "PROTOTYPES" },
              { yEnd: 2660, label: "EXPERIMENTS" },
              { yEnd: 2700, label: "FAILURES" },
              { yEnd: 2740, label: "LESSONS" },
              { yEnd: 2780, label: "ITERATIONS" },
              { yEnd: 2820, label: "GROWTH" }
            ].map((branch, idx) => (
              <g key={idx}>
                <line x1="470" y1="2700" x2="575" y2={branch.yEnd} stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.35)'} strokeWidth="1.2" />
                <circle cx="575" cy={branch.yEnd} r="3" fill="#ffffff" />
                <text x="585" y={branch.yEnd + 3} fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                  {branch.label}
                </text>
              </g>
            ))}

            {/* BUILD LOG Card */}
            <g transform="translate(60, 2600)">
              <rect width="105" height="150" fill="rgba(11, 11, 11, 0.95)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1.5" />
              <text x="10" y="18" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                BUILD LOG
              </text>
              {[
                "0001 Idea",
                "0002 Research",
                "0003 Prototype",
                "0004 Test",
                "0005 Iterate",
                "0006 Ship",
                "0007 Learn"
              ].map((item, idx) => (
                <text key={idx} x="10" y={33 + idx * 15} fill={lit.isLit ? 'rgba(255,255,255,0.9)' : 'rgba(255, 255, 255, 0.35)'} fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                  {item}
                </text>
              ))}
            </g>
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* CHAPTER 05 GRAPHICS (Current Missions - Y = 3350)                         */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(3350);
        return (
          <g className="chapter-05-graphics" style={lit.style}>
            <g transform="translate(415, 3315)">
              <rect width="70" height="70" fill="rgba(11, 11, 11, 0.95)" stroke="#ffffff" strokeWidth="2" filter="url(#point-glow)" />
              <line x1="0" y1="0" x2="70" y2="70" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="70" y1="0" x2="0" y2="70" stroke="#ffffff" strokeWidth="1.5" />
            </g>

            {[
              { x: 180, y: 3230 },
              { x: 180, y: 3380 },
              { x: 540, y: 3250 },
              { x: 550, y: 3400 }
            ].map((node, idx) => (
              <g key={idx} transform={`translate(${node.x}, ${node.y})`}>
                <rect width="30" height="30" fill="rgba(11, 11, 11, 0.95)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'} strokeWidth="1.5" />
                <line x1="0" y1="0" x2="30" y2="30" stroke="#ffffff" strokeWidth="1" />
                <line x1="30" y1="0" x2="0" y2="30" stroke="#ffffff" strokeWidth="1" />
              </g>
            ))}
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* CHAPTER 06 GRAPHICS (Future Ecosystem - Y = 4000)                         */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(4000);
        return (
          <g className="chapter-06-graphics" style={lit.style}>
            {[
              { x: 270, y: 3900 },
              { x: 340, y: 4000 },
              { x: 580, y: 3950 }
            ].map((sys, idx) => (
              <g key={idx} transform={`translate(${sys.x}, ${sys.y})`}>
                <rect width="28" height="28" fill="rgba(11, 11, 11, 0.95)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'} strokeWidth="1.5" />
                <line x1="0" y1="0" x2="28" y2="28" stroke="#ffffff" strokeWidth="1" />
                <line x1="28" y1="0" x2="0" y2="28" stroke="#ffffff" strokeWidth="1" />
              </g>
            ))}

            <g transform="translate(60, 3920)">
              <rect width="140" height="115" fill="rgba(11, 11, 11, 0.95)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.12)'} strokeWidth="1.5" />
              <text x="10" y="18" fill="#ffffff" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                FUTURE ECOSYSTEM
              </text>
              {[
                "Products",
                "Platform",
                "Community",
                "Knowledge Base",
                "Documentary Archive"
              ].map((item, idx) => (
                <text key={idx} x="10" y="34 + idx * 14" fill={lit.isLit ? 'rgba(255,255,255,0.9)' : 'rgba(255, 255, 255, 0.35)'} fontSize="8" fontFamily="Inter, sans-serif">
                  {item}
                </text>
              ))}
            </g>
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* CHAPTER 07 GRAPHICS (Manifesto - Y = 4650)                                */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(4650);
        return (
          <g className="chapter-07-graphics" style={lit.style}>
            <g transform="translate(450, 4650)">
              <circle r="65" fill="none" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1.5" strokeDasharray="3 3" />
              <circle r="110" fill="none" stroke={lit.isLit ? 'rgba(255,255,255,0.8)' : 'rgba(255, 255, 255, 0.1)'} strokeWidth="1" />
              <line x1="-160" y1="0" x2="160" y2="0" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
              <line x1="0" y1="-160" x2="0" y2="160" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
              <circle r="5" fill="#ffffff" filter="url(#point-glow)" />
            </g>

            <g transform="translate(570, 4630)">
              <rect width="130" height="34" fill="rgba(11, 11, 11, 0.95)" stroke="#ffffff" strokeWidth="1.5" />
              <text x="65" y="21" fill="#ffffff" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="700" letterSpacing="0.08em">
                THE JOURNEY NEVER ENDS
              </text>
            </g>

            <g transform="translate(60, 4580)">
              <rect width="140" height="145" fill="rgba(11, 11, 11, 0.95)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1.5" />
              <text x="10" y="20" fill="#ffffff" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                MANIFESTO
              </text>
              {[
                "Start before ready.",
                "Build in public.",
                "Be honest.",
                "Keep learning.",
                "Never stop.",
                "This is Day Zero."
              ].map((lineText, idx) => (
                <text key={idx} x="10" y="36 + idx * 15" fill={lit.isLit ? 'rgba(255,255,255,0.9)' : 'rgba(255, 255, 255, 0.4)'} fontSize="8" fontFamily="Inter, sans-serif">
                  {lineText}
                </text>
              ))}
            </g>

            <path
              d="M 450 4650 C 400 4850 650 4950 500 5050"
              fill="none"
              stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'}
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* ACTIVE GLOWING WHITE DRAWING HEAD & COORDINATE READOUT                    */}
      {/* ========================================================================= */}
      <g transform={`translate(${headX}, ${headY})`} className="z-30">
        <circle r="20" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" className="animate-ping opacity-80" />
        <circle r="10" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        <circle r="5" fill="#ffffff" filter="url(#point-glow)" />

        <g transform="translate(18, -18)">
          <rect width="84" height="28" fill="rgba(5, 5, 5, 0.95)" stroke="#ffffff" strokeWidth="1.5" rx="3" className="shadow-lg shadow-white/10" />
          <text x="8" y="12" fill="#ffffff" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            X: {headX.toFixed(1)}
          </text>
          <text x="8" y="22" fill="#ffffff" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            Y: {headY.toFixed(1)}
          </text>
        </g>
      </g>
    </svg>
  );
}

```

---

### File 4: `src/components/blueprint/ChapterContent.jsx`
```jsx
import React from 'react';
import { CHAPTERS_DATA } from '../../utils/chapters';

/**
 * ChapterContent renders editorial typography for Hero and Chapters 01 to 07,
 * positioned with comfortable medium spacing (5200px canvas height) and dynamic
 * scroll lighting transitions when the drawing head reaches each chapter.
 */
export default function ChapterContent({ currentPoint, onOpenContact }) {
  const headY = currentPoint?.y ?? 120;

  return (
    <div className="relative w-full h-[5200px] pointer-events-auto">
      {/* ========================================================================= */}
      {/* HERO STATEMENT (Top Left - Initial Viewport)                             */}
      {/* ========================================================================= */}
      <section id="chapter-hero" className="absolute top-[100px] left-[6%] sm:left-[8%] max-w-sm sm:max-w-md space-y-3">
        <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
          EVERY JOURNEY BEGINS SOMEWHERE.
        </h1>
        <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light">
          DAY ZERO is a movement that documents the beginning of real builders, creators and dreamers. This is where it all starts.
        </p>
        <div className="pt-2 flex items-center gap-3 text-white/60 text-[10px] sm:text-xs font-mono tracking-widest uppercase">
          <span className="font-semibold text-white">SCROLL TO BEGIN</span>
          <span className="w-12 h-[1px] bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER SECTIONS 01 TO 07 (Right Side with Dynamic Illumination)         */}
      {/* ========================================================================= */}
      {CHAPTERS_DATA.map((ch) => {
        const isLit = headY >= ch.startY - 10;
        return (
          <React.Fragment key={ch.id}>
            {/* Dedicated structural start anchor at chapter entrance */}
            <div
              id={`chapter-${ch.id}-start`}
              data-chapter-start={ch.id}
              className="absolute left-0 right-0 pointer-events-none"
              style={{ top: `${ch.startY}px` }}
            />
            <section
              id={`chapter-${ch.id}`}
              style={{ top: ch.topCss }}
              className={`absolute right-[6%] sm:right-[8%] max-w-sm sm:max-w-md space-y-2.5 -translate-y-1/2 transition-all duration-400 ${
                isLit ? 'opacity-100 scale-100' : 'opacity-30 scale-[0.98]'
              }`}
            >
              {/* Chapter Number Badge */}
              <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
                <span
                  className={`px-2 py-0.5 rounded text-xs sm:text-sm font-semibold transition-all ${
                    isLit ? 'bg-white text-black shadow-lg shadow-white/20' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {ch.id}
                </span>
                <span className={`text-[10px] tracking-widest uppercase ${isLit ? 'text-white/80' : 'text-white/30'}`}>
                  CHAPTER
                </span>
              </div>

              {/* Title */}
              <h2
                className={`font-display text-xl sm:text-3xl font-semibold tracking-tight leading-snug transition-all ${
                  isLit ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]' : 'text-white/40'
                }`}
              >
                {ch.title}
              </h2>

              {/* Subtitle */}
              <p className={`text-xs sm:text-sm leading-relaxed font-light transition-all ${isLit ? 'text-white/80' : 'text-white/30'}`}>
                {ch.subtitle}
              </p>

              {/* View Chapter Action */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={onOpenContact}
                  className={`inline-flex items-center gap-2 text-xs font-mono tracking-wider group cursor-pointer transition-all ${
                    isLit ? 'text-white hover:text-white/80 font-medium' : 'text-white/30'
                  }`}
                >
                  <span>VIEW CHAPTER</span>
                  <span className={`h-[1px] transition-all duration-300 ${isLit ? 'w-10 bg-white' : 'w-6 bg-white/20'}`} />
                </button>
              </div>
            </section>
          </React.Fragment>
        );
      })}

      {/* ========================================================================= */}
      {/* BOTTOM CTA SECTION: YOUR DAY ZERO STARTS NOW.                             */}
      {/* ========================================================================= */}
      {(() => {
        const ctaLit = headY >= 4950;
        return (
          <section
            className={`absolute top-[5020px] left-[6%] sm:left-[8%] right-[6%] sm:right-[8%] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-16 border-t border-white/15 pt-10 transition-all duration-400 ${
              ctaLit ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div className="space-y-2">
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
                YOUR DAY ZERO<br />STARTS NOW.
              </h2>
            </div>

            <div>
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-4 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-white/90 transition-all duration-300 shadow-xl shadow-white/10 cursor-pointer group"
              >
                <span className="tracking-widest uppercase">START BUILDING</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </section>
        );
      })()}
    </div>
  );
}

```

---

### File 5: `src/components/layout/Navigation.jsx`
```jsx
import React, { useState, useEffect } from 'react';
import { CHAPTERS_DATA, getScrollYForCanvasY, getCanvasYForScrollY } from '../../utils/chapters';

const CHAPTERS = CHAPTERS_DATA.map((ch) => ch.id);

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeChapter, setActiveChapter] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      // Track active chapter based on canvas Y coordinate
      const canvasY = getCanvasYForScrollY(scrollY);
      if (canvasY < CHAPTERS_DATA[0].startY - 30) {
        setActiveChapter(null); // Hero section
      } else {
        let current = '01';
        CHAPTERS_DATA.forEach((ch) => {
          if (canvasY >= ch.startY - 30) {
            current = ch.id;
          }
        });
        setActiveChapter(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (chNum) => {
    const ch = CHAPTERS_DATA.find((item) => item.id === chNum);
    if (!ch) return;

    const targetScrollY = getScrollYForCanvasY(ch.startY);

    if (window.lenis) {
      window.lenis.scrollTo(targetScrollY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/10 py-3 sm:py-4'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-2">
        {/* DAY ZERO Logo */}
        <div className="flex items-center gap-2 sm:gap-3 group text-left shrink-0 select-none">
          <div className="w-7 h-7 sm:w-8 sm:h-8 relative flex items-center justify-center">
            <svg viewBox="0 0 600 600" className="w-7 h-7 sm:w-8 sm:h-8 overflow-visible">
              <g>
                <path d="M 85 300 L 515 300" fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" />
                <path d="M 470 300 A 170 170 0 1 0 433.96 404.66" fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
                <g transform="translate(437.65, 399.93) rotate(-52.3)">
                  <path d="M 14 0 L -8 -9 L -2 0 L -8 9 Z" fill="#ffffff" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                </g>
              </g>
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-white uppercase whitespace-nowrap">
              DAY ZERO
            </span>
          </div>
        </div>

        {/* Film Chapter Selector (01 to 07) */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-[#0B0B0B]/90 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 text-xs font-mono">
          <span className="text-white/30 text-[10px] tracking-widest uppercase hidden md:inline px-1">
            CHAPTER:
          </span>
          {CHAPTERS.map((num) => {
            const isActive = num === activeChapter;
            return (
              <button
                key={num}
                type="button"
                onClick={() => scrollToChapter(num)}
                className={`px-1.5 sm:px-2 py-0.5 rounded transition-all cursor-pointer text-[10px] sm:text-[11px] font-mono ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
                title={`Navigate to Chapter ${num}`}
              >
                {num}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

```

---

### File 6: `src/components/layout/ContactSection.jsx`
```jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Authentic developer setup & command sequence simulating building DAY ZERO
const terminalSequence = [
  { type: 'command', text: 'git init' },
  { type: 'output', text: 'Initialized empty Git repository in /Users/dayzero/workspace/hdz/.git/' },
  { type: 'command', text: 'git branch -M main' },
  { type: 'command', text: 'git add .' },
  { type: 'command', text: 'git commit -m "Initialize DAY ZERO"' },
  {
    type: 'output',
    text: '[main (root-commit) 8f3a1d9] Initialize DAY ZERO\n 12 files changed, 480 insertions(+)\n create mode 100644 package.json\n create mode 100644 src/App.jsx',
  },
  { type: 'command', text: 'git remote add origin git@github.com:dayzero/hdz.git' },
  { type: 'command', text: 'git push -u origin main' },
  {
    type: 'output',
    text: "Enumerating objects: 12, done.\nCounting objects: 100% (12/12), done.\nWriting objects: 100% (12/12), 16.2 KiB | 3.24 MiB/s, done.\nTo github.com:dayzero/hdz.git\n * [new branch]      main -> main\nBranch 'main' set up to track remote branch 'main'.",
  },
  { type: 'command', text: 'npm create vite@latest' },
  {
    type: 'output',
    text: 'Creating project in /Users/dayzero/workspace/hdz...\nDone. Now run:\n  cd day-zero && npm install && npm run dev',
  },
  { type: 'command', text: 'cd day-zero' },
  { type: 'command', text: 'npm install' },
  {
    type: 'output',
    text: 'added 42 packages in 620ms\nfound 0 vulnerabilities',
  },
  { type: 'command', text: 'npm run dev' },
  {
    type: 'output',
    text: '  VITE v8.2.0  ready in 140 ms\n  ➜  Local:   http://localhost:5173/\n  ➜  press h + enter to show help',
  },
  { type: 'command', text: 'git status' },
  {
    type: 'output',
    text: "On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges to be committed:\n  modified:   src/components/layout/ContactSection.jsx",
  },
  { type: 'command', text: 'git add .' },
  { type: 'command', text: 'git commit -m "Build Contact Experience"' },
  {
    type: 'output',
    text: '[main e4f5g6h] Build Contact Experience\n 2 files changed, 220 insertions(+)',
  },
  { type: 'command', text: 'git push' },
  {
    type: 'output',
    text: 'Everything up-to-date.\n# Workstation online. Connection established.',
  },
];

const GOOGLE_FORM_URL = 'https://forms.google.com';

export default function ContactSection({ onClose }) {
  const [activeTab, setActiveTab] = useState('CONTACT'); // 'CONTACT' | 'QUEST'
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isInView, setIsInView] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const sectionRef = useRef(null);
  const terminalBodyRef = useRef(null);

  // Reset and restart animation when section enters viewport or is revisited
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Restart terminal sequence upon re-entering viewport
          setTerminalHistory([]);
          setCurrentTypingText('');
          setCurrentStepIndex(0);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Keyboard accessibility: ESC key listener if closed as modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Terminal Typing Logic - Natural speed, realistic delays, auto restart loop
  useEffect(() => {
    if (!isInView) return;

    if (currentStepIndex >= terminalSequence.length) {
      // Pause at end of sequence before seamlessly restarting loop
      const loopTimeout = setTimeout(() => {
        setTerminalHistory([]);
        setCurrentTypingText('');
        setCurrentStepIndex(0);
      }, 4000);
      return () => clearTimeout(loopTimeout);
    }

    const currentItem = terminalSequence[currentStepIndex];

    if (currentItem.type === 'output') {
      const outputTimeout = setTimeout(() => {
        setTerminalHistory((prev) => [...prev, currentItem]);
        setCurrentStepIndex((prev) => prev + 1);
      }, 280);
      return () => clearTimeout(outputTimeout);
    }

    if (currentItem.type === 'command') {
      if (currentTypingText.length < currentItem.text.length) {
        // Natural human-like variable typing delay (20-45ms)
        const randomTypingDelay = Math.floor(Math.random() * 25) + 20;
        const typingTimeout = setTimeout(() => {
          setCurrentTypingText(
            currentItem.text.slice(0, currentTypingText.length + 1)
          );
        }, randomTypingDelay);
        return () => clearTimeout(typingTimeout);
      } else {
        // Pause briefly after pressing Enter before executing next line
        const finishTimeout = setTimeout(() => {
          setTerminalHistory((prev) => [
            ...prev,
            { type: 'command', text: currentItem.text },
          ]);
          setCurrentTypingText('');
          setCurrentStepIndex((prev) => prev + 1);
        }, 220);
        return () => clearTimeout(finishTimeout);
      }
    }
  }, [currentStepIndex, currentTypingText, isInView]);

  // Auto-scroll terminal container whenever terminal output changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory, currentTypingText]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <motion.div
      ref={sectionRef}
      id="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl overflow-y-auto flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none"
    >
      {/* Top Header Status Bar */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between border-b border-white/10 pb-4 mb-6 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-white/60 uppercase">
            WORKSTATION-ENGINE v2.4
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
          <span className="hidden sm:inline"></span>
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-2 border border-white/20 hover:border-white/50 px-3 py-1 rounded-full transition-all cursor-pointer bg-white/5"
            >
              <span className="text-[10px] text-white/40">ESC</span>
              <span className="tracking-wider uppercase font-semibold"></span>
            </button>
          )}
        </div>
      </div>

      {/* Main Split Layout Container: 60% Left (Terminal, desktop only) / 40% Right (Editorial Form/Quest) */}
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10 my-auto z-10">

        {/* ================= LEFT PANEL (60%): macOS Light Theme Terminal (Desktop Only) ================= */}
        <div className="hidden lg:flex w-full lg:w-[60%] flex-col justify-center">
          <div className="bg-[#FFFFFF] rounded-xl border border-black/15 shadow-2xl shadow-black/90 flex flex-col overflow-hidden text-left font-mono transition-all">

            {/* macOS Light Terminal Title Bar */}
            <div className="bg-[#EAEAEA] border-b border-black/10 px-4 py-2.5 flex items-center justify-between shrink-0 select-none">
              {/* macOS Traffic Light Buttons */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block shadow-xs" />
              </div>

              {/* Terminal Title */}
              <div className="text-[11px] font-sans font-medium text-black/60 tracking-wide">
                zsh — dayzero@macbook: ~/workspace/hdz — 80×24
              </div>

              <div className="w-12" />
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalBodyRef}
              className="p-4 sm:p-6 overflow-y-auto text-[11px] sm:text-xs leading-relaxed text-[#24292E] font-mono space-y-2 h-[340px] sm:h-[400px] lg:h-[440px] scroll-smooth bg-white"
            >
              {/* Terminal Welcome Header */}
              <div className="text-black/40 text-[10px] sm:text-[11px] pb-2 border-b border-black/10">
                DAY ZERO GitHub Terminal v2.4.0 [main]
                <br />
                Executing live project initialization &amp; commit sequence...
              </div>

              {/* Executed History Commands & Output Lines */}
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="whitespace-pre-wrap break-words">
                  {item.type === 'command' ? (
                    <div className="flex items-center gap-2 text-[#005CC5] font-medium">
                      <span className="text-black/40 select-none">dayzero@macbook hdz %</span>
                      <span className="text-[#24292E] font-semibold">{item.text}</span>
                    </div>
                  ) : (
                    <div className="text-[#57606A] font-mono text-[10px] sm:text-[11px] pl-2 border-l-2 border-black/10">
                      {item.text}
                    </div>
                  )}
                </div>
              ))}

              {/* Active Character-by-Character Typing Line */}
              {currentStepIndex < terminalSequence.length &&
                terminalSequence[currentStepIndex].type === 'command' && (
                  <div className="flex items-center gap-2 text-[#005CC5] font-medium">
                    <span className="text-black/40 select-none">dayzero@macbook hdz %</span>
                    <span className="text-[#24292E] font-semibold">{currentTypingText}</span>
                    <span className="w-2 h-4 bg-[#24292E] inline-block animate-pulse ml-0.5" />
                  </div>
                )}

              {/* Active Standby Cursor */}
              {currentStepIndex >= terminalSequence.length && (
                <div className="flex items-center gap-2 text-[#005CC5] font-medium pt-1">
                  <span className="text-black/40 select-none">dayzero@macbook hdz %</span>
                  <span className="w-2 h-4 bg-[#24292E] inline-block animate-pulse ml-0.5" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL (40%): Editorial Interface (QUEST | CONTACT) ================= */}
        <div className="w-full lg:w-[40%] max-w-xl lg:max-w-none mx-auto flex flex-col justify-center">
          <div className="bg-[#0B0B0D] border border-white/10 p-6 sm:p-8 rounded-xl flex flex-col justify-between min-h-[440px]">
            <div>
              {/* Segmented Navigation Header */}
              <div className="flex items-center gap-8 border-b border-white/15 pb-3 mb-6 relative">
                <button
                  type="button"
                  onClick={() => setActiveTab('CONTACT')}
                  className={`text-xs font-mono tracking-[0.2em] uppercase transition-colors duration-200 pb-1 relative cursor-pointer ${activeTab === 'CONTACT'
                    ? 'text-white font-bold'
                    : 'text-white/40 hover:text-white/80 font-normal'
                    }`}
                >
                  CONTACT
                  {activeTab === 'CONTACT' && (
                    <motion.div
                      layoutId="editorialTabUnderline"
                      className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-white"
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('QUEST')}
                  className={`text-xs font-mono tracking-[0.2em] uppercase transition-colors duration-200 pb-1 relative cursor-pointer ${activeTab === 'QUEST'
                    ? 'text-white font-bold'
                    : 'text-white/40 hover:text-white/80 font-normal'
                    }`}
                >
                  QUEST
                  {activeTab === 'QUEST' && (
                    <motion.div
                      layoutId="editorialTabUnderline"
                      className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-white"
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              </div>

              {/* Horizontal Sliding Tab Content */}
              <div className="relative overflow-hidden min-h-[320px]">
                <AnimatePresence mode="wait" initial={false}>
                  {activeTab === 'CONTACT' ? (
                    <motion.div
                      key="CONTACT"
                      initial={{ x: activeTab === 'CONTACT' ? -30 : 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-4"
                    >
                      {submitted ? (
                        <div className="py-12 px-6 text-center border border-white/20 bg-white/5 space-y-4 rounded-lg">
                          <div className="text-xs font-mono text-white/50 tracking-widest uppercase">
                            STATUS: 200 OK
                          </div>
                          <h3 className="text-sm font-mono font-semibold text-white tracking-wide">
                            TRANSMISSION RECEIVED
                          </h3>
                          <p className="text-xs font-mono text-white/60 max-w-xs mx-auto leading-relaxed">
                            Thank you for reaching out. Our engineering team will review your inquiry shortly.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setSubmitted(false);
                              setFormData({ name: '', email: '', subject: '', message: '' });
                            }}
                            className="mt-4 text-[10px] font-mono tracking-widest uppercase text-white/50 hover:text-white underline cursor-pointer"
                          >
                            Send another transmission
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleFormSubmit} className="space-y-3.5">
                          {/* Name Field */}
                          <div>
                            <label
                              htmlFor="contact-name"
                              className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5"
                            >
                              [01] FULL NAME *
                            </label>
                            <input
                              id="contact-name"
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Alex Rivera"
                              className="w-full bg-[#050505] border border-white/15 focus:border-white focus:ring-1 focus:ring-white/20 text-white placeholder:text-white/20 px-3.5 py-2.5 text-xs font-mono outline-none transition-colors rounded-none"
                            />
                          </div>

                          {/* Email Field */}
                          <div>
                            <label
                              htmlFor="contact-email"
                              className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5"
                            >
                              [02] EMAIL ADDRESS *
                            </label>
                            <input
                              id="contact-email"
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="alex@workstation.dev"
                              className="w-full bg-[#050505] border border-white/15 focus:border-white focus:ring-1 focus:ring-white/20 text-white placeholder:text-white/20 px-3.5 py-2.5 text-xs font-mono outline-none transition-colors rounded-none"
                            />
                          </div>

                          {/* Subject Field */}
                          <div>
                            <label
                              htmlFor="contact-subject"
                              className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5"
                            >
                              [03] TRANSMISSION SUBJECT
                            </label>
                            <input
                              id="contact-subject"
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              placeholder="Collaboration Inquiry"
                              className="w-full bg-[#050505] border border-white/15 focus:border-white focus:ring-1 focus:ring-white/20 text-white placeholder:text-white/20 px-3.5 py-2.5 text-xs font-mono outline-none transition-colors rounded-none"
                            />
                          </div>

                          {/* Message Field */}
                          <div>
                            <label
                              htmlFor="contact-message"
                              className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5"
                            >
                              [04] INTENT &amp; MESSAGE *
                            </label>
                            <textarea
                              id="contact-message"
                              name="message"
                              required
                              rows={3}
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Describe your inquiry..."
                              className="w-full bg-[#050505] border border-white/15 focus:border-white focus:ring-1 focus:ring-white/20 text-white placeholder:text-white/20 px-3.5 py-2.5 text-xs font-mono outline-none transition-colors resize-none rounded-none"
                            />
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-white text-black font-mono font-bold text-[11px] tracking-widest uppercase py-3 px-5 border border-white hover:bg-white/90 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 mt-1"
                          >
                            {submitting ? 'EXECUTING TRANSMISSION...' : 'EXECUTE TRANSMISSION →'}
                          </button>
                        </form>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="QUEST"
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 py-2 flex flex-col justify-between h-full"
                    >
                      <div className="space-y-4">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-white/40 uppercase block">
                          // INITIATIVE ZERO
                        </span>
                        <h3 className="font-display text-xl font-bold text-white tracking-tight uppercase">
                          THE DAY ZERO QUEST
                        </h3>
                        <p className="text-xs font-mono text-white/70 leading-relaxed">
                          An intentional engineering challenge for founders, builders, and visionaries.
                        </p>
                        <p className="text-xs font-mono text-white/50 leading-relaxed">
                          Answer a few concise questions about your architectural vision to join our inner circle and collaborate from Day Zero.
                        </p>
                      </div>

                      {/* Quest CTA Button */}
                      <div className="pt-4 border-t border-white/10">
                        <a
                          href={GOOGLE_FORM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-between w-full bg-white text-black font-mono font-bold text-[11px] tracking-widest uppercase py-3.5 px-5 border border-white hover:bg-white/90 active:scale-[0.99] transition-all cursor-pointer"
                        >
                          <span>BEGIN QUEST</span>
                          <span className="text-sm">↗</span>
                        </a>
                        <span className="text-[9px] font-mono text-white/30 block mt-2 text-center">
                          Opens external form in a new tab
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/30">
              <span>SYSTEM: ONLINE</span>
              <span>LATENCY: 12ms</span>
              <span>ENCRYPTED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Bottom Footer note */}
      <div className="max-w-7xl w-full mx-auto text-center pt-4 border-t border-white/10 text-[10px] font-mono text-white/30 shrink-0 z-10">
        © {new Date().getFullYear()} DAY ZERO — WORKSTATION INTERFACE
      </div>
    </motion.div>
  );
}

```

---

### File 7: `src/components/layout/Footer.jsx`
```jsx
import React from 'react';

export default function Footer({ onReplayIntro, onOpenContact }) {
  return (
    <footer className="relative bg-[#050505] border-t border-white/10 py-8 sm:py-12 px-4 sm:px-6 md:px-8 text-xs font-mono text-white/50 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
        {/* Left: Brand & Motto */}
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-display text-xs sm:text-sm font-semibold tracking-[0.2em] text-white uppercase">
              DAY ZERO
            </span>
            <span className="text-[10px] text-white/30 border-l border-white/15 pl-2.5 sm:pl-3 tracking-widest uppercase">
              THE FIRST COMMIT
            </span>
          </div>
          <p className="text-white/40 text-[10px] sm:text-[11px] font-light">
            Build in Public.
          </p>
        </div>

        {/* Right: Minimal Links & Copyright */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] text-white/40">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <button
            type="button"
            onClick={onOpenContact}
            className="hover:text-white transition-colors cursor-pointer text-left"
          >
            Contact
          </button>
          <button
            type="button"
            onClick={onReplayIntro}
            className="hover:text-white transition-colors text-left cursor-pointer"
          >
            Replay Intro
          </button>
          <span className="text-white/20">
            © {new Date().getFullYear()} DAY ZERO
          </span>
        </div>
      </div>
    </footer>
  );
}

```

---

### File 8: `src/components/layout/BlueprintGrid.jsx`
```jsx
export default function BlueprintGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Structural Architectural Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-60" />

      {/* 35mm Film Grain Overlay */}
      <svg className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-overlay w-full h-full">
        <filter id="blueprint-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#blueprint-grain)" />
      </svg>
      
      {/* Subtle Scanning Light Line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent scan-line" />
      
      {/* Corner Technical Status Indicators */}
      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-white/20 flex items-center gap-1">
        <span>SYS.STATUS: OPERATIONAL</span>
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-white/20 flex items-center gap-1">
        <span>BUILD v0.2.0</span>
      </div>

      {/* Center Subtle Axis Lines */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/[0.02]" />
      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/[0.02]" />
    </div>
  );
}

```

---

### File 9: `src/components/motion/IntroSequence.jsx`
```jsx
import React, { useEffect, useLayoutEffect, useRef, useCallback, useState } from 'react';

// Geometry Constants
const CX = 300;
const CY = 300;
const RADIUS = 170;
const OVERHANG = 45;

const LINE_X1 = CX - RADIUS - OVERHANG; // 85
const LINE_X2 = CX + RADIUS + OVERHANG; // 515
const LINE_LENGTH = LINE_X2 - LINE_X1;  // 430

const SWEEP_ANGLE_DEG = 360.0 - 37.7;   // 322.3 degrees arc sweep
const ARC_LENGTH = (SWEEP_ANGLE_DEG / 360.0) * (2 * Math.PI * RADIUS); // ~956.24 px

// Timings in Milliseconds (Single Play-Through)
const DURATION_LINE = 850;    // Step 1: Draw horizontal line
const DURATION_CIRCLE = 1450; // Step 2: Sweep circular arc
const DURATION_ARROW = 250;   // Step 3: Reveal arrowhead & title flare
const PAUSE_AT_END = 1100;    // Hold complete logo & title before entering homepage
const TOTAL_CYCLE = DURATION_LINE + DURATION_CIRCLE + DURATION_ARROW + PAUSE_AT_END;

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export default function IntroSequence({ onComplete }) {
  const linePathRef = useRef(null);
  const circleArcPathRef = useRef(null);
  const arrowheadGroupRef = useRef(null);
  const animDotRef = useRef(null);
  const titleContainerRef = useRef(null);
  const titleTextRef = useRef(null);
  const subtitleRef = useRef(null);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);
  const completedRef = useRef(false);

  // Web Audio Synth References
  const audioCtxRef = useRef(null);
  const mainGainRef = useRef(null);
  const filterRef = useRef(null);
  const impactTriggeredRef = useRef(false);

  const [isFadingOut, setIsFadingOut] = useState(false);

  // Initialize Web Audio Engine for Intro
  const initIntroAudio = useCallback(() => {
    try {
      if (audioCtxRef.current) return;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.5);
      masterGain.connect(ctx.destination);
      mainGainRef.current = masterGain;

      // Lowpass Filter (sweeps open during intro)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(90, ctx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      // Deep Drone Oscillator 1 (A 55Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      osc1.connect(filter);
      osc1.start();

      // Deep Drone Oscillator 2 (E 82.5Hz)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(82.41, ctx.currentTime);
      osc2.connect(filter);
      osc2.start();

      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    } catch (err) {
      console.warn('Web Audio not allowed or error:', err);
    }
  }, []);

  // Trigger Marvel Sub-Impact Boom
  const triggerCinematicImpact = useCallback(() => {
    if (impactTriggeredRef.current || !audioCtxRef.current) return;
    impactTriggeredRef.current = true;

    try {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      // Sub-bass impact oscillator
      const impactOsc = ctx.createOscillator();
      const impactGain = ctx.createGain();

      impactOsc.type = 'sine';
      impactOsc.frequency.setValueAtTime(140, ctx.currentTime);
      impactOsc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.6);

      impactGain.gain.setValueAtTime(0.35, ctx.currentTime);
      impactGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      impactOsc.connect(impactGain);
      impactGain.connect(ctx.destination);

      impactOsc.start();
      impactOsc.stop(ctx.currentTime + 0.85);
    } catch (err) {
      console.warn('Impact audio trigger error:', err);
    }
  }, []);

  const stopIntroAudio = useCallback(() => {
    if (mainGainRef.current && audioCtxRef.current) {
      try {
        const ctx = audioCtxRef.current;
        mainGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        mainGainRef.current.gain.setValueAtTime(mainGainRef.current.gain.value, ctx.currentTime);
        mainGainRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        setTimeout(() => {
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
          }
        }, 450);
      } catch (err) {
        console.warn('Audio cleanup error:', err);
      }
    }
  }, []);

  const handleFinish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    stopIntroAudio();
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450); // smooth fade transition into homepage
  }, [onComplete, stopIntroAudio]);

  // Handle User Gestures to unlock Autoplay Audio
  useEffect(() => {
    initIntroAudio();

    const unlockAudio = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      } else if (!audioCtxRef.current) {
        initIntroAudio();
      }
    };

    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, [initIntroAudio]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  const renderProgress = useCallback((elapsedMs) => {
    const linePath = linePathRef.current;
    const circleArcPath = circleArcPathRef.current;
    const arrowheadGroup = arrowheadGroupRef.current;
    const animDot = animDotRef.current;
    const titleText = titleTextRef.current;
    const subtitle = subtitleRef.current;

    if (!linePath || !circleArcPath || !arrowheadGroup || !animDot) return;

    // Filter Frequency sweep based on progress
    if (filterRef.current && audioCtxRef.current) {
      const progress = Math.min(1, elapsedMs / (DURATION_LINE + DURATION_CIRCLE));
      const targetFreq = 90 + progress * 320; // Sweeps 90Hz -> 410Hz
      filterRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.05);
    }

    if (elapsedMs >= TOTAL_CYCLE) {
      linePath.style.strokeDashoffset = '0';
      circleArcPath.style.strokeDashoffset = '0';
      animDot.style.opacity = '0';
      arrowheadGroup.style.opacity = '1';
      if (titleText) {
        titleText.style.opacity = '1';
        titleText.style.transform = 'scale(1) translateY(0px)';
        titleText.style.letterSpacing = '0.4em';
      }
      if (subtitle) subtitle.style.opacity = '0.4';
      handleFinish();
      return;
    }

    if (elapsedMs <= DURATION_LINE) {
      // Phase 1: Draw Straight Horizontal Line
      const p = elapsedMs / DURATION_LINE;
      const eased = easeInOutCubic(p);

      linePath.style.opacity = p > 0 ? '1' : '0';
      circleArcPath.style.opacity = '0';

      linePath.style.strokeDashoffset = (LINE_LENGTH * (1 - eased)).toString();
      circleArcPath.style.strokeDashoffset = ARC_LENGTH.toString();
      arrowheadGroup.style.opacity = '0';

      const dotX = LINE_X1 + eased * LINE_LENGTH;
      animDot.setAttribute('cx', dotX.toString());
      animDot.setAttribute('cy', CY.toString());
      animDot.style.opacity = '1';

      if (titleText) {
        titleText.style.opacity = '0';
        titleText.style.transform = 'scale(0.92) translateY(12px)';
        titleText.style.letterSpacing = '0.6em';
      }
      if (subtitle) subtitle.style.opacity = '0';
    } else if (elapsedMs <= DURATION_LINE + DURATION_CIRCLE) {
      // Phase 2: Sweep Perfect Circular Arc + Cinematic Title Begin Fade-In
      linePath.style.opacity = '1';
      circleArcPath.style.opacity = '1';
      linePath.style.strokeDashoffset = '0';

      const circleTime = elapsedMs - DURATION_LINE;
      const p = circleTime / DURATION_CIRCLE;
      const eased = easeInOutCubic(p);

      circleArcPath.style.strokeDashoffset = (ARC_LENGTH * (1 - eased)).toString();
      arrowheadGroup.style.opacity = '0';

      const currentAngleDeg = -(eased * SWEEP_ANGLE_DEG);
      const currentAngleRad = currentAngleDeg * (Math.PI / 180.0);

      const dotX = CX + RADIUS * Math.cos(currentAngleRad);
      const dotY = CY + RADIUS * Math.sin(currentAngleRad);

      animDot.setAttribute('cx', dotX.toString());
      animDot.setAttribute('cy', dotY.toString());
      animDot.style.opacity = '1';

      // Marvel Studio-style cinematic title tracking convergence
      if (titleText) {
        const titleProgress = Math.max(0, (p - 0.4) / 0.6); // Starts at 40% of circle sweep
        const titleEased = easeInOutCubic(titleProgress);
        titleText.style.opacity = (titleEased * 0.85).toString();
        const scaleVal = 0.92 + titleEased * 0.08;
        const letterSpacingVal = 0.6 - titleEased * 0.2;
        const translateYVal = 12 * (1 - titleEased);
        titleText.style.transform = `scale(${scaleVal}) translateY(${translateYVal}px)`;
        titleText.style.letterSpacing = `${letterSpacingVal}em`;
      }
      if (subtitle) subtitle.style.opacity = '0';
    } else if (elapsedMs <= DURATION_LINE + DURATION_CIRCLE + DURATION_ARROW) {
      // Phase 3: Resolve Tangent Arrowhead & Marvel Text Lock-in + Sub Impact Hit
      linePath.style.opacity = '1';
      circleArcPath.style.opacity = '1';
      linePath.style.strokeDashoffset = '0';
      circleArcPath.style.strokeDashoffset = '0';

      const arrowTime = elapsedMs - (DURATION_LINE + DURATION_CIRCLE);
      const p = arrowTime / DURATION_ARROW;

      // Trigger Marvel cinematic sub impact hit
      triggerCinematicImpact();

      animDot.style.opacity = (1 - p).toString();
      arrowheadGroup.style.opacity = p.toString();

      if (titleText) {
        titleText.style.opacity = '1';
        titleText.style.transform = 'scale(1) translateY(0px)';
        titleText.style.letterSpacing = '0.4em';
      }
      if (subtitle) subtitle.style.opacity = (p * 0.4).toString();
    } else {
      // Phase 4: Full Hold of Marvel Title & Logo
      linePath.style.opacity = '1';
      circleArcPath.style.opacity = '1';
      linePath.style.strokeDashoffset = '0';
      circleArcPath.style.strokeDashoffset = '0';
      animDot.style.opacity = '0';
      arrowheadGroup.style.opacity = '1';

      if (titleText) {
        titleText.style.opacity = '1';
        titleText.style.transform = 'scale(1) translateY(0px)';
        titleText.style.letterSpacing = '0.4em';
      }
      if (subtitle) subtitle.style.opacity = '0.4';
    }
  }, [handleFinish, triggerCinematicImpact]);

  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;

    renderProgress(elapsed);

    if (!completedRef.current) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [renderProgress]);

  useLayoutEffect(() => {
    const linePath = linePathRef.current;
    const circleArcPath = circleArcPathRef.current;

    if (linePath && circleArcPath) {
      linePath.style.opacity = '0';
      circleArcPath.style.opacity = '0';
      linePath.style.strokeDasharray = `${LINE_LENGTH} ${LINE_LENGTH}`;
      circleArcPath.style.strokeDasharray = `${ARC_LENGTH} ${ARC_LENGTH}`;
      linePath.style.strokeDashoffset = LINE_LENGTH.toString();
      circleArcPath.style.strokeDashoffset = ARC_LENGTH.toString();
    }

    startTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      stopIntroAudio();
    };
  }, [animate, stopIntroAudio]);

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-white select-none overflow-hidden cursor-pointer transition-all duration-500 ${
        isFadingOut ? 'opacity-0 scale-[0.98] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      title="Click anywhere to enter homepage"
    >
      {/* 35mm Subtle Grain Background */}
      <svg className="pointer-events-none fixed inset-0 z-10 opacity-[0.035] mix-blend-overlay w-full h-full">
        <filter id="marvel-intro-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#marvel-intro-grain)" />
      </svg>

      {/* Top action controls */}
      <div className="absolute top-8 right-8 z-50 flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFinish();
          }}
          className="text-[10px] font-mono tracking-widest text-white/40 hover:text-white uppercase px-3 py-1.5 border border-white/10 hover:border-white/30 transition-all rounded-sm bg-black/40 backdrop-blur-sm"
        >
          SKIP INTRO [ESC]
        </button>
      </div>

      {/* Center Stage Container */}
      <div className="relative z-20 flex flex-col items-center justify-center max-w-xl w-full px-6">
        {/* Responsive SVG Logo Container */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 relative flex items-center justify-center">
          <svg
            id="logoSvg"
            viewBox="0 0 600 600"
            className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="logoGroup">
              {/* Path 1a: Horizontal Straight Line */}
              <path
                ref={linePathRef}
                d="M 85 300 L 515 300"
                fill="none"
                stroke="#ffffff"
                strokeWidth="9"
                strokeLinecap="round"
                style={{
                  opacity: 0,
                  strokeDasharray: `${LINE_LENGTH} ${LINE_LENGTH}`,
                  strokeDashoffset: `${LINE_LENGTH}`,
                }}
              />

              {/* Path 1b: Open Circular Arc */}
              <path
                ref={circleArcPathRef}
                d="M 470 300 A 170 170 0 1 0 433.96 404.66"
                fill="none"
                stroke="#ffffff"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  opacity: 0,
                  strokeDasharray: `${ARC_LENGTH} ${ARC_LENGTH}`,
                  strokeDashoffset: `${ARC_LENGTH}`,
                }}
              />

              {/* Path 2: Tangent Arrowhead */}
              <g
                ref={arrowheadGroupRef}
                transform="translate(437.65, 399.93) rotate(-52.3)"
                style={{ opacity: 0 }}
              >
                <path
                  d="M 14 0 L -8 -9 L -2 0 L -8 9 Z"
                  fill="#ffffff"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </g>

              {/* Traveling Lead Dot */}
              <circle
                ref={animDotRef}
                cx="85"
                cy="300"
                r="5"
                fill="#ffffff"
                style={{ opacity: 1, filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 1))' }}
              />
            </g>
          </svg>
        </div>

        {/* Marvel Studio Cinematic Title Text "DAY ZERO" */}
        <div ref={titleContainerRef} className="mt-4 flex flex-col items-center justify-center text-center">
          <div className="relative overflow-hidden py-2 px-6">
            <h1
              ref={titleTextRef}
              className="font-black text-3xl sm:text-5xl font-display text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 uppercase tracking-[0.4em] transition-all duration-100 select-none filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              style={{ opacity: 0, transform: 'scale(0.92) translateY(12px)', letterSpacing: '0.6em' }}
            >
              DAY ZERO
            </h1>
          </div>


        </div>
      </div>

      {/* Footer Hint */}
      <div className="absolute bottom-8 z-30 text-[10px] font-mono text-white/30 tracking-widest uppercase pointer-events-none">
        CLICK ANYWHERE TO ENTER HOMEPAGE
      </div>
    </div>
  );
}

```

---

### File 10: `src/utils/chapters.js`
```javascript
/**
 * Chapter metadata and coordinate utility definitions for DAY ZERO documentary.
 * Canvas total height: 5200px
 * Hero path start Y: 120px
 * CTA path end Y: 5050px
 */

export const CANVAS_HEIGHT = 5200;
export const PATH_START_Y = 120;
export const PATH_END_Y = 5050;
export const PATH_RANGE_Y = PATH_END_Y - PATH_START_Y; // 4930px

export const CHAPTERS_DATA = [
  {
    id: '01',
    title: 'THE FIRST COMMIT',
    subtitle: 'Before every success, there is a first step. Before every product, there is a Day Zero.',
    yPos: 750,
    startY: 600,
    topCss: '750px',
  },
  {
    id: '02',
    title: 'THE PROBLEM',
    subtitle: 'We only see the highlight reel. The struggles. The failures. The uncertainty. These are rarely shown.',
    yPos: 1400,
    startY: 1250,
    topCss: '1400px',
  },
  {
    id: '03',
    title: 'OUR BELIEF',
    subtitle: 'Every meaningful journey has a Day Zero. We believe the beginning is the most valuable part.',
    yPos: 2050,
    startY: 1900,
    topCss: '2050px',
  },
  {
    id: '04',
    title: 'BUILD IN PUBLIC',
    subtitle: 'We build. We document. We share everything — the good, the bad, and the unfinished.',
    yPos: 2700,
    startY: 2550,
    topCss: '2700px',
  },
  {
    id: '05',
    title: 'CURRENT MISSIONS',
    subtitle: 'Real projects. Real progress. This is what we are building right now.',
    yPos: 3350,
    startY: 3200,
    topCss: '3350px',
  },
  {
    id: '06',
    title: 'FUTURE ECOSYSTEM',
    subtitle: 'An ecosystem that empowers others to start their own Day Zero.',
    yPos: 4000,
    startY: 3850,
    topCss: '4000px',
  },
  {
    id: '07',
    title: 'MANIFESTO',
    subtitle: 'This is our commitment to builders, creators, and dreamers everywhere.',
    yPos: 4650,
    startY: 4500,
    topCss: '4650px',
  },
];

/**
 * Converts a target Y position on the SVG canvas (e.g. chapter startY)
 * to the exact target window scrollY based on current viewport height.
 */
export function getScrollYForCanvasY(canvasY, viewportHeight = window.innerHeight, canvasHeight = CANVAS_HEIGHT) {
  const maxScroll = canvasHeight - viewportHeight;
  if (maxScroll <= 0) return 0;
  const ratio = (canvasY - PATH_START_Y) / PATH_RANGE_Y;
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  return Math.round(clampedRatio * maxScroll);
}

/**
 * Converts the current window scrollY to the corresponding drawing head Y coordinate
 * on the SVG canvas based on current viewport height.
 */
export function getCanvasYForScrollY(scrollY, viewportHeight = window.innerHeight, canvasHeight = CANVAS_HEIGHT) {
  const maxScroll = canvasHeight - viewportHeight;
  if (maxScroll <= 0) return PATH_START_Y;
  const ratio = Math.max(0, Math.min(1, scrollY / maxScroll));
  return PATH_START_Y + ratio * PATH_RANGE_Y;
}

```

---

### File 11: `src/index.css`
```css
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --color-brand-bg: #050505;
  --color-brand-surface: #0B0B0B;
  --color-brand-border: rgba(255, 255, 255, 0.08);
  --color-brand-border-glow: rgba(255, 255, 255, 0.2);
  --color-brand-muted: #8E8E93;
}

:root {
  color-scheme: dark;
  background-color: #050505;
  color: #F3F4F6;
}

body {
  margin: 0;
  padding: 0;
  background-color: #050505;
  font-family: var(--font-sans);
  overflow-x: hidden;
}

/* Custom Blueprint Architectural Grid */
.bg-blueprint-grid {
  background-size: 40px 40px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}

.bg-blueprint-dense {
  background-size: 16px 16px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
}

/* Blueprint Radial Vignette */
.bg-radial-vignette {
  background: radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
}

/* Glassmorphic Panel */
.glass-panel {
  background: rgba(11, 11, 11, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Technical Hairline Borders */
.border-hairline {
  border-color: rgba(255, 255, 255, 0.08);
}

/* Pulse animation for technical status indicators */
@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
}

.animate-pulse-glow {
  animation: pulse-glow 3s infinite ease-in-out;
}

/* Scan line overlay */
.scan-line {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.03) 50%,
    transparent 100%
  );
  animation: scanline 8s linear infinite;
}

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

/* Custom Minimal Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #050505;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

```

---

### File 12: `src/main.jsx`
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

---
