"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  triggerHook?: string;
  cascade?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 36,
  className = "",
  cascade = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined" || !containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(containerRef.current, { opacity: 1, x: 0, y: 0 });
        return;
      }

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

      const targets = cascade
        ? containerRef.current.children
        : containerRef.current;

      gsap.fromTo(
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
          ease: "power3.out",
          stagger: cascade ? 0.12 : 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [direction, delay, duration, distance, cascade] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

