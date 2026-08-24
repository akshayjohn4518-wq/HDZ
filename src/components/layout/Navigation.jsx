import React, { useState, useEffect } from 'react';
import { CHAPTERS_DATA, getScrollYForCanvasY, getCanvasYForScrollY } from '../../utils/chapters';

const CHAPTERS = CHAPTERS_DATA.map((ch) => ch.id);

export default function Navigation({ onLogoClick, currentView = 'home', onNavigateView }) {
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
              const isActive = currentView === 'home' && num === activeChapter;
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
