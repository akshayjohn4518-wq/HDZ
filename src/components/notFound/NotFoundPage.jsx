import React from 'react';
import { motion } from 'framer-motion';

export default function NotFoundPage({ onGoHome, onGoBack }) {
  const handleReturnHome = (e) => {
    if (e) e.preventDefault();
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = '/';
    }
  };

  const handleBack = (e) => {
    if (e) e.preventDefault();
    if (onGoBack) {
      onGoBack();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      handleReturnHome(e);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#050505] text-[#F3F4F6] select-none font-sans overflow-hidden">
      {/* 1. BRAND HEADER (Clean Day Zero Identity only) */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={handleReturnHome}
          className="flex items-center gap-2.5 sm:gap-3 group text-left shrink-0 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-sm"
          title="Return to Day Zero Home"
          aria-label="Day Zero Home"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 600 600" className="w-7 h-7 sm:w-8 sm:h-8 overflow-visible" aria-hidden="true">
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
            <span className="font-display text-xs sm:text-sm tracking-[0.22em] font-semibold text-white uppercase whitespace-nowrap">
              DAY ZERO
            </span>
          </div>
        </button>
      </header>

      {/* 2. HERO (Minimal, calm, strong typography, zero macro clutter) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto flex flex-col items-center text-center"
        >
          {/* Dominant Clean 404 Typography */}
          <h1
            className="font-display font-black text-8xl xs:text-9xl sm:text-[11rem] md:text-[13rem] lg:text-[15rem] leading-none tracking-tighter text-white select-none"
            aria-label="404 Error: Page Not Found"
          >
            404
          </h1>

          {/* Short Confident Headline */}
          <h2 className="mt-2 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight text-white uppercase max-w-lg">
            THIS SPACE DOESN'T EXIST.
          </h2>

          {/* Concise Supporting Copy */}
          <p className="mt-3 text-xs sm:text-sm md:text-base font-sans font-light text-white/50 max-w-md leading-relaxed">
            Looks like you've reached a part of the system that isn't available.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
            {/* Primary Action: Return to Day Zero */}
            <button
              type="button"
              onClick={handleReturnHome}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs sm:text-[13px] font-bold tracking-wider uppercase transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>RETURN TO DAY ZERO</span>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path
                  d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Secondary Action: Go Back */}
            <button
              type="button"
              onClick={handleBack}
              className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/10 hover:border-white/25 bg-transparent hover:bg-white/5 text-white/50 hover:text-white font-mono text-xs sm:text-[12px] tracking-widest uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path
                  d="M13 8H3M3 8L7.5 3.5M3 8L7.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>GO BACK</span>
            </button>
          </div>
        </motion.div>
      </main>

      {/* 3. MINIMAL EMPTY FOOTER SPACER */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 flex items-center justify-between text-[10px] font-mono text-white/20">
        <span>DAY ZERO</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
