import React from 'react';

/**
 * BlueprintCanvas renders the continuous SVG path with medium chapter spacing (5200px canvas height),
 * multi-layered line stream flow, and surroundings illumination ("Light Up") as the line travels down.
 */
export default function BlueprintCanvas({ pathProgress, currentPoint, mainPathD }) {
  const headX = currentPoint?.x ?? 500;
  const headY = currentPoint?.y ?? 120;

  /**
   * Returns opacity and illumination style based on distance from drawing head Y
   */
  const getLitState = (elementY, offset = 120) => {
    const dist = headY - elementY;
    if (dist < -offset) {
      return { opacity: 0.15, isLit: false, style: { opacity: 0.15, transition: 'all 0.3s ease-out' } };
    }
    if (dist < 0) {
      const progress = (dist + offset) / offset;
      const opacity = 0.15 + progress * 0.85;
      return {
        opacity,
        isLit: false,
        style: {
          opacity,
          transition: 'all 0.3s ease-out',
        },
      };
    }
    return {
      opacity: 1,
      isLit: true,
      style: {
        opacity: 1,
        filter: 'drop-shadow(0px 0px 9px rgba(255, 255, 255, 0.75))',
        transition: 'all 0.4s ease-out',
      },
    };
  };

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-visible z-0"
      viewBox="0 0 1000 5200"
      preserveAspectRatio="xMidYMin meet"
    >
      <defs>
        {/* Core head point glow filter */}
        <filter id="point-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur1" />
          <feGaussianBlur stdDeviation="11" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Stream flow line glow filter */}
        <filter id="line-stream-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Ambient deep line aura */}
        <filter id="ambient-aura" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="12" result="blur" />
        </filter>
      </defs>

      {/* ========================================================================= */}
      {/* BACKGROUND BLUEPRINT GUIDES & AXES                                        */}
      {/* ========================================================================= */}
      <line x1="500" y1="0" x2="500" y2="5200" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="4 8" />
      <line x1="250" y1="0" x2="250" y2="5200" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
      <line x1="750" y1="0" x2="750" y2="5200" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />

      {/* Chapter Baseline Guides (Medium Spacing: Every 650px) */}
      {[750, 1400, 2050, 2700, 3350, 4000, 4650].map((yVal, idx) => {
        const lit = getLitState(yVal, 110);
        return (
          <g key={idx} style={lit.style}>
            <line x1="50" y1={yVal} x2="950" y2={yVal} stroke={lit.isLit ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)'} strokeWidth="1" strokeDasharray="2 6" />
            <text x="60" y={yVal - 8} fill={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.25)'} fontSize="9" fontFamily="JetBrains Mono, monospace">
              DATUM BASELINE H-{yVal} // SEC 0{idx + 1}
            </text>
          </g>
        );
      })}

      {/* ========================================================================= */}
      {/* MAIN DRAFTING PATH (DYNAMIC STREAM FLOW STROKE)                           */}
      {/* ========================================================================= */}

      {/* Background Dim Guide Path */}
      <path
        d={mainPathD}
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="1.5"
        strokeDasharray="2 4"
      />

      {/* Layer 1: Ambient Wide Deep Aura */}
      <path
        d={mainPathD}
        fill="none"
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - pathProgress}
        filter="url(#ambient-aura)"
      />

      {/* Layer 2: Glowing Stream Flow Line */}
      <path
        d={mainPathD}
        fill="none"
        stroke="#ffffff"
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - pathProgress}
        filter="url(#line-stream-glow)"
        opacity="0.8"
      />

      {/* Layer 3: Core Crisp White Path */}
      <path
        id="main-blueprint-path"
        d={mainPathD}
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - pathProgress}
      />

      {/* ========================================================================= */}
      {/* HERO & CHAPTER 01 GRAPHICS (Y = 120 to 750)                               */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(120);
        return (
          <g className="chapter-01-graphics" style={lit.style}>
            <g transform="translate(500, 120)">
              <circle r="6" fill="#ffffff" filter="url(#point-glow)" />
              <circle r="15" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />
              <line x1="20" y1="0" x2="65" y2="0" stroke="#ffffff" strokeWidth="1" />
              <text x="72" y="-4" fill="#ffffff" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                POINT 0001
              </text>
              <text x="72" y="12" fill="rgba(255,255,255,0.8)" fontSize="9" fontFamily="JetBrains Mono, monospace">
                The first idea.
              </text>
            </g>

            {/* Turn Arc & Radius Measurement R 120 */}
            <g transform="translate(640, 200)">
              <circle r="50" fill="none" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="0" x2="35" y2="-35" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'} strokeWidth="1" />
              <text x="40" y="-38" fill={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'} fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                R 120
              </text>
            </g>
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* CHAPTER 02 GRAPHICS (The Problem - Y = 1400)                               */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(1400);
        return (
          <g className="chapter-02-graphics" style={lit.style}>
            <g transform="translate(450, 1280)">
              <circle r="60" fill="none" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1" strokeDasharray="4 4" />
              <circle r="85" fill="none" stroke={lit.isLit ? 'rgba(255,255,255,0.6)' : 'rgba(255, 255, 255, 0.08)'} strokeWidth="1" />
            </g>

            <path d="M 450 1280 C 350 1230 300 1320 250 1300" fill="none" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'} strokeWidth="1" strokeDasharray="3 3" />
            <text x="170" y="1295" fill={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'} fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              REJECTED IDEA
            </text>

            <g transform="translate(100, 1200)">
              <rect width="110" height="65" fill="rgba(11, 11, 11, 0.9)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'} strokeWidth="1.5" />
              <text x="12" y="22" fill="#ffffff" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                DRAFT
              </text>
              <text x="12" y="36" fill={lit.isLit ? 'rgba(255,255,255,0.9)' : 'rgba(255, 255, 255, 0.4)'} fontSize="9" fontFamily="JetBrains Mono, monospace">
                v0.1
              </text>
              <text x="12" y="50" fill={lit.isLit ? 'rgba(255,255,255,0.7)' : 'rgba(255, 255, 255, 0.3)'} fontSize="8" fontFamily="JetBrains Mono, monospace">
                DATE: DAY ZERO
              </text>
            </g>

            <g transform="translate(100, 1450)">
              <rect width="155" height="65" fill="rgba(11, 11, 11, 0.9)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'} strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="12" y="22" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                NOTE
              </text>
              <text x="12" y="40" fill={lit.isLit ? 'rgba(255,255,255,0.9)' : 'rgba(255, 255, 255, 0.4)'} fontSize="8.5" fontFamily="Inter, sans-serif">
                Uncertainty is part of process.
              </text>
            </g>

            <g transform="translate(240, 1550)">
              <text x="0" y="0" fill={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'} fontSize="14" fontFamily="serif" fontStyle="italic" fontWeight="600">
                This is the hard part.
              </text>
            </g>
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* CHAPTER 03 GRAPHICS (Our Belief - Y = 2050)                                */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(2050);
        return (
          <g className="chapter-03-graphics" style={lit.style}>
            {[
              { x: 450, y: 1880, label: "COMMITMENT", rev: "REV 01" },
              { x: 500, y: 1980, label: "DISCIPLINE", rev: "REV 02" },
              { x: 440, y: 2080, label: "LEARNING", rev: "REV 03" },
              { x: 490, y: 2180, label: "ITERATION", rev: "REV 04" },
              { x: 500, y: 2280, label: "GROWTH", rev: "REV 05" }
            ].map((pt, idx) => {
              const ptLit = getLitState(pt.y, 70);
              return (
                <g key={idx} transform={`translate(${pt.x}, ${pt.y})`} style={ptLit.style}>
                  <circle r="4" fill="#ffffff" filter="url(#point-glow)" />
                  <circle r="13" fill="none" stroke={ptLit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'} strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="0" y1="0" x2="32" y2="-13" stroke={ptLit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'} strokeWidth="1" />
                  <text x="38" y="-15" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                    {pt.label}
                  </text>
                </g>
              );
            })}

            <circle cx="500" cy="2050" r="100" fill="none" stroke={lit.isLit ? 'rgba(255,255,255,0.3)' : 'rgba(255, 255, 255, 0.05)'} strokeWidth="1" />
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* CHAPTER 04 GRAPHICS (Build In Public - Y = 2700)                          */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(2700);
        return (
          <g className="chapter-04-graphics" style={lit.style}>
            <g transform="translate(450, 2700)">
              <circle r="20" fill="#050505" stroke="#ffffff" strokeWidth="2.5" filter="url(#point-glow)" />
              <circle r="28" fill="none" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'} strokeWidth="1" strokeDasharray="3 3" />
              <circle r="5" fill="#ffffff" />
            </g>

            {[
              { yEnd: 2580, label: "DOCUMENTATION" },
              { yEnd: 2620, label: "PROTOTYPES" },
              { yEnd: 2660, label: "EXPERIMENTS" },
              { yEnd: 2700, label: "FAILURES" },
              { yEnd: 2740, label: "LESSONS" },
              { yEnd: 2780, label: "ITERATIONS" },
              { yEnd: 2820, label: "GROWTH" }
            ].map((branch, idx) => (
              <g key={idx}>
                <line x1="470" y1="2700" x2="575" y2={branch.yEnd} stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.35)'} strokeWidth="1.2" />
                <circle cx="575" cy={branch.yEnd} r="3" fill="#ffffff" />
                <text x="585" y={branch.yEnd + 3} fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                  {branch.label}
                </text>
              </g>
            ))}

            {/* BUILD LOG Card */}
            <g transform="translate(60, 2600)">
              <rect width="105" height="150" fill="rgba(11, 11, 11, 0.95)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1.5" />
              <text x="10" y="18" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                BUILD LOG
              </text>
              {[
                "0001 Idea",
                "0002 Research",
                "0003 Prototype",
                "0004 Test",
                "0005 Iterate",
                "0006 Ship",
                "0007 Learn"
              ].map((item, idx) => (
                <text key={idx} x="10" y={33 + idx * 15} fill={lit.isLit ? 'rgba(255,255,255,0.9)' : 'rgba(255, 255, 255, 0.35)'} fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                  {item}
                </text>
              ))}
            </g>
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* CHAPTER 05 GRAPHICS (Current Missions - Y = 3350)                         */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(3350);
        return (
          <g className="chapter-05-graphics" style={lit.style}>
            <g transform="translate(415, 3315)">
              <rect width="70" height="70" fill="rgba(11, 11, 11, 0.95)" stroke="#ffffff" strokeWidth="2" filter="url(#point-glow)" />
              <line x1="0" y1="0" x2="70" y2="70" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="70" y1="0" x2="0" y2="70" stroke="#ffffff" strokeWidth="1.5" />
            </g>

            {[
              { x: 180, y: 3230 },
              { x: 180, y: 3380 },
              { x: 540, y: 3250 },
              { x: 550, y: 3400 }
            ].map((node, idx) => (
              <g key={idx} transform={`translate(${node.x}, ${node.y})`}>
                <rect width="30" height="30" fill="rgba(11, 11, 11, 0.95)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'} strokeWidth="1.5" />
                <line x1="0" y1="0" x2="30" y2="30" stroke="#ffffff" strokeWidth="1" />
                <line x1="30" y1="0" x2="0" y2="30" stroke="#ffffff" strokeWidth="1" />
              </g>
            ))}
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* CHAPTER 06 GRAPHICS (Future Ecosystem - Y = 4000)                         */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(4000);
        return (
          <g className="chapter-06-graphics" style={lit.style}>
            {[
              { x: 270, y: 3900 },
              { x: 340, y: 4000 },
              { x: 580, y: 3950 }
            ].map((sys, idx) => (
              <g key={idx} transform={`translate(${sys.x}, ${sys.y})`}>
                <rect width="28" height="28" fill="rgba(11, 11, 11, 0.95)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'} strokeWidth="1.5" />
                <line x1="0" y1="0" x2="28" y2="28" stroke="#ffffff" strokeWidth="1" />
                <line x1="28" y1="0" x2="0" y2="28" stroke="#ffffff" strokeWidth="1" />
              </g>
            ))}

            <g transform="translate(60, 3920)">
              <rect width="140" height="115" fill="rgba(11, 11, 11, 0.95)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.12)'} strokeWidth="1.5" />
              <text x="10" y="18" fill="#ffffff" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                FUTURE ECOSYSTEM
              </text>
              {[
                "Products",
                "Platform",
                "Community",
                "Knowledge Base",
                "Documentary Archive"
              ].map((item, idx) => (
                <text key={idx} x="10" y="34 + idx * 14" fill={lit.isLit ? 'rgba(255,255,255,0.9)' : 'rgba(255, 255, 255, 0.35)'} fontSize="8" fontFamily="Inter, sans-serif">
                  {item}
                </text>
              ))}
            </g>
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* CHAPTER 07 GRAPHICS (Manifesto - Y = 4650)                                */}
      {/* ========================================================================= */}
      {(() => {
        const lit = getLitState(4650);
        return (
          <g className="chapter-07-graphics" style={lit.style}>
            <g transform="translate(450, 4650)">
              <circle r="65" fill="none" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1.5" strokeDasharray="3 3" />
              <circle r="110" fill="none" stroke={lit.isLit ? 'rgba(255,255,255,0.8)' : 'rgba(255, 255, 255, 0.1)'} strokeWidth="1" />
              <line x1="-160" y1="0" x2="160" y2="0" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
              <line x1="0" y1="-160" x2="0" y2="160" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
              <circle r="5" fill="#ffffff" filter="url(#point-glow)" />
            </g>

            <g transform="translate(570, 4630)">
              <rect width="130" height="34" fill="rgba(11, 11, 11, 0.95)" stroke="#ffffff" strokeWidth="1.5" />
              <text x="65" y="21" fill="#ffffff" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="700" letterSpacing="0.08em">
                THE JOURNEY NEVER ENDS
              </text>
            </g>

            <g transform="translate(60, 4580)">
              <rect width="140" height="145" fill="rgba(11, 11, 11, 0.95)" stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1.5" />
              <text x="10" y="20" fill="#ffffff" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                MANIFESTO
              </text>
              {[
                "Start before ready.",
                "Build in public.",
                "Be honest.",
                "Keep learning.",
                "Never stop.",
                "This is Day Zero."
              ].map((lineText, idx) => (
                <text key={idx} x="10" y="36 + idx * 15" fill={lit.isLit ? 'rgba(255,255,255,0.9)' : 'rgba(255, 255, 255, 0.4)'} fontSize="8" fontFamily="Inter, sans-serif">
                  {lineText}
                </text>
              ))}
            </g>

            <path
              d="M 450 4650 C 400 4850 650 4950 500 5050"
              fill="none"
              stroke={lit.isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'}
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </g>
        );
      })()}

      {/* ========================================================================= */}
      {/* ACTIVE GLOWING WHITE DRAWING HEAD & COORDINATE READOUT                    */}
      {/* ========================================================================= */}
      <g transform={`translate(${headX}, ${headY})`} className="z-30">
        <circle r="20" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" className="animate-ping opacity-80" />
        <circle r="10" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        <circle r="5" fill="#ffffff" filter="url(#point-glow)" />

        <g transform="translate(18, -18)">
          <rect width="84" height="28" fill="rgba(5, 5, 5, 0.95)" stroke="#ffffff" strokeWidth="1.5" rx="3" className="shadow-lg shadow-white/10" />
          <text x="8" y="12" fill="#ffffff" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            X: {headX.toFixed(1)}
          </text>
          <text x="8" y="22" fill="#ffffff" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            Y: {headY.toFixed(1)}
          </text>
        </g>
      </g>
    </svg>
  );
}
