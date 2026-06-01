import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  speed: number;
  color: string;
}

export const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create star field
    const stars: Star[] = [];
    const colors = [
      '#e2e8f0', // white-ish
      '#06b6d4', // cyan
      '#8b5cf6', // purple
      '#d946ef', // pink
    ];

    const starCount = Math.floor((width * height) / 8000);

    for (let i = 0; i < starCount; i++) {
      const baseAlpha = Math.random() * 0.6 + 0.1;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        baseAlpha,
        alpha: baseAlpha,
        speed: Math.random() * 0.05 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.05;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.05;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      // Lerp mouse movement for smooth parallax
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.fillStyle = '#030014';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle background radial glow
      const gradient = ctx.createRadialGradient(
        width / 2 + mouse.x * 2,
        height / 2 + mouse.y * 2,
        10,
        width / 2 + mouse.x * 2,
        height / 2 + mouse.y * 2,
        width * 0.7
      );
      gradient.addColorStop(0, 'rgba(27, 10, 60, 0.25)');
      gradient.addColorStop(0.5, 'rgba(8, 5, 25, 0.1)');
      gradient.addColorStop(1, 'rgba(3, 0, 20, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      stars.forEach((star) => {
        // Adjust positions based on speed and mouse parallax
        let sx = star.x - mouse.x * star.size;
        let sy = star.y - mouse.y * star.size;

        // Wrap stars around boundaries
        if (sx < 0) sx = width + (sx % width);
        if (sx > width) sx = sx % width;
        if (sy < 0) sy = height + (sy % height);
        if (sy > height) sy = sy % height;

        // Twinkle stars
        star.alpha = star.baseAlpha + Math.sin(Date.now() * star.speed * 0.05) * 0.2;
        star.alpha = Math.max(0.05, Math.min(1, star.alpha));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      // Draw cyberpunk tech grid layer
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      const startX = Math.floor(-mouse.x * 0.2) % gridSize;
      const startY = Math.floor(-mouse.y * 0.2) % gridSize;

      for (let x = startX; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = startY; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};
