"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Mail, Github, Instagram, Linkedin, MessageCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconLinkProps {
  name: string;
  href: string;
  icon: "mail" | "github" | "instagram" | "whatsapp" | "linkedin";
  label: string;
  isExternal?: boolean;
  className?: string;
}

export const IconLink: React.FC<IconLinkProps> = ({
  name,
  href,
  icon,
  label,
  isExternal = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const getIcon = () => {
    const iconClass = "w-6 h-6 transition-colors duration-200";
    switch (icon) {
      case "mail":
        return <Mail className={iconClass} aria-hidden="true" />;
      case "github":
        return <Github className={iconClass} aria-hidden="true" />;
      case "instagram":
        return <Instagram className={iconClass} aria-hidden="true" />;
      case "linkedin":
        return <Linkedin className={iconClass} aria-hidden="true" />;
      case "whatsapp":
        return <MessageCircle className={iconClass} aria-hidden="true" />;
      default:
        return <ExternalLink className={iconClass} aria-hidden="true" />;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!containerRef.current || !iconRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;

    gsap.to(containerRef.current, {
      x: deltaX * 0.5,
      y: deltaY * 0.5,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(iconRef.current, {
      x: deltaX * 0.8,
      y: deltaY * 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!containerRef.current || !iconRef.current) return;

    gsap.to([containerRef.current, iconRef.current], {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1.2, 0.4)",
    });
  };

  return (
    <a
      ref={containerRef}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`${name}: ${label}`}
      className={cn(
        "group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/[0.08] bg-[#111317]/70 backdrop-blur-md transition-all duration-300 hover:border-[#0284c7]/60 hover:bg-[#0f172a]/60 hover:shadow-[0_0_35px_-5px_rgba(14,165,233,0.35)] focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:outline-none",
        className
      )}
    >
      <div
        ref={iconRef}
        className="w-14 h-14 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300 group-hover:text-[#38bdf8] group-hover:border-[#0284c7]/70 group-hover:bg-[#0284c7]/20 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all duration-300 mb-3"
      >
        {getIcon()}
      </div>
      <span className="text-sm font-medium text-white group-hover:text-[#38bdf8] transition-colors duration-200">
        {name}
      </span>
      <span className="text-xs text-neutral-400 mt-1 font-mono tracking-tight text-center max-w-[200px] truncate">
        {label}
      </span>
    </a>
  );
};
