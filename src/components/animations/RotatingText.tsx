"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  words,
  interval = 3000,
  className = "",
}) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (words.length <= 1) return;

    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span
      className={cn(
        "inline-block transition-all duration-300 transform",
        fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        className
      )}
    >
      {words[index]}
    </span>
  );
};

