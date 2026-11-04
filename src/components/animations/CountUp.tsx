"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { isSafeGsap } from "@/lib/safe-mode";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  from = 0,
  to,
  duration = 1.6,
  suffix = "",
  prefix = "",
  className = "",
}) => {
  // El valor inicial siempre es la meta (to), garantizando legibilidad instantánea sin JS:
  const [displayValue, setDisplayValue] = useState<number>(to);
  const elementRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // En móvil o safe mode, dejar el valor estático sin cálculos de scroll
      if (typeof window === "undefined" || !elementRef.current) return;
      if (isSafeGsap() || window.innerWidth < 768) return;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

      setDisplayValue(from);
      const counter = { val: from };

      const anim = gsap.to(counter, {
        val: to,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 92%",
          once: true,
        },
        onUpdate: () => {
          setDisplayValue(Math.floor(counter.val));
        },
        onComplete: () => {
          setDisplayValue(to);
        },
      });

      return () => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      };
    },
    { scope: elementRef, dependencies: [from, to, duration] }
  );

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
