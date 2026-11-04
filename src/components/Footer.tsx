import React from "react";
import { portfolioContent } from "@/data/content";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const { footer } = portfolioContent;

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080a] py-12 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
          <span className="font-semibold text-neutral-300">
            © {footer.year} {footer.name}
          </span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span className="text-neutral-500">{footer.tagline}</span>
        </div>

        <a
          href="#inicio"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-400 hover:text-[#38bdf8] hover:border-[#0284c7]/40 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
          aria-label="Volver arriba"
        >
          <span>Inicio</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </a>
      </div>
    </footer>
  );
};
