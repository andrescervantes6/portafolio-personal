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
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const wordElements = containerRef.current.querySelectorAll(".split-word");

      gsap.fromTo(
        wordElements,
        {
          opacity: 0,
          y: 28,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          delay,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
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

