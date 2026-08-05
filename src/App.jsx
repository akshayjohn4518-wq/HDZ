import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import IntroSequence from './components/motion/IntroSequence';
import BlueprintGrid from './components/layout/BlueprintGrid';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [replayKey, setReplayKey] = useState(0);

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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleReplayIntro = () => {
    setReplayKey((prev) => prev + 1);
    setShowIntro(true);
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
      {!showIntro && <Navigation onReplayIntro={handleReplayIntro} />}

      {/* Main Content Area: Intentionally Empty Canvas */}
      <main className="relative z-10 flex-1 min-h-[85vh]" />

      {/* Minimal Editorial Footer */}
      {!showIntro && <Footer onReplayIntro={handleReplayIntro} />}
    </div>
  );
}
