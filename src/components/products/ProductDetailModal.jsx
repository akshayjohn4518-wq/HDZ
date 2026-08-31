import React, { useState, useEffect } from 'react';

export default function ProductDetailModal({ product, onClose, onOpenContact }) {
  const [initStage, setInitStage] = useState(0); // 0: index, 1: id, 2: name, 3: loading, 4: ready
  const [activeTab, setActiveTab] = useState('SPECS');

  const isVoidProduct = product?.status === 'VOID' || product?.id === '01';

  // Handle ESC key listener to exit modal / pitch black view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!product) return;

    // Cinematic step initialization timeline sequence
    const t1 = setTimeout(() => setInitStage(1), 250);
    const t2 = setTimeout(() => setInitStage(2), 500);
    const t3 = setTimeout(() => setInitStage(3), 850);
    const t4 = setTimeout(() => setInitStage(4), 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [product]);

  if (!product) return null;

  return (
    <div
      onClick={isVoidProduct && initStage === 4 ? onClose : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-xl overflow-y-auto font-mono text-white select-none"
    >
      {/* INITIALIZATION TRANSITION OVERLAY */}
      {initStage < 4 && (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center animate-in fade-in duration-300">
          <div className="text-xs font-mono text-white/40 tracking-[0.3em] uppercase">
            PRODUCT INDEX
          </div>

          {initStage >= 1 && (
            <div className="text-3xl font-mono font-bold text-white/70 animate-in zoom-in-95 duration-200">
              {product.id}
            </div>
          )}

          {initStage >= 2 && (
            <div className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-200">
              {product.title}
            </div>
          )}

          {initStage >= 3 && (
            <div className="flex items-center gap-3 text-xs font-mono text-white/50 tracking-widest pt-4">
              <span className="w-2 h-2 bg-white rounded-full animate-ping" />
              <span>INITIALIZING BUILD SYSTEM...</span>
            </div>
          )}
        </div>
      )}

      {/* FULL SYSTEM DEEP DIVE DRAWER / MODAL OR PITCH BLACK VOID */}
      {initStage === 4 && (
        isVoidProduct ? (
          <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black w-screen h-screen cursor-pointer select-none"
          />
        ) : (
          <div className="w-full max-w-5xl my-8 mx-4 bg-[#0B0B0B] border border-white/20 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050505]">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-white bg-white/10 px-2 py-1 rounded">
                  {product.id}
                </span>
                <span className="text-xs font-mono text-white/60 tracking-wider">
                  {product.code} // {product.title}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 border border-white/20 text-xs text-white/60 hover:text-white hover:border-white transition-colors cursor-pointer"
              >
                ESC [X]
              </button>
            </div>

            {/* Body Content */}
            <div className="p-6 md:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
              {/* Title & Metadata Hero Header */}
              <div className="space-y-4 border-b border-white/10 pb-6">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="px-2 py-0.5 border border-white/30 text-white/90 uppercase">
                    {product.category}
                  </span>
                  <span className="px-2 py-0.5 bg-white text-black font-bold uppercase">
                    {product.status}
                  </span>
                  <span className="text-white/40">YEAR {product.year}</span>
                  <span className="text-white/40">VER {product.version}</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-wider text-white uppercase">
                  {product.title}
                </h2>

                <p className="text-base font-sans text-white/70 leading-relaxed max-w-3xl font-light">
                  {product.fullDesc}
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-4 border-b border-white/10 text-xs">
                {['SPECS', 'ARCHITECTURE', 'CHANGELOG'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 transition-colors cursor-pointer tracking-wider ${
                      activeTab === tab
                        ? 'text-white border-b-2 border-white font-bold'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    // {tab}
                  </button>
                ))}
              </div>

              {/* Tab View: SPECS */}
              {activeTab === 'SPECS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xs text-white/40 uppercase tracking-widest">// SYSTEM METRICS</h4>
                    <div className="space-y-2">
                      {product.metrics.map((m, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-[#050505] border border-white/10 rounded">
                          <span className="text-xs text-white/50">{m.label}</span>
                          <span className="text-xs font-bold text-white">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs text-white/40 uppercase tracking-widest">// TECHNICAL STACK</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.stack.map((item, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-[#050505] border border-white/15 text-xs text-white/80 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab View: ARCHITECTURE */}
              {activeTab === 'ARCHITECTURE' && (
                <div className="space-y-4">
                  <h4 className="text-xs text-white/40 uppercase tracking-widest">// INITIALIZATION CODE SNIPPET</h4>
                  <div className="bg-[#050505] p-4 rounded border border-white/20 text-xs overflow-x-auto">
                    <pre className="text-white/80">
                      <code>{product.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Tab View: CHANGELOG */}
              {activeTab === 'CHANGELOG' && (
                <div className="space-y-4">
                  <h4 className="text-xs text-white/40 uppercase tracking-widest">// BUILD HISTORY LOG</h4>
                  <div className="space-y-3">
                    {product.changelog.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-3 bg-[#050505] border border-white/10 rounded text-xs">
                        <span className="text-white/40 shrink-0">{log.date}</span>
                        <span className="text-white/80">{log.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Actions Row */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-white/20 text-xs text-white/70 hover:text-white hover:border-white transition-colors cursor-pointer"
                >
                  ← RETURN TO PRODUCT ARCHIVE
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenContact) onOpenContact();
                  }}
                  className="px-5 py-2.5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-colors cursor-pointer"
                >
                  DISCUSS BUILD INTEGRATION →
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
