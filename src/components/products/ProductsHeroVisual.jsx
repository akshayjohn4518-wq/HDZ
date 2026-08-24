import React, { useState, useEffect, useRef } from 'react';

export default function ProductsHeroVisual({ products, onSelectProduct }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState(null);
  const [angle, setAngle] = useState(0);

  // Orbit rotation animation frame
  useEffect(() => {
    let animFrame;
    const animate = () => {
      setAngle((prev) => (prev + 0.25) % 360);
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Track mouse coordinates for interactive parallax tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setActiveNode(null);
  };

  // Node positions along orbit ring
  const orbitRadius = 130;
  const nodes = (products || []).slice(0, 4).map((p, idx) => {
    const baseAngle = (idx * (360 / 4) + angle) * (Math.PI / 180);
    const x = Math.cos(baseAngle) * orbitRadius;
    const y = Math.sin(baseAngle) * orbitRadius;
    return { ...p, x, y };
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center p-4 select-none cursor-crosshair"
    >
      {/* Background Radial Glow & Coordinate Grid */}
      <div className="absolute inset-0 rounded-full bg-white/[0.015] border border-white/10 backdrop-blur-[2px]" />
      
      {/* Outer Dotted Concentric Orbit Ring */}
      <div className="absolute inset-8 rounded-full border border-dashed border-white/15 animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-20 rounded-full border border-white/10" />

      {/* Crosshair Coordinate Markers */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/30 tracking-widest">
        N 47° 36' 18"
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/30 tracking-widest">
        S 12° 04' 52"
      </div>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-white/30 tracking-widest [writing-mode:vertical-lr]">
        W 122° 20' 02"
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-white/30 tracking-widest [writing-mode:vertical-lr]">
        E 078° 14' 40"
      </div>

      {/* Subtle Axis Grid Lines */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/[0.06] stroke-dash" />
      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/[0.06]" />

      {/* SVG Vector Connections & Motion Layer */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0) rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
        }}
      >
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="-220 -220 440 440">
          {/* Orbital path circle */}
          <circle cx="0" cy="0" r={orbitRadius} fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Rays connecting center to nodes */}
          {nodes.map((node) => {
            const isHovered = activeNode && activeNode.id === node.id;
            return (
              <line
                key={`line-${node.id}`}
                x1="0"
                y1="0"
                x2={node.x}
                y2={node.y}
                stroke={isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.15)'}
                strokeWidth={isHovered ? 1.5 : 1}
                strokeDasharray={isHovered ? 'none' : '2 4'}
              />
            );
          })}
        </svg>

        {/* Central Core Glowing Node */}
        <div className="relative z-10 flex flex-col items-center justify-center w-28 h-28 rounded-full bg-[#050505] border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.08)] group">
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20 pointer-events-none" />
          <div className="w-3 h-3 rounded-full bg-white animate-pulse shadow-[0_0_12px_#fff]" />
          <span className="mt-2 text-[9px] font-mono font-bold tracking-[0.2em] text-white uppercase text-center">
            PRODUCT
          </span>
          <span className="text-[8px] font-mono text-white/50 tracking-wider">
            INDEX
          </span>
        </div>

        {/* Orbiting Product Nodes */}
        {nodes.map((node) => {
          const isHovered = activeNode && activeNode.id === node.id;

          return (
            <div
              key={node.id}
              onClick={() => onSelectProduct && onSelectProduct(node)}
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `calc(50% + ${node.x}px)`,
                top: `calc(50% + ${node.y}px)`,
              }}
            >
              {/* Outer halo on hover */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isHovered
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-110'
                    : 'bg-[#0B0B0B]/90 text-white border-white/20 hover:border-white/60'
                }`}
              >
                <span className="text-[10px] font-mono font-bold">{node.id}</span>
              </div>

              {/* Tooltip Card on Node Hover */}
              {isHovered && (
                <div className="absolute left-1/2 -translate-x-1/2 top-12 min-w-[160px] bg-[#0A0A0A] border border-white/30 p-2.5 rounded shadow-2xl backdrop-blur-md z-30 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1 mb-1">
                    <span className="text-[9px] font-mono text-white/50 tracking-wider">
                      {node.code}
                    </span>
                    <span className="text-[8px] font-mono px-1 py-0.5 border border-white/20 text-white/80 uppercase">
                      {node.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-display font-semibold text-white uppercase tracking-wider">
                    {node.title}
                  </div>
                  <div className="text-[9px] font-mono text-white/40 mt-1 uppercase">
                    CAT: {node.category}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="absolute bottom-3 right-3 text-[9px] font-mono text-white/40 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span>SYS // ORBIT ACTIVE</span>
      </div>
    </div>
  );
}
