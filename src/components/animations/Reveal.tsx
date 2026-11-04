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

      const targets = cascade
        ? containerRef.current.children
        : containerRef.current;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isMobile, reduceMotion } = context.conditions!;

          if (reduceMotion) {
            gsap.set(targets, { opacity: 1, x: 0, y: 0 });
            return;
          }

          let xOffset = 0;
          let yOffset = 0;
          const effDistance = isMobile ? Math.min(distance, 18) : distance;
          const effDuration = isMobile ? Math.min(duration, 0.5) : duration;

          switch (direction) {
            case "up":
              yOffset = effDistance;
              break;
            case "down":
              yOffset = -effDistance;
              break;
            case "left":
              xOffset = effDistance;
              break;
            case "right":
              xOffset = -effDistance;
              break;
            case "none":
            default:
              break;
          }

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
              duration: effDuration,
              delay: isMobile ? 0 : delay,
              ease: "power2.out",
              stagger: cascade ? (isMobile ? 0.08 : 0.12) : 0,
              scrollTrigger: {
                trigger: containerRef.current,
                start: isMobile ? "top 95%" : "top 88%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [direction, delay, duration, distance, cascade] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
