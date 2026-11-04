"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, isExternal = false, children, className = "", onClick, ...props }, ref) => {
    const internalRef = useRef<HTMLElement | null>(null);

    const handleMouseEnter = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (internalRef.current) {
        gsap.to(internalRef.current, {
          scale: 1.03,
          duration: 0.25,
          ease: "back.out(2)",
        });
      }
    };

    const handleMouseLeave = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (internalRef.current) {
        gsap.to(internalRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseDown = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (internalRef.current) {
        gsap.to(internalRef.current, {
          scale: 0.97,
          duration: 0.1,
          ease: "power1.inOut",
        });
      }
    };

    const handleMouseUp = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (internalRef.current) {
        gsap.to(internalRef.current, {
          scale: 1.03,
          duration: 0.2,
          ease: "back.out(2)",
        });
      }
    };

    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer select-none";

    const variantStyles = {
      primary:
        "bg-[#0284c7] text-white hover:bg-[#0369a1] shadow-lg shadow-[#0284c7]/30 hover:shadow-[0_0_25px_rgba(56,189,248,0.45)] border border-[#38bdf8]/40 active:scale-95",
      secondary:
        "bg-surface-elevated text-foreground hover:bg-surface-hover hover:border-[#38bdf8]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] border border-white/10 active:scale-95",
      outline:
        "bg-transparent text-foreground border border-white/15 hover:border-[#0284c7] hover:text-[#38bdf8] hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] active:scale-95",
      ghost:
        "bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/5 active:scale-95",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5",
    };

    const combinedClassName = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if (href) {
      const linkProps = isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};

      return (
        <a
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLAnchorElement | null>).current = node;
          }}
          href={href}
          className={combinedClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          {...linkProps}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={combinedClassName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
