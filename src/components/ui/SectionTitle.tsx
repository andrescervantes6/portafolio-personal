import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  title,
  subtitle,
  align = "left",
  className = "",
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        isCenter ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-mono font-medium tracking-wide border border-[#0284c7]/30 bg-[#0284c7]/10 text-[#38bdf8]",
            isCenter && "justify-center"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-neutral-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
