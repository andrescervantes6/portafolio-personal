"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlight?: boolean;
  spotlightColor?: string;
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  spotlight = true,
  spotlightColor = "rgba(14, 165, 233, 0.16)",
  as: Component = "div",
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !spotlight) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    if (spotlight && typeof window !== "undefined" && window.innerWidth >= 768) {
      setOpacity(1);
    }
  };

  const handleMouseLeave = () => {
    if (spotlight) setOpacity(0);
  };

  return (
    <Component
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111317]/95 sm:bg-[#111317]/80 sm:backdrop-blur-xl transition-all duration-300 hover:border-[#38bdf8]/40 hover:shadow-[0_15px_40px_-5px_rgba(14,165,233,0.22)]",
        className
      )}
      {...props}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 hidden sm:block"
          style={{
            opacity,
            background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 h-full w-full">{children}</div>
    </Component>
  );
};
