# DAY ZERO (HDZ) — SAFE RESTORE POINT (SAFE_CHECKPOINT_V1)

**Checkpoint Name**: `SAFE_CHECKPOINT_V1` (Complete 7-Chapter Editorial Documentary, Dynamic SEO & Contextual CTAs)  
**Git Branch**: `main`  
**Date**: 2026-09-08  

---

## Overview of Implemented Features & Architecture

This checkpoint preserves the complete, production-ready implementation of **DAY ZERO — Interactive Architectural Blueprint, Complete 7-Chapter Documentary System, Dynamic Chapter-Page SEO, and Products Archive System**.

1. **Complete 7-Chapter Interactive Documentary (`ChapterPage.jsx` & `chapters.js`)**:
   - Every chapter has its full verbatim, bespoke editorial layout with dark architectural blueprint styling:
     - **Chapter 01: EVERY JOURNEY BEGINS SOMEWHERE** — The Origin, The First Commit, The Significance of Day Zero.
     - **Chapter 02: THE PROBLEM** — The Finished Version Hides the Process, The Missing Story, Failure is Information, The Invisible Work.
     - **Chapter 03: OUR BELIEF** — Every Journey Has a Day Zero, The Learning Loop, Commitment, Discipline, Learning, Iteration, Growth, The Day Zero Rule.
     - **Chapter 04: BUILD IN PUBLIC** — The Process is Part of the Product, Why Document, Not Performing, The Value, The Record, The Day Zero Rule.
     - **Chapter 05: CURRENT MISSIONS** — The Work is Happening Now, Every Mission Starts with a Problem, From Idea to Mission, The Missions Matrix, No Artificial Progress.
     - **Chapter 06: FUTURE ECOSYSTEM** — More Than a Website, Product Layer, Knowledge Layer, Documentation Layer, Community Layer, Media Layer, The Knowledge Loop, The Long-Term Idea.
     - **Chapter 07: MANIFESTO** — This is Day Zero (8 Choices), We Build, We Document, We Learn, We Iterate, We Share, We Begin Again, The 9 Manifesto Creeds, Final Statement.

2. **Chapter-Page SEO Structure (`chapters.js`, `ChapterPage.jsx` & `App.jsx`)**:
   - Unique search-facing titles, meta descriptions, and primary topic tagging for all 7 chapters.
   - Dynamic injection of `document.title`, `meta[name="description"]`, OpenGraph tags, and topic keywords on chapter navigation.
   - Clean restoration to homepage and products metadata when navigating back.

3. **Contextual Chapter CTAs (`ChapterPage.jsx` & `ChapterContent.jsx`)**:
   - Distinct, purposeful closing CTAs replacing generic text:
     - Chapter 01: `START THE JOURNEY →`
     - Chapter 02: `SEE THE PROCESS →`
     - Chapter 03: `EXPLORE THE PRINCIPLES →`
     - Chapter 04: `ENTER THE BUILD LOG →`
     - Chapter 05: `EXPLORE CURRENT MISSIONS →`
     - Chapter 06: `EXPLORE THE ECOSYSTEM →`
     - Chapter 07: `START YOUR DAY ZERO →`

4. **Dynamic Sticky Navigation & Scrollspy (`ChapterPage.jsx`)**:
   - Real-time scrollspy tracking active chapter sections in the sticky TOC.
   - Smooth jump-to-section navigation with exact top offsets.
   - Archival badges, coordinates, and verified log stamps.

5. **Cinematic Homepage, Interactive SVG Stream & Products Catalog**:
   - Continuous 5200px animated SVG blueprint stream with coordinate tracking head.
   - Opening cinematic intro sequence with Web Audio API sound synthesis.
   - Complete technical product directory with category filtering and interactive modal inspection.
   - Gamified dual-panel macOS terminal and transmission workstation.

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
import ChapterPage from './components/blueprint/ChapterPage';
import ProductsPage from './components/products/ProductsPage';
import { getScrollYForCanvasY, CHAPTERS_DATA } from './utils/chapters';

