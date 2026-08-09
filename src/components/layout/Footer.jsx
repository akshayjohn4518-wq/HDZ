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
