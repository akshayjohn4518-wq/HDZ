import React, { useState, useMemo, useEffect } from 'react';
import ProductsHeroVisual from './ProductsHeroVisual';
import ProductArchiveItem from './ProductArchiveItem';
import ProductDetailModal from './ProductDetailModal';
import DayZeroOsExperience from './DayZeroOsExperience';
import { PRODUCTS_DATA } from './productsData';

export default function ProductsPage({ onOpenContact, onLoadingChange }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [initStage, setInitStage] = useState(0); // 0: index, 1: id, 2: name, 3: loading, 4: ready

  const isDayZeroOs = selectedProduct && (selectedProduct.id === '01' || selectedProduct.title === 'DAY ZERO OS');

  // Cinematic step initialization timeline sequence when entering Day Zero OS
  useEffect(() => {
    if (!isDayZeroOs) {
      setInitStage(0);
      if (onLoadingChange) onLoadingChange(false);
      return;
    }

    setInitStage(0);
    if (onLoadingChange) onLoadingChange(true);

    const t1 = setTimeout(() => setInitStage(1), 250);
    const t2 = setTimeout(() => setInitStage(2), 500);
    const t3 = setTimeout(() => setInitStage(3), 850);
    const t4 = setTimeout(() => {
      setInitStage(4);
      if (onLoadingChange) onLoadingChange(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    }, 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isDayZeroOs, onLoadingChange]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'ALL') return PRODUCTS_DATA;
    if (activeFilter === 'PRODUCTS') return PRODUCTS_DATA.filter((p) => p.category === 'SYSTEM' || p.category === 'DEVELOPER TOOLS');
    if (activeFilter === 'EXPERIMENTS') return PRODUCTS_DATA.filter((p) => p.status === 'EXPERIMENT');
    if (activeFilter === 'SYSTEMS') return PRODUCTS_DATA.filter((p) => p.category === 'SYSTEM');
    if (activeFilter === 'ARCHIVED') return PRODUCTS_DATA.filter((p) => p.status === 'ARCHIVED');
    return PRODUCTS_DATA;
  }, [activeFilter]);

  // Seamless in-flow document rendering for Day Zero OS experience with cinematic entry animation
  if (isDayZeroOs) {
    if (initStage < 4) {
      return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black font-mono text-white select-none">
          <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center animate-in fade-in duration-300">
            <div className="text-xs font-mono text-white/40 tracking-[0.3em] uppercase">
              PRODUCT INDEX
            </div>

            {initStage >= 1 && (
              <div className="text-3xl font-mono font-bold text-white/70 animate-in zoom-in-95 duration-200">
                {selectedProduct.id}
              </div>
            )}

            {initStage >= 2 && (
              <div className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-200">
                {selectedProduct.title}
              </div>
            )}

            {initStage >= 3 && (
              <div className="flex items-center gap-3 text-xs font-mono text-white/50 tracking-widest pt-4">
                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                <span>INITIALIZING BUILD SYSTEM...</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full flex-1 flex flex-col pt-16 select-none">
        <DayZeroOsExperience
          onClose={() => {
            setSelectedProduct(null);
            setInitStage(0);
            if (onLoadingChange) onLoadingChange(false);
          }}
          onOpenContact={onOpenContact}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full bg-[#050505] text-[#F3F4F6] flex-1 pt-24 pb-12 select-none overflow-x-hidden">
      {/* 03 / HEADER TECHNICAL IDENTIFIER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-6">
        <div className="inline-flex items-center gap-3 px-3 py-1 border border-white/10 bg-[#0B0B0B] text-[10px] font-mono text-white/50 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>PRODUCT INDEX:SYSTEM 03</span>
        </div>
      </div>

      {/* 04 & 05 HERO SECTION & VISUALIZATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Editorial */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono text-white/40 tracking-[0.25em] uppercase">
              PRODUCT ARCHIVE
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white uppercase leading-[0.95]">
              PRODUCTS<br />
              BUILT FROM<br />
              DAY ZERO.
            </h1>

            <div className="text-sm sm:text-base font-mono text-white/80 font-medium tracking-wide border-l-2 border-white/30 pl-4 py-1">
              Ideas are easy to describe.<br />
              Building them is different.
            </div>

            <p className="text-sm sm:text-base font-sans text-white/60 leading-relaxed max-w-xl font-light">
              DAY ZERO documents the products, experiments and systems we build — from the first idea to something real.
            </p>

            {/* Hero Technical Metadata Row */}
            <div className="inline-flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/10 text-xs font-mono text-white/50">
              <div>
                <span className="text-white/30">ACTIVE BUILDS:</span>{' '}
                <span className="text-white font-bold">01</span>
              </div>
              <div>
                <span className="text-white/30">EXPERIMENTS:</span>{' '}
                <span className="text-white font-bold">00</span>
              </div>
              <div>
                <span className="text-white/30">STATUS:</span>{' '}
                <span className="text-white font-bold">BUILDING</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visualization */}
          <div className="lg:col-span-6">
            <ProductsHeroVisual
              products={PRODUCTS_DATA}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
          </div>
        </div>
      </section>

      {/* 06 & 10 PRODUCT ARCHIVE & FILTER INDEX SYSTEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        {/* Section Heading */}
        <div className="space-y-3 mb-10">
          <div className="text-xs font-mono text-white/40 tracking-widest uppercase">
            // PRODUCT ARCHIVE
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-wider uppercase">
            WHAT WE BUILD.
          </h2>
        </div>

        {/* Filter Bar System */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 pb-6 mb-8 border-b border-white/10 text-xs font-mono">
          <span className="text-white/40 text-[10px] tracking-widest uppercase mr-2">
            INDEX:
          </span>
          {['ALL', 'PRODUCTS', 'EXPERIMENTS', 'SYSTEMS', 'ARCHIVED'].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`relative px-3 py-1.5 rounded transition-all cursor-pointer text-xs uppercase tracking-wider ${isActive
                  ? 'text-white font-bold bg-white/10 border border-white/30'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                  }`}
              >
                {filter}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-white shadow-[0_0_8px_#fff]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Product Archive Vertical List */}
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <ProductArchiveItem
              key={product.id}
              product={product}
              onInspect={(p) => setSelectedProduct(p)}
            />
          ))}

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center text-xs font-mono text-white/40 uppercase tracking-widest">
              NO BUILDS MATCH CURRENT FILTER CRITERIA.
            </div>
          )}
        </div>
      </section>

      {/* 12 / BUILD PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 border-t border-b border-white/10 my-16">
        <div className="max-w-4xl space-y-8">
          <div className="text-xs font-mono text-white/40 tracking-[0.25em] uppercase">
            // WHY WE BUILD
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[0.95] uppercase">
            EVERY PRODUCT<br />
            STARTS WITH A<br />
            QUESTION.
          </h2>

          <div className="space-y-4 text-base sm:text-lg font-sans text-white/70 font-light leading-relaxed max-w-2xl">
            <p>We build to understand.</p>
            <p>We experiment to learn.</p>
            <p>
              We document the process so others can see what happens between an idea and something real.
            </p>
          </div>
        </div>
      </section>

      {/* 13 / FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8 md:p-12 bg-[#0B0B0B] border border-white/15 rounded-lg">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-wider">
              HAVE SOMETHING<br />
              WORTH BUILDING?
            </h3>
            <p className="text-sm font-sans text-white/60 font-light">
              Every product starts somewhere.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenContact}
            className="px-6 py-3.5 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-white/90 transition-colors cursor-pointer shrink-0"
          >
            START A CONVERSATION →
          </button>
        </div>
      </section>

      {/* 09 / PRODUCT DETAIL TRANSITION MODAL */}
      {selectedProduct && !isDayZeroOs && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenContact={onOpenContact}
        />
      )}
    </div>
  );
}
