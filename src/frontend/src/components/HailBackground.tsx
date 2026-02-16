import { useEffect, useRef } from 'react';

interface Hailstone {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
  streakLength: number;
}

export function HailBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let hailstones: Hailstone[] = [];
    let reducedMotion = false;

    // Check for reduced motion preference
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = motionMediaQuery.matches;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      // Set canvas size in physical pixels
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Set CSS size to viewport size
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Reset transform and scale context to work in CSS pixels
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const createHailstones = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      // Calculate density-based count with caps
      const densityCount = Math.floor((width * height) / 12000);
      const minCount = 30;
      const maxCount = 200;
      const count = reducedMotion 
        ? Math.min(15, densityCount)
        : Math.max(minCount, Math.min(maxCount, densityCount));
      
      hailstones = [];
      
      for (let i = 0; i < count; i++) {
        hailstones.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1.5, // Smaller, more uniform pellets
          speed: reducedMotion ? 0.2 : Math.random() * 3 + 2.5, // Much faster: 2.5-5.5 vs 0.2-0.7
          drift: reducedMotion ? 0 : Math.random() * 1.2 - 0.6, // Stronger horizontal drift
          opacity: Math.random() * 0.3 + 0.5, // Brighter: 0.5-0.8
          streakLength: Math.random() * 8 + 4 // Motion blur streak: 4-12px
        });
      }
    };

    const drawHailstone = (hailstone: Hailstone) => {
      ctx.save();
      
      // Draw motion streak (diagonal line showing direction)
      const streakAngle = Math.atan2(hailstone.speed, hailstone.drift);
      const streakEndX = hailstone.x - Math.cos(streakAngle) * hailstone.streakLength;
      const streakEndY = hailstone.y - Math.sin(streakAngle) * hailstone.streakLength;
      
      // Gradient streak for motion blur effect
      const gradient = ctx.createLinearGradient(
        hailstone.x,
        hailstone.y,
        streakEndX,
        streakEndY
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${hailstone.opacity})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = hailstone.size * 0.6;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(hailstone.x, hailstone.y);
      ctx.lineTo(streakEndX, streakEndY);
      ctx.stroke();
      
      // Draw bright pellet at front
      ctx.fillStyle = `rgba(255, 255, 255, ${hailstone.opacity})`;
      ctx.shadowBlur = 3;
      ctx.shadowColor = `rgba(255, 255, 255, ${hailstone.opacity * 0.6})`;
      
      ctx.beginPath();
      ctx.arc(hailstone.x, hailstone.y, hailstone.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const updateHailstone = (hailstone: Hailstone) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      hailstone.y += hailstone.speed;
      hailstone.x += hailstone.drift;

      // Reset when off screen
      if (hailstone.y > height + 20) {
        hailstone.y = -20;
        hailstone.x = Math.random() * width;
      }

      if (hailstone.x > width + 20) {
        hailstone.x = -20;
      } else if (hailstone.x < -20) {
        hailstone.x = width + 20;
      }
    };

    const animate = () => {
      if (reducedMotion) {
        // For reduced motion, only draw once
        cancelAnimationFrame(animationFrameId);
        return;
      }
      
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, width, height);

      hailstones.forEach((hailstone) => {
        updateHailstone(hailstone);
        drawHailstone(hailstone);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      cancelAnimationFrame(animationFrameId);
      createHailstones();
      if (!reducedMotion) {
        animate();
      } else {
        // Draw static frame for reduced motion
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        ctx.clearRect(0, 0, width, height);
        hailstones.forEach((hailstone) => {
          drawHailstone(hailstone);
        });
      }
    };

    const handleResize = () => {
      resizeCanvas();
      createHailstones();
      if (reducedMotion) {
        // Redraw static frame after resize
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        ctx.clearRect(0, 0, width, height);
        hailstones.forEach((hailstone) => {
          drawHailstone(hailstone);
        });
      }
    };

    resizeCanvas();
    createHailstones();
    
    if (!reducedMotion) {
      animate();
    } else {
      // Draw initial static frame for reduced motion
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, width, height);
      hailstones.forEach((hailstone) => {
        drawHailstone(hailstone);
      });
    }

    window.addEventListener('resize', handleResize);
    motionMediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionMediaQuery.removeEventListener('change', handleMotionChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
