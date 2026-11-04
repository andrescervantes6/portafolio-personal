"use client";

import React from "react";
import { portfolioContent } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/animations/CountUp";
import { Reveal } from "@/components/animations/Reveal";
import { Calendar, GraduationCap, MapPin } from "lucide-react";

export const QuickFacts: React.FC = () => {
  const { quickFacts } = portfolioContent;

  const getFactIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 text-[#38bdf8]";
    switch (iconName) {
      case "calendar":
        return <Calendar className={iconClass} aria-hidden="true" />;
      case "graduation-cap":
        return <GraduationCap className={iconClass} aria-hidden="true" />;
      case "map-pin":
        return <MapPin className={iconClass} aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {quickFacts.map((fact, index) => (
            <Reveal
              key={fact.id}
              direction="up"
              delay={index * 0.12}
              duration={0.6}
            >
              <Card
                className="p-6 h-full flex flex-col justify-between border-white/[0.08] hover:border-[#0284c7]/50 hover:shadow-[0_15px_35px_-5px_rgba(14,165,233,0.25)] transition-all duration-300 group"
                spotlightColor="rgba(14, 165, 233, 0.16)"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:bg-[#0284c7]/20 group-hover:border-[#0284c7]/50 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all">
                    {getFactIcon(fact.icon)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                    Dato {index + 1}
                  </span>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1 group-hover:text-neutral-100">
                    {fact.type === "countup" && fact.value ? (
                      <span className="flex items-baseline">
                        <CountUp
                          from={0}
                          to={fact.value}
                          duration={2}
                          suffix={fact.suffix}
                        />
                      </span>
                    ) : (
                      fact.title
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
                    {fact.subtitle}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
