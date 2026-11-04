"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isSafeSplit, isSafeGsap } from "@/lib/safe-mode";

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
  const [isDesktopAnimation, setIsDesktopAnimation] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    // Solo activar división dinámica en desktop cuando no esté en safe mode
    if (typeof window !== "undefined" && window.innerWidth >= 768 && !isSafeSplit() && !isSafeGsap()) {
      setIsDesktopAnimation(true);
    }
  }, []);

  useGSAP(
    () => {
      if (!isDesktopAnimation || !containerRef.current) return;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

      const wordElements = containerRef.current.querySelectorAll(".split-word");

      gsap.fromTo(
        wordElements,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger: 0.06,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [isDesktopAnimation, text, delay, duration] }
  );

  // En móvil o SSR: texto plano nativo, inmediato, accesible y visible sin retraso
  if (!isDesktopAnimation) {
    return (
      <h1 ref={containerRef} className={`opacity-100 visible ${className}`}>
        {text}
      </h1>
    );
  }

  return (
    <h1 ref={containerRef} className={`opacity-100 visible ${className}`}>
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
