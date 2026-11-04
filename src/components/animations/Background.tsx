"use client";

import React, { useEffect, useRef, useState } from "react";

export const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check mobile or reduced motion
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return () => window.removeEventListener("resize", checkMobile);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Subtle particle setup (low count for max performance > 90)
    const particleCount = window.innerWidth < 768 ? 0 : 25;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.35 + 0.15,
    }));

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      if (currentTime - lastTime < 24) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    if (particleCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", checkMobile);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Aurora subtle radial glows en azul cielo */}
      <div
        className="absolute -top-[25%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(8, 9, 11, 0) 70%)",
        }}
      />
      <div
        className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(8, 9, 11, 0) 70%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full blur-[150px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(2, 132, 199, 0.35) 0%, rgba(8, 9, 11, 0) 70%)",
        }}
      />

      {/* Grid pattern overlay (Apple Pro style) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Canvas for lightweight subtle particles en azul cielo */}
      {!isMobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
