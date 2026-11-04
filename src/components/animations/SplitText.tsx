"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  duration?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  wordClassName = "",
  delay = 0.2,
  duration = 0.8,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (typeof window === "undefined" || !containerRef.current) return;

      const wordElements = containerRef.current.querySelectorAll(".split-word");
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
            gsap.set(wordElements, { opacity: 1, y: 0, filter: "none" });
            return;
          }

          gsap.fromTo(
            wordElements,
            {
              opacity: 0,
              y: isMobile ? 14 : 28,
              filter: isMobile ? "none" : "blur(6px)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "none",
              duration: isMobile ? 0.5 : duration,
              delay: isMobile ? 0.1 : delay,
              stagger: isMobile ? 0.04 : 0.08,
              ease: "power2.out",
            }
          );
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [text, delay, duration] }
  );

  return (
    <h1 ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden pb-1"
        >
          <span className={`inline-block split-word ${wordClassName}`}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </h1>
  );
};
