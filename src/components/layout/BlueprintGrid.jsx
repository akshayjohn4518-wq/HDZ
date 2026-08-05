export default function BlueprintGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Structural Architectural Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-60" />

      {/* 35mm Film Grain Overlay */}
      <svg className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-overlay w-full h-full">
        <filter id="blueprint-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#blueprint-grain)" />
      </svg>
      
      {/* Subtle Scanning Light Line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent scan-line" />
      
      {/* Corner Technical Status Indicators */}
      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-white/20 flex items-center gap-1">
        <span>SYS.STATUS: OPERATIONAL</span>
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-white/20 flex items-center gap-1">
        <span>BUILD v0.2.0</span>
      </div>

      {/* Center Subtle Axis Lines */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/[0.02]" />
      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/[0.02]" />
    </div>
  );
}
