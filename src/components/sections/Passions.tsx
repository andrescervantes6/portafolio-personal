"use client";

import React from "react";
import { portfolioContent } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/animations/Reveal";
import { Code, Bot, TrendingUp, Sparkles } from "lucide-react";

export const Passions: React.FC = () => {
  const { passionsSection } = portfolioContent;

  const getPassionIcon = (icon: string) => {
    const iconClass = "w-6 h-6 text-[#38bdf8]";
    switch (icon) {
      case "code":
        return <Code className={iconClass} aria-hidden="true" />;
      case "bot":
        return <Bot className={iconClass} aria-hidden="true" />;
      case "trending-up":
        return <TrendingUp className={iconClass} aria-hidden="true" />;
      case "sparkles":
        return <Sparkles className={iconClass} aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <section id={passionsSection.id} className="py-20 sm:py-28 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <Reveal direction="up" duration={0.7}>
          <SectionTitle
            badge={passionsSection.badge}
            title={passionsSection.title}
            subtitle={passionsSection.subtitle}
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {passionsSection.items.map((item, index) => (
            <Reveal
              key={item.id}
              direction="up"
              delay={index * 0.1}
              duration={0.6}
            >
              <Card
                className="p-6 h-full flex flex-col justify-between border-white/[0.08] hover:border-[#0284c7]/60 hover:shadow-[0_15px_40px_-5px_rgba(14,165,233,0.25)] group"
                spotlightColor="rgba(14, 165, 233, 0.18)"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0284c7]/25 group-hover:border-[#38bdf8]/50 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all duration-300">
                    {getPassionIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#38bdf8] block mb-2 font-semibold">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neutral-100 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm text-neutral-400 font-normal leading-relaxed mt-4 pt-4 border-t border-white/[0.05]">
                  {item.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
