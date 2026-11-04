"use client";

import React from "react";
import { portfolioContent } from "@/data/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/animations/Reveal";
import { Compass, ShieldCheck, Repeat, BookOpen } from "lucide-react";

export const Principles: React.FC = () => {
  const { principlesSection } = portfolioContent;

  const getPrincipleIcon = (icon: string) => {
    const iconClass = "w-6 h-6 text-[#38bdf8]";
    switch (icon) {
      case "compass":
        return <Compass className={iconClass} aria-hidden="true" />;
      case "shield-check":
        return <ShieldCheck className={iconClass} aria-hidden="true" />;
      case "repeat":
        return <Repeat className={iconClass} aria-hidden="true" />;
      case "book-open":
        return <BookOpen className={iconClass} aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <Reveal direction="up" duration={0.7}>
          <SectionTitle
            badge={principlesSection.badge}
            title={principlesSection.title}
            subtitle={principlesSection.subtitle}
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {principlesSection.items.map((principle, index) => (
            <Reveal
              key={principle.id}
              direction="up"
              delay={index * 0.1}
              duration={0.6}
            >
              <Card
                className="p-6 h-full flex flex-col justify-between border-white/[0.08] hover:border-[#0284c7]/50 hover:shadow-[0_15px_35px_-5px_rgba(14,165,233,0.22)] group"
                spotlightColor="rgba(14, 165, 233, 0.16)"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:bg-[#0284c7]/20 group-hover:border-[#0284c7]/50 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] group-hover:scale-105 transition-all duration-300">
                    {getPrincipleIcon(principle.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neutral-100">
                    {principle.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed mt-4 pt-4 border-t border-white/[0.05]">
                  {principle.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
