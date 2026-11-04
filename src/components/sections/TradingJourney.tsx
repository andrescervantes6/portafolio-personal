"use client";

import React, { useRef } from "react";
import { portfolioContent } from "@/data/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/animations/Reveal";
import { Card } from "@/components/ui/Card";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { CheckCircle2, CircleDot, Target, Quote } from "lucide-react";

export const TradingJourney: React.FC = () => {
  const { tradingJourneySection } = portfolioContent;
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !lineRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 80%",
            scrub: 0.8,
          },
        }
      );
    },
    { scope: containerRef }
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-[#38bdf8]" aria-hidden="true" />;
      case "in-progress":
        return <CircleDot className="w-5 h-5 text-[#38bdf8] animate-pulse" aria-hidden="true" />;
      case "upcoming":
        return <Target className="w-5 h-5 text-neutral-500" aria-hidden="true" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string, label: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0284c7]/20 text-[#38bdf8] border border-[#0284c7]/40">
            {label}
          </span>
        );
      case "in-progress":
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0284c7]/30 text-[#38bdf8] border border-[#38bdf8]/50 shadow-[0_0_10px_rgba(56,189,248,0.3)] animate-pulse">
            {label}
          </span>
        );
      case "upcoming":
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
            {label}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id={tradingJourneySection.id} className="py-20 sm:py-28 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <Reveal direction="up" duration={0.7}>
          <SectionTitle
            badge={tradingJourneySection.badge}
            title={tradingJourneySection.title}
          />
        </Reveal>

        {/* Featured Motto Card */}
        <Reveal direction="up" delay={0.15} duration={0.7} className="mb-14">
          <div className="relative overflow-hidden rounded-2xl border border-[#0284c7]/35 bg-gradient-to-r from-[#111317] via-[#101926] to-[#111317] p-6 sm:p-8 backdrop-blur-xl shadow-xl hover:shadow-[0_15px_35px_-5px_rgba(14,165,233,0.22)] transition-shadow duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Quote className="w-24 h-24 text-[#38bdf8]" />
            </div>
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#0284c7]/20 border border-[#0284c7]/40 shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center justify-center flex-shrink-0 text-[#38bdf8]">
                <Quote className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] block mb-1 font-semibold">
                  Mentalidad & Enfoque
                </span>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-tight leading-snug">
                  &ldquo;{tradingJourneySection.motto}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Vertical Timeline */}
        <div ref={containerRef} className="relative pl-6 sm:pl-10">
          {/* Static background track line */}
          <div className="absolute left-[13px] sm:left-[21px] top-4 bottom-4 w-[2px] bg-white/[0.08]" />

          {/* Animated GSAP progress line in Sky Blue */}
          <div
            ref={lineRef}
            className="absolute left-[13px] sm:left-[21px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#0284c7] via-[#38bdf8] to-[#0284c7] origin-top shadow-[0_0_10px_rgba(56,189,248,0.5)]"
          />

          <div className="space-y-8 sm:space-y-12">
            {tradingJourneySection.milestones.map((milestone, index) => {
              const isInProgress = milestone.status === "in-progress";

              return (
                <div key={milestone.id} className="relative group">
                  {/* Timeline node icon */}
                  <div
                    className={`absolute -left-[30px] sm:-left-[42px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center bg-[#090a0d] border transition-all duration-300 ${
                      isInProgress
                        ? "border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.6)] scale-110"
                        : milestone.status === "completed"
                        ? "border-[#0284c7] bg-[#0284c7]/10"
                        : "border-neutral-800 text-neutral-600"
                    }`}
                  >
                    {getStatusIcon(milestone.status)}
                  </div>

                  {/* Milestone Card */}
                  <Reveal direction="left" delay={index * 0.12} duration={0.6}>
                    <Card
                      className={`p-5 sm:p-6 transition-all duration-300 ${
                        isInProgress
                          ? "border-[#0284c7]/60 bg-[#0e1626]/90 shadow-lg shadow-[#0284c7]/20 hover:shadow-[0_15px_40px_-5px_rgba(14,165,233,0.3)]"
                          : "border-white/[0.08] hover:border-[#0284c7]/50 hover:shadow-[0_15px_35px_-5px_rgba(14,165,233,0.2)]"
                      }`}
                      spotlightColor="rgba(14, 165, 233, 0.16)"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-medium text-neutral-400">
                          {milestone.phase}
                        </span>
                        {getStatusBadge(milestone.status, milestone.badge)}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-neutral-100">
                        {milestone.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
                        {milestone.description}
                      </p>
                    </Card>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
