import { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  opacity: number;
}

export function SnowfallBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let snowflakes: Snowflake[] = [];
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

    const createSnowflakes = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      // Calculate density-based count with caps
      const densityCount = Math.floor((width * height) / 10000);
      const minCount = 40;
      const maxCount = 250;
      const count = reducedMotion 
        ? Math.min(20, densityCount)
        : Math.max(minCount, Math.min(maxCount, densityCount));
      
      snowflakes = [];
      
      for (let i = 0; i < count; i++) {
        snowflakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.5 + 1.5, // 1.5-4px
          speed: reducedMotion ? 0.1 : Math.random() * 0.75 + 0.25, // Gentle fall: 0.25-1
          drift: reducedMotion ? 0 : Math.random() * 0.6 - 0.3, // Subtle horizontal drift
          opacity: Math.random() * 0.4 + 0.5 // 0.5-0.9
        });
      }
    };

    const drawSnowflake = (snowflake: Snowflake) => {
      ctx.save();
      
      // Create radial gradient for soft glow effect
      const gradient = ctx.createRadialGradient(
        snowflake.x,
        snowflake.y,
        0,
        snowflake.x,
        snowflake.y,
        snowflake.radius * 2
      );
      
      // Soft red glow
      gradient.addColorStop(0, `rgba(255, 0, 0, ${snowflake.opacity})`);
      gradient.addColorStop(0.5, `rgba(255, 100, 100, ${snowflake.opacity * 0.6})`);
      gradient.addColorStop(1, `rgba(255, 100, 100, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.radius * 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const updateSnowflake = (snowflake: Snowflake) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      snowflake.y += snowflake.speed;
      snowflake.x += snowflake.drift;

      // Reset when off screen
      if (snowflake.y > height + snowflake.radius * 2) {
        snowflake.y = -snowflake.radius * 2;
        snowflake.x = Math.random() * width;
      }

      // Wrap horizontally
      if (snowflake.x > width + snowflake.radius * 2) {
        snowflake.x = -snowflake.radius * 2;
      } else if (snowflake.x < -snowflake.radius * 2) {
        snowflake.x = width + snowflake.radius * 2;
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

      snowflakes.forEach((snowflake) => {
        updateSnowflake(snowflake);
        drawSnowflake(snowflake);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      cancelAnimationFrame(animationFrameId);
      createSnowflakes();
      if (!reducedMotion) {
        animate();
      } else {
        // Draw static frame for reduced motion
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        ctx.clearRect(0, 0, width, height);
        snowflakes.forEach((snowflake) => {
          drawSnowflake(snowflake);
        });
      }
    };

    const handleResize = () => {
      resizeCanvas();
      createSnowflakes();
      if (reducedMotion) {
        // Redraw static frame after resize
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        ctx.clearRect(0, 0, width, height);
        snowflakes.forEach((snowflake) => {
          drawSnowflake(snowflake);
        });
      }
    };

    resizeCanvas();
    createSnowflakes();
    
    if (!reducedMotion) {
      animate();
    } else {
      // Draw initial static frame for reduced motion
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, width, height);
      snowflakes.forEach((snowflake) => {
        drawSnowflake(snowflake);
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
