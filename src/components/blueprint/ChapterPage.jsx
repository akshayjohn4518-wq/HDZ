import React, { useState, useEffect } from 'react';
import { CHAPTERS_DATA, CHAPTERS_FULL_CONTENT } from '../../utils/chapters';
import ChapterStickySidebar from './ChapterStickySidebar';

/**
 * ChapterPage represents an isolated, dedicated editorial view for chapters.
 * Features comprehensive editorial layout, typography hierarchy, and technical
 * blueprint accents for Chapter 01 and Chapter 02.
 */
export default function ChapterPage({
  chapterId = '01',
  onBackToHome,
  onNavigateChapter,
  onOpenContact
}) {
  const chapter = CHAPTERS_DATA.find((c) => c.id === chapterId) || CHAPTERS_DATA[0];
  const fullContent = CHAPTERS_FULL_CONTENT[chapter.id];
  const [activeSection, setActiveSection] = useState(
    fullContent?.sections?.[0]?.id || 'origin'
  );

  // Synchronize search-facing SEO title, meta description, and primary topic
  useEffect(() => {
    if (!chapter) return;
    const title = chapter.seoTitle || `DAY ZERO — Chapter ${chapter.id} | ${chapter.title}`;
    const description = chapter.metaDescription || chapter.subtitle;

    document.title = title;

    // Update standard meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // Update Primary Topic tag
    if (chapter.primaryTopic) {
      let topicMeta = document.querySelector('meta[name="topic"]') || document.querySelector('meta[name="keywords"]');
      if (!topicMeta) {
        topicMeta = document.createElement('meta');
        topicMeta.name = 'keywords';
        document.head.appendChild(topicMeta);
      }
      topicMeta.setAttribute('content', `DAY ZERO, ${chapter.primaryTopic}, product building, engineering`);
    }
  }, [chapter]);

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (fullContent && fullContent.sections?.length > 0) {
      setActiveSection(fullContent.sections[0].id);
    }
  }, [chapterId, fullContent]);

  // Performant scroll-synchronized section tracking using IntersectionObserver
  useEffect(() => {
    if (!fullContent || !fullContent.sections || fullContent.sections.length === 0) return;
    const sectionIds = fullContent.sections.map((s) => s.id);

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const visibleEntries = new Map();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibleEntries.set(entry.target.id, entry);
          });

          // If near top of page, lock to first section
          if (window.scrollY < 200) {
            setActiveSection(sectionIds[0]);
            return;
          }

          // Detect currently active section within the viewport reading zone (offset below top navbar)
          let currentBest = null;
          for (const sId of sectionIds) {
            const entry = visibleEntries.get(sId);
            if (entry && entry.isIntersecting) {
              const rect = entry.boundingClientRect;
              if (rect.top <= 260 && rect.bottom >= 80) {
                currentBest = sId;
              }
            }
          }

          if (currentBest) {
            setActiveSection(currentBest);
          }
        },
        {
          rootMargin: '-90px 0px -40% 0px',
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
        }
      );

      sectionIds.forEach((sId) => {
        const el = document.getElementById(sId);
        if (el) observer.observe(el);
      });

      // Smooth RAF scroll fallback for rapid jumps and edge boundaries (top/bottom)
      let ticking = false;
      const handleScrollFallback = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            // Top of page: activate first section
            if (window.scrollY < 200) {
              setActiveSection(sectionIds[0]);
              ticking = false;
              return;
            }

            const scrollBottom = window.innerHeight + window.scrollY;
            const docHeight = document.documentElement.scrollHeight;

            // Bottom of page: activate last section only when genuinely scrolled deep
            if (window.scrollY > 300 && docHeight - scrollBottom < 80) {
              setActiveSection(sectionIds[sectionIds.length - 1]);
              ticking = false;
              return;
            }

            // Proximity scan
            for (let i = sectionIds.length - 1; i >= 0; i--) {
              const el = document.getElementById(sectionIds[i]);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 240) {
                  setActiveSection(sectionIds[i]);
                  break;
                }
              }
            }
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScrollFallback, { passive: true });

      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScrollFallback);
      };
    } else {
      const handleScroll = () => {
        for (const sId of sectionIds) {
          const el = document.getElementById(sId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 240 && rect.bottom >= 80) {
              setActiveSection(sId);
              break;
            }
          }
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [chapterId, fullContent]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (!el) return;

    if (window.lenis) {
      window.lenis.scrollTo(el, { offset: -100, duration: 1.0 });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-[#F3F4F6] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 md:px-12 flex flex-col justify-between overflow-x-clip selection:bg-white selection:text-black">

      {/* ========================================================================= */}
      {/* TOP BREADCRUMB / BACK BAR                                                 */}
      {/* ========================================================================= */}
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-8 sm:mb-12">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="tracking-widest uppercase">BACK</span>
          </button>

          <div className="flex items-center gap-3 font-mono text-[11px] text-white/40">
            <span className="uppercase tracking-wider text-white/70">
              {chapter.title}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHAPTER HEADER BRIEF                                                      */}
        {/* ========================================================================= */}
        <header className="max-w-4xl space-y-4 pt-2 sm:pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#0B0B0B] border border-white/15 text-[10px] font-mono text-white/70 tracking-widest uppercase">
              <span>INDEX • 0{chapter.id}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase border-l border-white/15 pl-3">
              DOCUMENTARY ESSAY
            </span>
            {chapter.primaryTopic && (
              <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase border-l border-white/15 pl-3 hidden md:inline">
                TOPIC: {chapter.primaryTopic}
              </span>
            )}
            <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase hidden sm:inline">
              EST. READ 3 MIN
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-none">
            {chapter.title}
          </h1>

          <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl leading-relaxed">
            {chapter.subtitle}
          </p>
        </header>

        {/* ========================================================================= */}
        {/* MAIN EDITORIAL CONTENT                                                    */}
        {/* ========================================================================= */}
        {fullContent ? (
          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Desktop Sticky Index / Table of Contents */}
            <ChapterStickySidebar
              chapter={chapter}
              sections={fullContent.sections}
              activeSection={activeSection}
              onSelectSection={scrollToSection}
            />

            {/* Main Editorial Reading Column */}
            <div className="lg:col-span-9 space-y-16 sm:space-y-20 max-w-3xl">

              {/* ================================================================= */}
              {/* CHAPTER 01 SPECIFIC SECTIONS                                      */}
              {/* ================================================================= */}
              {chapter.id === '01' && (
                <>
                  {/* SECTION 01: THE ORIGIN */}
                  <section id="origin" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • CONCEPTION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE ORIGIN
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Every product starts before there is a product.
                      </p>
                      <p>There is an idea.</p>
                      <p>A question.</p>
                      <p>A problem that keeps coming back.</p>
                      <p className="text-white/70">
                        Sometimes there is only a rough thought that doesn't yet have a name.
                      </p>
                    </div>

                    <div className="mt-6 p-6 sm:p-8 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-blueprint-dense opacity-20 pointer-events-none" />
                      <p className="relative z-10 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        That is where DAY ZERO begins.
                      </p>
                      <div className="relative z-10 space-y-1.5 text-sm sm:text-base font-light text-white/75">
                        <p className="text-white/50">Not at launch.</p>
                        <p className="text-white/50">Not at the first customer.</p>
                        <p className="text-white/50">Not at the polished version.</p>
                        <p className="pt-2 font-medium text-white">
                          At the point where an idea becomes a commitment to find out what it could become.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 02: THE FIRST COMMIT */}
                  <section id="first-commit" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • TANGIBLE MANIFESTATION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE FIRST COMMIT
                    </h2>

                    <p className="text-lg sm:text-xl font-medium text-white">
                      The first commit is rarely impressive.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {[
                        'It might be an empty repository.',
                        'A rough sketch.',
                        'A paragraph of notes.',
                        'A prototype that barely works.',
                        'A conversation that turns into a question worth exploring.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-3.5 rounded border border-white/10 bg-[#0B0B0B]/50 font-mono text-xs text-white/70 flex items-start gap-3 ${idx === 4 ? 'sm:col-span-2' : ''
                            }`}
                        >
                          <span className="text-white/40 font-semibold">0{idx + 1}.</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed pt-2">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        But it changes something.
                      </p>
                      <p className="text-white/80">
                        An idea that existed only in your head now has a physical form.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03]">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">POSSIBILITY • 01</span>
                        <p className="text-sm sm:text-base font-medium text-white">Something can be tested.</p>
                      </div>
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03]">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">POSSIBILITY • 02</span>
                        <p className="text-sm sm:text-base font-medium text-white">Something can be questioned.</p>
                      </div>
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03]">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">POSSIBILITY • 03</span>
                        <p className="text-sm sm:text-base font-medium text-white">Something can fail.</p>
                      </div>
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03]">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">POSSIBILITY • 04</span>
                        <p className="text-sm sm:text-base font-medium text-white">And because it can fail, it can also improve.</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-1.5 font-display text-lg sm:text-xl font-bold tracking-tight text-white uppercase">
                      <p>That is the significance of Day Zero.</p>
                      <p className="text-white/60">It is the moment possibility becomes a process.</p>
                    </div>
                  </section>

                  {/* SECTION 03: WHY THE BEGINNING MATTERS */}
                  <section id="why-the-beginning-matters" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • PERSPECTIVE
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHY THE BEGINNING MATTERS
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-white/70">
                        The beginning is often treated as the least interesting part of a product story.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-white/50 py-2">
                        <span className="p-2.5 rounded bg-white/5 border border-white/10 text-center">Nothing polished to show</span>
                        <span className="p-2.5 rounded bg-white/5 border border-white/10 text-center">No impressive numbers</span>
                        <span className="p-2.5 rounded bg-white/5 border border-white/10 text-center">No finished interface</span>
                        <span className="p-2.5 rounded bg-white/5 border border-white/10 text-center">No success story</span>
                      </div>
                      <p className="text-lg sm:text-xl font-medium text-white pt-2">
                        But the beginning contains something that the finished product cannot show on its own: how the decisions were made.
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider block">
                        FOUNDATION INQUIRIES
                      </span>
                      <div className="space-y-2">
                        {[
                          'Why was this idea chosen?',
                          'What problem was being explored?',
                          'What assumptions existed?',
                          'What did we believe would happen?',
                          'What turned out to be wrong?',
                        ].map((q, qIdx) => (
                          <div
                            key={qIdx}
                            className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 text-sm sm:text-base font-mono text-white/90"
                          >
                            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
                              Q{qIdx + 1}
                            </span>
                            <span>{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-base sm:text-lg font-medium text-white pt-1">
                      Those questions become the foundation of everything that follows.
                    </p>
                  </section>

                  {/* SECTION 04: THE DAY ZERO PRINCIPLE */}
                  <section id="the-day-zero-principle" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • METHODOLOGY
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE DAY ZERO PRINCIPLE
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        We don't believe you need to know the entire path before taking the first step.
                      </p>
                      <p className="text-white/70">
                        You need enough clarity to begin.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      <div className="p-4 sm:p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase">STEP 01</span>
                        <p className="font-mono text-sm sm:text-base text-white font-medium">
                          Then the work creates information.
                        </p>
                      </div>
                      <div className="p-4 sm:p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase">STEP 02</span>
                        <p className="font-mono text-sm sm:text-base text-white font-medium">
                          Information changes decisions.
                        </p>
                      </div>
                      <div className="p-4 sm:p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase">STEP 03</span>
                        <p className="font-mono text-sm sm:text-base text-white font-medium">
                          Decisions shape the next iteration.
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-white text-black font-display font-bold text-xl sm:text-2xl space-y-1">
                      <p>The path becomes clearer by moving through it.</p>
                      <p className="text-black/70 text-base sm:text-lg font-mono font-medium">
                        That is how products are built.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 05: WHAT WE DOCUMENT */}
                  <section id="what-we-document" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • ARCHIVAL PROTOCOL
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHAT WE DOCUMENT
                    </h2>

                    <p className="text-base sm:text-lg text-white/70 font-light">
                      At the beginning of a project, we want to capture:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'The original idea',
                        'The problem being explored',
                        'The assumptions behind it',
                        'Early research',
                        'Initial sketches',
                        'First prototypes',
                        'Early technical decisions',
                        'Questions we don\'t yet have answers to',
                        'What changes as we learn',
                      ].map((docItem, docIdx) => (
                        <div
                          key={docIdx}
                          className={`p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/85 ${docIdx === 8 ? 'sm:col-span-2' : ''
                            }`}
                        >
                          <span className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center text-[9px] text-white/50 shrink-0">
                            ✓
                          </span>
                          <span>{docItem}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-2">
                      <p className="text-base sm:text-lg text-white/60 font-light">
                        The goal isn't to make the beginning look impressive.
                      </p>
                      <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        The goal is to make it visible.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 06: THE FIRST COMMIT (CLOSING) */}
                  <section id="the-closing-commit" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE • MANIFESTO
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        THE FIRST COMMIT
                      </h2>
                      <p className="text-xl sm:text-2xl font-light text-white/70">
                        There is always a first commit.
                      </p>
                      <p className="font-display text-3xl sm:text-6xl font-bold tracking-tight text-white uppercase drop-shadow-[0_0_24px_rgba(255,255,255,0.4)]">
                        Ours is DAY ZERO.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('02');
                        }}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">START THE JOURNEY</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>INITIATE DAY ZERO</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

              {/* ================================================================= */}
              {/* CHAPTER 02 SPECIFIC SECTIONS                                      */}
              {/* ================================================================= */}
              {chapter.id === '02' && (
                <>
                  {/* SECTION 01: THE FINISHED VERSION HIDES THE PROCESS */}
                  <section id="hiding-the-process" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • THE ILLUSION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE FINISHED VERSION HIDES THE PROCESS
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Most product stories begin near the end.
                      </p>
                    </div>

                    {/* The 5 Premade Assumptions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {[
                        'The product exists.',
                        'The interface is polished.',
                        'The launch has happened.',
                        'The difficult decisions have already been made.',
                        'The messy versions have disappeared.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-3.5 rounded border border-white/10 bg-[#0B0B0B]/50 font-mono text-xs text-white/70 flex items-center gap-3 ${idx === 4 ? 'sm:col-span-2' : ''
                            }`}
                        >
                          <span className="text-white/40 font-semibold">0{idx + 1}.</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Reality Contrast Card */}
                    <div className="mt-6 p-6 sm:p-8 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-blueprint-dense opacity-20 pointer-events-none" />
                      <p className="relative z-10 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        But that isn't what building actually looks like.
                      </p>
                      <p className="relative z-10 text-base sm:text-lg font-medium text-white">
                        Building is uncertain.
                      </p>
                      <p className="relative z-10 text-sm sm:text-base font-light text-white/80 leading-relaxed pt-1">
                        It involves incomplete information, competing ideas, failed experiments, technical limitations, changing assumptions, and decisions that only make sense after you learn something new.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 02: THE MISSING STORY */}
                  <section id="the-missing-story" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • THE UNSEEN CONTEXT
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE MISSING STORY
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-white/80">
                        When we only see the final result, we lose the context around it.
                      </p>
                      <p className="font-medium text-white pt-2">
                        We don't see:
                      </p>
                    </div>

                    {/* 6 What We Don't See Points */}
                    <div className="space-y-2">
                      {[
                        'Why one idea was rejected.',
                        'Why a prototype was rebuilt.',
                        'Why a feature was removed.',
                        'Why a technical approach changed.',
                        'Why an experiment failed.',
                        'Why the team decided to continue.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 text-sm sm:text-base font-mono text-white/90"
                        >
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
                            0{idx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Takeaway Card */}
                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2 font-display">
                      <p className="text-base sm:text-lg text-white/70">
                        The finished product tells us what exists.
                      </p>
                      <p className="text-base sm:text-lg text-white/70">
                        The process tells us why it exists.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase pt-1 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                        DAY ZERO is interested in the second story.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 03: FAILURE IS INFORMATION */}
                  <section id="failure-is-information" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • KNOWLEDGE EXTRACTION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      FAILURE IS INFORMATION
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        A failed experiment isn't automatically wasted work.
                      </p>
                      <p className="text-white/70">
                        It tells you something.
                      </p>
                    </div>

                    {/* The 5 "Perhaps" Diagnostics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {[
                        'Perhaps the assumption was wrong.',
                        'Perhaps the problem wasn\'t important enough.',
                        'Perhaps the implementation was flawed.',
                        'Perhaps the timing was wrong.',
                        'Perhaps the idea needs to change.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded border border-white/15 bg-white/[0.03] flex items-start gap-3 ${idx === 4 ? 'sm:col-span-2' : ''
                            }`}
                        >
                          <span className="text-[10px] font-mono text-white/40 px-1.5 py-0.5 rounded bg-white/10 shrink-0">
                            P0{idx + 1}
                          </span>
                          <span className="text-sm sm:text-base font-medium text-white/90">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Shift / Pivot Query Card */}
                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/20 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest block">
                          THE USEFUL QUESTION ISN'T:
                        </span>
                        <p className="font-mono text-lg sm:text-xl text-white/40 line-through">
                          "Did this fail?"
                        </p>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-white/10">
                        <span className="text-[11px] font-mono text-white/60 uppercase tracking-widest block">
                          THE USEFUL QUESTION IS:
                        </span>
                        <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                          "What did this teach us?"
                        </p>
                      </div>
                    </div>

                    <div className="p-5 rounded-lg bg-white text-black font-display font-bold text-lg sm:text-xl">
                      That shift turns failure from something to hide into something to document.
                    </div>
                  </section>

                  {/* SECTION 04: THE COST OF HIDING THE PROCESS */}
                  <section id="cost-of-hiding" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • THE DECEPTIVE MYTH
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE COST OF HIDING THE PROCESS
                    </h2>

                    <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
                      When only successful outcomes are visible, building can look deceptively simple.
                    </p>

                    {/* The Linear Illusion Chain */}
                    <div className="p-4 sm:p-5 rounded-lg bg-[#0B0B0B] border border-white/10 space-y-3">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">
                        THE DECEPTIVE LINEAR STORY
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-white/60">
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">Someone has an idea.</span>
                        <span>→</span>
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">They build it.</span>
                        <span>→</span>
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">It works.</span>
                        <span>→</span>
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">People use it.</span>
                        <span>→</span>
                        <span className="px-2.5 py-1 rounded bg-white/10 border border-white/10 text-white/40">The story ends.</span>
                      </div>
                    </div>

                    {/* The Ground Truth */}
                    <div className="space-y-3 pt-2">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Real product development is rarely that clean.
                      </p>
                      <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
                        The distance between an idea and a working product is filled with decisions.
                      </p>
                      <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        DAY ZERO exists to make that distance visible.
                      </div>
                    </div>
                  </section>

                  {/* SECTION 05: WHAT WE WANT TO SHOW */}
                  <section id="what-we-want-to-show" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • RAW ARTIFACTS
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHAT WE WANT TO SHOW
                    </h2>

                    {/* 8 Raw Artifacts Ledger */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'The rejected version.',
                        'The rough version.',
                        'The confusing version.',
                        'The experiment that didn\'t work.',
                        'The question that changed the direction.',
                        'The technical problem that took longer than expected.',
                        'The decision that looked obvious only afterwards.',
                        'The iteration that finally moved things forward.',
                      ].map((docItem, docIdx) => (
                        <div
                          key={docIdx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/85"
                        >
                          <span className="text-[10px] font-mono text-white/40 px-1.5 py-0.5 rounded bg-white/10 shrink-0">
                            RAW-0{docIdx + 1}
                          </span>
                          <span>{docItem}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-1.5 font-display">
                      <p className="text-base sm:text-lg text-white/60 font-light">
                        This is not a collection of mistakes.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        It is the record of building.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 06: THE PROBLEM WE ARE SOLVING */}
                  <section id="the-problem-we-are-solving" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE • THE MISSION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-4">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        THE PROBLEM WE ARE SOLVING
                      </h2>
                      <p className="text-lg sm:text-xl font-light text-white/80 leading-relaxed">
                        There is already plenty of information about how successful products look.
                      </p>
                      <p className="text-xl sm:text-2xl font-medium text-white leading-relaxed">
                        We want to document what it takes to make them real.
                      </p>
                      <p className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase pt-2 drop-shadow-[0_0_24px_rgba(255,255,255,0.4)]">
                        That means treating the process itself as something worth learning from.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('03');
                        }}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">SEE THE PROCESS</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>INITIATE DAY ZERO</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

              {/* ================================================================= */}
              {/* CHAPTER 03 SPECIFIC SECTIONS                                      */}
              {/* ================================================================= */}
              {chapter.id === '03' && (
                <>
                  {/* SECTION 01: EVERY JOURNEY HAS A DAY ZERO */}
                  <section id="every-journey-has-a-day-zero" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • THE BELIEF
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      EVERY JOURNEY HAS A DAY ZERO
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-white/70">
                        DAY ZERO is built around a simple belief:
                      </p>
                      <p className="font-display text-xl sm:text-3xl font-bold tracking-tight text-white uppercase pt-1">
                        the beginning matters.
                      </p>
                    </div>

                    {/* 4 Universal Beginnings Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        'Every product has a point where nothing is certain yet.',
                        'Every builder has a first project.',
                        'Every engineer has a first system they had to figure out.',
                        'Every creator has a first piece of work that wasn\'t quite what they wanted.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded border border-white/15 bg-white/[0.03] space-y-1.5"
                        >
                          <span className="text-[10px] font-mono text-white/40 uppercase">
                            ORIGIN • 0{idx + 1}
                          </span>
                          <p className="text-sm sm:text-base font-medium text-white/90 leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Core Conviction Callout */}
                    <div className="p-6 sm:p-8 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-blueprint-dense opacity-20 pointer-events-none" />
                      <p className="relative z-10 text-base sm:text-lg font-light text-white/70">
                        Those beginnings are not evidence that someone is inexperienced.
                      </p>
                      <p className="relative z-10 font-display text-xl sm:text-3xl font-bold tracking-tight text-white uppercase drop-shadow-[0_0_16px_rgba(255,255,255,0.4)]">
                        They are evidence that they started.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 02: BUILDING IS A LEARNING PROCESS */}
                  <section id="building-is-a-learning-process" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • THE CONTINUOUS LOOP
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      BUILDING IS A LEARNING PROCESS
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-white/70">
                        We don't see product development as a straight line.
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-white uppercase font-mono">
                        It is a loop.
                      </p>
                    </div>

                    {/* The 6 Loop Stages */}
                    <div className="space-y-2 pt-2">
                      {[
                        { label: 'COMMIT', desc: 'Decide that the problem is worth exploring.' },
                        { label: 'BUILD', desc: 'Turn the idea into something tangible.' },
                        { label: 'TEST', desc: 'Put assumptions under pressure.' },
                        { label: 'LEARN', desc: 'Pay attention to what actually happens.' },
                        { label: 'ITERATE', desc: 'Change the product based on what was learned.' },
                        { label: 'BUILD AGAIN', desc: 'Return to the problem with better information.' },
                      ].map((st, idx) => (
                        <React.Fragment key={st.label}>
                          <div className="p-4 rounded bg-[#0B0B0B] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/60">
                                0{idx + 1}
                              </span>
                              <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                                {st.label}
                              </span>
                            </div>
                            <span className="text-xs sm:text-sm font-light text-white/75 sm:text-right">
                              {st.desc}
                            </span>
                          </div>
                          {idx < 5 && (
                            <div className="flex justify-center text-white/30 font-mono text-xs py-0.5">
                              ↓
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <p className="text-base sm:text-lg font-mono font-medium text-white/90 pt-1">
                      That cycle continues.
                    </p>
                  </section>

                  {/* SECTION 03: COMMITMENT */}
                  <section id="commitment" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • INITIATION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      COMMITMENT
                    </h2>

                    <div className="space-y-4 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Commitment is not certainty.
                      </p>
                      <p className="text-white/80">
                        It is choosing to begin despite uncertainty.
                      </p>
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-3 font-display">
                      <p className="text-base sm:text-lg text-white/60">
                        You don't commit because you know the outcome.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        You commit because the question is worth answering.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 04: DISCIPLINE */}
                  <section id="discipline" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • SYSTEMATIZATION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      DISCIPLINE
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Ideas are easy to start.
                      </p>
                      <p className="text-white/80">
                        Progress requires consistency.
                      </p>
                      <p className="text-white/70 pt-1">
                        Documentation, testing, iteration and reflection only become valuable when they become part of the process.
                      </p>
                    </div>

                    <div className="p-5 rounded-lg bg-white text-black font-display font-bold text-lg sm:text-xl">
                      Discipline turns occasional effort into a system for learning.
                    </div>
                  </section>

                  {/* SECTION 05: LEARNING */}
                  <section id="learning" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • ABSORPTION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      LEARNING
                    </h2>

                    <p className="text-lg sm:text-xl font-medium text-white">
                      Every experiment should leave you knowing something you didn't know before.
                    </p>

                    {/* Binary Insights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03]">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">OUTCOME • 01</span>
                        <p className="text-sm sm:text-base font-medium text-white">Sometimes that knowledge confirms the direction.</p>
                      </div>
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03]">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">OUTCOME • 02</span>
                        <p className="text-sm sm:text-base font-medium text-white">Sometimes it changes it.</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      <p className="font-mono text-base font-medium text-white">
                        Both are useful.
                      </p>
                      <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-1.5">
                        <p className="text-base sm:text-lg text-white/60 font-light">
                          Learning is not a separate stage after building.
                        </p>
                        <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                          It is part of building.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 06: ITERATION */}
                  <section id="iteration" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • EVOLUTION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      ITERATION
                    </h2>

                    <p className="text-lg sm:text-xl font-medium text-white">
                      The first version is a starting point, not a verdict.
                    </p>

                    {/* Step rail */}
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm text-white/70 py-2">
                      <span className="px-3 py-1.5 rounded bg-white/5 border border-white/15 text-white">Build.</span>
                      <span>→</span>
                      <span className="px-3 py-1.5 rounded bg-white/5 border border-white/15 text-white">Observe.</span>
                      <span>→</span>
                      <span className="px-3 py-1.5 rounded bg-white/5 border border-white/15 text-white">Question.</span>
                      <span>→</span>
                      <span className="px-3 py-1.5 rounded bg-white/5 border border-white/15 text-white">Change.</span>
                      <span>→</span>
                      <span className="px-3 py-1.5 rounded bg-white text-black font-bold">Build again.</span>
                    </div>

                    <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase pt-1">
                      Iteration is how an idea becomes a product.
                    </p>
                  </section>

                  {/* SECTION 07: GROWTH */}
                  <section id="growth" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        07
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • MATURATION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      GROWTH
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-white/70">
                        Growth is not only about scale.
                      </p>
                      <p className="text-lg sm:text-xl font-medium text-white">
                        It is also about understanding.
                      </p>
                    </div>

                    {/* 6 Dimensions of Growth */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {[
                        'A better question.',
                        'A better system.',
                        'A better prototype.',
                        'A better decision.',
                        'A better explanation.',
                        'A better version than the one before.',
                      ].map((dim, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
                            +
                          </span>
                          <span>{dim}</span>
                        </div>
                      ))}
                    </div>

                    <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase pt-2">
                      That is progress.
                    </p>
                  </section>

                  {/* SECTION 08: OUR PRINCIPLE */}
                  <section id="our-principle" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        08
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE • THE PRINCIPLE
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        OUR PRINCIPLE
                      </h2>
                      <p className="font-display text-3xl sm:text-6xl font-bold tracking-tight text-white uppercase drop-shadow-[0_0_24px_rgba(255,255,255,0.4)]">
                        START BEFORE YOU FEEL READY.
                      </p>
                      <p className="text-xl sm:text-2xl font-light text-white/70 pt-2">
                        Then let the work teach you what comes next.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('04');
                        }}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">EXPLORE THE PRINCIPLES</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>INITIATE DAY ZERO</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

              {/* ================================================================= */}
              {/* CHAPTER 04 SPECIFIC SECTIONS                                      */}
              {/* ================================================================= */}
              {chapter.id === '04' && (
                <>
                  {/* SECTION 01: THE PROCESS IS PART OF THE PRODUCT */}
                  <section id="process-is-product" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • CORE PARADIGM
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE PROCESS IS PART OF THE PRODUCT
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Building in public means sharing the process while it is still happening.
                      </p>
                    </div>

                    {/* Exclusions */}
                    <div className="space-y-1.5 font-mono text-xs text-white/40">
                      <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-1">
                        BEYOND THE HIGHLIGHT REEL
                      </span>
                      <p className="line-through">Not only the finished work.</p>
                      <p className="line-through">Not only the successful experiments.</p>
                      <p className="line-through">Not only the moments worth celebrating.</p>
                    </div>

                    {/* The 7 Process Elements */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2">
                      {[
                        'The process.',
                        'The research.',
                        'The prototypes.',
                        'The decisions.',
                        'The failures.',
                        'The iterations.',
                        'The lessons.',
                      ].map((elem, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded bg-[#0B0B0B] border border-white/15 text-center font-mono text-xs text-white/90 font-medium"
                        >
                          {elem}
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                      DAY ZERO is built around this approach.
                    </div>
                  </section>

                  {/* SECTION 02: WHY DOCUMENT THE PROCESS? */}
                  <section id="why-document" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • THE RECORD
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHY DOCUMENT THE PROCESS?
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Documentation creates a record.
                      </p>
                      <p className="text-white/70">
                        Without it, decisions disappear into memory.
                      </p>
                    </div>

                    {/* 4 Disappearing Realities */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {[
                        'A prototype gets replaced.',
                        'A rejected idea gets forgotten.',
                        'A technical problem gets solved and its context disappears.',
                        'A lesson is learned but never written down.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/80"
                        >
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/50">
                            0{idx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Anchor Callout */}
                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2 font-display">
                      <p className="text-base sm:text-lg text-white/60 font-light">
                        Documentation gives those moments somewhere to live.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        It creates a record that can be revisited, understood and shared.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 03: BUILDING IN PUBLIC IS NOT PERFORMING */}
                  <section id="not-performing" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • HONESTY OVER THEATER
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      BUILDING IN PUBLIC IS NOT PERFORMING
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-white/80">
                        There is a difference between documenting work and creating content about work.
                      </p>
                      <p className="font-display text-xl sm:text-2xl font-bold text-white uppercase pt-1">
                        DAY ZERO is interested in the former.
                      </p>
                    </div>

                    {/* Anti-hype Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-white/50 py-1">
                      <span className="p-3 rounded bg-white/5 border border-white/10 text-center">The goal is not to make every moment look exciting.</span>
                      <span className="p-3 rounded bg-white/5 border border-white/10 text-center">The goal is not to manufacture progress.</span>
                      <span className="p-3 rounded bg-white text-black font-bold text-center">The goal is to show what actually happened.</span>
                    </div>

                    {/* 3 Ground Rules */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider block">
                        THE THREE TRUTH CONDITIONS
                      </span>
                      {[
                        'If an experiment fails, the record should say it failed.',
                        'If an assumption changes, the record should show why.',
                        'If a prototype gets abandoned, that decision is part of the story.',
                      ].map((rule, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center text-[9px] text-white/60 shrink-0">
                            ✓
                          </span>
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-lg bg-white text-black font-display font-bold text-lg sm:text-xl">
                      Honest documentation is more useful than polished performance.
                    </div>
                  </section>

                  {/* SECTION 04: THE DAY ZERO BUILD LOOP */}
                  <section id="build-loop" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • THE OPERATIONAL LOOP
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE DAY ZERO BUILD LOOP
                    </h2>

                    {/* 6-Stage Loop Matrix */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      {[
                        {
                          num: '01',
                          name: 'RESEARCH',
                          points: ['Understand the problem.', 'Find what is already known.', 'Identify assumptions.', 'Ask better questions.']
                        },
                        {
                          num: '02',
                          name: 'PROTOTYPE',
                          points: ['Turn an idea into something tangible.', 'It doesn\'t need to be perfect.', 'It needs to be testable.']
                        },
                        {
                          num: '03',
                          name: 'TEST',
                          points: ['Put the assumption under pressure.', 'Observe what happens.', 'Look for evidence.']
                        },
                        {
                          num: '04',
                          name: 'ITERATE',
                          points: ['Keep what works.', 'Change what doesn\'t.', 'Remove what isn\'t necessary.']
                        },
                        {
                          num: '05',
                          name: 'DOCUMENT',
                          points: ['Record what happened.', 'What changed?', 'Why did it change?', 'What did we learn?']
                        },
                        {
                          num: '06',
                          name: 'SHARE',
                          points: ['Make the useful parts accessible to others.', 'Then begin again.']
                        },
                      ].map((stage) => (
                        <div
                          key={stage.num}
                          className="p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-3 flex flex-col justify-between"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-mono text-white/40">
                              <span>STAGE</span>
                              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white font-semibold">{stage.num}</span>
                            </div>
                            <h3 className="font-mono text-base sm:text-lg font-bold text-white tracking-wider">
                              {stage.name}
                            </h3>
                          </div>
                          <div className="space-y-1.5 pt-2 border-t border-white/10 font-mono text-xs text-white/70">
                            {stage.points.map((pt, pIdx) => (
                              <p key={pIdx} className="leading-relaxed flex items-start gap-1.5">
                                <span className="text-white/30">•</span>
                                <span>{pt}</span>
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SECTION 05: WHAT WE SHARE */}
                  <section id="what-we-share" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • ARCHIVAL TAXONOMY
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHAT WE SHARE
                    </h2>

                    <p className="text-base sm:text-lg text-white/70 font-light">
                      DAY ZERO can become a record of:
                    </p>

                    {/* 10 Archival Categories */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Product experiments',
                        'Engineering projects',
                        'Prototype development',
                        'Research',
                        'Technical decisions',
                        'Design iterations',
                        'Failed approaches',
                        'Build logs',
                        'Lessons learned',
                        'Product development case studies',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/85"
                        >
                          <span className="text-[10px] font-mono text-white/40 px-1.5 py-0.5 rounded bg-white/10 shrink-0">
                            CAT-0{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Work First Principle */}
                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-1.5 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                      <p>The work comes first.</p>
                      <p className="text-white/60">The documentation follows the work.</p>
                    </div>
                  </section>

                  {/* SECTION 06: WHY IT MATTERS */}
                  <section id="why-it-matters" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • IMPACT & INSPIRATION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHY IT MATTERS
                    </h2>

                    <p className="text-lg sm:text-xl font-medium text-white">
                      Someone else is always standing at their own beginning.
                    </p>

                    {/* 4 Impact Statements */}
                    <div className="space-y-2.5">
                      {[
                        'If they can see the unfinished work, they can understand that uncertainty is normal.',
                        'If they can see the failed experiment, they can learn from it.',
                        'If they can see the iteration, they can understand the process.',
                        'And if they can see someone start, perhaps they will start too.',
                      ].map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-4 rounded border border-white/10 bg-[#0B0B0B]/60 font-mono text-xs sm:text-sm text-white/85 flex items-center gap-3 ${sIdx === 3 ? 'border-white/30 bg-white/[0.04] text-white font-semibold' : ''
                            }`}
                        >
                          <span className="text-white/40 font-semibold">0{sIdx + 1}.</span>
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SECTION 07: THE DAY ZERO RULE */}
                  <section id="the-day-zero-rule" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        07
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE • THE RULE
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        THE DAY ZERO RULE
                      </h2>
                      <p className="font-display text-2xl sm:text-4xl font-light text-white/60 uppercase">
                        DON'T JUST SHOW WHAT WORKED.
                      </p>
                      <p className="font-display text-3xl sm:text-6xl font-bold tracking-tight text-white uppercase drop-shadow-[0_0_24px_rgba(255,255,255,0.4)]">
                        SHOW WHAT YOU LEARNED.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('05');
                        }}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">ENTER THE BUILD LOG</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>INITIATE DAY ZERO</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

              {/* ================================================================= */}
              {/* CHAPTER 05 SPECIFIC SECTIONS                                      */}
              {/* ================================================================= */}
              {chapter.id === '05' && (
                <>
                  {/* SECTION 01: THE WORK IS HAPPENING NOW */}
                  <section id="work-is-happening-now" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • ACTIVE INITIATIVES
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE WORK IS HAPPENING NOW
                    </h2>

                    <div className="space-y-3.5 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        DAY ZERO is not a retrospective project.
                      </p>
                      <p className="text-white/80">
                        It is an ongoing system for building.
                      </p>
                      <p className="text-white/70">
                        The current missions are the products, engineering projects, experiments and ideas moving through that system.
                      </p>
                    </div>

                    {/* 4 Mission Paths */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        'Some will become products.',
                        'Some will remain experiments.',
                        'Some will change direction.',
                        'Some may be abandoned.',
                      ].map((pathItem, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded border border-white/15 bg-white/[0.03] flex items-center gap-3"
                        >
                          <span className="text-[10px] font-mono text-white/40 px-2 py-0.5 rounded bg-white/10 shrink-0">
                            PATH 0{idx + 1}
                          </span>
                          <span className="text-sm sm:text-base font-medium text-white/90">
                            {pathItem}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                      That is part of the process.
                    </div>
                  </section>

                  {/* SECTION 02: EVERY MISSION STARTS WITH A PROBLEM */}
                  <section id="starts-with-a-problem" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • THE ROOT PROBLEM
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      EVERY MISSION STARTS WITH A PROBLEM
                    </h2>

                    <p className="text-lg sm:text-xl font-medium text-white">
                      Before there is a roadmap, there should be a reason to build.
                    </p>

                    {/* 5 Problem Inquiries */}
                    <div className="space-y-2 pt-1">
                      {[
                        'What problem are we exploring?',
                        'Who experiences it?',
                        'Why does it matter?',
                        'What do we currently believe?',
                        'What don\'t we know?',
                      ].map((q, qIdx) => (
                        <div
                          key={qIdx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 text-sm sm:text-base font-mono text-white/90"
                        >
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
                            Q0{qIdx + 1}
                          </span>
                          <span>{q}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-1.5 font-display text-lg sm:text-xl">
                      <p className="text-white/60">The first objective isn't to build everything.</p>
                      <p className="font-bold text-white uppercase">
                        It is to understand enough to make the next useful decision.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 03: FROM IDEA TO MISSION */}
                  <section id="from-idea-to-mission" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • NON-LINEAR STATES
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      FROM IDEA TO MISSION
                    </h2>

                    <p className="text-base sm:text-lg text-white/80 font-light">
                      A DAY ZERO mission can move through several states:
                    </p>

                    {/* 6 Mission States */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                      {[
                        { name: 'QUESTION', desc: 'Something is worth exploring.' },
                        { name: 'RESEARCH', desc: 'We investigate the problem and existing possibilities.' },
                        { name: 'PROTOTYPE', desc: 'We create an early version that can be tested.' },
                        { name: 'EXPERIMENT', desc: 'We test an assumption.' },
                        { name: 'ITERATION', desc: 'We change the system based on evidence.' },
                        { name: 'PRODUCT', desc: 'An idea becomes something people can actually use.' },
                      ].map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-4 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs font-mono text-white/40">
                            <span>STATE</span>
                            <span className="px-1.5 py-0.5 rounded bg-white/10 text-white font-semibold">0{sIdx + 1}</span>
                          </div>
                          <h3 className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                            {st.name}
                          </h3>
                          <p className="font-mono text-xs text-white/70 leading-relaxed pt-1">
                            {st.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Non-Linear Callout */}
                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2 font-display">
                      <p className="text-lg sm:text-xl font-bold text-white uppercase">
                        These states are not necessarily linear.
                      </p>
                      <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                        A mission can move backwards. A prototype can return to research. A product can become an experiment again.
                      </p>
                      <p className="text-base sm:text-lg font-bold text-white uppercase pt-1">
                        That is normal.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 04: WHAT COUNTS AS PROGRESS? */}
                  <section id="what-counts-as-progress" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • DEFINING SUCCESS
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WHAT COUNTS AS PROGRESS?
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Progress isn't only shipping.
                      </p>
                      <p className="text-white/70">
                        Progress can be:
                      </p>
                    </div>

                    {/* 6 Forms of Progress */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Discovering that an assumption was wrong.',
                        'Removing an unnecessary feature.',
                        'Finding a simpler technical approach.',
                        'Understanding a user\'s problem better.',
                        'Building a prototype that answers an important question.',
                        'Documenting a lesson that prevents the same mistake later.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
                            +
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-lg bg-white text-black font-display font-bold text-xl sm:text-2xl">
                      Progress is better information.
                    </div>
                  </section>

                  {/* SECTION 05: THE MISSION LOG */}
                  <section id="the-mission-log" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • ARCHIVAL SCHEMA
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE MISSION LOG
                    </h2>

                    <p className="text-base sm:text-lg text-white/70 font-light">
                      Every active project should eventually have a visible record.
                    </p>

                    {/* Schema Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { field: 'MISSION', prompt: 'What are we building?' },
                        { field: 'PROBLEM', prompt: 'What are we trying to solve?' },
                        { field: 'CURRENT STATE', prompt: 'Where is the project now?' },
                        { field: 'LATEST ITERATION', prompt: 'What changed?' },
                        { field: 'NEXT STEP', prompt: 'What are we testing or building next?' },
                        { field: 'LESSONS', prompt: 'What have we learned so far?' },
                      ].map((schemaItem, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded bg-[#0B0B0B] border border-white/10 space-y-1.5"
                        >
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">
                            FIELD • {schemaItem.field}
                          </span>
                          <p className="font-mono text-sm sm:text-base font-medium text-white">
                            {schemaItem.prompt}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 font-display text-lg sm:text-xl font-bold tracking-tight text-white uppercase">
                      This is where the abstract idea of "building in public" becomes real.
                    </div>
                  </section>

                  {/* SECTION 06: CURRENT MISSIONS (FINALE) */}
                  <section id="current-missions-manifesto" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE • THE MISSION LEDGER
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        CURRENT MISSIONS
                      </h2>
                      <p className="text-lg sm:text-xl font-light text-white/80">
                        This section should eventually contain the actual DAY ZERO projects.
                      </p>
                      <p className="text-base sm:text-lg font-light text-white/60">
                        For every mission, visitors should be able to discover:
                      </p>
                    </div>

                    {/* 5 Discovery Pillars */}
                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs sm:text-sm">
                      {[
                        'WHAT IT IS',
                        'WHY IT EXISTS',
                        'HOW IT IS BEING BUILT',
                        'WHAT HAS BEEN LEARNED',
                        'WHAT HAPPENS NEXT',
                      ].map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-2 rounded bg-white/5 border border-white/15 text-white font-semibold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Manifesto Creed */}
                    <div className="p-6 sm:p-8 rounded-lg bg-[#0B0B0B] border border-white/20 space-y-2">
                      <p className="font-mono text-base sm:text-lg text-white/50">
                        No invented metrics.
                      </p>
                      <p className="font-mono text-base sm:text-lg text-white/50">
                        No artificial progress.
                      </p>
                      <p className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase pt-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        Just the work.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('06');
                        }}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">EXPLORE FUTURE ECOSYSTEM</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>INITIATE DAY ZERO</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

              {/* ================================================================= */}
              {/* CHAPTER 06 SPECIFIC SECTIONS                                      */}
              {/* ================================================================= */}
              {chapter.id === '06' && (
                <>
                  {/* SECTION 01: MORE THAN A WEBSITE */}
                  <section id="more-than-a-website" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PHASE • THE HORIZON
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      MORE THAN A WEBSITE
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        DAY ZERO starts with a website.
                      </p>
                      <p className="text-white/80">
                        It isn't intended to end there.
                      </p>
                      <p className="text-white/70 pt-1">
                        The long-term vision is an ecosystem built around creating, learning and documenting.
                      </p>
                    </div>

                    {/* 6 Core Pillars Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                      {[
                        'Products.',
                        'Engineering projects.',
                        'Knowledge.',
                        'Documentation.',
                        'Media.',
                        'Community.',
                      ].map((pillar, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg bg-[#0B0B0B] border border-white/15 flex items-center justify-between font-mono text-sm font-semibold text-white"
                        >
                          <span>{pillar}</span>
                          <span className="text-xs text-white/40">0{idx + 1}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                      Each new project should contribute something to the larger system.
                    </div>
                  </section>

                  {/* SECTION 02: THE PRODUCT LAYER */}
                  <section id="the-product-layer" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        LAYER • 01 REAL WORK
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE PRODUCT LAYER
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        The foundation is real work.
                      </p>
                      <p className="text-white/80">
                        DAY ZERO should grow through a portfolio of products and experiments rather than through ideas alone.
                      </p>
                    </div>

                    {/* 3 Realities */}
                    <div className="space-y-2.5 pt-1">
                      {[
                        'Every product becomes an opportunity to learn.',
                        'Every project creates documentation.',
                        'Every iteration adds another piece to the record.',
                      ].map((truth, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-4 rounded border border-white/15 bg-white/[0.03] flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-white/40 font-semibold">0{tIdx + 1}.</span>
                          <span>{truth}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SECTION 03: THE KNOWLEDGE LAYER */}
                  <section id="the-knowledge-layer" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        LAYER • 02 INTELLECTUAL ASSETS
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE KNOWLEDGE LAYER
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        The lessons created while building should not disappear when a project moves on.
                      </p>
                      <p className="text-white/70">
                        They can become:
                      </p>
                    </div>

                    {/* 8 Knowledge Assets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Engineering case studies',
                        'Product development notes',
                        'Technical documentation',
                        'Research',
                        'Experiments',
                        'Build logs',
                        'Lessons learned',
                        'Practical resources',
                      ].map((asset, aIdx) => (
                        <div
                          key={aIdx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-[10px] font-mono text-white/40 px-1.5 py-0.5 rounded bg-white/10 shrink-0">
                            K-0{aIdx + 1}
                          </span>
                          <span>{asset}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-lg bg-white text-black font-display font-bold text-lg sm:text-xl">
                      This turns individual projects into reusable knowledge.
                    </div>
                  </section>

                  {/* SECTION 04: THE DOCUMENTATION LAYER */}
                  <section id="the-documentation-layer" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        LAYER • 03 THE ARCHIVAL TRAIL
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE DOCUMENTATION LAYER
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Documentation creates continuity.
                      </p>
                      <p className="text-white/80">
                        A project shouldn't simply appear one day as a finished product.
                      </p>
                      <p className="font-mono text-sm uppercase tracking-wider text-white pt-1">
                        There should be a trail.
                      </p>
                    </div>

                    {/* 8 Trail Steps Rail */}
                    <div className="p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-3">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
                        {[
                          'The problem.',
                          'The first idea.',
                          'The research.',
                          'The prototype.',
                          'The failures.',
                          'The iterations.',
                          'The decisions.',
                          'The result.',
                        ].map((step, idx) => (
                          <React.Fragment key={idx}>
                            <span className="px-3 py-1.5 rounded bg-white/5 border border-white/15 text-white/90">
                              {step}
                            </span>
                            {idx < 7 && <span className="text-white/30">→</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase pt-1">
                      That trail becomes part of the DAY ZERO archive.
                    </p>
                  </section>

                  {/* SECTION 05: THE COMMUNITY LAYER */}
                  <section id="the-community-layer" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        LAYER • 04 THE BUILDER NETWORK
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE COMMUNITY LAYER
                    </h2>

                    <p className="text-base sm:text-lg text-white/80 font-light">
                      The ecosystem should also create a place for other builders.
                    </p>

                    {/* 4 Types of Builders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'People who are starting.',
                        'People who are experimenting.',
                        'People who are learning.',
                        'People who have failed and want to try again.',
                      ].map((typeItem, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/50">
                            0{idx + 1}
                          </span>
                          <span>{typeItem}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-1.5 font-display">
                      <p className="text-base sm:text-lg text-white/60 font-light">
                        The goal isn't to create an audience that watches from the outside.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        It is to encourage more people to build.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 06: THE MEDIA LAYER */}
                  <section id="the-media-layer" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        LAYER • 05 VISUAL REPOSITORIES
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE MEDIA LAYER
                    </h2>

                    <p className="text-base sm:text-lg text-white/80 font-light">
                      Some parts of building are better understood visually.
                    </p>

                    {/* 6 Visual Forms */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {[
                        'A product documentary.',
                        'A technical walkthrough.',
                        'A prototype demonstration.',
                        'A conversation.',
                        'A build log.',
                        'A behind-the-scenes record.',
                      ].map((form, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-white/40 block text-[10px] mb-1">FORMAT 0{idx + 1}</span>
                          <span>{form}</span>
                        </div>
                      ))}
                    </div>

                    <p className="font-mono text-sm text-white/70 pt-1">
                      DAY ZERO can use different forms of media to document the same underlying journey.
                    </p>
                  </section>

                  {/* SECTION 07: THE KNOWLEDGE LOOP */}
                  <section id="the-knowledge-loop" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        07
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        SYSTEM • THE FEEDBACK ENGINE
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE KNOWLEDGE LOOP
                    </h2>

                    {/* Loop Chain */}
                    <div className="p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-2 font-mono">
                      {[
                        'PRODUCT',
                        'EXPERIMENT',
                        'DOCUMENTATION',
                        'LEARNING',
                        'KNOWLEDGE',
                        'NEW PROJECT',
                        'PRODUCT',
                      ].map((st, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <div className="p-3 rounded bg-white/[0.04] border border-white/10 text-center text-sm font-bold text-white tracking-widest">
                            {st}
                          </div>
                          {sIdx < 6 && (
                            <div className="flex justify-center text-white/30 text-xs py-0.5">
                              ↓
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase pt-1">
                      The ecosystem grows through this loop.
                    </p>
                  </section>

                  {/* SECTION 08: THE LONG-TERM IDEA */}
                  <section id="the-long-term-idea" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        08
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE • ARCHITECTURAL SYNTHESIS
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        THE LONG-TERM IDEA
                      </h2>
                    </div>

                    {/* 5 Layer Tenets */}
                    <div className="space-y-2.5 font-display text-lg sm:text-2xl font-semibold">
                      <div className="p-4 rounded bg-[#0B0B0B] border border-white/10 text-white/80">
                        The website is the foundation.
                      </div>
                      <div className="p-4 rounded bg-[#0B0B0B] border border-white/10 text-white/80">
                        The products are the work.
                      </div>
                      <div className="p-4 rounded bg-[#0B0B0B] border border-white/10 text-white/80">
                        The documentation is the record.
                      </div>
                      <div className="p-4 rounded bg-[#0B0B0B] border border-white/10 text-white/80">
                        The knowledge is what remains useful.
                      </div>
                      <div className="p-6 rounded bg-white text-black font-bold text-xl sm:text-3xl">
                        And the ecosystem is what connects everything together.
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateChapter) onNavigateChapter('07');
                        }}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">EXPLORE THE ECOSYSTEM</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-mono text-xs sm:text-sm px-6 py-3.5 transition-all cursor-pointer"
                      >
                        <span>INITIATE DAY ZERO</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </section>
                </>
              )}

              {/* ================================================================= */}
              {/* CHAPTER 07 SPECIFIC SECTIONS: MANIFESTO                           */}
              {/* ================================================================= */}
              {chapter.id === '07' && (
                <>
                  {/* SECTION 01: THIS IS DAY ZERO */}
                  <section id="this-is-day-zero" className="space-y-6 pt-4 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        01
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        DECLARATION • CORE COMMITMENTS
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THIS IS DAY ZERO
                    </h2>

                    {/* 8 Choice statements */}
                    <div className="space-y-2.5 pt-2">
                      {[
                        'We choose to begin before everything is figured out.',
                        'We choose to build instead of waiting.',
                        'We choose to learn by doing.',
                        'We choose to document the process instead of hiding the unfinished parts.',
                        'We choose honesty over performance.',
                        'We choose evidence over assumptions.',
                        'We choose iteration over perfection.',
                        'We choose progress over appearances.',
                      ].map((choice, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-4 rounded border border-white/15 bg-[#0B0B0B] flex items-center gap-3.5 font-mono text-xs sm:text-sm text-white/90 transition-colors hover:border-white/30"
                        >
                          <span className="text-white/40 font-semibold shrink-0">0{cIdx + 1}.</span>
                          <span className="leading-relaxed">{choice}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-lg bg-white text-black font-display font-bold text-lg sm:text-xl">
                      And when something doesn't work, we choose to learn from it.
                    </div>
                  </section>

                  {/* SECTION 02: WE BUILD */}
                  <section id="we-build" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        02
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PILLAR • TANGIBLE EXECUTION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WE BUILD
                    </h2>

                    <div className="space-y-3 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Ideas are only potential.
                      </p>
                      <p className="text-white/80">
                        Building gives them form.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03] space-y-1">
                        <span className="text-[10px] font-mono text-white/40 uppercase">EARLY STAGE</span>
                        <p className="text-sm sm:text-base font-medium text-white">A prototype gives an idea something to react to.</p>
                      </div>
                      <div className="p-4 rounded border border-white/15 bg-white/[0.03] space-y-1">
                        <span className="text-[10px] font-mono text-white/40 uppercase">MATURE STAGE</span>
                        <p className="text-sm sm:text-base font-medium text-white">A product gives it a place in the world.</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-1.5 font-display">
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        We build because understanding comes from making.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 03: WE DOCUMENT */}
                  <section id="we-document" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        03
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PILLAR • CONTINUOUS RECORD
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WE DOCUMENT
                    </h2>

                    <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      The work shouldn't disappear once the result exists.
                    </p>

                    {/* 5 Documentation facets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                      {[
                        'We document decisions.',
                        'We document experiments.',
                        'We document failures.',
                        'We document iterations.',
                        'We document what we learn.',
                      ].map((docItem, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-2.5 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
                          <span>{docItem}</span>
                        </div>
                      ))}
                    </div>

                    <p className="font-display text-lg sm:text-xl font-medium text-white pt-1">
                      Because the process can be useful to someone else.
                    </p>
                  </section>

                  {/* SECTION 04: WE LEARN */}
                  <section id="we-learn" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        04
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PILLAR • EPISTEMIC EVOLUTION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WE LEARN
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        We don't expect to know everything before we begin.
                      </p>
                      <p className="text-white/80">
                        We expect the work to teach us.
                      </p>
                    </div>

                    {/* 3 Realities */}
                    <div className="space-y-2.5 pt-1">
                      {[
                        'Every experiment produces information.',
                        'Every iteration changes our understanding.',
                        'Every project leaves something behind.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded border border-white/15 bg-white/[0.03] flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-white/40 font-semibold">0{idx + 1}.</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-lg bg-[#0B0B0B] border border-white/15">
                      <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        Knowledge is built through the process.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 05: WE ITERATE */}
                  <section id="we-iterate" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        05
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PILLAR • PERPETUAL REFINEMENT
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WE ITERATE
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        The first version is rarely the final version.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 font-mono text-sm py-1">
                        <span className="px-3 py-1 rounded bg-white/5 border border-white/15 text-white/60">
                          That's not failure.
                        </span>
                        <span className="text-white/30">→</span>
                        <span className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white font-medium">
                          That's development.
                        </span>
                      </div>
                    </div>

                    <p className="font-mono text-sm sm:text-base text-white/90 pt-1">
                      We improve by observing, questioning, testing and rebuilding.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-4 rounded border border-white/15 bg-[#0B0B0B] space-y-1">
                        <span className="text-[10px] font-mono text-white/40 uppercase">MINDSET</span>
                        <p className="text-sm sm:text-base text-white/70">The goal isn't to get everything right immediately.</p>
                      </div>
                      <div className="p-4 rounded border border-white/15 bg-[#0B0B0B] space-y-1">
                        <span className="text-[10px] font-mono text-white/40 uppercase">OBJECTIVE</span>
                        <p className="text-sm sm:text-base font-medium text-white">The goal is to make the next version better.</p>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 06: WE SHARE */}
                  <section id="we-share" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        06
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PILLAR • RADICAL TRANSPARENCY
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WE SHARE
                    </h2>

                    <div className="space-y-2 text-base sm:text-lg text-white/85 font-light leading-relaxed">
                      <p className="text-lg sm:text-xl font-medium text-white">
                        Building in public creates accountability.
                      </p>
                      <p className="text-white/80">
                        It also creates possibility.
                      </p>
                    </div>

                    {/* 4 Possibility cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {[
                        'Someone can learn from the experiment.',
                        'Someone can avoid the mistake.',
                        'Someone can understand the decision.',
                        'Someone can see that the beginning doesn\'t have to be perfect.',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded bg-[#0B0B0B] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90"
                        >
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/50 shrink-0">
                            0{idx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-lg bg-[#0B0B0B] border-l-2 border-white border-y border-r border-white/10 space-y-1.5 font-display">
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        Sharing the process makes the work bigger than the product itself.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 07: WE BEGIN AGAIN */}
                  <section id="we-begin-again" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        07
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        PILLAR • INFINITE RECURSION
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      WE BEGIN AGAIN
                    </h2>

                    <p className="text-lg sm:text-xl font-medium text-white">
                      There is no final version of the journey.
                    </p>

                    {/* Step Chain */}
                    <div className="p-5 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-3 font-mono text-xs sm:text-sm">
                      {[
                        'One project leads to another.',
                        'One lesson creates another question.',
                        'One answer reveals another problem worth exploring.',
                      ].map((step, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-3 text-white/90">
                          <span className="text-white/40">→</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1 pt-1 font-display">
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        The process continues.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold tracking-tight text-white/60 uppercase">
                        So does DAY ZERO.
                      </p>
                    </div>
                  </section>

                  {/* SECTION 08: THE DAY ZERO MANIFESTO */}
                  <section id="the-day-zero-manifesto" className="space-y-6 pt-6 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        08
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        THE CREEDS • CORE CODEX
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase">
                      THE DAY ZERO MANIFESTO
                    </h2>

                    {/* 9 Manifestos in a 3-column architectural grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      {[
                        'START BEFORE READY.',
                        'BUILD IN PUBLIC.',
                        'BE HONEST.',
                        'LEARN BY BUILDING.',
                        'DOCUMENT THE PROCESS.',
                        'ITERATE WITHOUT EGO.',
                        'SHARE WHAT YOU LEARN.',
                        'KEEP MOVING.',
                        'NEVER STOP BEGINNING.',
                      ].map((creed, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-5 rounded-lg bg-[#0B0B0B] border border-white/15 flex flex-col justify-between hover:border-white/40 transition-colors group"
                        >
                          <span className="text-[10px] font-mono text-white/40 mb-3 group-hover:text-white/70 transition-colors">
                            CREED • 0{cIdx + 1}
                          </span>
                          <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white uppercase">
                            {creed}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SECTION 09: FINAL STATEMENT */}
                  <section id="final-statement" className="space-y-8 pt-8 border-t border-white/10 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-semibold">
                        09
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        FINALE • ARCHIVAL CLIMAX
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                        FINAL STATEMENT
                      </h2>
                    </div>

                    <div className="space-y-2 text-lg sm:text-xl font-light text-white/85 leading-relaxed">
                      <p className="text-white/60">
                        DAY ZERO is not a story about having already made it.
                      </p>
                      <p className="font-medium text-white">
                        It is a record of what happens while becoming.
                      </p>
                    </div>

                    {/* The Becoming Train */}
                    <div className="p-6 rounded-lg bg-[#0B0B0B] border border-white/15 space-y-3 font-mono text-xs sm:text-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        {[
                          'The first idea.',
                          'The first prototype.',
                          'The first failure.',
                          'The first lesson.',
                          'The next iteration.',
                          'The next product.',
                          'The next question.',
                        ].map((item, idx) => (
                          <React.Fragment key={idx}>
                            <span className="px-3 py-1.5 rounded bg-white/5 border border-white/15 text-white/90">
                              {item}
                            </span>
                            {idx < 6 && <span className="text-white/30">→</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Climax Statement */}
                    <div className="p-6 sm:p-8 rounded-lg bg-white text-black space-y-2 font-display">
                      <p className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
                        There will always be another beginning.
                      </p>
                      <p className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight">
                        And every beginning has a Day Zero.
                      </p>
                    </div>

                    {/* Closing Actions & Chapter Navigation */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-medium px-6 py-3.5 hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 group"
                      >
                        <span className="tracking-widest uppercase">START YOUR DAY ZERO</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>

                    </div>
                  </section>
                </>
              )}

            </div>
          </div>
        ) : (
          /* Dedicated Workspace for Chapter 07 (Ready for future chapters) */
          <div className="mt-12 sm:mt-16 w-full min-h-[420px] sm:min-h-[500px] border border-white/10 rounded-lg bg-[#0B0B0B]/40 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blueprint-dense opacity-40 pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-md">
              <div className="w-10 h-10 mx-auto rounded-full border border-white/20 flex items-center justify-center text-xs font-mono text-white/60">
                {chapter.id}
              </div>
              <p className="text-xs font-mono text-white/50 uppercase tracking-widest">
                ARCHIVE
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase">
                {chapter.title}
              </h3>
              <p className="text-xs sm:text-sm font-light text-white/50 leading-relaxed">
                {chapter.subtitle}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

