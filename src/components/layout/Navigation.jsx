import React, { useState, useEffect } from 'react';

const CHAPTERS = ['01', '02', '03', '04', '05', '06', '07'];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeChapter, setActiveChapter] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      // Track active chapter with equal medium pacing
      if (scrollY < 300) {
        setActiveChapter(null); // Hero section
      } else {
        const chapterPositions = [300, 950, 1600, 2250, 2900, 3550, 4200];
        let current = '01';
        chapterPositions.forEach((pos, idx) => {
          if (scrollY >= pos) {
            current = CHAPTERS[idx];
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
    const el = document.getElementById(`chapter-${chNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const idx = CHAPTERS.indexOf(chNum);
      if (idx !== -1) {
        window.scrollTo({ top: 350 + idx * 650, behavior: 'smooth' });
      }
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
