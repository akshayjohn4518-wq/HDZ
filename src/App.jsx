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
import NotFoundPage from './components/notFound/NotFoundPage';
import { getScrollYForCanvasY, CHAPTERS_DATA } from './utils/chapters';

const parseRouteState = () => {
  const pathname = (window.location.pathname || '/').replace(/\/$/, '') || '/';
  const hash = window.location.hash;

  // Path-based products route
  if (pathname === '/products') {
    return { view: 'products', chapterId: null };
  }

  // Path-based chapter route
  const pathChapterMatch = pathname.match(/^\/chapter[-/](0[1-7]|[1-7])$/);
  if (pathChapterMatch) {
    const padded = pathChapterMatch[1].padStart(2, '0');
    return { view: 'chapter', chapterId: padded };
  }

  // If pathname is not root or index.html, it's an unrecognized route
  if (pathname !== '/' && pathname !== '/index.html') {
    return { view: 'notFound', chapterId: null };
  }

  // Evaluate hash on root pathname
  if (!hash || hash === '#' || hash === '#home') {
    return { view: 'home', chapterId: null };
  }
  if (hash === '#products') {
    return { view: 'products', chapterId: null };
  }
  const chapterMatch = hash.match(/^#chapter[-/](0[1-7]|[1-7])$/);
  if (chapterMatch) {
    const padded = chapterMatch[1].padStart(2, '0');
    return { view: 'chapter', chapterId: padded };
  }

  // Unrecognized hash (e.g. #unknown, #404)
  return { view: 'notFound', chapterId: null };
};

export default function App() {
  const [viewState, setViewState] = useState(parseRouteState);
  const [showIntro, setShowIntro] = useState(() => parseRouteState().view !== 'notFound');
  const [replayKey, setReplayKey] = useState(0);
  const [showContact, setShowContact] = useState(false);

  const currentView = viewState.view;
  const activeChapterId = viewState.chapterId;

  // Sync state with URL hash and browser navigation events
  useEffect(() => {
    const handleRouteChange = () => {
      setViewState(parseRouteState());
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Synchronize top-level SEO for home, products, and 404 (chapter SEO is handled in ChapterPage)
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
    } else if (currentView === 'notFound') {
      document.title = 'DAY ZERO — 404 // Space Not Found';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'You have reached an unallocated sector of the Day Zero operating system.'
        );
      }
    }
  }, [currentView]);

  const handleNavigateView = (targetView, targetChapter) => {
    if (targetView === 'products') {
      if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        window.history.pushState(null, '', '/#products');
      } else {
        window.location.hash = 'products';
      }
      setViewState({ view: 'products', chapterId: null });
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (targetView === 'chapter') {
      const chId = String(targetChapter || '01').padStart(2, '0');
      if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        window.history.pushState(null, '', `/#chapter-${chId}`);
      } else {
        window.location.hash = `chapter-${chId}`;
      }
      setViewState({ view: 'chapter', chapterId: chId });
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        window.history.pushState(null, '', '/');
      } else {
        window.location.hash = '';
      }
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

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      handleGoHome();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F3F4F6] selection:bg-white selection:text-black flex flex-col justify-between">
      {/* Background Architectural Blueprint Grid & Film Grain (homepage & docs only) */}
      {currentView !== 'notFound' && <BlueprintGrid />}

      {/* 404 View: Dedicated System Screen */}
      {currentView === 'notFound' ? (
        <NotFoundPage
          onGoHome={handleGoHome}
          onGoBack={handleGoBack}
        />
      ) : (
        <>
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
                  key={activeChapterId}
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
        </>
      )}
    </div>
  );
}

