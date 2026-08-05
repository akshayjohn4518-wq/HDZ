import React, { useEffect, useRef } from 'react';

export default function GreenVitalsStream() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let offset = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const H = canvas.height;
      const W = canvas.width;

      // Upward flow velocity
      offset += 2.0;

      // Responsive container left calculation matching Navigation max-w-7xl + px-4/px-6/px-8
      const sidePadding = W < 640 ? 16 : W < 768 ? 24 : 32;
      const containerWidth = Math.min(W, 1280);
      const containerLeft = Math.max(sidePadding, (W - containerWidth) / 2 + sidePadding);

      // Header logo bottom boundary (signal lines terminate right under DAY ZERO logo)
      const signalEndY = W < 640 ? 52 : 62;

      // Responsive column offsets underneath the logo on mobile vs desktop
      const isMobile = W < 640;
      const signalColumns = [
        { offsetX: isMobile ? 10 : 14, alpha: 0.75, speed: 1.0,  pulseGap: 180, phase: 0 },
        { offsetX: isMobile ? 30 : 42, alpha: 0.55, speed: 1.25, pulseGap: 220, phase: 60 },
        { offsetX: isMobile ? 50 : 70, alpha: 0.40, speed: 0.9,  pulseGap: 200, phase: 130 },
        { offsetX: isMobile ? 70 : 98, alpha: 0.25, speed: 1.1,  pulseGap: 250, phase: 190 },
      ];

      signalColumns.forEach((col) => {
        const x = containerLeft + col.offsetX;
        const { alpha, speed, pulseGap, phase } = col;

        // 1. Straight vertical background guide line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, H);
        ctx.lineTo(x, signalEndY);

        const lineGrad = ctx.createLinearGradient(x, H, x, signalEndY);
        lineGrad.addColorStop(0, 'rgba(16, 185, 129, 0)');
        lineGrad.addColorStop(0.15, `rgba(16, 185, 129, ${alpha * 0.35})`);
        lineGrad.addColorStop(1, `rgba(16, 185, 129, ${alpha})`);

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1;
        ctx.shadowColor = '#00FF66';
        ctx.shadowBlur = 4;
        ctx.stroke();
        ctx.restore();

        // 2. Upward moving glowing signal pulses
        const distance = H - signalEndY;
        const pulseCycle = distance + 100;

        for (let i = 0; i < 3; i++) {
          const rawY = H - ((offset * speed + phase + i * pulseGap) % pulseCycle);

          if (rawY >= signalEndY && rawY <= H - 20) {
            const pulseLength = 36;
            const pulseGrad = ctx.createLinearGradient(x, Math.min(H, rawY + pulseLength), x, rawY);
            pulseGrad.addColorStop(0, 'rgba(0, 255, 102, 0)');
            pulseGrad.addColorStop(1, `rgba(0, 255, 102, ${alpha * 0.95})`);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, Math.min(H, rawY + pulseLength));
            ctx.lineTo(x, rawY);
            ctx.strokeStyle = pulseGrad;
            ctx.lineWidth = 2;
            ctx.shadowColor = '#00FF66';
            ctx.shadowBlur = 10;
            ctx.stroke();

            // Leading bright head pulse dot
            ctx.beginPath();
            ctx.arc(x, rawY, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = '#00FF66';
            ctx.shadowColor = '#00FF66';
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.restore();
          }
        }

        // 3. Terminal glow dot right under the logo
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, signalEndY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#00FF66';
        ctx.shadowColor = '#00FF66';
        ctx.shadowBlur = 8;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 select-none"
    />
  );
}
