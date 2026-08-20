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
