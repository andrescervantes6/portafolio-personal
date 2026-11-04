import React from "react";
import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline" | "glow";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  icon,
}) => {
  const baseStyles =
    "inline-flex items-center font-mono font-medium rounded-full transition-all duration-200 select-none";

  const variants = {
    default:
      "bg-white/[0.04] text-neutral-300 border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.07]",
    accent:
      "bg-[#0284c7]/15 text-[#38bdf8] border border-[#0284c7]/35 hover:border-[#38bdf8]/60 hover:shadow-[0_0_15px_rgba(14,165,233,0.25)]",
    outline:
      "bg-transparent text-neutral-400 border border-neutral-800 hover:text-neutral-200 hover:border-neutral-700",
    glow:
      "bg-[#0284c7]/10 text-[#38bdf8] border border-[#0284c7]/40 shadow-[0_0_15px_-3px_rgba(14,165,233,0.35)]",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-1 gap-1.5",
    md: "text-xs px-3.5 py-1.5 gap-2",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {icon && <span className="opacity-80 flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
