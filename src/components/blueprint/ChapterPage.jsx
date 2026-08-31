import React, { useEffect } from 'react';
import { CHAPTERS_DATA } from '../../utils/chapters';

/**
 * ChapterPage represents an isolated, dedicated view for an individual chapter.
 * It does not merge all chapters together, keeping the chapter focused and clean.
 */
export default function ChapterPage({ chapterId = '01', onBackToHome, onNavigateChapter, onOpenContact }) {
  const chapter = CHAPTERS_DATA.find((c) => c.id === chapterId) || CHAPTERS_DATA[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [chapterId]);

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-[#F3F4F6] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 md:px-12 flex flex-col justify-between select-none overflow-x-hidden">
      {/* Top Breadcrumb / Back Bar */}
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-10">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="tracking-widest uppercase">BACK TO TIMELINE</span>
          </button>

          <div className="flex items-center gap-3 font-mono text-[11px] text-white/40">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-semibold">
              CHAPTER {chapter.id}
            </span>
            <span className="hidden sm:inline text-white/20">/</span>
            <span className="hidden sm:inline uppercase tracking-wider text-white/60">
              {chapter.title}
            </span>
          </div>
        </div>

        {/* Chapter Header Brief */}
        <div className="max-w-3xl space-y-4 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#0B0B0B] border border-white/15 text-[10px] font-mono text-white/60 tracking-widest uppercase">
            <span>INDEX // 0{chapter.id}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
            {chapter.title}
          </h1>

          <p className="text-sm sm:text-base text-white/60 font-light max-w-2xl leading-relaxed">
            {chapter.subtitle}
          </p>
        </div>

        {/* Dedicated Blank Chapter Canvas Space */}
        <div className="mt-12 sm:mt-16 w-full min-h-[400px] sm:min-h-[500px] border border-white/10 rounded-lg bg-[#0B0B0B]/40 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          {/* Subtle architectural background markings */}
          <div className="absolute inset-0 bg-blueprint-dense opacity-40 pointer-events-none" />
          
          <div className="relative z-10 space-y-3 max-w-md">
            <div className="w-8 h-8 mx-auto rounded-full border border-white/20 flex items-center justify-center text-xs font-mono text-white/40">
              {chapter.id}
            </div>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest">
              CHAPTER {chapter.id} WORKSPACE
            </p>
            <p className="text-[11px] font-mono text-white/20">
              [ Dedicated page initialized. Ready for chapter content. ]
            </p>
          </div>
        </div>
      </div>

      {/* Chapter Pagination / Switcher at Bottom */}
      <div className="max-w-7xl w-full mx-auto mt-16 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
        <div>
          {parseInt(chapter.id, 10) > 1 && (
            <button
              type="button"
              onClick={() => {
                const prevId = String(parseInt(chapter.id, 10) - 1).padStart(2, '0');
                if (onNavigateChapter) onNavigateChapter(prevId);
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ← CHAPTER {String(parseInt(chapter.id, 10) - 1).padStart(2, '0')}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onBackToHome}
          className="text-white/40 hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px]"
        >
          VIEW ALL CHAPTERS
        </button>

        <div>
          {parseInt(chapter.id, 10) < CHAPTERS_DATA.length && (
            <button
              type="button"
              onClick={() => {
                const nextId = String(parseInt(chapter.id, 10) + 1).padStart(2, '0');
                if (onNavigateChapter) onNavigateChapter(nextId);
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              CHAPTER {String(parseInt(chapter.id, 10) + 1).padStart(2, '0')} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
