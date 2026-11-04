"use client";

import React, { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

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
  duration = 1.8,
  suffix = "",
  prefix = "",
  className = "",
}) => {
  const [displayValue, setDisplayValue] = useState<number>(from);
  const elementRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined" || !elementRef.current) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplayValue(to);
        return;
      }

      const counter = { val: from };

      gsap.to(counter, {
        val: to,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          setDisplayValue(Math.floor(counter.val));
        },
        onComplete: () => {
          setDisplayValue(to);
        },
      });
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

