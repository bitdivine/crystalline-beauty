import { useEffect, useRef } from 'react';

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  drift: number;
  opacity: number;
  width: number;
}

export function RainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let raindrops: Raindrop[] = [];
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

    const createRaindrops = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      // Calculate density-based count with caps
      const densityCount = Math.floor((width * height) / 8000);
      const minCount = 40;
      const maxCount = 250;
      const count = reducedMotion 
        ? Math.min(20, densityCount)
        : Math.max(minCount, Math.min(maxCount, densityCount));
      
      raindrops = [];
      
      for (let i = 0; i < count; i++) {
        raindrops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 15 + 10, // Elongated drops: 10-25px
          speed: reducedMotion ? 0.3 : Math.random() * 4 + 3, // Moderate speed: 3-7
          drift: reducedMotion ? 0 : Math.random() * 0.8 - 0.4, // Subtle wind drift
          opacity: Math.random() * 0.25 + 0.3, // Softer: 0.3-0.55
          width: Math.random() * 0.8 + 0.6 // Thin streaks: 0.6-1.4px
        });
      }
    };

    const drawRaindrop = (raindrop: Raindrop) => {
      ctx.save();
      
      // Calculate streak angle based on speed and drift
      const streakAngle = Math.atan2(raindrop.speed, raindrop.drift);
      const endX = raindrop.x + Math.cos(streakAngle) * raindrop.length;
      const endY = raindrop.y + Math.sin(streakAngle) * raindrop.length;
      
      // Create gradient for raindrop streak (fade at tail)
      const gradient = ctx.createLinearGradient(
        raindrop.x,
        raindrop.y,
        endX,
        endY
      );
      gradient.addColorStop(0, `rgba(200, 220, 255, ${raindrop.opacity})`); // Slight blue tint
      gradient.addColorStop(0.7, `rgba(200, 220, 255, ${raindrop.opacity * 0.6})`);
      gradient.addColorStop(1, `rgba(200, 220, 255, 0)`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = raindrop.width;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(raindrop.x, raindrop.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      ctx.restore();
    };

    const updateRaindrop = (raindrop: Raindrop) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      raindrop.y += raindrop.speed;
      raindrop.x += raindrop.drift;

      // Reset when off screen (with buffer for streak length)
      if (raindrop.y > height + raindrop.length) {
        raindrop.y = -raindrop.length;
        raindrop.x = Math.random() * width;
      }

      // Wrap horizontally
      if (raindrop.x > width + 20) {
        raindrop.x = -20;
      } else if (raindrop.x < -20) {
        raindrop.x = width + 20;
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

      raindrops.forEach((raindrop) => {
        updateRaindrop(raindrop);
        drawRaindrop(raindrop);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      cancelAnimationFrame(animationFrameId);
      createRaindrops();
      if (!reducedMotion) {
        animate();
      } else {
        // Draw static frame for reduced motion
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        ctx.clearRect(0, 0, width, height);
        raindrops.forEach((raindrop) => {
          drawRaindrop(raindrop);
        });
      }
    };

    const handleResize = () => {
      resizeCanvas();
      createRaindrops();
      if (reducedMotion) {
        // Redraw static frame after resize
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        ctx.clearRect(0, 0, width, height);
        raindrops.forEach((raindrop) => {
          drawRaindrop(raindrop);
        });
      }
    };

    resizeCanvas();
    createRaindrops();
    
    if (!reducedMotion) {
      animate();
    } else {
      // Draw initial static frame for reduced motion
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, width, height);
      raindrops.forEach((raindrop) => {
        drawRaindrop(raindrop);
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
