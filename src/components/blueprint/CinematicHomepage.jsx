import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlueprintCanvas from './BlueprintCanvas';
import ChapterContent from './ChapterContent';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHomepage({ onOpenContact }) {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const [pathProgress, setPathProgress] = useState(0);
  const [currentPoint, setCurrentPoint] = useState({ x: 500, y: 120 });

  // Camera tracking state (smoothed via RAF lerp)
  const camState = useRef({ x: 0, targetX: 0 });

  // Scaled SVG blueprint path fitting medium 5200px height canvas
  const mainPathD = `
    M 500 120 
    L 640 120 
    A 80 80 0 0 1 720 200 
    L 720 380 
    L 500 520 
    L 500 750 
    L 450 920 
    C 400 1080 500 1250 450 1400 
    C 400 1520 600 1580 550 1680 
    C 500 1740 450 1880 480 2050 
    L 450 2280 
    L 500 2450 
    L 440 2580 
    L 490 2700 
    L 500 2920 
    L 450 3350 
    L 450 3680 
    L 450 4000 
    L 600 4280 
    L 450 4450 
    L 450 4650 
    C 400 4850 650 4950 500 5050
  `.replace(/\s+/g, ' ').trim();

  // Perfect Y-synchronization binary search algorithm
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create temporary SVG path element to compute getPointAtLength
    const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('d', mainPathD);
    tempSvg.appendChild(pathEl);
    document.body.appendChild(tempSvg);
    const totalLen = pathEl.getTotalLength();

    // Fast binary search to find exact point on path matching target Y coordinate
    const findPointByY = (targetY) => {
      let low = 0;
      let high = totalLen;
      let bestPt = pathEl.getPointAtLength(0);
      let bestDist = totalLen;

      for (let i = 0; i < 16; i++) {
        const mid = (low + high) / 2;
        const pt = pathEl.getPointAtLength(mid);
        if (pt.y < targetY) {
          low = mid;
        } else {
          high = mid;
        }
        const diff = Math.abs(pt.y - targetY);
        if (diff < bestDist) {
          bestDist = diff;
          bestPt = pt;
        }
      }
      const mid = (low + high) / 2;
      return { point: bestPt, progress: mid / totalLen };
    };

    const updatePointFromScroll = (scrollRatio) => {
      const clamped = Math.max(0, Math.min(1, scrollRatio));
      // Target Y ranges from 120 (Hero) to 5050 (CTA end)
      const targetY = 120 + clamped * 4930;
      const { point, progress } = findPointByY(targetY);

      setPathProgress(progress);
      setCurrentPoint({ x: point.x, y: point.y });

      // Smooth Camera Pan Target based on head X
      camState.current.targetX = (500 - point.x) * 0.14;
    };

    // GSAP ScrollTrigger for 60FPS sync
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        updatePointFromScroll(self.progress);
      },
    });

    // Native scroll handler for instant update tick
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll > 0) {
        const ratio = Math.max(0, Math.min(1, -rect.top / maxScroll));
        updatePointFromScroll(ratio);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Camera pan animation loop
    let animationFrameId;
    const animLoop = () => {
      const cs = camState.current;
      cs.x += (cs.targetX - cs.x) * 0.15;

      if (cameraRef.current) {
        cameraRef.current.style.transform = `translate3d(${cs.x.toFixed(2)}px, 0, 0)`;
      }
      animationFrameId = requestAnimationFrame(animLoop);
    };
    animLoop();

    return () => {
      st.kill();
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (tempSvg.parentNode) {
        document.body.removeChild(tempSvg);
      }
    };
  }, [mainPathD]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] text-[#F3F4F6] overflow-hidden select-none">
      {/* Camera Tracking Wrapper */}
      <div ref={cameraRef} className="relative w-full h-[5200px] transition-transform duration-75 ease-out">
        {/* SVG Blueprint Canvas */}
        <BlueprintCanvas
          pathProgress={pathProgress}
          currentPoint={currentPoint}
          mainPathD={mainPathD}
        />

        {/* Editorial Text & Chapters Content */}
        <ChapterContent
          currentPoint={currentPoint}
          onOpenContact={onOpenContact}
        />
      </div>
    </div>
  );
}
