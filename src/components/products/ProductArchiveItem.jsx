import React, { useState } from 'react';

export default function ProductArchiveItem({ product, onInspect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onInspect(product)}
      className={`group relative border-t border-white/10 py-10 md:py-14 transition-all duration-500 cursor-pointer ${
        isHovered ? 'bg-white/[0.02] border-white/40' : 'bg-transparent'
      }`}
    >
      {/* Dynamic Hover Glow & Corner Coordinate Node Line */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 ${
          isHovered ? 'bg-white shadow-[0_0_12px_#fff]' : 'bg-transparent'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT SIDE: Metadata & Copy (7 cols on LG) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Index & Status Row */}
          <div className="flex items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-bold font-mono transition-colors duration-300 ${
                isHovered ? 'text-white' : 'text-white/40'
              }`}>
                {product.id}
              </span>
              <span className="text-white/20">|</span>
              <span className="text-white/40 tracking-widest uppercase">
                {product.code}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                product.status === 'ACTIVE'
                  ? 'bg-white animate-pulse'
                  : product.status === 'EXPERIMENT'
                  ? 'bg-white/60'
                  : 'bg-white/30'
              }`} />
              <span className="text-[10px] tracking-widest text-white/60 uppercase">
                {product.status}
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className={`text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-wider uppercase transition-all duration-300 ${
            isHovered ? 'text-white translate-x-1' : 'text-white/90'
          }`}>
            {product.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm sm:text-base font-sans text-white/60 leading-relaxed max-w-xl font-light">
            {product.shortDesc}
          </p>

          {/* Technical Metadata Grid */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10 text-xs font-mono">
            <div>
              <div className="text-[10px] text-white/30 tracking-widest uppercase">CATEGORY</div>
              <div className="text-white/80 font-medium mt-0.5 uppercase">{product.category}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/30 tracking-widest uppercase">STATUS</div>
              <div className="text-white/80 font-medium mt-0.5 uppercase">{product.status}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/30 tracking-widest uppercase">YEAR</div>
              <div className="text-white/80 font-medium mt-0.5">{product.year}</div>
            </div>
          </div>

          {/* Action CTA Trigger */}
          <div className="pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInspect(product);
              }}
              className={`inline-flex items-center gap-3 px-4 py-2 border font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                isHovered
                  ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'bg-transparent text-white/70 border-white/20 hover:border-white/50'
              }`}
            >
              <span>INSPECT PRODUCT</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Monochrome Technical Prototype Observation Preview (5 cols on LG) */}
        <div className="lg:col-span-6">
          <div className={`relative w-full aspect-[16/10] bg-[#0A0A0A] border rounded transition-all duration-500 overflow-hidden ${
            isHovered
              ? 'border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.05)] scale-[1.01]'
              : 'border-white/10 opacity-75'
          }`}>
            {/* Window Header Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#050505] text-[10px] font-mono text-white/40">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full border border-white/30" />
                <div className="w-2 h-2 rounded-full border border-white/30" />
                <div className="w-2 h-2 rounded-full border border-white/30" />
              </div>
              <span className="tracking-widest uppercase text-[9px] text-white/30">
                PROTOTYPE • {product.code}
              </span>
              <span>SYS_OBSERVE</span>
            </div>

            {/* Content Preview Canvas / Wireframe Terminal */}
            <div className="p-4 h-[calc(100%-33px)] flex flex-col justify-between font-mono text-xs">
              {/* Wireframe Mock UI Elements */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-white/40">
                  <span>TELEMETRY_STREAM</span>
                  <span className="animate-pulse text-white/70">● LIVE</span>
                </div>

                {/* Simulated Stack / Code Preview */}
                <div className="bg-[#050505] p-3 rounded border border-white/10 text-[11px] text-white/70 overflow-x-auto">
                  <pre className="font-mono text-white/60 leading-tight">
                    <code>{product.codeSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-[9px] text-white/50">
                {(product.metrics || []).slice(0, 4).map((m, idx) => (
                  <div key={idx} className="bg-[#050505] p-1.5 rounded border border-white/5">
                    <div className="text-[8px] text-white/30 uppercase">{m.label}</div>
                    <div className="text-white/80 font-semibold truncate mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] animate-[scanline_6s_linear_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}
