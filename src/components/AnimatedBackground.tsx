import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const gridRef = useRef<HTMLCanvasElement>(null);

  // Floating orbs animation
  useEffect(() => {
    orbsRef.current.forEach((orb, i) => {
      if (!orb) return;
      const duration = 15 + i * 5;
      const xRange = 80 + i * 40;
      const yRange = 60 + i * 30;

      gsap.to(orb, {
        x: `+=${xRange}`,
        y: `+=${yRange}`,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 2,
      });

      gsap.to(orb, {
        opacity: 0.15 + Math.random() * 0.2,
        duration: 4 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  // Dot grid animation
  useEffect(() => {
    const canvas = gridRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const dots: { x: number; y: number; baseAlpha: number; alpha: number; pulse: number }[] = [];
    const spacing = 50;

    const initDots = () => {
      dots.length = 0;
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          dots.push({
            x,
            y,
            baseAlpha: 0.03 + Math.random() * 0.05,
            alpha: 0.03 + Math.random() * 0.05,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    };
    initDots();
    window.addEventListener('resize', initDots);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    let animFrame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        dot.pulse += 0.01;
        const dist = Math.hypot(dot.x - mouseX, dot.y - mouseY);
        const proximity = Math.max(0, 1 - dist / 250);
        dot.alpha = dot.baseAlpha + proximity * 0.3 + Math.sin(dot.pulse) * 0.02;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(157, 140, 255, ${dot.alpha})`;
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', initDots);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1F1D29 0%, #14131A 40%, #111017 100%)',
      }} />

      {/* Floating orbs */}
      <div
        ref={(el) => { if (el) orbsRef.current[0] = el; }}
        className="absolute rounded-full blur-[120px]"
        style={{
          width: 600,
          height: 600,
          top: '-10%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(157,140,255,0.12) 0%, transparent 70%)',
          opacity: 0.25,
        }}
      />
      <div
        ref={(el) => { if (el) orbsRef.current[1] = el; }}
        className="absolute rounded-full blur-[100px]"
        style={{
          width: 500,
          height: 500,
          bottom: '-5%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(124,107,196,0.15) 0%, transparent 70%)',
          opacity: 0.2,
        }}
      />
      <div
        ref={(el) => { if (el) orbsRef.current[2] = el; }}
        className="absolute rounded-full blur-[80px]"
        style={{
          width: 350,
          height: 350,
          top: '40%',
          left: '60%',
          background: 'radial-gradient(circle, rgba(157,140,255,0.08) 0%, transparent 70%)',
          opacity: 0.15,
        }}
      />

      {/* Dot grid canvas */}
      <canvas
        ref={gridRef}
        className="absolute inset-0"
        style={{ opacity: 0.6 }}
      />

      {/* Subtle horizontal scan line effect */}
      <div className="absolute inset-0" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(157,140,255,0.01) 2px, rgba(157,140,255,0.01) 4px)',
        pointerEvents: 'none',
      }} />

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 50%, rgba(17,16,23,0.8) 100%)',
      }} />
    </div>
  );
};

export default AnimatedBackground;
