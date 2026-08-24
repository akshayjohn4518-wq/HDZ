import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import IntroSequence from './components/motion/IntroSequence';
import BlueprintGrid from './components/layout/BlueprintGrid';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ContactSection from './components/layout/ContactSection';
import CinematicHomepage from './components/blueprint/CinematicHomepage';
import ProductsPage from './components/products/ProductsPage';
import { getScrollYForCanvasY, CHAPTERS_DATA } from './utils/chapters';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#products' ? 'products' : 'home';
  });

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#products') {
        setCurrentView('products');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateView = (targetView, targetChapter) => {
    setCurrentView(targetView);
    if (targetView === 'products') {
      window.location.hash = 'products';
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      window.location.hash = '';
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
          onNavigateView={handleNavigateView}
        />
      )}

      {/* Main Interactive Blueprint Section (Documentary Homepage OR Products Index) */}
      {!showIntro && (
        <main className="relative z-10 flex-1">
          {currentView === 'products' ? (
            <ProductsPage onOpenContact={() => setShowContact(true)} />
          ) : (
            <CinematicHomepage onOpenContact={() => setShowContact(true)} />
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

