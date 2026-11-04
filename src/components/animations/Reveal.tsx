"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { isSafeGsap } from "@/lib/safe-mode";

interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  cascade?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 30,
  className = "",
  cascade = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. En móvil (< 768px), en safe mode o con reduced-motion, NO crear ScrollTriggers.
      // El contenido permanece 100% visible inmediatamente sin bloquear el hilo principal.
      if (typeof window === "undefined" || !containerRef.current) return;
      if (isSafeGsap()) return;
      if (window.innerWidth < 768) return;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

      const targets = cascade
        ? containerRef.current.children
        : containerRef.current;

      let xOffset = 0;
      let yOffset = 0;

      switch (direction) {
        case "up":
          yOffset = distance;
          break;
        case "down":
          yOffset = -distance;
          break;
        case "left":
          xOffset = distance;
          break;
        case "right":
          xOffset = -distance;
          break;
        case "none":
        default:
          break;
      }

      // Animación progresiva exclusivamente en desktop
      const anim = gsap.fromTo(
        targets,
        {
          opacity: 0,
          x: xOffset,
          y: yOffset,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          stagger: cascade ? 0.1 : 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      return () => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      };
    },
    { scope: containerRef, dependencies: [direction, delay, duration, distance, cascade] }
  );

  // El estado inicial del HTML/CSS siempre es 100% visible:
  return (
    <div ref={containerRef} className={`opacity-100 visible ${className}`}>
      {children}
    </div>
  );
};