const parseHashState = () => {
  const hash = window.location.hash;
  if (hash === '#products') {
    return { view: 'products', chapterId: null };
  }
  const chapterMatch = hash.match(/^#chapter[-/](0[1-7]|[1-7])$/);
  if (chapterMatch) {
    const padded = chapterMatch[1].padStart(2, '0');
    return { view: 'chapter', chapterId: padded };
  }
  return { view: 'home', chapterId: null };
};

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [viewState, setViewState] = useState(parseHashState);

  const currentView = viewState.view;
  const activeChapterId = viewState.chapterId;

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      setViewState(parseHashState());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Synchronize top-level SEO for home and products (chapter SEO is handled in ChapterPage)
  useEffect(() => {
    if (currentView === 'home') {
      document.title = 'DAY ZERO — The Interactive Documentary of Beginning';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'DAY ZERO celebrates the raw beginning of human endeavor, engineering, and creation. An interactive documentary inspiring visitors to start building.'
        );
      }
    } else if (currentView === 'products') {
      document.title = 'DAY ZERO — Products & Engineering Missions | Build in Public';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Explore the products, engineering projects and experiments currently being built, tested and documented by DAY ZERO.'
        );
      }
    }
  }, [currentView]);

  const handleNavigateView = (targetView, targetChapter) => {
    if (targetView === 'products') {
      window.location.hash = 'products';
      setViewState({ view: 'products', chapterId: null });
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (targetView === 'chapter') {
      const chId = String(targetChapter || '01').padStart(2, '0');
      window.location.hash = `chapter-${chId}`;
      setViewState({ view: 'chapter', chapterId: chId });
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      window.location.hash = '';
      setViewState({ view: 'home', chapterId: null });
      if (targetChapter) {
        setTimeout(() => {
          const ch = CHAPTERS_DATA.find((item) => item.id === targetChapter);
          if (ch) {
            const targetScrollY = getScrollYForCanvasY(ch.startY);
            if (window.lenis) {
              window.lenis.scrollTo(targetScrollY, { duration: 1.2 });
            } else {
              window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
            }
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  };

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

  const handleGoHome = () => {
    setShowContact(false);
    if (currentView !== 'home') {
      handleNavigateView('home');
    } else if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
      {!showIntro && (
        <Navigation
          onLogoClick={handleGoHome}
          currentView={currentView}
          activeChapterId={activeChapterId}
          onNavigateView={handleNavigateView}
        />
      )}

      {/* Main Interactive Blueprint Section (Documentary Homepage, Products Index, or Dedicated Chapter Page) */}
      {!showIntro && (
        <main className="relative z-10 flex-1">
          {currentView === 'products' ? (
            <ProductsPage onOpenContact={() => setShowContact(true)} />
          ) : currentView === 'chapter' ? (
            <ChapterPage
              chapterId={activeChapterId}
              onBackToHome={() => handleNavigateView('home')}
              onNavigateChapter={(id) => handleNavigateView('chapter', id)}
              onOpenContact={() => setShowContact(true)}
            />
          ) : (
            <CinematicHomepage
              onOpenContact={() => setShowContact(true)}
              onNavigateChapter={(id) => handleNavigateView('chapter', id)}
            />
          )}
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

### File 2: `src/main.jsx`
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

### File 3: `src/index.css`
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

### File 4: `src/utils/chapters.js`
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
    title: 'EVERY JOURNEY BEGINS SOMEWHERE',
    subtitle: 'Every product starts before there is a product. That is where DAY ZERO begins.',
    seoTitle: 'DAY ZERO — Every Journey Begins Somewhere | Building Products',
    metaDescription: 'Explore how DAY ZERO approaches the beginning of product development — from the first idea and early research to prototypes, experiments and the first commit.',
    primaryTopic: 'Starting to build products',
    ctaText: 'START THE JOURNEY →',
    yPos: 750,
    startY: 600,
    topCss: '750px',
  },
  {
    id: '02',
    title: 'THE PROBLEM',
    subtitle: 'The finished version hides the process. DAY ZERO exists to make that distance visible.',
    seoTitle: 'DAY ZERO — The Problem | What Product Building Really Looks Like',
    metaDescription: 'Why do we only see finished products? DAY ZERO documents the failed experiments, difficult decisions, iterations and unfinished work behind product development.',
    primaryTopic: 'Product development process',
    ctaText: 'SEE THE PROCESS →',
    yPos: 1400,
    startY: 1250,
    topCss: '1400px',
  },
  {
    id: '03',
    title: 'OUR BELIEF',
    subtitle: 'Every journey has a Day Zero. We believe the beginning matters.',
    seoTitle: 'DAY ZERO — Our Belief | Learning Through Building',
    metaDescription: 'Discover the DAY ZERO philosophy: commit, build, test, learn and iterate. A practical approach to learning through real product development.',
    primaryTopic: 'Learning by building',
    ctaText: 'EXPLORE THE PRINCIPLES →',
    yPos: 2050,
    startY: 1900,
    topCss: '2050px',
  },
  {
    id: '04',
    title: 'BUILD IN PUBLIC',
    subtitle: 'The process is part of the product. Don\'t just show what worked. Show what you learned.',
    seoTitle: 'DAY ZERO — Build in Public | Product & Engineering Documentation',
    metaDescription: 'DAY ZERO documents products, engineering projects, prototypes, experiments, failures and lessons while they are being built in public.',
    primaryTopic: 'Build in public',
    ctaText: 'ENTER THE BUILD LOG →',
    yPos: 2700,
    startY: 2550,
    topCss: '2700px',
  },
  {
    id: '05',
    title: 'CURRENT MISSIONS',
    subtitle: 'The work is happening now. No invented metrics. No artificial progress. Just the work.',
    seoTitle: 'DAY ZERO — Current Missions | Products & Engineering Projects',
    metaDescription: 'Explore the products, engineering projects and experiments currently being built, tested and documented by DAY ZERO.',
    primaryTopic: 'Engineering projects',
    ctaText: 'EXPLORE CURRENT MISSIONS →',
    yPos: 3350,
    startY: 3200,
    topCss: '3350px',
  },
  {
    id: '06',
    title: 'FUTURE ECOSYSTEM',
    subtitle: 'More than a website. An ecosystem built around creating, learning and documenting.',
    seoTitle: 'DAY ZERO — Future Ecosystem | Products, Learning & Documentation',
    metaDescription: 'Explore the DAY ZERO vision for an ecosystem connecting products, engineering projects, documentation, knowledge, learning and community.',
    primaryTopic: 'Product and engineering learning ecosystem',
    ctaText: 'EXPLORE THE ECOSYSTEM →',
    yPos: 4000,
    startY: 3850,
    topCss: '4000px',
  },
  {
    id: '07',
    title: 'MANIFESTO',
    subtitle: 'We choose to begin before everything is figured out. This is DAY ZERO.',
    seoTitle: 'DAY ZERO — Manifesto | Build, Learn, Document, Iterate',
    metaDescription: 'Read the DAY ZERO manifesto: begin before you\'re ready, build in public, document the process, learn through iteration and keep moving.',
    primaryTopic: 'Build in public philosophy',
    ctaText: 'START YOUR DAY ZERO →',
    yPos: 4650,
    startY: 4500,
    topCss: '4650px',
  },
];

export const CHAPTERS_SEO = CHAPTERS_DATA.reduce((acc, ch) => {
  acc[ch.id] = {
    seoTitle: ch.seoTitle,
    metaDescription: ch.metaDescription,
    primaryTopic: ch.primaryTopic,
  };
  return acc;
}, {});


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

/**
 * Full editorial content for Chapter 01
 */
export const CHAPTER_01_CONTENT = {
  id: '01',
  numberLabel: 'CHAPTER 01',
  title: 'EVERY JOURNEY BEGINS SOMEWHERE',
  subtitle: 'Every product starts before there is a product. That is where DAY ZERO begins.',
  sections: [
    {
      id: 'origin',
      index: '01',
      title: 'THE ORIGIN',
      paragraphs: [
        'Every product starts before there is a product.',
        'There is an idea.',
        'A question.',
        'A problem that keeps coming back.',
        'Sometimes there is only a rough thought that doesn\'t yet have a name.',
        'That is where DAY ZERO begins.',
        'Not at launch.',
        'Not at the first customer.',
        'Not at the polished version.',
        'At the point where an idea becomes a commitment to find out what it could become.'
      ]
    },
    {
      id: 'first-commit',
      index: '02',
      title: 'THE FIRST COMMIT',
      paragraphs: [
        'The first commit is rarely impressive.',
        'It might be an empty repository.',
        'A rough sketch.',
        'A paragraph of notes.',
        'A prototype that barely works.',
        'A conversation that turns into a question worth exploring.',
        'But it changes something.',
        'An idea that existed only in your head now has a physical form.',
        'Something can be tested.',
        'Something can be questioned.',
        'Something can fail.',
        'And because it can fail, it can also improve.',
        'That is the significance of Day Zero.',
        'It is the moment possibility becomes a process.'
      ]
    },
    {
      id: 'why-the-beginning-matters',
      index: '03',
      title: 'WHY THE BEGINNING MATTERS',
      paragraphs: [
        'The beginning is often treated as the least interesting part of a product story.',
        'There is nothing polished to show.',
        'No impressive numbers.',
        'No finished interface.',
        'No success story.',
        'But the beginning contains something that the finished product cannot show on its own: how the decisions were made.',
        'Why was this idea chosen?',
        'What problem was being explored?',
        'What assumptions existed?',
        'What did we believe would happen?',
        'What turned out to be wrong?',
        'Those questions become the foundation of everything that follows.'
      ]
    },
    {
      id: 'the-day-zero-principle',
      index: '04',
      title: 'THE DAY ZERO PRINCIPLE',
      paragraphs: [
        'We don\'t believe you need to know the entire path before taking the first step.',
        'You need enough clarity to begin.',
        'Then the work creates information.',
        'Information changes decisions.',
        'Decisions shape the next iteration.',
        'The path becomes clearer by moving through it.',
        'That is how products are built.'
      ]
    },
    {
      id: 'what-we-document',
      index: '05',
      title: 'WHAT WE DOCUMENT',
      intro: 'At the beginning of a project, we want to capture:',
      items: [
        'The original idea',
        'The problem being explored',
        'The assumptions behind it',
        'Early research',
        'Initial sketches',
        'First prototypes',
        'Early technical decisions',
        'Questions we don\'t yet have answers to',
        'What changes as we learn'
      ],
      conclusion: [
        'The goal isn\'t to make the beginning look impressive.',
        'The goal is to make it visible.'
      ]
    },
    {
      id: 'the-closing-commit',
      index: '06',
      title: 'THE FIRST COMMIT',
      paragraphs: [
        'There is always a first commit.',
        'Ours is DAY ZERO.'
      ]
    }
  ]
};

export const CHAPTER_02_CONTENT = {
  id: '02',
  numberLabel: 'CHAPTER 02',
  title: 'THE PROBLEM',
  subtitle: 'The finished version hides the process. DAY ZERO exists to make that distance visible.',
  sections: [
    {
      id: 'hiding-the-process',
      index: '01',
      title: 'THE FINISHED VERSION HIDES THE PROCESS',
      paragraphs: [
        'Most product stories begin near the end.',
        'The product exists.',
        'The interface is polished.',
        'The launch has happened.',
        'The difficult decisions have already been made.',
        'The messy versions have disappeared.',
        'But that isn\'t what building actually looks like.',
        'Building is uncertain.',
        'It involves incomplete information, competing ideas, failed experiments, technical limitations, changing assumptions, and decisions that only make sense after you learn something new.'
      ]
    },
    {
      id: 'the-missing-story',
      index: '02',
      title: 'THE MISSING STORY',
      lead: 'When we only see the final result, we lose the context around it.',
      intro: 'We don\'t see:',
      items: [
        'Why one idea was rejected.',
        'Why a prototype was rebuilt.',
        'Why a feature was removed.',
        'Why a technical approach changed.',
        'Why an experiment failed.',
        'Why the team decided to continue.'
      ],
      callout: [
        'The finished product tells us what exists.',
        'The process tells us why it exists.',
        'DAY ZERO is interested in the second story.'
      ]
    },
    {
      id: 'failure-is-information',
      index: '03',
      title: 'FAILURE IS INFORMATION',
      lead: [
        'A failed experiment isn\'t automatically wasted work.',
        'It tells you something.'
      ],
      diagnostics: [
        'Perhaps the assumption was wrong.',
        'Perhaps the problem wasn\'t important enough.',
        'Perhaps the implementation was flawed.',
        'Perhaps the timing was wrong.',
        'Perhaps the idea needs to change.'
      ],
      pivot: {
        notThis: 'Did this fail?',
        thisOne: 'What did this teach us?'
      },
      conclusion: 'That shift turns failure from something to hide into something to document.'
    },
    {
      id: 'cost-of-hiding',
      index: '04',
      title: 'THE COST OF HIDING THE PROCESS',
      lead: 'When only successful outcomes are visible, building can look deceptively simple.',
      mythSteps: [
        'Someone has an idea.',
        'They build it.',
        'It works.',
        'People use it.',
        'The story ends.'
      ],
      reality: [
        'Real product development is rarely that clean.',
        'The distance between an idea and a working product is filled with decisions.',
        'DAY ZERO exists to make that distance visible.'
      ]
    },
    {
      id: 'what-we-want-to-show',
      index: '05',
      title: 'WHAT WE WANT TO SHOW',
      items: [
        'The rejected version.',
        'The rough version.',
        'The confusing version.',
        'The experiment that didn\'t work.',
        'The question that changed the direction.',
        'The technical problem that took longer than expected.',
        'The decision that looked obvious only afterwards.',
        'The iteration that finally moved things forward.'
      ],
      closing: [
        'This is not a collection of mistakes.',
        'It is the record of building.'
      ]
    },
    {
      id: 'the-problem-we-are-solving',
      index: '06',
      title: 'THE PROBLEM WE ARE SOLVING',
      paragraphs: [
        'There is already plenty of information about how successful products look.',
        'We want to document what it takes to make them real.',
        'That means treating the process itself as something worth learning from.'
      ]
    }
  ]
};

export const CHAPTER_03_CONTENT = {
  id: '03',
  numberLabel: 'CHAPTER 03',
  title: 'OUR BELIEF',
  subtitle: 'Every journey has a Day Zero. We believe the beginning matters.',
  sections: [
    {
      id: 'every-journey-has-a-day-zero',
      index: '01',
      title: 'EVERY JOURNEY HAS A DAY ZERO',
      intro: [
        'DAY ZERO is built around a simple belief:',
        'the beginning matters.'
      ],
      starts: [
        'Every product has a point where nothing is certain yet.',
        'Every builder has a first project.',
        'Every engineer has a first system they had to figure out.',
        'Every creator has a first piece of work that wasn\'t quite what they wanted.'
      ],
      callout: [
        'Those beginnings are not evidence that someone is inexperienced.',
        'They are evidence that they started.'
      ]
    },
    {
      id: 'building-is-a-learning-process',
      index: '02',
      title: 'BUILDING IS A LEARNING PROCESS',
      lead: [
        'We don\'t see product development as a straight line.',
        'It is a loop.'
      ],
      loopSteps: [
        { label: 'COMMIT', desc: 'Decide that the problem is worth exploring.' },
        { label: 'BUILD', desc: 'Turn the idea into something tangible.' },
        { label: 'TEST', desc: 'Put assumptions under pressure.' },
        { label: 'LEARN', desc: 'Pay attention to what actually happens.' },
        { label: 'ITERATE', desc: 'Change the product based on what was learned.' },
        { label: 'BUILD AGAIN', desc: 'Return to the problem with better information.' }
      ],
      closing: 'That cycle continues.'
    },
    {
      id: 'commitment',
      index: '03',
      title: 'COMMITMENT',
      paragraphs: [
        'Commitment is not certainty.',
        'It is choosing to begin despite uncertainty.',
        'You don\'t commit because you know the outcome.',
        'You commit because the question is worth answering.'
      ]
    },
    {
      id: 'discipline',
      index: '04',
      title: 'DISCIPLINE',
      paragraphs: [
        'Ideas are easy to start.',
        'Progress requires consistency.',
        'Documentation, testing, iteration and reflection only become valuable when they become part of the process.',
        'Discipline turns occasional effort into a system for learning.'
      ]
    },
    {
      id: 'learning',
      index: '05',
      title: 'LEARNING',
      paragraphs: [
        'Every experiment should leave you knowing something you didn\'t know before.',
        'Sometimes that knowledge confirms the direction.',
        'Sometimes it changes it.',
        'Both are useful.',
        'Learning is not a separate stage after building.',
        'It is part of building.'
      ]
    },
    {
      id: 'iteration',
      index: '06',
      title: 'ITERATION',
      lead: 'The first version is a starting point, not a verdict.',
      steps: [
        'Build.',
        'Observe.',
        'Question.',
        'Change.',
        'Build again.'
      ],
      conclusion: 'Iteration is how an idea becomes a product.'
    },
    {
      id: 'growth',
      index: '07',
      title: 'GROWTH',
      lead: [
        'Growth is not only about scale.',
        'It is also about understanding.'
      ],
      aspects: [
        'A better question.',
        'A better system.',
        'A better prototype.',
        'A better decision.',
        'A better explanation.',
        'A better version than the one before.'
      ],
      conclusion: 'That is progress.'
    },
    {
      id: 'our-principle',
      index: '08',
      title: 'OUR PRINCIPLE',
      statement: 'START BEFORE YOU FEEL READY.',
      subtext: 'Then let the work teach you what comes next.'
    }
  ]
};

export const CHAPTER_04_CONTENT = {
  id: '04',
  numberLabel: 'CHAPTER 04',
  title: 'BUILD IN PUBLIC',
  subtitle: 'The process is part of the product. Don\'t just show what worked. Show what you learned.',
  sections: [
    {
      id: 'process-is-product',
      index: '01',
      title: 'THE PROCESS IS PART OF THE PRODUCT',
      lead: 'Building in public means sharing the process while it is still happening.',
      exclusions: [
        'Not only the finished work.',
        'Not only the successful experiments.',
        'Not only the moments worth celebrating.'
      ],
      elements: [
        'The process.',
        'The research.',
        'The prototypes.',
        'The decisions.',
        'The failures.',
        'The iterations.',
        'The lessons.'
      ],
      closing: 'DAY ZERO is built around this approach.'
    },
    {
      id: 'why-document',
      index: '02',
      title: 'WHY DOCUMENT THE PROCESS?',
      lead: [
        'Documentation creates a record.',
        'Without it, decisions disappear into memory.'
      ],
      disappearances: [
        'A prototype gets replaced.',
        'A rejected idea gets forgotten.',
        'A technical problem gets solved and its context disappears.',
        'A lesson is learned but never written down.'
      ],
      callout: [
        'Documentation gives those moments somewhere to live.',
        'It creates a record that can be revisited, understood and shared.'
      ]
    },
    {
      id: 'not-performing',
      index: '03',
      title: 'BUILDING IN PUBLIC IS NOT PERFORMING',
      opening: [
        'There is a difference between documenting work and creating content about work.',
        'DAY ZERO is interested in the former.'
      ],
      antiHype: [
        'The goal is not to make every moment look exciting.',
        'The goal is not to manufacture progress.',
        'The goal is to show what actually happened.'
      ],
      rules: [
        'If an experiment fails, the record should say it failed.',
        'If an assumption changes, the record should show why.',
        'If a prototype gets abandoned, that decision is part of the story.'
      ],
      conclusion: 'Honest documentation is more useful than polished performance.'
    },
    {
      id: 'build-loop',
      index: '04',
      title: 'THE DAY ZERO BUILD LOOP',
      stages: [
        {
          num: '01',
          name: 'RESEARCH',
          points: [
            'Understand the problem.',
            'Find what is already known.',
            'Identify assumptions.',
            'Ask better questions.'
          ]
        },
        {
          num: '02',
          name: 'PROTOTYPE',
          points: [
            'Turn an idea into something tangible.',
            'It doesn\'t need to be perfect.',
            'It needs to be testable.'
          ]
        },
        {
          num: '03',
          name: 'TEST',
          points: [
            'Put the assumption under pressure.',
            'Observe what happens.',
            'Look for evidence.'
          ]
        },
        {
          num: '04',
          name: 'ITERATE',
          points: [
            'Keep what works.',
            'Change what doesn\'t.',
            'Remove what isn\'t necessary.'
          ]
        },
        {
          num: '05',
          name: 'DOCUMENT',
          points: [
            'Record what happened.',
            'What changed?',
            'Why did it change?',
            'What did we learn?'
          ]
        },
        {
          num: '06',
          name: 'SHARE',
          points: [
            'Make the useful parts accessible to others.',
            'Then begin again.'
          ]
        }
      ]
    },
    {
      id: 'what-we-share',
      index: '05',
      title: 'WHAT WE SHARE',
      lead: 'DAY ZERO can become a record of:',
      items: [
        'Product experiments',
        'Engineering projects',
        'Prototype development',
        'Research',
        'Technical decisions',
        'Design iterations',
        'Failed approaches',
        'Build logs',
        'Lessons learned',
        'Product development case studies'
      ],
      principle: [
        'The work comes first.',
        'The documentation follows the work.'
      ]
    },
    {
      id: 'why-it-matters',
      index: '06',
      title: 'WHY IT MATTERS',
      opening: 'Someone else is always standing at their own beginning.',
      impacts: [
        'If they can see the unfinished work, they can understand that uncertainty is normal.',
        'If they can see the failed experiment, they can learn from it.',
        'If they can see the iteration, they can understand the process.',
        'And if they can see someone start, perhaps they will start too.'
      ]
    },
    {
      id: 'the-day-zero-rule',
      index: '07',
      title: 'THE DAY ZERO RULE',
      statement: 'DON\'T JUST SHOW WHAT WORKED.',
      punchline: 'SHOW WHAT YOU LEARNED.'
    }
  ]
};

export const CHAPTER_05_CONTENT = {
  id: '05',
  numberLabel: 'CHAPTER 05',
  title: 'CURRENT MISSIONS',
  subtitle: 'The work is happening now. No invented metrics. No artificial progress. Just the work.',
  sections: [
    {
      id: 'work-is-happening-now',
      index: '01',
      title: 'THE WORK IS HAPPENING NOW',
      opening: [
        'DAY ZERO is not a retrospective project.',
        'It is an ongoing system for building.',
        'The current missions are the products, engineering projects, experiments and ideas moving through that system.'
      ],
      possibilities: [
        'Some will become products.',
        'Some will remain experiments.',
        'Some will change direction.',
        'Some may be abandoned.'
      ],
      closing: 'That is part of the process.'
    },
    {
      id: 'starts-with-a-problem',
      index: '02',
      title: 'EVERY MISSION STARTS WITH A PROBLEM',
      lead: 'Before there is a roadmap, there should be a reason to build.',
      questions: [
        'What problem are we exploring?',
        'Who experiences it?',
        'Why does it matter?',
        'What do we currently believe?',
        'What don\'t we know?'
      ],
      resolution: [
        'The first objective isn\'t to build everything.',
        'It is to understand enough to make the next useful decision.'
      ]
    },
    {
      id: 'from-idea-to-mission',
      index: '03',
      title: 'FROM IDEA TO MISSION',
      lead: 'A DAY ZERO mission can move through several states:',
      states: [
        { name: 'QUESTION', desc: 'Something is worth exploring.' },
        { name: 'RESEARCH', desc: 'We investigate the problem and existing possibilities.' },
        { name: 'PROTOTYPE', desc: 'We create an early version that can be tested.' },
        { name: 'EXPERIMENT', desc: 'We test an assumption.' },
        { name: 'ITERATION', desc: 'We change the system based on evidence.' },
        { name: 'PRODUCT', desc: 'An idea becomes something people can actually use.' }
      ],
      callout: [
        'These states are not necessarily linear.',
        'A mission can move backwards.',
        'A prototype can return to research.',
        'A product can become an experiment again.',
        'That is normal.'
      ]
    },
    {
      id: 'what-counts-as-progress',
      index: '04',
      title: 'WHAT COUNTS AS PROGRESS?',
      lead: 'Progress isn\'t only shipping.',
      intro: 'Progress can be:',
      items: [
        'Discovering that an assumption was wrong.',
        'Removing an unnecessary feature.',
        'Finding a simpler technical approach.',
        'Understanding a user\'s problem better.',
        'Building a prototype that answers an important question.',
        'Documenting a lesson that prevents the same mistake later.'
      ],
      conclusion: 'Progress is better information.'
    },
    {
      id: 'the-mission-log',
      index: '05',
      title: 'THE MISSION LOG',
      lead: 'Every active project should eventually have a visible record.',
      schema: [
        { field: 'MISSION', prompt: 'What are we building?' },
        { field: 'PROBLEM', prompt: 'What are we trying to solve?' },
        { field: 'CURRENT STATE', prompt: 'Where is the project now?' },
        { field: 'LATEST ITERATION', prompt: 'What changed?' },
        { field: 'NEXT STEP', prompt: 'What are we testing or building next?' },
        { field: 'LESSONS', prompt: 'What have we learned so far?' }
      ],
      takeaway: 'This is where the abstract idea of "building in public" becomes real.'
    },
    {
      id: 'current-missions-manifesto',
      index: '06',
      title: 'CURRENT MISSIONS',
      lead: 'This section should eventually contain the actual DAY ZERO projects.',
      intro: 'For every mission, visitors should be able to discover:',
      discoveries: [
        'WHAT IT IS',
        'WHY IT EXISTS',
        'HOW IT IS BEING BUILT',
        'WHAT HAS BEEN LEARNED',
        'WHAT HAPPENS NEXT'
      ],
      creed: [
        'No invented metrics.',
        'No artificial progress.',
        'Just the work.'
      ]
    }
  ]
};

export const CHAPTER_06_CONTENT = {
  id: '06',
  numberLabel: 'CHAPTER 06',
  title: 'FUTURE ECOSYSTEM',
  subtitle: 'More than a website. An ecosystem built around creating, learning and documenting.',
  sections: [
    {
      id: 'more-than-a-website',
      index: '01',
      title: 'MORE THAN A WEBSITE',
      opening: [
        'DAY ZERO starts with a website.',
        'It isn\'t intended to end there.',
        'The long-term vision is an ecosystem built around creating, learning and documenting.'
      ],
      pillars: [
        'Products.',
        'Engineering projects.',
        'Knowledge.',
        'Documentation.',
        'Media.',
        'Community.'
      ],
      closing: 'Each new project should contribute something to the larger system.'
    },
    {
      id: 'the-product-layer',
      index: '02',
      title: 'THE PRODUCT LAYER',
      lead: [
        'The foundation is real work.',
        'DAY ZERO should grow through a portfolio of products and experiments rather than through ideas alone.'
      ],
      truths: [
        'Every product becomes an opportunity to learn.',
        'Every project creates documentation.',
        'Every iteration adds another piece to the record.'
      ]
    },
    {
      id: 'the-knowledge-layer',
      index: '03',
      title: 'THE KNOWLEDGE LAYER',
      lead: 'The lessons created while building should not disappear when a project moves on.',
      intro: 'They can become:',
      assets: [
        'Engineering case studies',
        'Product development notes',
        'Technical documentation',
        'Research',
        'Experiments',
        'Build logs',
        'Lessons learned',
        'Practical resources'
      ],
      conclusion: 'This turns individual projects into reusable knowledge.'
    },
    {
      id: 'the-documentation-layer',
      index: '04',
      title: 'THE DOCUMENTATION LAYER',
      lead: [
        'Documentation creates continuity.',
        'A project shouldn\'t simply appear one day as a finished product.',
        'There should be a trail.'
      ],
      trail: [
        'The problem.',
        'The first idea.',
        'The research.',
        'The prototype.',
        'The failures.',
        'The iterations.',
        'The decisions.',
        'The result.'
      ],
      closing: 'That trail becomes part of the DAY ZERO archive.'
    },
    {
      id: 'the-community-layer',
      index: '05',
      title: 'THE COMMUNITY LAYER',
      lead: 'The ecosystem should also create a place for other builders.',
      types: [
        'People who are starting.',
        'People who are experimenting.',
        'People who are learning.',
        'People who have failed and want to try again.'
      ],
      mission: [
        'The goal isn\'t to create an audience that watches from the outside.',
        'It is to encourage more people to build.'
      ]
    },
    {
      id: 'the-media-layer',
      index: '06',
      title: 'THE MEDIA LAYER',
      lead: 'Some parts of building are better understood visually.',
      forms: [
        'A product documentary.',
        'A technical walkthrough.',
        'A prototype demonstration.',
        'A conversation.',
        'A build log.',
        'A behind-the-scenes record.'
      ],
      closing: 'DAY ZERO can use different forms of media to document the same underlying journey.'
    },
    {
      id: 'the-knowledge-loop',
      index: '07',
      title: 'THE KNOWLEDGE LOOP',
      steps: [
        'PRODUCT',
        'EXPERIMENT',
        'DOCUMENTATION',
        'LEARNING',
        'KNOWLEDGE',
        'NEW PROJECT',
        'PRODUCT'
      ],
      closing: 'The ecosystem grows through this loop.'
    },
    {
      id: 'the-long-term-idea',
      index: '08',
      title: 'THE LONG-TERM IDEA',
      layers: [
        'The website is the foundation.',
        'The products are the work.',
        'The documentation is the record.',
        'The knowledge is what remains useful.',
        'And the ecosystem is what connects everything together.'
      ]
    }
  ]
};

export const CHAPTER_07_CONTENT = {
  id: '07',
  numberLabel: 'CHAPTER 07',
  title: 'MANIFESTO',
  subtitle: 'We choose to begin before everything is figured out. This is DAY ZERO.',
  sections: [
    {
      id: 'this-is-day-zero',
      index: '01',
      title: 'THIS IS DAY ZERO',
      choices: [
        'We choose to begin before everything is figured out.',
        'We choose to build instead of waiting.',
        'We choose to learn by doing.',
        'We choose to document the process instead of hiding the unfinished parts.',
        'We choose honesty over performance.',
        'We choose evidence over assumptions.',
        'We choose iteration over perfection.',
        'We choose progress over appearances.',
      ],
      closing: 'And when something doesn\'t work, we choose to learn from it.'
    },
    {
      id: 'we-build',
      index: '02',
      title: 'WE BUILD',
      paragraphs: [
        'Ideas are only potential.',
        'Building gives them form.',
        'A prototype gives an idea something to react to.',
        'A product gives it a place in the world.'
      ],
      creed: 'We build because understanding comes from making.'
    },
    {
      id: 'we-document',
      index: '03',
      title: 'WE DOCUMENT',
      lead: 'The work shouldn\'t disappear once the result exists.',
      items: [
        'We document decisions.',
        'We document experiments.',
        'We document failures.',
        'We document iterations.',
        'We document what we learn.'
      ],
      closing: 'Because the process can be useful to someone else.'
    },
    {
      id: 'we-learn',
      index: '04',
      title: 'WE LEARN',
      lead: [
        'We don\'t expect to know everything before we begin.',
        'We expect the work to teach us.'
      ],
      effects: [
        'Every experiment produces information.',
        'Every iteration changes our understanding.',
        'Every project leaves something behind.'
      ],
      closing: 'Knowledge is built through the process.'
    },
    {
      id: 'we-iterate',
      index: '05',
      title: 'WE ITERATE',
      lead: [
        'The first version is rarely the final version.',
        'That\'s not failure.',
        'That\'s development.'
      ],
      action: 'We improve by observing, questioning, testing and rebuilding.',
      goals: [
        'The goal isn\'t to get everything right immediately.',
        'The goal is to make the next version better.'
      ]
    },
    {
      id: 'we-share',
      index: '06',
      title: 'WE SHARE',
      lead: [
        'Building in public creates accountability.',
        'It also creates possibility.'
      ],
      beneficiaries: [
        'Someone can learn from the experiment.',
        'Someone can avoid the mistake.',
        'Someone can understand the decision.',
        'Someone can see that the beginning doesn\'t have to be perfect.'
      ],
      closing: 'Sharing the process makes the work bigger than the product itself.'
    },
    {
      id: 'we-begin-again',
      index: '07',
      title: 'WE BEGIN AGAIN',
      lead: 'There is no final version of the journey.',
      chain: [
        'One project leads to another.',
        'One lesson creates another question.',
        'One answer reveals another problem worth exploring.'
      ],
      closing: [
        'The process continues.',
        'So does DAY ZERO.'
      ]
    },
    {
      id: 'the-day-zero-manifesto',
      index: '08',
      title: 'THE DAY ZERO MANIFESTO',
      tenets: [
        'START BEFORE READY.',
        'BUILD IN PUBLIC.',
        'BE HONEST.',
        'LEARN BY BUILDING.',
        'DOCUMENT THE PROCESS.',
        'ITERATE WITHOUT EGO.',
        'SHARE WHAT YOU LEARN.',
        'KEEP MOVING.',
        'NEVER STOP BEGINNING.'
      ]
    },
    {
      id: 'final-statement',
      index: '09',
      title: 'FINAL STATEMENT',
      opening: [
        'DAY ZERO is not a story about having already made it.',
        'It is a record of what happens while becoming.'
      ],
      becoming: [
        'The first idea.',
        'The first prototype.',
        'The first failure.',
        'The first lesson.',
        'The next iteration.',
        'The next product.',
        'The next question.'
      ],
      closing: [
        'There will always be another beginning.',
        'And every beginning has a Day Zero.'
      ]
    }
  ]
};

export const CHAPTERS_FULL_CONTENT = {
  '01': CHAPTER_01_CONTENT,
  '02': CHAPTER_02_CONTENT,
  '03': CHAPTER_03_CONTENT,
  '04': CHAPTER_04_CONTENT,
  '05': CHAPTER_05_CONTENT,
  '06': CHAPTER_06_CONTENT,
  '07': CHAPTER_07_CONTENT,
};



```
---

### File 5: `src/components/layout/Navigation.jsx`
```jsx
import React, { useState, useEffect } from 'react';
import { CHAPTERS_DATA, getScrollYForCanvasY, getCanvasYForScrollY } from '../../utils/chapters';

const CHAPTERS = CHAPTERS_DATA.map((ch) => ch.id);

export default function Navigation({ onLogoClick, currentView = 'home', activeChapterId = null, onNavigateView }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeChapter, setActiveChapter] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      if (currentView !== 'home') return;

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
  }, [currentView]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onLogoClick) {
      onLogoClick();
    } else if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToChapter = (chNum) => {
    if (currentView === 'chapter') {
      if (onNavigateView) onNavigateView('chapter', chNum);
      return;
    }

    if (currentView !== 'home' && onNavigateView) {
      onNavigateView('home', chNum);
      return;
    }

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
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex items-center gap-2 sm:gap-3 group text-left shrink-0 select-none cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
          title="Return to main page"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 relative flex items-center justify-center">
            <svg viewBox="0 0 600 600" className="w-7 h-7 sm:w-8 sm:h-8 overflow-visible">
              <g>
                <path d="M 85 300 L 515 300" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
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
        </button>


        {/* Film Chapter Selector & Products Switcher */}
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 sm:gap-2 bg-[#0B0B0B]/90 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 text-xs font-mono">
            <span className="text-white/30 text-[10px] tracking-widest uppercase hidden md:inline px-1">
              CHAPTER:
            </span>
            {CHAPTERS.map((num) => {
              const isActive = currentView === 'chapter' ? num === activeChapterId : (currentView === 'home' && num === activeChapter);
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

          {/* Subtly Integrated Technical / PRODUCTS Destination */}
          <button
            type="button"
            onClick={() => onNavigateView && onNavigateView(currentView === 'products' ? 'home' : 'products')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-full border font-mono text-[10px] sm:text-[11px] tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              currentView === 'products'
                ? 'bg-white text-black border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                : 'bg-[#0B0B0B]/90 text-white/70 border-white/15 hover:border-white/40 hover:text-white'
            }`}
            title="Toggle Products Index System"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${currentView === 'products' ? 'bg-black animate-pulse' : 'bg-white/60'}`} />
            <span>/ PRODUCTS</span>
          </button>
        </div>
      </div>
    </header>
  );
}

```
---

### File 6: `src/components/layout/Footer.jsx`
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

### File 7: `src/components/layout/BlueprintGrid.jsx`
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

### File 8: `src/components/layout/ContactSection.jsx`
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

### File 9: `src/components/motion/IntroSequence.jsx`
```jsx
/*  */import React, { useEffect, useLayoutEffect, useRef, useCallback, useState } from 'react';

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
                strokeWidth="3.5"
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

### File 10: `src/components/blueprint/BlueprintCanvas.jsx`
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

### File 11: `src/components/blueprint/ChapterContent.jsx`
```jsx
import React from 'react';
import { CHAPTERS_DATA } from '../../utils/chapters';

/**
 * ChapterContent renders editorial typography for Hero and Chapters 01 to 07,
 * positioned with comfortable medium spacing (5200px canvas height) and dynamic
 * scroll lighting transitions when the drawing head reaches each chapter.
 */
export default function ChapterContent({ currentPoint, onOpenContact, onNavigateChapter }) {
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
              className={`absolute right-[6%] sm:right-[8%] max-w-sm sm:max-w-md space-y-2.5 -translate-y-1/2 transition-all duration-400 ${isLit ? 'opacity-100 scale-100' : 'opacity-30 scale-[0.98]'
                }`}
            >
              {/* Chapter Number Badge */}
              <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
                <span
                  className={`px-2 py-0.5 rounded text-xs sm:text-sm font-semibold transition-all ${isLit ? 'bg-white text-black shadow-lg shadow-white/20' : 'bg-white/10 text-white/50'
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
                className={`font-display text-xl sm:text-3xl font-semibold tracking-tight leading-snug transition-all ${isLit ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]' : 'text-white/40'
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
                  onClick={() => {
                    if (onNavigateChapter) {
                      onNavigateChapter(ch.id);
                    } else if (onOpenContact) {
                      onOpenContact();
                    }
                  }}
                  className={`inline-flex items-center gap-2 text-xs font-mono tracking-wider group cursor-pointer transition-all ${isLit ? 'text-white hover:text-white/80 font-medium' : 'text-white/30'
                    }`}
                >
                  <span>{ch.ctaText || 'VIEW CHAPTER →'}</span>
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
            className={`absolute top-[5020px] left-[6%] sm:left-[8%] right-[6%] sm:right-[8%] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-16 border-t border-white/15 pt-10 transition-all duration-400 ${ctaLit ? 'opacity-100' : 'opacity-40'
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

### File 12: `src/components/blueprint/CinematicHomepage.jsx`
```jsx
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlueprintCanvas from './BlueprintCanvas';
import ChapterContent from './ChapterContent';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHomepage({ onOpenContact, onNavigateChapter }) {
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
          onNavigateChapter={onNavigateChapter}
        />
      </div>
    </div>
  );
}

```
---

### File 13: `src/components/blueprint/ChapterPage.jsx`
```jsx
import React, { useState, useEffect } from 'react';
import { CHAPTERS_DATA, CHAPTERS_FULL_CONTENT } from '../../utils/chapters';

/**
 * ChapterPage represents an isolated, dedicated editorial view for chapters.
 * Features comprehensive editorial layout, typography hierarchy, and technical
 * blueprint accents for Chapter 01 and Chapter 02.
 */
export default function ChapterPage({
  chapterId = '01',
  onBackToHome,
  onNavigateChapter,
  onOpenContact
}) {
  const chapter = CHAPTERS_DATA.find((c) => c.id === chapterId) || CHAPTERS_DATA[0];
  const fullContent = CHAPTERS_FULL_CONTENT[chapter.id];
  const [activeSection, setActiveSection] = useState(
    fullContent?.sections?.[0]?.id || 'origin'
  );

  // Synchronize search-facing SEO title, meta description, and primary topic
  useEffect(() => {
    if (!chapter) return;
    const title = chapter.seoTitle || `DAY ZERO — Chapter ${chapter.id} | ${chapter.title}`;
    const description = chapter.metaDescription || chapter.subtitle;

    document.title = title;

    // Update standard meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // Update Primary Topic tag
    if (chapter.primaryTopic) {
      let topicMeta = document.querySelector('meta[name="topic"]') || document.querySelector('meta[name="keywords"]');
      if (!topicMeta) {
        topicMeta = document.createElement('meta');
        topicMeta.name = 'keywords';
        document.head.appendChild(topicMeta);
      }
      topicMeta.setAttribute('content', `DAY ZERO, ${chapter.primaryTopic}, product building, engineering`);
    }
  }, [chapter]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (fullContent && fullContent.sections?.length > 0) {
      setActiveSection(fullContent.sections[0].id);
    }
  }, [chapterId, fullContent]);

  // Section observer to update sticky navigation highlight
  useEffect(() => {
    if (!fullContent) return;
    const sectionIds = fullContent.sections.map((s) => s.id);
    const handleScroll = () => {
      for (const sId of sectionIds) {
        const el = document.getElementById(sId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 100) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapterId, fullContent]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-[#F3F4F6] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 md:px-12 flex flex-col justify-between overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* ========================================================================= */}
      {/* TOP BREADCRUMB / BACK BAR                                                 */}
      {/* ========================================================================= */}
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-8 sm:mb-12">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="tracking-widest uppercase">BACK TO TIMELINE</span>
          </button>

          <div className="flex items-center gap-3 font-mono text-[11px] text-white/40">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-semibold tracking-wider">
              CHAPTER {chapter.id}
            </span>
            <span className="hidden sm:inline text-white/20">/</span>
            <span className="hidden sm:inline uppercase tracking-wider text-white/70">
              {chapter.title}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHAPTER HEADER BRIEF                                                      */}
        {/* ========================================================================= */}
        <header className="max-w-4xl space-y-4 pt-2 sm:pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#0B0B0B] border border-white/15 text-[10px] font-mono text-white/70 tracking-widest uppercase">
              <span>INDEX // 0{chapter.id}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase border-l border-white/15 pl-3">
              CHAPTER {chapter.id} • DOCUMENTARY ESSAY
            </span>
            {chapter.primaryTopic && (
              <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase border-l border-white/15 pl-3 hidden md:inline">
                TOPIC: {chapter.primaryTopic}
              </span>
            )}
            <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase hidden sm:inline">
              EST. READ 3 MIN
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-none">
            {chapter.title}
          </h1>

          <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl leading-relaxed">
            {chapter.subtitle}
          </p>
        </header>

        {/* ========================================================================= */}
        {/* MAIN EDITORIAL CONTENT                                                    */}
        {/* ========================================================================= */}
        {fullContent ? (
          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Desktop Sticky Index / Table of Contents */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-6">
              <div className="p-5 border border-white/10 rounded-lg bg-[#0B0B0B]/60 backdrop-blur-sm space-y-4">
                <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase pb-2 border-b border-white/10 flex items-center justify-between">
                  <span>CHAPTER INDEX</span>
                  <span>CH.{chapter.id}</span>
                </div>
                <nav className="space-y-1.5 font-mono text-xs">
                  {fullContent.sections.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left py-1.5 px-2 rounded transition-all flex items-center justify-between cursor-pointer ${
                        activeSection === sec.id
                          ? 'bg-white text-black font-semibold'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="truncate">{sec.index}. {sec.title}</span>
                      <span className="text-[10px] opacity-60">→</span>
                    </button>
                  ))}
                </nav>

                <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-white/30 space-y-1">
                  <p>COORDINATE: {chapter.id === '01' ? '500.750' : chapter.id === '02' ? '450.1400' : `${chapter.yPos}.000`}</p>
                  {chapter.primaryTopic && (
                    <p className="text-white/50">TOPIC: {chapter.primaryTopic}</p>
                  )}
                  <p>STATUS: VERIFIED FIELD LOG</p>
                </div>
              </div>

              <div className="p-4 border border-white/10 rounded-lg bg-[#0B0B0B]/30 text-xs font-mono text-white/40 space-y-2">
                <div className="flex items-center gap-2 text-white/80">
                  <span className="w-2 h-2 rounded-full bg-white/80" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">THE DAY ZERO LOG</span>
                </div>
                <p className="text-[11px] leading-relaxed text-white/40">
                  Documenting the messy, honest, raw beginning of products and builders before the spotlight arrives.
                </p>
              </div>
            </aside>

            {/* Main Editorial Reading Column */}
            <div className="lg:col-span-9 space-y-16 sm:space-y-20 max-w-3xl">

              {/* ================================================================= */}
              {/* CHAPTER 01 SPECIFIC SECTIONS                                      */}
              {/* ================================================================= */}
              {chapter.id === '01' && (
                <>
                  {/* SECTION 01: THE ORIGIN */}
                  <section id="origin" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // CONCEPTION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE ORIGIN
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Every product starts before there is a product.
                      </p>
                      <p>There is an idea.</p>
                      <p>A question.</p>
                      <p>A problem that keeps coming back.</p>
                      <p className="text-white/70">
                        Sometimes there is only a rough thought that doesn't yet have a name.
                      </p>
                    </div>

                    <div className="mt-6 p-6 sm:p-8 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-blueprint-dense opacity-20 pointer-events-none" />
                      <p className="relative z-10 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        That is where DAY ZERO begins.
                      </p>
                      <div className="relative z-10 space-y-1.5 text-sm sm:text-base font-light text-white/75">
                        <p className="text-white/50">Not at launch.</p>
                        <p className="text-white/50">Not at the first customer.</p>
                        <p className="text-white/50">Not at the polished version.</p>
                        <p className="pt-2 font-medium text-white">
                          At the point where an idea becomes a commitment to find out what it could become.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 02: THE FIRST COMMIT */}
                  <section id="first-commit" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // TANGIBLE MANIFESTATION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE FIRST COMMIT
                    </h2>

                    <p className="text-lg sm:text-xl font-medium text-white">
                      The first commit is rarely impressive.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {[
                        'It might be an empty repository.',
                        'A rough sketch.',
                        'A paragraph of notes.',
                        'A prototype that barely works.',
                        'A conversation that turns into a question worth exploring.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-3.5 rounded border border-white/10 bg-[#0B0B0B]/50 font-mono text-xs text-white/70 flex items-start gap-3 ${
                            idx === 4 ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <span className="text-white/40 font-semibold">0{idx + 1}.</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed pt-2">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        But it changes something.
                      </p>
                      <p className="text-white/80">
                        An idea that existed only in your head now has a physical form.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03]">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">POSSIBILITY // 01</span>
                        <p className="text-sm sm:text-base font-medium text-white">Something can be tested.</p>
                      </div>
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03]">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">POSSIBILITY // 02</span>
                        <p className="text-sm sm:text-base font-medium text-white">Something can be questioned.</p>
                      </div>
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03]">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">POSSIBILITY // 03</span>
                        <p className="text-sm sm:text-base font-medium text-white">Something can fail.</p>
                      </div>
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03]">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">POSSIBILITY // 04</span>
                        <p className="text-sm sm:text-base font-medium text-white">And because it can fail, it can also improve.</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-1.5 font-display text-lg sm:text-xl font-bold tracking-tight text-white uppercase">
                      <p>That is the significance of Day Zero.</p>
                      <p className="text-white/60">It is the moment possibility becomes a process.</p>
                    </div>
                  </section>

                  {/* SECTION 03: WHY THE BEGINNING MATTERS */}
                  <section id="why-the-beginning-matters" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // PERSPECTIVE
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHY THE BEGINNING MATTERS
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-white/70">
                        The beginning is often treated as the least interesting part of a product story.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-white/50 py-2">
                        <span className="p-2.5 rounded bg-white/5 border border-white/10 text-center">Nothing polished to show</span>
                        <span className="p-2.5 rounded bg-white/5 border border-white/10 text-center">No impressive numbers</span>
                        <span className="p-2.5 rounded bg-white/5 border border-white/10 text-center">No finished interface</span>
                        <span className="p-2.5 rounded bg-white/5 border border-white/10 text-center">No success story</span>
                      </div>
                      <p className="text-lg sm:text-xl font-medium text-white pt-2">
                        But the beginning contains something that the finished product cannot show on its own: how the decisions were made.
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider block">
                        FOUNDATION INQUIRIES
                      </span>
                      <div className="space-y-2">
                        {[
                          'Why was this idea chosen?',
                          'What problem was being explored?',
                          'What assumptions existed?',
                          'What did we believe would happen?',
                          'What turned out to be wrong?',
                        ].map((q, qIdx) => (
                          <div
                            key={qIdx}
                            className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 text-sm sm:text-base font-mono text-white/90"
                          >
                            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
                              Q{qIdx + 1}
                            </span>
                            <span>{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-base sm:text-lg font-medium text-white pt-1">
                      Those questions become the foundation of everything that follows.
                    </p>
                  </section>

                  {/* SECTION 04: THE DAY ZERO PRINCIPLE */}
                  <section id="the-day-zero-principle" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // METHODOLOGY
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE DAY ZERO PRINCIPLE
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        We don't believe you need to know the entire path before taking the first step.
                      </p>
                      <p className="text-white/70">
                        You need enough clarity to begin.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      <div className="p-4 sm:p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase">STEP 01</span>
                        <p className="font-mono text-sm sm:text-base text-white font-medium">
                          Then the work creates information.
                        </p>
                      </div>
                      <div className="p-4 sm:p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase">STEP 02</span>
                        <p className="font-mono text-sm sm:text-base text-white font-medium">
                          Information changes decisions.
                        </p>
                      </div>
                      <div className="p-4 sm:p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase">STEP 03</span>
                        <p className="font-mono text-sm sm:text-base text-white font-medium">
                          Decisions shape the next iteration.
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-white text-black font-display font-bold text-xl sm:text-2xl space-y-1">
                      <p>The path becomes clearer by moving through it.</p>
                      <p className="text-black/70 text-base sm:text-lg font-mono font-medium">
                        That is how products are built.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 05: WHAT WE DOCUMENT */}
                  <section id="what-we-document" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // ARCHIVAL PROTOCOL
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHAT WE DOCUMENT
                    </h2>

                    <p className="text-base sm:text-lg text-white/70 font-light">
                      At the beginning of a project, we want to capture:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'The original idea',
                        'The problem being explored',
                        'The assumptions behind it',
                        'Early research',
                        'Initial sketches',
                        'First prototypes',
                        'Early technical decisions',
                        'Questions we don\'t yet have answers to',
                        'What changes as we learn',
                      ].map((docItem, docIdx) => (
                        <div
                          key={docIdx}
                          className={`p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/85 ${
                            docIdx === 8 ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <span className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center text-[9px] text-white/50 shrink-0">
                            ✓
                          </span>
                          <span>{docItem}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-2">
                      <p className="text-base sm:text-lg text-white/60 font-light">
                        The goal isn't to make the beginning look impressive.
                      </p>
                      <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        The goal is to make it visible.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 06: THE FIRST COMMIT (CLOSING) */}
                  <section id="the-closing-commit" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE // MANIFESTO
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        THE FIRST COMMIT
                      </h2>
                      <p className="text-xl sm:text-2xl font-light text-white/70">
                        There is always a first commit.
                      </p>
                      <p className="font-display text-3xl sm:text-6xl font-bold tracking-tight text-white uppercase drop-shadow-[0_0_24px_rgba(255,255,255,0.4)]">
                        Ours is DAY ZERO.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('02');
                        }}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">START THE JOURNEY</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>INITIATE DAY ZERO</span>
                        <span>↗</span>
                      </button>

                      <button
                        type="button"
                        onClick={onBackToHome}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>TIMELINE</span>
                        <span>↑</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

              {/* ================================================================= */}
              {/* CHAPTER 02 SPECIFIC SECTIONS                                      */}
              {/* ================================================================= */}
              {chapter.id === '02' && (
                <>
                  {/* SECTION 01: THE FINISHED VERSION HIDES THE PROCESS */}
                  <section id="hiding-the-process" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // THE ILLUSION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE FINISHED VERSION HIDES THE PROCESS
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Most product stories begin near the end.
                      </p>
                    </div>

                    {/* The 5 Premade Assumptions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {[
                        'The product exists.',
                        'The interface is polished.',
                        'The launch has happened.',
                        'The difficult decisions have already been made.',
                        'The messy versions have disappeared.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-3.5 rounded border border-white/10 bg-[#0B0B0B]/50 font-mono text-xs text-white/70 flex items-center gap-3 ${
                            idx === 4 ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <span className="text-white/40 font-semibold">0{idx + 1}.</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Reality Contrast Card */}
                    <div className="mt-6 p-6 sm:p-8 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-blueprint-dense opacity-20 pointer-events-none" />
                      <p className="relative z-10 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        But that isn't what building actually looks like.
                      </p>
                      <p className="relative z-10 text-base sm:text-lg font-medium text-white">
                        Building is uncertain.
                      </p>
                      <p className="relative z-10 text-sm sm:text-base font-light text-white/80 leading-relaxed pt-1">
                        It involves incomplete information, competing ideas, failed experiments, technical limitations, changing assumptions, and decisions that only make sense after you learn something new.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 02: THE MISSING STORY */}
                  <section id="the-missing-story" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // THE UNSEEN CONTEXT
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE MISSING STORY
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-white/80">
                        When we only see the final result, we lose the context around it.
                      </p>
                      <p className="font-medium text-white pt-2">
                        We don't see:
                      </p>
                    </div>

                    {/* 6 What We Don't See Points */}
                    <div className="space-y-2">
                      {[
                        'Why one idea was rejected.',
                        'Why a prototype was rebuilt.',
                        'Why a feature was removed.',
                        'Why a technical approach changed.',
                        'Why an experiment failed.',
                        'Why the team decided to continue.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 text-sm sm:text-base font-mono text-white/90"
                        >
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
                            0{idx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Takeaway Card */}
                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2 font-display">
                      <p className="text-base sm:text-lg text-white/70">
                        The finished product tells us what exists.
                      </p>
                      <p className="text-base sm:text-lg text-white/70">
                        The process tells us why it exists.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase pt-1 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                        DAY ZERO is interested in the second story.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 03: FAILURE IS INFORMATION */}
                  <section id="failure-is-information" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // KNOWLEDGE EXTRACTION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      FAILURE IS INFORMATION
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        A failed experiment isn't automatically wasted work.
                      </p>
                      <p className="text-white/70">
                        It tells you something.
                      </p>
                    </div>

                    {/* The 5 "Perhaps" Diagnostics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {[
                        'Perhaps the assumption was wrong.',
                        'Perhaps the problem wasn\'t important enough.',
                        'Perhaps the implementation was flawed.',
                        'Perhaps the timing was wrong.',
                        'Perhaps the idea needs to change.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded border border-white/15 bg-white/[0.03] flex items-start gap-3 ${
                            idx === 4 ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <span className="text-[10px] font-mono text-white/40 px-1.5 py-0.5 rounded bg-white/10 shrink-0">
                            P0{idx + 1}
                          </span>
                          <span className="text-sm sm:text-base font-medium text-white/90">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Shift / Pivot Query Card */}
                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/20 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest block">
                          THE USEFUL QUESTION ISN'T:
                        </span>
                        <p className="font-mono text-lg sm:text-xl text-white/40 line-through">
                          "Did this fail?"
                        </p>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-white/10">
                        <span className="text-[11px] font-mono text-white/60 uppercase tracking-widest block">
                          THE USEFUL QUESTION IS:
                        </span>
                        <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                          "What did this teach us?"
                        </p>
                      </div>
                    </div>

                    <div className="p-5 rounded-lg bg-white text-black font-display font-bold text-lg sm:text-xl">
                      That shift turns failure from something to hide into something to document.
                    </div>
                  </section>

                  {/* SECTION 04: THE COST OF HIDING THE PROCESS */}
                  <section id="cost-of-hiding" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // THE DECEPTIVE MYTH
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE COST OF HIDING THE PROCESS
                    </h2>

                    <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
                      When only successful outcomes are visible, building can look deceptively simple.
                    </p>

                    {/* The Linear Illusion Chain */}
                    <div className="p-4 sm:p-5 rounded-lg bg-[#0B0B0B] border border-white/10 space-y-3">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">
                        THE DECEPTIVE LINEAR STORY
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-white/60">
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">Someone has an idea.</span>
                        <span>→</span>
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">They build it.</span>
                        <span>→</span>
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">It works.</span>
                        <span>→</span>
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">People use it.</span>
                        <span>→</span>
                        <span className="px-2.5 py-1 rounded bg-white/10 border border-white/10 text-white/40">The story ends.</span>
                      </div>
                    </div>

                    {/* The Ground Truth */}
                    <div className="space-y-3 pt-2">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Real product development is rarely that clean.
                      </p>
                      <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
                        The distance between an idea and a working product is filled with decisions.
                      </p>
                      <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        DAY ZERO exists to make that distance visible.
                      </div>
                    </div>
                  </section>

                  {/* SECTION 05: WHAT WE WANT TO SHOW */}
                  <section id="what-we-want-to-show" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // RAW ARTIFACTS
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHAT WE WANT TO SHOW
                    </h2>

                    {/* 8 Raw Artifacts Ledger */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'The rejected version.',
                        'The rough version.',
                        'The confusing version.',
                        'The experiment that didn\'t work.',
                        'The question that changed the direction.',
                        'The technical problem that took longer than expected.',
                        'The decision that looked obvious only afterwards.',
                        'The iteration that finally moved things forward.',
                      ].map((docItem, docIdx) => (
                        <div
                          key={docIdx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/85"
                        >
                          <span className="text-[10px] font-mono text-white/40 px-1.5 py-0.5 rounded bg-white/10 shrink-0">
                            RAW-0{docIdx + 1}
                          </span>
                          <span>{docItem}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-1.5 font-display">
                      <p className="text-base sm:text-lg text-white/60 font-light">
                        This is not a collection of mistakes.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        It is the record of building.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 06: THE PROBLEM WE ARE SOLVING */}
                  <section id="the-problem-we-are-solving" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE // THE MISSION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-4">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        THE PROBLEM WE ARE SOLVING
                      </h2>
                      <p className="text-lg sm:text-xl font-light text-white/80 leading-relaxed">
                        There is already plenty of information about how successful products look.
                      </p>
                      <p className="text-xl sm:text-2xl font-medium text-white leading-relaxed">
                        We want to document what it takes to make them real.
                      </p>
                      <p className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase pt-2 drop-shadow-[0_0_24px_rgba(255,255,255,0.4)]">
                        That means treating the process itself as something worth learning from.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('03');
                        }}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">SEE THE PROCESS</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('01');
                        }}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>← CHAPTER 01</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>INITIATE DAY ZERO</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

              {/* ================================================================= */}
              {/* CHAPTER 03 SPECIFIC SECTIONS                                      */}
              {/* ================================================================= */}
              {chapter.id === '03' && (
                <>
                  {/* SECTION 01: EVERY JOURNEY HAS A DAY ZERO */}
                  <section id="every-journey-has-a-day-zero" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // THE BELIEF
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      EVERY JOURNEY HAS A DAY ZERO
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-white/70">
                        DAY ZERO is built around a simple belief:
                      </p>
                      <p className="font-display text-xl sm:text-3xl font-bold tracking-tight text-white uppercase pt-1">
                        the beginning matters.
                      </p>
                    </div>

                    {/* 4 Universal Beginnings Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        'Every product has a point where nothing is certain yet.',
                        'Every builder has a first project.',
                        'Every engineer has a first system they had to figure out.',
                        'Every creator has a first piece of work that wasn\'t quite what they wanted.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded border border-white/15 bg-white/[0.03] space-y-1.5"
                        >
                          <span className="text-[10px] font-mono text-white/40 uppercase">
                            ORIGIN // 0{idx + 1}
                          </span>
                          <p className="text-sm sm:text-base font-medium text-white/90 leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Core Conviction Callout */}
                    <div className="p-6 sm:p-8 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-blueprint-dense opacity-20 pointer-events-none" />
                      <p className="relative z-10 text-base sm:text-lg font-light text-white/70">
                        Those beginnings are not evidence that someone is inexperienced.
                      </p>
                      <p className="relative z-10 font-display text-xl sm:text-3xl font-bold tracking-tight text-white uppercase drop-shadow-[0_0_16px_rgba(255,255,255,0.4)]">
                        They are evidence that they started.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 02: BUILDING IS A LEARNING PROCESS */}
                  <section id="building-is-a-learning-process" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // THE CONTINUOUS LOOP
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      BUILDING IS A LEARNING PROCESS
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-white/70">
                        We don't see product development as a straight line.
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-white uppercase font-mono">
                        It is a loop.
                      </p>
                    </div>

                    {/* The 6 Loop Stages */}
                    <div className="space-y-2 pt-2">
                      {[
                        { label: 'COMMIT', desc: 'Decide that the problem is worth exploring.' },
                        { label: 'BUILD', desc: 'Turn the idea into something tangible.' },
                        { label: 'TEST', desc: 'Put assumptions under pressure.' },
                        { label: 'LEARN', desc: 'Pay attention to what actually happens.' },
                        { label: 'ITERATE', desc: 'Change the product based on what was learned.' },
                        { label: 'BUILD AGAIN', desc: 'Return to the problem with better information.' },
                      ].map((st, idx) => (
                        <React.Fragment key={st.label}>
                          <div className="p-4 rounded bg-[#0B0B0B] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/60">
                                0{idx + 1}
                              </span>
                              <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                                {st.label}
                              </span>
                            </div>
                            <span className="text-xs sm:text-sm font-light text-white/75 sm:text-right">
                              {st.desc}
                            </span>
                          </div>
                          {idx < 5 && (
                            <div className="flex justify-center text-white/30 font-mono text-xs py-0.5">
                              ↓
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <p className="text-base sm:text-lg font-mono font-medium text-white/90 pt-1">
                      That cycle continues.
                    </p>
                  </section>

                  {/* SECTION 03: COMMITMENT */}
                  <section id="commitment" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // INITIATION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      COMMITMENT
                    </h2>

                    <div className="space-y-4 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Commitment is not certainty.
                      </p>
                      <p className="text-white/80">
                        It is choosing to begin despite uncertainty.
                      </p>
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-3 font-display">
                      <p className="text-base sm:text-lg text-white/60">
                        You don't commit because you know the outcome.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        You commit because the question is worth answering.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 04: DISCIPLINE */}
                  <section id="discipline" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // SYSTEMATIZATION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      DISCIPLINE
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Ideas are easy to start.
                      </p>
                      <p className="text-white/80">
                        Progress requires consistency.
                      </p>
                      <p className="text-white/70 pt-1">
                        Documentation, testing, iteration and reflection only become valuable when they become part of the process.
                      </p>
                    </div>

                    <div className="p-5 rounded-lg bg-white text-black font-display font-bold text-lg sm:text-xl">
                      Discipline turns occasional effort into a system for learning.
                    </div>
                  </section>

                  {/* SECTION 05: LEARNING */}
                  <section id="learning" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // ABSORPTION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      LEARNING
                    </h2>

                    <p className="text-lg sm:text-xl font-medium text-white">
                      Every experiment should leave you knowing something you didn't know before.
                    </p>

                    {/* Binary Insights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03]">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">OUTCOME // 01</span>
                        <p className="text-sm sm:text-base font-medium text-white">Sometimes that knowledge confirms the direction.</p>
                      </div>
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03]">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">OUTCOME // 02</span>
                        <p className="text-sm sm:text-base font-medium text-white">Sometimes it changes it.</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      <p className="font-mono text-base font-medium text-white">
                        Both are useful.
                      </p>
                      <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-1.5">
                        <p className="text-base sm:text-lg text-white/60 font-light">
                          Learning is not a separate stage after building.
                        </p>
                        <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                          It is part of building.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 06: ITERATION */}
                  <section id="iteration" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // EVOLUTION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      ITERATION
                    </h2>

                    <p className="text-lg sm:text-xl font-medium text-white">
                      The first version is a starting point, not a verdict.
                    </p>

                    {/* Step rail */}
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm text-white/70 py-2">
                      <span className="px-3 py-1.5 rounded bg-white/5 border border-white/15 text-white">Build.</span>
                      <span>→</span>
                      <span className="px-3 py-1.5 rounded bg-white/5 border border-white/15 text-white">Observe.</span>
                      <span>→</span>
                      <span className="px-3 py-1.5 rounded bg-white/5 border border-white/15 text-white">Question.</span>
                      <span>→</span>
                      <span className="px-3 py-1.5 rounded bg-white/5 border border-white/15 text-white">Change.</span>
                      <span>→</span>
                      <span className="px-3 py-1.5 rounded bg-white text-black font-bold">Build again.</span>
                    </div>

                    <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase pt-1">
                      Iteration is how an idea becomes a product.
                    </p>
                  </section>

                  {/* SECTION 07: GROWTH */}
                  <section id="growth" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        07
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // MATURATION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      GROWTH
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-white/70">
                        Growth is not only about scale.
                      </p>
                      <p className="text-lg sm:text-xl font-medium text-white">
                        It is also about understanding.
                      </p>
                    </div>

                    {/* 6 Dimensions of Growth */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {[
                        'A better question.',
                        'A better system.',
                        'A better prototype.',
                        'A better decision.',
                        'A better explanation.',
                        'A better version than the one before.',
                      ].map((dim, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
                            +
                          </span>
                          <span>{dim}</span>
                        </div>
                      ))}
                    </div>

                    <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase pt-2">
                      That is progress.
                    </p>
                  </section>

                  {/* SECTION 08: OUR PRINCIPLE */}
                  <section id="our-principle" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        08
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE // THE PRINCIPLE
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        OUR PRINCIPLE
                      </h2>
                      <p className="font-display text-3xl sm:text-6xl font-bold tracking-tight text-white uppercase drop-shadow-[0_0_24px_rgba(255,255,255,0.4)]">
                        START BEFORE YOU FEEL READY.
                      </p>
                      <p className="text-xl sm:text-2xl font-light text-white/70 pt-2">
                        Then let the work teach you what comes next.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('04');
                        }}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">EXPLORE THE PRINCIPLES</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('02');
                        }}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>← CHAPTER 02</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>INITIATE DAY ZERO</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

              {/* ================================================================= */}
              {/* CHAPTER 04 SPECIFIC SECTIONS                                      */}
              {/* ================================================================= */}
              {chapter.id === '04' && (
                <>
                  {/* SECTION 01: THE PROCESS IS PART OF THE PRODUCT */}
                  <section id="process-is-product" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // CORE PARADIGM
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE PROCESS IS PART OF THE PRODUCT
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Building in public means sharing the process while it is still happening.
                      </p>
                    </div>

                    {/* Exclusions */}
                    <div className="space-y-1.5 font-mono text-xs text-white/40">
                      <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-1">
                        BEYOND THE HIGHLIGHT REEL
                      </span>
                      <p className="line-through">Not only the finished work.</p>
                      <p className="line-through">Not only the successful experiments.</p>
                      <p className="line-through">Not only the moments worth celebrating.</p>
                    </div>

                    {/* The 7 Process Elements */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2">
                      {[
                        'The process.',
                        'The research.',
                        'The prototypes.',
                        'The decisions.',
                        'The failures.',
                        'The iterations.',
                        'The lessons.',
                      ].map((elem, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded bg-[#0B0B0B] border border-white/15 text-center font-mono text-xs text-white/90 font-medium"
                        >
                          {elem}
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                      DAY ZERO is built around this approach.
                    </div>
                  </section>

                  {/* SECTION 02: WHY DOCUMENT THE PROCESS? */}
                  <section id="why-document" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // THE RECORD
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHY DOCUMENT THE PROCESS?
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Documentation creates a record.
                      </p>
                      <p className="text-white/70">
                        Without it, decisions disappear into memory.
                      </p>
                    </div>

                    {/* 4 Disappearing Realities */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {[
                        'A prototype gets replaced.',
                        'A rejected idea gets forgotten.',
                        'A technical problem gets solved and its context disappears.',
                        'A lesson is learned but never written down.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/80"
                        >
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/50">
                            0{idx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Anchor Callout */}
                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2 font-display">
                      <p className="text-base sm:text-lg text-white/60 font-light">
                        Documentation gives those moments somewhere to live.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        It creates a record that can be revisited, understood and shared.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 03: BUILDING IN PUBLIC IS NOT PERFORMING */}
                  <section id="not-performing" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // HONESTY OVER THEATER
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      BUILDING IN PUBLIC IS NOT PERFORMING
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-white/80">
                        There is a difference between documenting work and creating content about work.
                      </p>
                      <p className="font-display text-xl sm:text-2xl font-bold text-white uppercase pt-1">
                        DAY ZERO is interested in the former.
                      </p>
                    </div>

                    {/* Anti-hype Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-white/50 py-1">
                      <span className="p-3 rounded bg-white/5 border border-white/10 text-center">The goal is not to make every moment look exciting.</span>
                      <span className="p-3 rounded bg-white/5 border border-white/10 text-center">The goal is not to manufacture progress.</span>
                      <span className="p-3 rounded bg-white text-black font-bold text-center">The goal is to show what actually happened.</span>
                    </div>

                    {/* 3 Ground Rules */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider block">
                        THE THREE TRUTH CONDITIONS
                      </span>
                      {[
                        'If an experiment fails, the record should say it failed.',
                        'If an assumption changes, the record should show why.',
                        'If a prototype gets abandoned, that decision is part of the story.',
                      ].map((rule, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center text-[9px] text-white/60 shrink-0">
                            ✓
                          </span>
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-lg bg-white text-black font-display font-bold text-lg sm:text-xl">
                      Honest documentation is more useful than polished performance.
                    </div>
                  </section>

                  {/* SECTION 04: THE DAY ZERO BUILD LOOP */}
                  <section id="build-loop" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // THE OPERATIONAL LOOP
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE DAY ZERO BUILD LOOP
                    </h2>

                    {/* 6-Stage Loop Matrix */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      {[
                        {
                          num: '01',
                          name: 'RESEARCH',
                          points: ['Understand the problem.', 'Find what is already known.', 'Identify assumptions.', 'Ask better questions.']
                        },
                        {
                          num: '02',
                          name: 'PROTOTYPE',
                          points: ['Turn an idea into something tangible.', 'It doesn\'t need to be perfect.', 'It needs to be testable.']
                        },
                        {
                          num: '03',
                          name: 'TEST',
                          points: ['Put the assumption under pressure.', 'Observe what happens.', 'Look for evidence.']
                        },
                        {
                          num: '04',
                          name: 'ITERATE',
                          points: ['Keep what works.', 'Change what doesn\'t.', 'Remove what isn\'t necessary.']
                        },
                        {
                          num: '05',
                          name: 'DOCUMENT',
                          points: ['Record what happened.', 'What changed?', 'Why did it change?', 'What did we learn?']
                        },
                        {
                          num: '06',
                          name: 'SHARE',
                          points: ['Make the useful parts accessible to others.', 'Then begin again.']
                        },
                      ].map((stage) => (
                        <div
                          key={stage.num}
                          className="p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-3 flex flex-col justify-between"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-mono text-white/40">
                              <span>STAGE</span>
                              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white font-semibold">{stage.num}</span>
                            </div>
                            <h3 className="font-mono text-base sm:text-lg font-bold text-white tracking-wider">
                              {stage.name}
                            </h3>
                          </div>
                          <div className="space-y-1.5 pt-2 border-t border-white/10 font-mono text-xs text-white/70">
                            {stage.points.map((pt, pIdx) => (
                              <p key={pIdx} className="leading-relaxed flex items-start gap-1.5">
                                <span className="text-white/30">•</span>
                                <span>{pt}</span>
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SECTION 05: WHAT WE SHARE */}
                  <section id="what-we-share" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // ARCHIVAL TAXONOMY
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHAT WE SHARE
                    </h2>

                    <p className="text-base sm:text-lg text-white/70 font-light">
                      DAY ZERO can become a record of:
                    </p>

                    {/* 10 Archival Categories */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Product experiments',
                        'Engineering projects',
                        'Prototype development',
                        'Research',
                        'Technical decisions',
                        'Design iterations',
                        'Failed approaches',
                        'Build logs',
                        'Lessons learned',
                        'Product development case studies',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/85"
                        >
                          <span className="text-[10px] font-mono text-white/40 px-1.5 py-0.5 rounded bg-white/10 shrink-0">
                            CAT-0{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Work First Principle */}
                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-1.5 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                      <p>The work comes first.</p>
                      <p className="text-white/60">The documentation follows the work.</p>
                    </div>
                  </section>

                  {/* SECTION 06: WHY IT MATTERS */}
                  <section id="why-it-matters" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // IMPACT & INSPIRATION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHY IT MATTERS
                    </h2>

                    <p className="text-lg sm:text-xl font-medium text-white">
                      Someone else is always standing at their own beginning.
                    </p>

                    {/* 4 Impact Statements */}
                    <div className="space-y-2.5">
                      {[
                        'If they can see the unfinished work, they can understand that uncertainty is normal.',
                        'If they can see the failed experiment, they can learn from it.',
                        'If they can see the iteration, they can understand the process.',
                        'And if they can see someone start, perhaps they will start too.',
                      ].map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-4 rounded border border-white/10 bg-[#0B0B0B]/60 font-mono text-xs sm:text-sm text-white/85 flex items-center gap-3 ${
                            sIdx === 3 ? 'border-white/30 bg-white/[0.04] text-white font-semibold' : ''
                          }`}
                        >
                          <span className="text-white/40 font-semibold">0{sIdx + 1}.</span>
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SECTION 07: THE DAY ZERO RULE */}
                  <section id="the-day-zero-rule" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        07
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE // THE RULE
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        THE DAY ZERO RULE
                      </h2>
                      <p className="font-display text-2xl sm:text-4xl font-light text-white/60 uppercase">
                        DON'T JUST SHOW WHAT WORKED.
                      </p>
                      <p className="font-display text-3xl sm:text-6xl font-bold tracking-tight text-white uppercase drop-shadow-[0_0_24px_rgba(255,255,255,0.4)]">
                        SHOW WHAT YOU LEARNED.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('05');
                        }}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">ENTER THE BUILD LOG</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('03');
                        }}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>← CHAPTER 03</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>INITIATE DAY ZERO</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

              {/* ================================================================= */}
              {/* CHAPTER 05 SPECIFIC SECTIONS                                      */}
              {/* ================================================================= */}
              {chapter.id === '05' && (
                <>
                  {/* SECTION 01: THE WORK IS HAPPENING NOW */}
                  <section id="work-is-happening-now" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // ACTIVE INITIATIVES
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE WORK IS HAPPENING NOW
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        DAY ZERO is not a retrospective project.
                      </p>
                      <p className="text-white/80">
                        It is an ongoing system for building.
                      </p>
                      <p className="text-white/70">
                        The current missions are the products, engineering projects, experiments and ideas moving through that system.
                      </p>
                    </div>

                    {/* 4 Mission Paths */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        'Some will become products.',
                        'Some will remain experiments.',
                        'Some will change direction.',
                        'Some may be abandoned.',
                      ].map((pathItem, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded border border-white/15 bg-white/[0.03] flex items-center gap-3"
                        >
                          <span className="text-[10px] font-mono text-white/40 px-2 py-0.5 rounded bg-white/10 shrink-0">
                            PATH 0{idx + 1}
                          </span>
                          <span className="text-sm sm:text-base font-medium text-white/90">
                            {pathItem}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                      That is part of the process.
                    </div>
                  </section>

                  {/* SECTION 02: EVERY MISSION STARTS WITH A PROBLEM */}
                  <section id="starts-with-a-problem" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // THE ROOT PROBLEM
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      EVERY MISSION STARTS WITH A PROBLEM
                    </h2>

                    <p className="text-lg sm:text-xl font-medium text-white">
                      Before there is a roadmap, there should be a reason to build.
                    </p>

                    {/* 5 Problem Inquiries */}
                    <div className="space-y-2 pt-1">
                      {[
                        'What problem are we exploring?',
                        'Who experiences it?',
                        'Why does it matter?',
                        'What do we currently believe?',
                        'What don\'t we know?',
                      ].map((q, qIdx) => (
                        <div
                          key={qIdx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 text-sm sm:text-base font-mono text-white/90"
                        >
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
                            Q0{qIdx + 1}
                          </span>
                          <span>{q}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-1.5 font-display text-lg sm:text-xl">
                      <p className="text-white/60">The first objective isn't to build everything.</p>
                      <p className="font-bold text-white uppercase">
                        It is to understand enough to make the next useful decision.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 03: FROM IDEA TO MISSION */}
                  <section id="from-idea-to-mission" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // NON-LINEAR STATES
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      FROM IDEA TO MISSION
                    </h2>

                    <p className="text-base sm:text-lg text-white/80 font-light">
                      A DAY ZERO mission can move through several states:
                    </p>

                    {/* 6 Mission States */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                      {[
                        { name: 'QUESTION', desc: 'Something is worth exploring.' },
                        { name: 'RESEARCH', desc: 'We investigate the problem and existing possibilities.' },
                        { name: 'PROTOTYPE', desc: 'We create an early version that can be tested.' },
                        { name: 'EXPERIMENT', desc: 'We test an assumption.' },
                        { name: 'ITERATION', desc: 'We change the system based on evidence.' },
                        { name: 'PRODUCT', desc: 'An idea becomes something people can actually use.' },
                      ].map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-4 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs font-mono text-white/40">
                            <span>STATE</span>
                            <span className="px-1.5 py-0.5 rounded bg-white/10 text-white font-semibold">0{sIdx + 1}</span>
                          </div>
                          <h3 className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                            {st.name}
                          </h3>
                          <p className="font-mono text-xs text-white/70 leading-relaxed pt-1">
                            {st.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Non-Linear Callout */}
                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2 font-display">
                      <p className="text-lg sm:text-xl font-bold text-white uppercase">
                        These states are not necessarily linear.
                      </p>
                      <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                        A mission can move backwards. A prototype can return to research. A product can become an experiment again.
                      </p>
                      <p className="text-base sm:text-lg font-bold text-white uppercase pt-1">
                        That is normal.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 04: WHAT COUNTS AS PROGRESS? */}
                  <section id="what-counts-as-progress" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // DEFINING SUCCESS
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHAT COUNTS AS PROGRESS?
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Progress isn't only shipping.
                      </p>
                      <p className="text-white/70">
                        Progress can be:
                      </p>
                    </div>

                    {/* 6 Forms of Progress */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Discovering that an assumption was wrong.',
                        'Removing an unnecessary feature.',
                        'Finding a simpler technical approach.',
                        'Understanding a user\'s problem better.',
                        'Building a prototype that answers an important question.',
                        'Documenting a lesson that prevents the same mistake later.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
                            +
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-lg bg-white text-black font-display font-bold text-xl sm:text-2xl">
                      Progress is better information.
                    </div>
                  </section>

                  {/* SECTION 05: THE MISSION LOG */}
                  <section id="the-mission-log" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // ARCHIVAL SCHEMA
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE MISSION LOG
                    </h2>

                    <p className="text-base sm:text-lg text-white/70 font-light">
                      Every active project should eventually have a visible record.
                    </p>

                    {/* Schema Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { field: 'MISSION', prompt: 'What are we building?' },
                        { field: 'PROBLEM', prompt: 'What are we trying to solve?' },
                        { field: 'CURRENT STATE', prompt: 'Where is the project now?' },
                        { field: 'LATEST ITERATION', prompt: 'What changed?' },
                        { field: 'NEXT STEP', prompt: 'What are we testing or building next?' },
                        { field: 'LESSONS', prompt: 'What have we learned so far?' },
                      ].map((schemaItem, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded bg-[#0B0B0B] border border-white/10 space-y-1.5"
                        >
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">
                            FIELD // {schemaItem.field}
                          </span>
                          <p className="font-mono text-sm sm:text-base font-medium text-white">
                            {schemaItem.prompt}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 font-display text-lg sm:text-xl font-bold tracking-tight text-white uppercase">
                      This is where the abstract idea of "building in public" becomes real.
                    </div>
                  </section>

                  {/* SECTION 06: CURRENT MISSIONS (FINALE) */}
                  <section id="current-missions-manifesto" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE // THE MISSION LEDGER
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        CURRENT MISSIONS
                      </h2>
                      <p className="text-lg sm:text-xl font-light text-white/80">
                        This section should eventually contain the actual DAY ZERO projects.
                      </p>
                      <p className="text-base sm:text-lg font-light text-white/60">
                        For every mission, visitors should be able to discover:
                      </p>
                    </div>

                    {/* 5 Discovery Pillars */}
                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs sm:text-sm">
                      {[
                        'WHAT IT IS',
                        'WHY IT EXISTS',
                        'HOW IT IS BEING BUILT',
                        'WHAT HAS BEEN LEARNED',
                        'WHAT HAPPENS NEXT',
                      ].map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-2 rounded bg-white/5 border border-white/15 text-white font-semibold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Manifesto Creed */}
                    <div className="p-6 sm:p-8 rounded-lg bg-[#0B0B0B] border border-white/20 space-y-2">
                      <p className="font-mono text-base sm:text-lg text-white/50">
                        No invented metrics.
                      </p>
                      <p className="font-mono text-base sm:text-lg text-white/50">
                        No artificial progress.
                      </p>
                      <p className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase pt-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        Just the work.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          window.location.hash = 'products';
                        }}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">EXPLORE CURRENT MISSIONS</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('04');
                        }}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>← CHAPTER 04</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('06');
                        }}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>CHAPTER 06 (ECOSYSTEM)</span>
                        <span>→</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

              {/* ================================================================= */}
              {/* CHAPTER 06 SPECIFIC SECTIONS                                      */}
              {/* ================================================================= */}
              {chapter.id === '06' && (
                <>
                  {/* SECTION 01: MORE THAN A WEBSITE */}
                  <section id="more-than-a-website" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE // THE HORIZON
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      MORE THAN A WEBSITE
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        DAY ZERO starts with a website.
                      </p>
                      <p className="text-white/80">
                        It isn't intended to end there.
                      </p>
                      <p className="text-white/70 pt-1">
                        The long-term vision is an ecosystem built around creating, learning and documenting.
                      </p>
                    </div>

                    {/* 6 Core Pillars Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                      {[
                        'Products.',
                        'Engineering projects.',
                        'Knowledge.',
                        'Documentation.',
                        'Media.',
                        'Community.',
                      ].map((pillar, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg bg-[#0B0B0B] border border-white/15 flex items-center justify-between font-mono text-sm font-semibold text-white"
                        >
                          <span>{pillar}</span>
                          <span className="text-xs text-white/40">0{idx + 1}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                      Each new project should contribute something to the larger system.
                    </div>
                  </section>

                  {/* SECTION 02: THE PRODUCT LAYER */}
                  <section id="the-product-layer" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        LAYER // 01 REAL WORK
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE PRODUCT LAYER
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        The foundation is real work.
                      </p>
                      <p className="text-white/80">
                        DAY ZERO should grow through a portfolio of products and experiments rather than through ideas alone.
                      </p>
                    </div>

                    {/* 3 Realities */}
                    <div className="space-y-2.5 pt-1">
                      {[
                        'Every product becomes an opportunity to learn.',
                        'Every project creates documentation.',
                        'Every iteration adds another piece to the record.',
                      ].map((truth, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-4 rounded border border-white/15 bg-white/[0.03] flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-white/40 font-semibold">0{tIdx + 1}.</span>
                          <span>{truth}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SECTION 03: THE KNOWLEDGE LAYER */}
                  <section id="the-knowledge-layer" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        LAYER // 02 INTELLECTUAL ASSETS
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE KNOWLEDGE LAYER
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        The lessons created while building should not disappear when a project moves on.
                      </p>
                      <p className="text-white/70">
                        They can become:
                      </p>
                    </div>

                    {/* 8 Knowledge Assets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Engineering case studies',
                        'Product development notes',
                        'Technical documentation',
                        'Research',
                        'Experiments',
                        'Build logs',
                        'Lessons learned',
                        'Practical resources',
                      ].map((asset, aIdx) => (
                        <div
                          key={aIdx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-[10px] font-mono text-white/40 px-1.5 py-0.5 rounded bg-white/10 shrink-0">
                            K-0{aIdx + 1}
                          </span>
                          <span>{asset}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-lg bg-white text-black font-display font-bold text-lg sm:text-xl">
                      This turns individual projects into reusable knowledge.
                    </div>
                  </section>

                  {/* SECTION 04: THE DOCUMENTATION LAYER */}
                  <section id="the-documentation-layer" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        LAYER // 03 THE ARCHIVAL TRAIL
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE DOCUMENTATION LAYER
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Documentation creates continuity.
                      </p>
                      <p className="text-white/80">
                        A project shouldn't simply appear one day as a finished product.
                      </p>
                      <p className="font-mono text-sm uppercase tracking-wider text-white pt-1">
                        There should be a trail.
                      </p>
                    </div>

                    {/* 8 Trail Steps Rail */}
                    <div className="p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-3">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
                        {[
                          'The problem.',
                          'The first idea.',
                          'The research.',
                          'The prototype.',
                          'The failures.',
                          'The iterations.',
                          'The decisions.',
                          'The result.',
                        ].map((step, idx) => (
                          <React.Fragment key={idx}>
                            <span className="px-3 py-1.5 rounded bg-white/5 border border-white/15 text-white/90">
                              {step}
                            </span>
                            {idx < 7 && <span className="text-white/30">→</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase pt-1">
                      That trail becomes part of the DAY ZERO archive.
                    </p>
                  </section>

                  {/* SECTION 05: THE COMMUNITY LAYER */}
                  <section id="the-community-layer" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        LAYER // 04 THE BUILDER NETWORK
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE COMMUNITY LAYER
                    </h2>

                    <p className="text-base sm:text-lg text-white/80 font-light">
                      The ecosystem should also create a place for other builders.
                    </p>

                    {/* 4 Types of Builders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'People who are starting.',
                        'People who are experimenting.',
                        'People who are learning.',
                        'People who have failed and want to try again.',
                      ].map((typeItem, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/50">
                            0{idx + 1}
                          </span>
                          <span>{typeItem}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-1.5 font-display">
                      <p className="text-base sm:text-lg text-white/60 font-light">
                        The goal isn't to create an audience that watches from the outside.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        It is to encourage more people to build.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 06: THE MEDIA LAYER */}
                  <section id="the-media-layer" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        LAYER // 05 VISUAL REPOSITORIES
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE MEDIA LAYER
                    </h2>

                    <p className="text-base sm:text-lg text-white/80 font-light">
                      Some parts of building are better understood visually.
                    </p>

                    {/* 6 Visual Forms */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {[
                        'A product documentary.',
                        'A technical walkthrough.',
                        'A prototype demonstration.',
                        'A conversation.',
                        'A build log.',
                        'A behind-the-scenes record.',
                      ].map((form, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-white/40 block text-[10px] mb-1">FORMAT 0{idx + 1}</span>
                          <span>{form}</span>
                        </div>
                      ))}
                    </div>

                    <p className="font-mono text-sm text-white/70 pt-1">
                      DAY ZERO can use different forms of media to document the same underlying journey.
                    </p>
                  </section>

                  {/* SECTION 07: THE KNOWLEDGE LOOP */}
                  <section id="the-knowledge-loop" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        07
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        SYSTEM // THE FEEDBACK ENGINE
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE KNOWLEDGE LOOP
                    </h2>

                    {/* Loop Chain */}
                    <div className="p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2 font-mono">
                      {[
                        'PRODUCT',
                        'EXPERIMENT',
                        'DOCUMENTATION',
                        'LEARNING',
                        'KNOWLEDGE',
                        'NEW PROJECT',
                        'PRODUCT',
                      ].map((st, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <div className="p-3 rounded bg-white/[0.04] border border-white/10 text-center text-sm font-bold text-white tracking-widest">
                            {st}
                          </div>
                          {sIdx < 6 && (
                            <div className="flex justify-center text-white/30 text-xs py-0.5">
                              ↓
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase pt-1">
                      The ecosystem grows through this loop.
                    </p>
                  </section>

                  {/* SECTION 08: THE LONG-TERM IDEA */}
                  <section id="the-long-term-idea" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        08
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE // ARCHITECTURAL SYNTHESIS
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        THE LONG-TERM IDEA
                      </h2>
                    </div>

                    {/* 5 Layer Tenets */}
                    <div className="space-y-2.5 font-display text-lg sm:text-2xl font-semibold">
                      <div className="p-4 rounded bg-[#0B0B0B] border border-white/10 text-white/80">
                        The website is the foundation.
                      </div>
                      <div className="p-4 rounded bg-[#0B0B0B] border border-white/10 text-white/80">
                        The products are the work.
                      </div>
                      <div className="p-4 rounded bg-[#0B0B0B] border border-white/10 text-white/80">
                        The documentation is the record.
                      </div>
                      <div className="p-4 rounded bg-[#0B0B0B] border border-white/10 text-white/80">
                        The knowledge is what remains useful.
                      </div>
                      <div className="p-6 rounded bg-white text-black font-bold text-xl sm:text-3xl">
                        And the ecosystem is what connects everything together.
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('07');
                        }}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">EXPLORE THE ECOSYSTEM</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('05');
                        }}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>← CHAPTER 05</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>INITIATE DAY ZERO</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

              {/* ================================================================= */}
              {/* CHAPTER 07 SPECIFIC SECTIONS: MANIFESTO                           */}
              {/* ================================================================= */}
              {chapter.id === '07' && (
                <>
                  {/* SECTION 01: THIS IS DAY ZERO */}
                  <section id="this-is-day-zero" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        DECLARATION // CORE COMMITMENTS
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THIS IS DAY ZERO
                    </h2>

                    {/* 8 Choice statements */}
                    <div className="space-y-2.5 pt-2">
                      {[
                        'We choose to begin before everything is figured out.',
                        'We choose to build instead of waiting.',
                        'We choose to learn by doing.',
                        'We choose to document the process instead of hiding the unfinished parts.',
                        'We choose honesty over performance.',
                        'We choose evidence over assumptions.',
                        'We choose iteration over perfection.',
                        'We choose progress over appearances.',
                      ].map((choice, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-4 rounded border border-white/15 bg-[#0B0B0B] flex items-center gap-3.5 font-mono text-xs sm:text-sm text-white/90 transition-colors hover:border-white/30"
                        >
                          <span className="text-white/40 font-semibold shrink-0">0{cIdx + 1}.</span>
                          <span className="leading-relaxed">{choice}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-lg bg-white text-black font-display font-bold text-lg sm:text-xl">
                      And when something doesn't work, we choose to learn from it.
                    </div>
                  </section>

                  {/* SECTION 02: WE BUILD */}
                  <section id="we-build" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PILLAR // TANGIBLE EXECUTION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WE BUILD
                    </h2>

                    <div className="space-y-3 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Ideas are only potential.
                      </p>
                      <p className="text-white/80">
                        Building gives them form.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03] space-y-1">
                        <span className="text-[10px] font-mono text-white/40 uppercase">EARLY STAGE</span>
                        <p className="text-sm sm:text-base font-medium text-white">A prototype gives an idea something to react to.</p>
                      </div>
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03] space-y-1">
                        <span className="text-[10px] font-mono text-white/40 uppercase">MATURE STAGE</span>
                        <p className="text-sm sm:text-base font-medium text-white">A product gives it a place in the world.</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-1.5 font-display">
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        We build because understanding comes from making.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 03: WE DOCUMENT */}
                  <section id="we-document" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PILLAR // CONTINUOUS RECORD
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WE DOCUMENT
                    </h2>

                    <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      The work shouldn't disappear once the result exists.
                    </p>

                    {/* 5 Documentation facets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                      {[
                        'We document decisions.',
                        'We document experiments.',
                        'We document failures.',
                        'We document iterations.',
                        'We document what we learn.',
                      ].map((docItem, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-2.5 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
                          <span>{docItem}</span>
                        </div>
                      ))}
                    </div>

                    <p className="font-display text-lg sm:text-xl font-medium text-white pt-1">
                      Because the process can be useful to someone else.
                    </p>
                  </section>

                  {/* SECTION 04: WE LEARN */}
                  <section id="we-learn" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PILLAR // EPISTEMIC EVOLUTION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WE LEARN
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        We don't expect to know everything before we begin.
                      </p>
                      <p className="text-white/80">
                        We expect the work to teach us.
                      </p>
                    </div>

                    {/* 3 Realities */}
                    <div className="space-y-2.5 pt-1">
                      {[
                        'Every experiment produces information.',
                        'Every iteration changes our understanding.',
                        'Every project leaves something behind.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded border border-white/15 bg-white/[0.03] flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-white/40 font-semibold">0{idx + 1}.</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-lg bg-[#0B0B0B] border border-white/15">
                      <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        Knowledge is built through the process.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 05: WE ITERATE */}
                  <section id="we-iterate" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PILLAR // PERPETUAL REFINEMENT
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WE ITERATE
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        The first version is rarely the final version.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 font-mono text-sm py-1">
                        <span className="px-3 py-1 rounded bg-white/5 border border-white/15 text-white/60">
                          That's not failure.
                        </span>
                        <span className="text-white/30">→</span>
                        <span className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white font-medium">
                          That's development.
                        </span>
                      </div>
                    </div>

                    <p className="font-mono text-sm sm:text-base text-white/90 pt-1">
                      We improve by observing, questioning, testing and rebuilding.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-4 rounded border border-white/15 bg-[#0B0B0B] space-y-1">
                        <span className="text-[10px] font-mono text-white/40 uppercase">MINDSET</span>
                        <p className="text-sm sm:text-base text-white/70">The goal isn't to get everything right immediately.</p>
                      </div>
                      <div className="p-4 rounded border border-white/15 bg-[#0B0B0B] space-y-1">
                        <span className="text-[10px] font-mono text-white/40 uppercase">OBJECTIVE</span>
                        <p className="text-sm sm:text-base font-medium text-white">The goal is to make the next version better.</p>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 06: WE SHARE */}
                  <section id="we-share" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PILLAR // RADICAL TRANSPARENCY
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WE SHARE
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Building in public creates accountability.
                      </p>
                      <p className="text-white/80">
                        It also creates possibility.
                      </p>
                    </div>

                    {/* 4 Possibility cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {[
                        'Someone can learn from the experiment.',
                        'Someone can avoid the mistake.',
                        'Someone can understand the decision.',
                        'Someone can see that the beginning doesn\'t have to be perfect.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/50 shrink-0">
                            0{idx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-1.5 font-display">
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        Sharing the process makes the work bigger than the product itself.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 07: WE BEGIN AGAIN */}
                  <section id="we-begin-again" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        07
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PILLAR // INFINITE RECURSION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WE BEGIN AGAIN
                    </h2>

                    <p className="text-lg sm:text-xl font-medium text-white">
                      There is no final version of the journey.
                    </p>

                    {/* Step Chain */}
                    <div className="p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-3 font-mono text-xs sm:text-sm">
                      {[
                        'One project leads to another.',
                        'One lesson creates another question.',
                        'One answer reveals another problem worth exploring.',
                      ].map((step, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-3 text-white/90">
                          <span className="text-white/40">→</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1 pt-1 font-display">
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        The process continues.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white/60 uppercase">
                        So does DAY ZERO.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 08: THE DAY ZERO MANIFESTO */}
                  <section id="the-day-zero-manifesto" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        08
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        THE CREEDS // CORE CODEX
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE DAY ZERO MANIFESTO
                    </h2>

                    {/* 9 Manifestos in a 3-column architectural grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      {[
                        'START BEFORE READY.',
                        'BUILD IN PUBLIC.',
                        'BE HONEST.',
                        'LEARN BY BUILDING.',
                        'DOCUMENT THE PROCESS.',
                        'ITERATE WITHOUT EGO.',
                        'SHARE WHAT YOU LEARN.',
                        'KEEP MOVING.',
                        'NEVER STOP BEGINNING.',
                      ].map((creed, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-5 rounded-lg bg-[#0B0B0B] border border-white/15 flex flex-col justify-between hover:border-white/40 transition-colors group"
                        >
                          <span className="text-[10px] font-mono text-white/40 mb-3 group-hover:text-white/70 transition-colors">
                            CREED // 0{cIdx + 1}
                          </span>
                          <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white uppercase">
                            {creed}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SECTION 09: FINAL STATEMENT */}
                  <section id="final-statement" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        09
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE // ARCHIVAL CLIMAX
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        FINAL STATEMENT
                      </h2>
                    </div>

                    <div className="space-y-2 text-lg sm:text-xl font-light text-white/85 leading-relaxed">
                      <p className="text-white/60">
                        DAY ZERO is not a story about having already made it.
                      </p>
                      <p className="font-medium text-white">
                        It is a record of what happens while becoming.
                      </p>
                    </div>

                    {/* The Becoming Train */}
                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-3 font-mono text-xs sm:text-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        {[
                          'The first idea.',
                          'The first prototype.',
                          'The first failure.',
                          'The first lesson.',
                          'The next iteration.',
                          'The next product.',
                          'The next question.',
                        ].map((item, idx) => (
                          <React.Fragment key={idx}>
                            <span className="px-3 py-1.5 rounded bg-white/5 border border-white/15 text-white/90">
                              {item}
                            </span>
                            {idx < 6 && <span className="text-white/30">→</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Climax Statement */}
                    <div className="p-6 sm:p-8 rounded-lg bg-white text-black space-y-2 font-display">
                      <p className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
                        There will always be another beginning.
                      </p>
                      <p className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight">
                        And every beginning has a Day Zero.
                      </p>
                    </div>

                    {/* Closing Actions & Chapter Navigation */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">START YOUR DAY ZERO</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('06');
                        }}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>← CHAPTER 06 (FUTURE ECOSYSTEM)</span>
                      </button>

                      <button
                        type="button"
                        onClick={onBackToHome}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>RETURN TO TIMELINE</span>
                        <span>↑</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

            </div>
          </div>
        ) : (
          /* Dedicated Workspace for Chapter 07 (Ready for future chapters) */
          <div className="mt-12 sm:mt-16 w-full min-h-[420px] sm:min-h-[500px] border border-white/10 rounded-lg bg-[#0B0B0B]/40 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blueprint-dense opacity-40 pointer-events-none" />
            
            <div className="relative z-10 space-y-4 max-w-md">
              <div className="w-10 h-10 mx-auto rounded-full border border-white/20 flex items-center justify-center text-xs font-mono text-white/60">
                {chapter.id}
              </div>
              <p className="text-xs font-mono text-white/50 uppercase tracking-widest">
                CHAPTER {chapter.id} ARCHIVE
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase">
                {chapter.title}
              </h3>
              <p className="text-xs sm:text-sm font-light text-white/50 leading-relaxed">
                {chapter.subtitle}
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateChapter) onNavigateChapter('01');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono text-white underline hover:text-white/80 cursor-pointer"
                >
                  <span>Read Chapter 01</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateChapter) onNavigateChapter('02');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono text-white underline hover:text-white/80 cursor-pointer"
                >
                  <span>Read Chapter 02</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateChapter) onNavigateChapter('03');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono text-white underline hover:text-white/80 cursor-pointer"
                >
                  <span>Read Chapter 03</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateChapter) onNavigateChapter('04');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono text-white underline hover:text-white/80 cursor-pointer"
                >
                  <span>Read Chapter 04</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateChapter) onNavigateChapter('05');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono text-white underline hover:text-white/80 cursor-pointer"
                >
                  <span>Read Chapter 05</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateChapter) onNavigateChapter('06');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono text-white underline hover:text-white/80 cursor-pointer"
                >
                  <span>Read Chapter 06</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CHAPTER PAGINATION / SWITCHER AT BOTTOM                                   */}
      {/* ========================================================================= */}
      <div className="max-w-7xl w-full mx-auto mt-20 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
        <div>
          {parseInt(chapter.id, 10) > 1 ? (
            <button
              type="button"
              onClick={() => {
                const prevId = String(parseInt(chapter.id, 10) - 1).padStart(2, '0');
                if (onNavigateChapter) onNavigateChapter(prevId);
              }}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>←</span>
              <span>CHAPTER {String(parseInt(chapter.id, 10) - 1).padStart(2, '0')}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>←</span>
              <span>TIMELINE</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onBackToHome}
          className="text-white/40 hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px]"
        >
          VIEW TIMELINE
        </button>

        <div>
          {parseInt(chapter.id, 10) < CHAPTERS_DATA.length && (
            <button
              type="button"
              onClick={() => {
                const nextId = String(parseInt(chapter.id, 10) + 1).padStart(2, '0');
                if (onNavigateChapter) onNavigateChapter(nextId);
              }}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>CHAPTER {String(parseInt(chapter.id, 10) + 1).padStart(2, '0')}</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


```
---

### File 14: `src/components/products/ProductsPage.jsx`
```jsx
import React, { useState, useMemo } from 'react';
import ProductsHeroVisual from './ProductsHeroVisual';
import ProductArchiveItem from './ProductArchiveItem';
import ProductDetailModal from './ProductDetailModal';
import { PRODUCTS_DATA } from './productsData';

export default function ProductsPage({ onOpenContact }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter logic
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'ALL') return PRODUCTS_DATA;
    if (activeFilter === 'PRODUCTS') return PRODUCTS_DATA.filter((p) => p.category === 'SYSTEM' || p.category === 'DEVELOPER TOOLS');
    if (activeFilter === 'EXPERIMENTS') return PRODUCTS_DATA.filter((p) => p.status === 'EXPERIMENT');
    if (activeFilter === 'SYSTEMS') return PRODUCTS_DATA.filter((p) => p.category === 'SYSTEM');
    if (activeFilter === 'ARCHIVED') return PRODUCTS_DATA.filter((p) => p.status === 'ARCHIVED');
    return PRODUCTS_DATA;
  }, [activeFilter]);

  return (
    <div className="relative w-full bg-[#050505] text-[#F3F4F6] min-h-screen pt-24 pb-20 select-none overflow-x-hidden">
      {/* 03 / HEADER TECHNICAL IDENTIFIER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-6">
        <div className="inline-flex items-center gap-3 px-3 py-1 border border-white/10 bg-[#0B0B0B] text-[10px] font-mono text-white/50 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>PRODUCT INDEX // SYSTEM 03</span>
        </div>
      </div>

      {/* 04 & 05 HERO SECTION & VISUALIZATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Editorial */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono text-white/40 tracking-[0.25em] uppercase">
              03 / PRODUCT ARCHIVE
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white uppercase leading-[0.95]">
              PRODUCTS<br />
              BUILT FROM<br />
              DAY ZERO.
            </h1>

            <div className="text-sm sm:text-base font-mono text-white/80 font-medium tracking-wide border-l-2 border-white/30 pl-4 py-1">
              Ideas are easy to describe.<br />
              Building them is different.
            </div>

            <p className="text-sm sm:text-base font-sans text-white/60 leading-relaxed max-w-xl font-light">
              DAY ZERO documents the products, experiments and systems we build — from the first idea to something real.
            </p>

            {/* Hero Technical Metadata Row */}
            <div className="inline-flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/10 text-xs font-mono text-white/50">
              <div>
                <span className="text-white/30">ACTIVE BUILDS:</span>{' '}
                <span className="text-white font-bold">01</span>
              </div>
              <div>
                <span className="text-white/30">EXPERIMENTS:</span>{' '}
                <span className="text-white font-bold">00</span>
              </div>
              <div>
                <span className="text-white/30">STATUS:</span>{' '}
                <span className="text-white font-bold">BUILDING</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visualization */}
          <div className="lg:col-span-6">
            <ProductsHeroVisual
              products={PRODUCTS_DATA}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
          </div>
        </div>
      </section>

      {/* 06 & 10 PRODUCT ARCHIVE & FILTER INDEX SYSTEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        {/* Section Heading */}
        <div className="space-y-3 mb-10">
          <div className="text-xs font-mono text-white/40 tracking-widest uppercase">
            // PRODUCT ARCHIVE
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-wider uppercase">
            WHAT WE BUILD.
          </h2>
        </div>

        {/* Filter Bar System */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 pb-6 mb-8 border-b border-white/10 text-xs font-mono">
          <span className="text-white/40 text-[10px] tracking-widest uppercase mr-2">
            INDEX:
          </span>
          {['ALL', 'PRODUCTS', 'EXPERIMENTS', 'SYSTEMS', 'ARCHIVED'].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`relative px-3 py-1.5 rounded transition-all cursor-pointer text-xs uppercase tracking-wider ${isActive
                  ? 'text-white font-bold bg-white/10 border border-white/30'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                  }`}
              >
                {filter}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-white shadow-[0_0_8px_#fff]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Product Archive Vertical List */}
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <ProductArchiveItem
              key={product.id}
              product={product}
              onInspect={(p) => setSelectedProduct(p)}
            />
          ))}

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center text-xs font-mono text-white/40 uppercase tracking-widest">
              NO BUILDS MATCH CURRENT FILTER CRITERIA.
            </div>
          )}
        </div>
      </section>

      {/* 12 / BUILD PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 border-t border-b border-white/10 my-16">
        <div className="max-w-4xl space-y-8">
          <div className="text-xs font-mono text-white/40 tracking-[0.25em] uppercase">
            // WHY WE BUILD
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[0.95] uppercase">
            EVERY PRODUCT<br />
            STARTS WITH A<br />
            QUESTION.
          </h2>

          <div className="space-y-4 text-base sm:text-lg font-sans text-white/70 font-light leading-relaxed max-w-2xl">
            <p>We build to understand.</p>
            <p>We experiment to learn.</p>
            <p>
              We document the process so others can see what happens between an idea and something real.
            </p>
          </div>
        </div>
      </section>

      {/* 13 / FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8 md:p-12 bg-[#0B0B0B] border border-white/15 rounded-lg">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-wider">
              HAVE SOMETHING<br />
              WORTH BUILDING?
            </h3>
            <p className="text-sm font-sans text-white/60 font-light">
              Every product starts somewhere.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenContact}
            className="px-6 py-3.5 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-white/90 transition-colors cursor-pointer shrink-0"
          >
            START A CONVERSATION →
          </button>
        </div>
      </section>

      {/* 09 / PRODUCT DETAIL TRANSITION MODAL */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenContact={onOpenContact}
        />
      )}
    </div>
  );
}

```
---

### File 15: `src/components/products/ProductsHeroVisual.jsx`
```jsx
import React, { useState, useEffect, useRef } from 'react';

export default function ProductsHeroVisual({ products, onSelectProduct }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState(null);
  const [angle, setAngle] = useState(0);

  // Orbit rotation animation frame
  useEffect(() => {
    let animFrame;
    const animate = () => {
      setAngle((prev) => (prev + 0.25) % 360);
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Track mouse coordinates for interactive parallax tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setActiveNode(null);
  };

  // Node positions along orbit ring
  const orbitRadius = 130;
  const nodes = (products || []).slice(0, 4).map((p, idx) => {
    const baseAngle = (idx * (360 / 4) + angle) * (Math.PI / 180);
    const x = Math.cos(baseAngle) * orbitRadius;
    const y = Math.sin(baseAngle) * orbitRadius;
    return { ...p, x, y };
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center p-4 select-none cursor-crosshair"
    >
      {/* Background Radial Glow & Coordinate Grid */}
      <div className="absolute inset-0 rounded-full bg-white/[0.015] border border-white/10 backdrop-blur-[2px]" />
      
      {/* Outer Dotted Concentric Orbit Ring */}
      <div className="absolute inset-8 rounded-full border border-dashed border-white/15 animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-20 rounded-full border border-white/10" />

      {/* Crosshair Coordinate Markers */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/30 tracking-widest">
        N 47° 36' 18"
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/30 tracking-widest">
        S 12° 04' 52"
      </div>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-white/30 tracking-widest [writing-mode:vertical-lr]">
        W 122° 20' 02"
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-white/30 tracking-widest [writing-mode:vertical-lr]">
        E 078° 14' 40"
      </div>

      {/* Subtle Axis Grid Lines */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/[0.06] stroke-dash" />
      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/[0.06]" />

      {/* SVG Vector Connections & Motion Layer */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0) rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
        }}
      >
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="-220 -220 440 440">
          {/* Orbital path circle */}
          <circle cx="0" cy="0" r={orbitRadius} fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Rays connecting center to nodes */}
          {nodes.map((node) => {
            const isHovered = activeNode && activeNode.id === node.id;
            return (
              <line
                key={`line-${node.id}`}
                x1="0"
                y1="0"
                x2={node.x}
                y2={node.y}
                stroke={isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.15)'}
                strokeWidth={isHovered ? 1.5 : 1}
                strokeDasharray={isHovered ? 'none' : '2 4'}
              />
            );
          })}
        </svg>

        {/* Central Core Glowing Node */}
        <div className="relative z-10 flex flex-col items-center justify-center w-28 h-28 rounded-full bg-[#050505] border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.08)] group">
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20 pointer-events-none" />
          <div className="w-3 h-3 rounded-full bg-white animate-pulse shadow-[0_0_12px_#fff]" />
          <span className="mt-2 text-[9px] font-mono font-bold tracking-[0.2em] text-white uppercase text-center">
            PRODUCT
          </span>
          <span className="text-[8px] font-mono text-white/50 tracking-wider">
            INDEX
          </span>
        </div>

        {/* Orbiting Product Nodes */}
        {nodes.map((node) => {
          const isHovered = activeNode && activeNode.id === node.id;

          return (
            <div
              key={node.id}
              onClick={() => onSelectProduct && onSelectProduct(node)}
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `calc(50% + ${node.x}px)`,
                top: `calc(50% + ${node.y}px)`,
              }}
            >
              {/* Outer halo on hover */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isHovered
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-110'
                    : 'bg-[#0B0B0B]/90 text-white border-white/20 hover:border-white/60'
                }`}
              >
                <span className="text-[10px] font-mono font-bold">{node.id}</span>
              </div>

              {/* Tooltip Card on Node Hover */}
              {isHovered && (
                <div className="absolute left-1/2 -translate-x-1/2 top-12 min-w-[160px] bg-[#0A0A0A] border border-white/30 p-2.5 rounded shadow-2xl backdrop-blur-md z-30 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1 mb-1">
                    <span className="text-[9px] font-mono text-white/50 tracking-wider">
                      {node.code}
                    </span>
                    <span className="text-[8px] font-mono px-1 py-0.5 border border-white/20 text-white/80 uppercase">
                      {node.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-display font-semibold text-white uppercase tracking-wider">
                    {node.title}
                  </div>
                  <div className="text-[9px] font-mono text-white/40 mt-1 uppercase">
                    CAT: {node.category}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="absolute bottom-3 right-3 text-[9px] font-mono text-white/40 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span>SYS // ORBIT ACTIVE</span>
      </div>
    </div>
  );
}

```
---

### File 16: `src/components/products/ProductArchiveItem.jsx`
```jsx
import React, { useState } from 'react';

export default function ProductArchiveItem({ product, onInspect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onInspect(product)}
      className={`group relative border-t border-white/10 py-10 md:py-14 transition-all duration-500 cursor-pointer ${
        isHovered ? 'bg-white/[0.02] border-white/40' : 'bg-transparent'
      }`}
    >
      {/* Dynamic Hover Glow & Corner Coordinate Node Line */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 ${
          isHovered ? 'bg-white shadow-[0_0_12px_#fff]' : 'bg-transparent'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT SIDE: Metadata & Copy (7 cols on LG) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Index & Status Row */}
          <div className="flex items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-bold font-mono transition-colors duration-300 ${
                isHovered ? 'text-white' : 'text-white/40'
              }`}>
                {product.id}
              </span>
              <span className="text-white/20">|</span>
              <span className="text-white/40 tracking-widest uppercase">
                {product.code}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                product.status === 'ACTIVE'
                  ? 'bg-white animate-pulse'
                  : product.status === 'EXPERIMENT'
                  ? 'bg-white/60'
                  : 'bg-white/30'
              }`} />
              <span className="text-[10px] tracking-widest text-white/60 uppercase">
                {product.status}
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className={`text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-wider uppercase transition-all duration-300 ${
            isHovered ? 'text-white translate-x-1' : 'text-white/90'
          }`}>
            {product.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm sm:text-base font-sans text-white/60 leading-relaxed max-w-xl font-light">
            {product.shortDesc}
          </p>

          {/* Technical Metadata Grid */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10 text-xs font-mono">
            <div>
              <div className="text-[10px] text-white/30 tracking-widest uppercase">CATEGORY</div>
              <div className="text-white/80 font-medium mt-0.5 uppercase">{product.category}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/30 tracking-widest uppercase">STATUS</div>
              <div className="text-white/80 font-medium mt-0.5 uppercase">{product.status}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/30 tracking-widest uppercase">YEAR</div>
              <div className="text-white/80 font-medium mt-0.5">{product.year}</div>
            </div>
          </div>

          {/* Action CTA Trigger */}
          <div className="pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInspect(product);
              }}
              className={`inline-flex items-center gap-3 px-4 py-2 border font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                isHovered
                  ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'bg-transparent text-white/70 border-white/20 hover:border-white/50'
              }`}
            >
              <span>INSPECT PRODUCT</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Monochrome Technical Prototype Observation Preview (5 cols on LG) */}
        <div className="lg:col-span-6">
          <div className={`relative w-full aspect-[16/10] bg-[#0A0A0A] border rounded transition-all duration-500 overflow-hidden ${
            isHovered
              ? 'border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.05)] scale-[1.01]'
              : 'border-white/10 opacity-75'
          }`}>
            {/* Window Header Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#050505] text-[10px] font-mono text-white/40">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full border border-white/30" />
                <div className="w-2 h-2 rounded-full border border-white/30" />
                <div className="w-2 h-2 rounded-full border border-white/30" />
              </div>
              <span className="tracking-widest uppercase text-[9px] text-white/30">
                PROTOTYPE // {product.code}
              </span>
              <span>SYS_OBSERVE</span>
            </div>

            {/* Content Preview Canvas / Wireframe Terminal */}
            <div className="p-4 h-[calc(100%-33px)] flex flex-col justify-between font-mono text-xs">
              {/* Wireframe Mock UI Elements */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-white/40">
                  <span>TELEMETRY_STREAM</span>
                  <span className="animate-pulse text-white/70">● LIVE</span>
                </div>

                {/* Simulated Stack / Code Preview */}
                <div className="bg-[#050505] p-3 rounded border border-white/10 text-[11px] text-white/70 overflow-x-auto">
                  <pre className="font-mono text-white/60 leading-tight">
                    <code>{product.codeSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-[9px] text-white/50">
                {(product.metrics || []).slice(0, 4).map((m, idx) => (
                  <div key={idx} className="bg-[#050505] p-1.5 rounded border border-white/5">
                    <div className="text-[8px] text-white/30 uppercase">{m.label}</div>
                    <div className="text-white/80 font-semibold truncate mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] animate-[scanline_6s_linear_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}

```
---

### File 17: `src/components/products/ProductDetailModal.jsx`
```jsx
import React, { useState, useEffect } from 'react';

export default function ProductDetailModal({ product, onClose, onOpenContact }) {
  const [initStage, setInitStage] = useState(0); // 0: index, 1: id, 2: name, 3: loading, 4: ready
  const [activeTab, setActiveTab] = useState('SPECS');

  const isVoidProduct = product?.status === 'VOID' || product?.id === '01';

  // Handle ESC key listener to exit modal / pitch black view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!product) return;

    // Cinematic step initialization timeline sequence
    const t1 = setTimeout(() => setInitStage(1), 250);
    const t2 = setTimeout(() => setInitStage(2), 500);
    const t3 = setTimeout(() => setInitStage(3), 850);
    const t4 = setTimeout(() => setInitStage(4), 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [product]);

  if (!product) return null;

  return (
    <div
      onClick={isVoidProduct && initStage === 4 ? onClose : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-xl overflow-y-auto font-mono text-white select-none"
    >
      {/* INITIALIZATION TRANSITION OVERLAY */}
      {initStage < 4 && (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center animate-in fade-in duration-300">
          <div className="text-xs font-mono text-white/40 tracking-[0.3em] uppercase">
            PRODUCT INDEX
          </div>

          {initStage >= 1 && (
            <div className="text-3xl font-mono font-bold text-white/70 animate-in zoom-in-95 duration-200">
              {product.id}
            </div>
          )}

          {initStage >= 2 && (
            <div className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-200">
              {product.title}
            </div>
          )}

          {initStage >= 3 && (
            <div className="flex items-center gap-3 text-xs font-mono text-white/50 tracking-widest pt-4">
              <span className="w-2 h-2 bg-white rounded-full animate-ping" />
              <span>INITIALIZING BUILD SYSTEM...</span>
            </div>
          )}
        </div>
      )}

      {/* FULL SYSTEM DEEP DIVE DRAWER / MODAL OR PITCH BLACK VOID */}
      {initStage === 4 && (
        isVoidProduct ? (
          <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black w-screen h-screen cursor-pointer select-none"
          />
        ) : (
          <div className="w-full max-w-5xl my-8 mx-4 bg-[#0B0B0B] border border-white/20 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050505]">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-white bg-white/10 px-2 py-1 rounded">
                  {product.id}
                </span>
                <span className="text-xs font-mono text-white/60 tracking-wider">
                  {product.code} // {product.title}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 border border-white/20 text-xs text-white/60 hover:text-white hover:border-white transition-colors cursor-pointer"
              >
                ESC [X]
              </button>
            </div>

            {/* Body Content */}
            <div className="p-6 md:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
              {/* Title & Metadata Hero Header */}
              <div className="space-y-4 border-b border-white/10 pb-6">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="px-2 py-0.5 border border-white/30 text-white/90 uppercase">
                    {product.category}
                  </span>
                  <span className="px-2 py-0.5 bg-white text-black font-bold uppercase">
                    {product.status}
                  </span>
                  <span className="text-white/40">YEAR {product.year}</span>
                  <span className="text-white/40">VER {product.version}</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-wider text-white uppercase">
                  {product.title}
                </h2>

                <p className="text-base font-sans text-white/70 leading-relaxed max-w-3xl font-light">
                  {product.fullDesc}
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-4 border-b border-white/10 text-xs">
                {['SPECS', 'ARCHITECTURE', 'CHANGELOG'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 transition-colors cursor-pointer tracking-wider ${
                      activeTab === tab
                        ? 'text-white border-b-2 border-white font-bold'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    // {tab}
                  </button>
                ))}
              </div>

              {/* Tab View: SPECS */}
              {activeTab === 'SPECS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xs text-white/40 uppercase tracking-widest">// SYSTEM METRICS</h4>
                    <div className="space-y-2">
                      {product.metrics.map((m, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-[#050505] border border-white/10 rounded">
                          <span className="text-xs text-white/50">{m.label}</span>
                          <span className="text-xs font-bold text-white">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs text-white/40 uppercase tracking-widest">// TECHNICAL STACK</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.stack.map((item, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-[#050505] border border-white/15 text-xs text-white/80 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab View: ARCHITECTURE */}
              {activeTab === 'ARCHITECTURE' && (
                <div className="space-y-4">
                  <h4 className="text-xs text-white/40 uppercase tracking-widest">// INITIALIZATION CODE SNIPPET</h4>
                  <div className="bg-[#050505] p-4 rounded border border-white/20 text-xs overflow-x-auto">
                    <pre className="text-white/80">
                      <code>{product.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Tab View: CHANGELOG */}
              {activeTab === 'CHANGELOG' && (
                <div className="space-y-4">
                  <h4 className="text-xs text-white/40 uppercase tracking-widest">// BUILD HISTORY LOG</h4>
                  <div className="space-y-3">
                    {product.changelog.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-3 bg-[#050505] border border-white/10 rounded text-xs">
                        <span className="text-white/40 shrink-0">{log.date}</span>
                        <span className="text-white/80">{log.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Actions Row */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-white/20 text-xs text-white/70 hover:text-white hover:border-white transition-colors cursor-pointer"
                >
                  ← RETURN TO PRODUCT ARCHIVE
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenContact) onOpenContact();
                  }}
                  className="px-5 py-2.5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-colors cursor-pointer"
                >
                  DISCUSS BUILD INTEGRATION →
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

```
---

### File 18: `src/components/products/productsData.js`
```javascript
export const PRODUCTS_DATA = [
  {
    id: '01',
    code: 'BUILD // 001',
    title: 'DAY ZERO WORKSTATION',
    shortDesc: 'The interactive documentary workstation and build engine that captures product creation from ground zero.',
    fullDesc: 'DAY ZERO Workstation is an experimental visual recording environment that tracks code commits, architectural decisions, and failure modes in real time. It renders software engineering as an interactive, live-updating spatial system.',
    category: 'SYSTEM',
    status: 'VOID',
    year: '2026',
    featured: true,
    version: '01.0',
    buildNum: '001',
    lastUpdate: '2026-08-15',
    visualType: 'terminal-wireframe',
    metrics: [
      { label: 'KERNEL', value: 'v2.4.0-release' },
      { label: 'NODES', value: '1,024 Active' },
      { label: 'LATENCY', value: '0.4ms' },
      { label: 'STATE', value: 'DETERMINISTIC' },
    ],
    stack: ['React', 'Three.js / Canvas', 'GSAP Motion', 'WebSockets', 'Rust Core'],
    changelog: [
      { date: '2026-08-15', note: 'Added spatial chapter navigation timeline' },
      { date: '2026-07-22', note: 'Optimized binary search SVG path tracking' },
      { date: '2026-06-10', note: 'Initial public alpha release' },
    ],
    codeSnippet: `// DAY ZERO KERNEL INIT
const engine = new BuildEngine({
  mode: "DOCUMENTARY",
  telemetry: true,
  syncRate: 60 /* fps */
});
engine.attachNode("PRODUCT_INDEX");
engine.bootSequence();`,
  },
];

```
---
