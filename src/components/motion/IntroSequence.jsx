import React, { useEffect, useLayoutEffect, useRef, useCallback, useState } from 'react';

// Geometry Constants
const CX = 300;
const CY = 300;
const RADIUS = 170;
const OVERHANG = 45;

const LINE_X1 = CX - RADIUS - OVERHANG; // 85
const LINE_X2 = CX + RADIUS + OVERHANG; // 515
const LINE_LENGTH = LINE_X2 - LINE_X1;  // 430

const SWEEP_ANGLE_DEG = 360.0 - 37.7;   // 322.3 degrees arc sweep
const ARC_LENGTH = (SWEEP_ANGLE_DEG / 360.0) * (2 * Math.PI * RADIUS); // ~956.24 px

// Timings in Milliseconds (Single Play-Through)
const DURATION_LINE = 850;    // Step 1: Draw horizontal line
const DURATION_CIRCLE = 1450; // Step 2: Sweep circular arc
const DURATION_ARROW = 250;   // Step 3: Reveal arrowhead & title flare
const PAUSE_AT_END = 1100;    // Hold complete logo & title before entering homepage
const TOTAL_CYCLE = DURATION_LINE + DURATION_CIRCLE + DURATION_ARROW + PAUSE_AT_END;

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export default function IntroSequence({ onComplete }) {
  const linePathRef = useRef(null);
  const circleArcPathRef = useRef(null);
  const arrowheadGroupRef = useRef(null);
  const animDotRef = useRef(null);
  const titleContainerRef = useRef(null);
  const titleTextRef = useRef(null);
  const subtitleRef = useRef(null);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);
  const completedRef = useRef(false);

  // Web Audio Synth References
  const audioCtxRef = useRef(null);
  const mainGainRef = useRef(null);
  const filterRef = useRef(null);
  const impactTriggeredRef = useRef(false);

  const [isFadingOut, setIsFadingOut] = useState(false);

  // Initialize Web Audio Engine for Intro
  const initIntroAudio = useCallback(() => {
    try {
      if (audioCtxRef.current) return;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.5);
      masterGain.connect(ctx.destination);
      mainGainRef.current = masterGain;

      // Lowpass Filter (sweeps open during intro)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(90, ctx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      // Deep Drone Oscillator 1 (A 55Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      osc1.connect(filter);
      osc1.start();

      // Deep Drone Oscillator 2 (E 82.5Hz)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(82.41, ctx.currentTime);
      osc2.connect(filter);
      osc2.start();

      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    } catch (err) {
      console.warn('Web Audio not allowed or error:', err);
    }
  }, []);

  // Trigger Marvel Sub-Impact Boom
  const triggerCinematicImpact = useCallback(() => {
    if (impactTriggeredRef.current || !audioCtxRef.current) return;
    impactTriggeredRef.current = true;

    try {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      // Sub-bass impact oscillator
      const impactOsc = ctx.createOscillator();
      const impactGain = ctx.createGain();

      impactOsc.type = 'sine';
      impactOsc.frequency.setValueAtTime(140, ctx.currentTime);
      impactOsc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.6);

      impactGain.gain.setValueAtTime(0.35, ctx.currentTime);
      impactGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      impactOsc.connect(impactGain);
      impactGain.connect(ctx.destination);

      impactOsc.start();
      impactOsc.stop(ctx.currentTime + 0.85);
    } catch (err) {
      console.warn('Impact audio trigger error:', err);
    }
  }, []);

  const stopIntroAudio = useCallback(() => {
    if (mainGainRef.current && audioCtxRef.current) {
      try {
        const ctx = audioCtxRef.current;
        mainGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        mainGainRef.current.gain.setValueAtTime(mainGainRef.current.gain.value, ctx.currentTime);
        mainGainRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        setTimeout(() => {
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
          }
        }, 450);
      } catch (err) {
        console.warn('Audio cleanup error:', err);
      }
    }
  }, []);

  const handleFinish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    stopIntroAudio();
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450); // smooth fade transition into homepage
  }, [onComplete, stopIntroAudio]);

  // Handle User Gestures to unlock Autoplay Audio
  useEffect(() => {
    initIntroAudio();

    const unlockAudio = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      } else if (!audioCtxRef.current) {
        initIntroAudio();
      }
    };

    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, [initIntroAudio]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  const renderProgress = useCallback((elapsedMs) => {
    const linePath = linePathRef.current;
    const circleArcPath = circleArcPathRef.current;
    const arrowheadGroup = arrowheadGroupRef.current;
    const animDot = animDotRef.current;
    const titleText = titleTextRef.current;
    const subtitle = subtitleRef.current;

    if (!linePath || !circleArcPath || !arrowheadGroup || !animDot) return;

    // Filter Frequency sweep based on progress
    if (filterRef.current && audioCtxRef.current) {
      const progress = Math.min(1, elapsedMs / (DURATION_LINE + DURATION_CIRCLE));
      const targetFreq = 90 + progress * 320; // Sweeps 90Hz -> 410Hz
      filterRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.05);
    }

    if (elapsedMs >= TOTAL_CYCLE) {
      linePath.style.strokeDashoffset = '0';
      circleArcPath.style.strokeDashoffset = '0';
      animDot.style.opacity = '0';
      arrowheadGroup.style.opacity = '1';
      if (titleText) {
        titleText.style.opacity = '1';
        titleText.style.transform = 'scale(1) translateY(0px)';
        titleText.style.letterSpacing = '0.4em';
      }
      if (subtitle) subtitle.style.opacity = '0.4';
      handleFinish();
      return;
    }

    if (elapsedMs <= DURATION_LINE) {
      // Phase 1: Draw Straight Horizontal Line
      const p = elapsedMs / DURATION_LINE;
      const eased = easeInOutCubic(p);

      linePath.style.opacity = p > 0 ? '1' : '0';
      circleArcPath.style.opacity = '0';

      linePath.style.strokeDashoffset = (LINE_LENGTH * (1 - eased)).toString();
      circleArcPath.style.strokeDashoffset = ARC_LENGTH.toString();
      arrowheadGroup.style.opacity = '0';

      const dotX = LINE_X1 + eased * LINE_LENGTH;
      animDot.setAttribute('cx', dotX.toString());
      animDot.setAttribute('cy', CY.toString());
      animDot.style.opacity = '1';

      if (titleText) {
        titleText.style.opacity = '0';
        titleText.style.transform = 'scale(0.92) translateY(12px)';
        titleText.style.letterSpacing = '0.6em';
      }
      if (subtitle) subtitle.style.opacity = '0';
    } else if (elapsedMs <= DURATION_LINE + DURATION_CIRCLE) {
      // Phase 2: Sweep Perfect Circular Arc + Cinematic Title Begin Fade-In
      linePath.style.opacity = '1';
      circleArcPath.style.opacity = '1';
      linePath.style.strokeDashoffset = '0';

      const circleTime = elapsedMs - DURATION_LINE;
      const p = circleTime / DURATION_CIRCLE;
      const eased = easeInOutCubic(p);

      circleArcPath.style.strokeDashoffset = (ARC_LENGTH * (1 - eased)).toString();
      arrowheadGroup.style.opacity = '0';

      const currentAngleDeg = -(eased * SWEEP_ANGLE_DEG);
      const currentAngleRad = currentAngleDeg * (Math.PI / 180.0);

      const dotX = CX + RADIUS * Math.cos(currentAngleRad);
      const dotY = CY + RADIUS * Math.sin(currentAngleRad);

      animDot.setAttribute('cx', dotX.toString());
      animDot.setAttribute('cy', dotY.toString());
      animDot.style.opacity = '1';

      // Marvel Studio-style cinematic title tracking convergence
      if (titleText) {
        const titleProgress = Math.max(0, (p - 0.4) / 0.6); // Starts at 40% of circle sweep
        const titleEased = easeInOutCubic(titleProgress);
        titleText.style.opacity = (titleEased * 0.85).toString();
        const scaleVal = 0.92 + titleEased * 0.08;
        const letterSpacingVal = 0.6 - titleEased * 0.2;
        const translateYVal = 12 * (1 - titleEased);
        titleText.style.transform = `scale(${scaleVal}) translateY(${translateYVal}px)`;
        titleText.style.letterSpacing = `${letterSpacingVal}em`;
      }
      if (subtitle) subtitle.style.opacity = '0';
    } else if (elapsedMs <= DURATION_LINE + DURATION_CIRCLE + DURATION_ARROW) {
      // Phase 3: Resolve Tangent Arrowhead & Marvel Text Lock-in + Sub Impact Hit
      linePath.style.opacity = '1';
      circleArcPath.style.opacity = '1';
      linePath.style.strokeDashoffset = '0';
      circleArcPath.style.strokeDashoffset = '0';

      const arrowTime = elapsedMs - (DURATION_LINE + DURATION_CIRCLE);
      const p = arrowTime / DURATION_ARROW;

      // Trigger Marvel cinematic sub impact hit
      triggerCinematicImpact();

      animDot.style.opacity = (1 - p).toString();
      arrowheadGroup.style.opacity = p.toString();

      if (titleText) {
        titleText.style.opacity = '1';
        titleText.style.transform = 'scale(1) translateY(0px)';
        titleText.style.letterSpacing = '0.4em';
      }
      if (subtitle) subtitle.style.opacity = (p * 0.4).toString();
    } else {
      // Phase 4: Full Hold of Marvel Title & Logo
      linePath.style.opacity = '1';
      circleArcPath.style.opacity = '1';
      linePath.style.strokeDashoffset = '0';
      circleArcPath.style.strokeDashoffset = '0';
      animDot.style.opacity = '0';
      arrowheadGroup.style.opacity = '1';

      if (titleText) {
        titleText.style.opacity = '1';
        titleText.style.transform = 'scale(1) translateY(0px)';
        titleText.style.letterSpacing = '0.4em';
      }
      if (subtitle) subtitle.style.opacity = '0.4';
    }
  }, [handleFinish, triggerCinematicImpact]);

  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;

    renderProgress(elapsed);

    if (!completedRef.current) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [renderProgress]);

  useLayoutEffect(() => {
    const linePath = linePathRef.current;
    const circleArcPath = circleArcPathRef.current;

    if (linePath && circleArcPath) {
      linePath.style.opacity = '0';
      circleArcPath.style.opacity = '0';
      linePath.style.strokeDasharray = `${LINE_LENGTH} ${LINE_LENGTH}`;
      circleArcPath.style.strokeDasharray = `${ARC_LENGTH} ${ARC_LENGTH}`;
      linePath.style.strokeDashoffset = LINE_LENGTH.toString();
      circleArcPath.style.strokeDashoffset = ARC_LENGTH.toString();
    }

    startTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      stopIntroAudio();
    };
  }, [animate, stopIntroAudio]);

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-white select-none overflow-hidden cursor-pointer transition-all duration-500 ${
        isFadingOut ? 'opacity-0 scale-[0.98] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      title="Click anywhere to enter homepage"
    >
      {/* 35mm Subtle Grain Background */}
      <svg className="pointer-events-none fixed inset-0 z-10 opacity-[0.035] mix-blend-overlay w-full h-full">
        <filter id="marvel-intro-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#marvel-intro-grain)" />
      </svg>

      {/* Top action controls */}
      <div className="absolute top-8 right-8 z-50 flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFinish();
          }}
          className="text-[10px] font-mono tracking-widest text-white/40 hover:text-white uppercase px-3 py-1.5 border border-white/10 hover:border-white/30 transition-all rounded-sm bg-black/40 backdrop-blur-sm"
        >
          SKIP INTRO [ESC]
        </button>
      </div>

      {/* Center Stage Container */}
      <div className="relative z-20 flex flex-col items-center justify-center max-w-xl w-full px-6">
        {/* Responsive SVG Logo Container */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 relative flex items-center justify-center">
          <svg
            id="logoSvg"
            viewBox="0 0 600 600"
            className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="logoGroup">
              {/* Path 1a: Horizontal Straight Line */}
              <path
                ref={linePathRef}
                d="M 85 300 L 515 300"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{
                  opacity: 0,
                  strokeDasharray: `${LINE_LENGTH} ${LINE_LENGTH}`,
                  strokeDashoffset: `${LINE_LENGTH}`,
                }}
              />

              {/* Path 1b: Open Circular Arc */}
              <path
                ref={circleArcPathRef}
                d="M 470 300 A 170 170 0 1 0 433.96 404.66"
                fill="none"
                stroke="#ffffff"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  opacity: 0,
                  strokeDasharray: `${ARC_LENGTH} ${ARC_LENGTH}`,
                  strokeDashoffset: `${ARC_LENGTH}`,
                }}
              />

              {/* Path 2: Tangent Arrowhead */}
              <g
                ref={arrowheadGroupRef}
                transform="translate(437.65, 399.93) rotate(-52.3)"
                style={{ opacity: 0 }}
              >
                <path
                  d="M 14 0 L -8 -9 L -2 0 L -8 9 Z"
                  fill="#ffffff"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </g>

              {/* Traveling Lead Dot */}
              <circle
                ref={animDotRef}
                cx="85"
                cy="300"
                r="5"
                fill="#ffffff"
                style={{ opacity: 1, filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 1))' }}
              />
            </g>
          </svg>
        </div>

        {/* Marvel Studio Cinematic Title Text "DAY ZERO" */}
        <div ref={titleContainerRef} className="mt-4 flex flex-col items-center justify-center text-center">
          <div className="relative overflow-hidden py-2 px-6">
            <h1
              ref={titleTextRef}
              className="font-black text-3xl sm:text-5xl font-display text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 uppercase tracking-[0.4em] transition-all duration-100 select-none filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              style={{ opacity: 0, transform: 'scale(0.92) translateY(12px)', letterSpacing: '0.6em' }}
            >
              DAY ZERO
            </h1>
          </div>


        </div>
      </div>

      {/* Footer Hint */}
      <div className="absolute bottom-8 z-30 text-[10px] font-mono text-white/30 tracking-widest uppercase pointer-events-none">
        CLICK ANYWHERE TO ENTER HOMEPAGE
      </div>
    </div>
  );
}
