import React from 'react';

/**
 * ChapterStickySidebar provides a sticky Table of Contents sidebar for Chapter editorial pages.
 * Supports smooth scrolling to sections, active section highlighting, viewport height containment,
 * and chapter coordinate metadata.
 */
export default function ChapterStickySidebar({
  chapter,
  sections = [],
  activeSection,
  onSelectSection
}) {
  if (!sections || sections.length === 0) return null;

  return (
    <aside
      aria-label="Chapter Table of Contents"
      className="hidden lg:block lg:col-span-3 sticky top-28 self-start max-h-[calc(100vh-8.5rem)] overflow-y-auto overscroll-contain pr-2 space-y-6 select-none z-20"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255, 255, 255, 0.15) transparent'
      }}
    >
      {/* Primary Table of Contents Card */}
      <div className="p-5 border border-white/10 rounded-lg bg-[#0B0B0B]/70 backdrop-blur-md space-y-4 shadow-xl shadow-black/40">
        <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase pb-2 border-b border-white/10 flex items-center justify-between">
          <span>TABLE OF CONTENTS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
        </div>

        <nav aria-label="Sections" className="space-y-1.5 font-mono text-xs">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectSection(sec.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`w-full text-left py-1.5 px-2.5 rounded transition-all duration-150 flex items-center justify-between cursor-pointer group ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md shadow-white/10 scale-[1.01]'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="truncate pr-2">
                  {sec.index}. {sec.title}
                </span>
                <span
                  className={`text-[10px] transition-transform duration-150 ${
                    isActive
                      ? 'opacity-90 translate-x-0.5'
                      : 'opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5'
                  }`}
                >
                  →
                </span>
              </button>
            );
          })}
        </nav>

        {/* Technical Coordinate & Topic Metadata */}
        <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-white/30 space-y-1">
          <p>
            COORDINATE:{' '}
            {chapter.id === '01'
              ? '500.750'
              : chapter.id === '02'
              ? '450.1400'
              : `${chapter.yPos || '000'}.000`}
          </p>
          {chapter.primaryTopic && (
            <p className="text-white/50">TOPIC: {chapter.primaryTopic}</p>
          )}
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <p className="text-white/40">STATUS: VERIFIED FIELD LOG</p>
          </div>
        </div>
      </div>

      {/* Supporting Editorial Card: The Day Zero Log */}
      <div className="p-4 border border-white/10 rounded-lg bg-[#0B0B0B]/40 backdrop-blur-sm text-xs font-mono text-white/40 space-y-2 border-l-2 border-l-white/30">
        <div className="flex items-center gap-2 text-white/80">
          <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-wider">
            THE DAY ZERO LOG
          </span>
        </div>
        <p className="text-[11px] leading-relaxed text-white/40 font-light">
          Documenting the messy, honest, raw beginning of products and builders before the spotlight arrives.
        </p>
      </div>
    </aside>
  );
}
