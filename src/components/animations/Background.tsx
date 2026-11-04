"use client";

import React, { useEffect, useRef, useState } from "react";

export const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDesktop = () => {
      setIsDesktop(typeof window !== "undefined" && window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop, { passive: true });
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    // Only run canvas particles on desktop devices when user doesn't prefer reduced motion
    if (!mounted || !isDesktop) return;

    if (
      typeof window === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d", { alpha: true });
    } catch {
      return; // Graceful fallback to pure CSS background
    }

    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Subtle particles for desktop
    const particleCount = 20;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.3 + 0.1,
    }));

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Throttle to ~30fps for minimal power usage
      if (currentTime - lastTime < 30) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastTime = currentTime;

      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
          ctx!.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, isDesktop]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" aria-hidden="true">
      {/* 
        * Fondo CSS ligero y 100% acelerado por GPU (Ideal para móvil):
        * No consume memoria ni hilos de Javascript, garantizando 60/120 fps en smartphones.
        */}
      <div
        className="absolute -top-[25%] -left-[10%] w-[80vw] sm:w-[60vw] h-[80vw] sm:h-[60vw] rounded-full blur-[90px] sm:blur-[140px] opacity-25 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(8, 9, 11, 0) 70%)",
        }}
      />
      <div
        className="absolute top-[40%] -right-[15%] w-[70vw] sm:w-[50vw] h-[70vw] sm:h-[50vw] rounded-full blur-[100px] sm:blur-[160px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(8, 9, 11, 0) 70%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[10%] w-[60vw] sm:w-[45vw] h-[60vw] sm:h-[45vw] rounded-full blur-[90px] sm:blur-[150px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(2, 132, 199, 0.35) 0%, rgba(8, 9, 11, 0) 70%)",
        }}
      />

      {/* Grid overlay sutil estilo Apple Pro */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Partículas activas únicamente en escritorio (>= 768px) */}
      {mounted && isDesktop && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}
    </div>
  );
};
