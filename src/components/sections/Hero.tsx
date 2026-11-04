"use client";

import React from "react";
import Image from "next/image";
import { portfolioContent } from "@/data/content";
import { SplitText } from "@/components/animations/SplitText";
import { RotatingText } from "@/components/animations/RotatingText";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowDown, Code2, Sparkles, TrendingUp } from "lucide-react";

export const Hero: React.FC = () => {
  const { hero } = portfolioContent;

  const getChipIcon = (chip: string) => {
    switch (chip.toLowerCase()) {
      case "software":
        return <Code2 className="w-3.5 h-3.5" />;
      case "ia":
        return <Sparkles className="w-3.5 h-3.5" />;
      case "trading":
        return <TrendingUp className="w-3.5 h-3.5" />;
      default:
        return undefined;
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 sm:pt-28 pb-14 sm:pb-16 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center z-10">
        
        {/* Foto de perfil optimizada con marco vertical estilo Apple Studio y halo azul cielo */}
        <Reveal direction="down" duration={0.8} distance={16} className="mb-7 sm:mb-8">
          <div className="relative group">
            {/* Ambient backlight halo azul cielo */}
            <div
              className="absolute -inset-2.5 sm:-inset-3 rounded-[36px] sm:rounded-[40px] bg-gradient-to-tr from-[#0284c7] via-[#38bdf8] to-[#0369a1] opacity-40 blur-xl sm:blur-2xl group-hover:opacity-75 group-hover:blur-3xl transition-all duration-700 animate-pulse-slow pointer-events-none"
              aria-hidden="true"
            />
            
            {/* Marco de vidrio y sombras multicapa */}
            <div className="relative w-40 h-52 sm:w-52 sm:h-64 md:w-56 md:h-72 rounded-[28px] sm:rounded-[36px] p-1.5 bg-gradient-to-b from-white/25 via-white/10 to-[#0284c7]/40 shadow-2xl shadow-black/80 backdrop-blur-xl group-hover:shadow-[0_20px_50px_rgba(14,165,233,0.35)] transition-shadow duration-500">
              <div className="relative w-full h-full rounded-[22px] sm:rounded-[30px] overflow-hidden bg-[#111317]">
                <Image
                  src={hero.photo.src}
                  alt={hero.photo.alt}
                  fill
                  sizes="(max-width: 480px) 160px, (max-width: 768px) 208px, 224px"
                  priority
                  className="object-cover object-[center_18%] filter saturate-[1.03] contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Degradado sutil inferior para contraste */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Badge de disponibilidad */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#0c0e12]/95 border border-[#0284c7]/60 text-[10px] sm:text-[11px] font-mono text-[#38bdf8] shadow-[0_0_20px_rgba(14,165,233,0.3)] flex items-center gap-1.5 sm:gap-2 backdrop-blur-md whitespace-nowrap">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#38bdf8] animate-pulse" />
              <span>Andrés Cervantes · Colombia</span>
            </div>
          </div>
        </Reveal>

        {/* Nombre */}
        <Reveal direction="up" delay={0.12} duration={0.6}>
          <div className="inline-block mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm md:text-base font-mono uppercase tracking-widest text-[#38bdf8] font-semibold">
              {hero.name}
            </span>
          </div>
        </Reveal>

        {/* Frase animada principal */}
        <div className="max-w-3xl mb-3 sm:mb-4 px-2">
          <SplitText
            text={hero.animatedPhrase}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.18] sm:leading-[1.12]"
            wordClassName="text-white"
            delay={0.2}
          />
        </div>

        {/* Rotador dinámico de especialidades */}
        <Reveal direction="up" delay={0.3} duration={0.5}>
          <div className="min-h-[28px] sm:h-8 flex flex-wrap items-center justify-center text-xs sm:text-sm md:text-base text-neutral-400 font-mono mb-6 sm:mb-8 px-2">
            <span className="text-neutral-500 mr-1.5">Especializado en</span>
            <RotatingText
              words={hero.rotatingWords}
              className="text-[#38bdf8] font-semibold"
            />
          </div>
        </Reveal>

        {/* Chips */}
        <Reveal direction="up" delay={0.4} duration={0.5}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {hero.chips.map((chip) => (
              <Chip
                key={chip}
                variant="accent"
                size="md"
                icon={getChipIcon(chip)}
                className="backdrop-blur-md px-3.5 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium"
              >
                {chip}
              </Chip>
            ))}
          </div>
        </Reveal>

        {/* Botones de acción */}
        <Reveal direction="up" delay={0.5} duration={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
            <Button
              href={hero.ctaPrimary.href}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-w-[150px] font-semibold"
            >
              <span>{hero.ctaPrimary.label}</span>
              <ArrowDown className="w-4 h-4 ml-1" />
            </Button>
            <Button
              href={hero.ctaSecondary.href}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-w-[130px]"
            >
              <span>{hero.ctaSecondary.label}</span>
            </Button>
          </div>
        </Reveal>

        {/* Indicador de Scroll */}
        <Reveal direction="up" delay={0.65} duration={0.6} className="mt-10 sm:mt-16">
          <a
            href="#lo-que-me-mueve"
            className="group flex flex-col items-center text-xs font-mono text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-lg p-2"
            aria-label="Desplazarse a la siguiente sección"
          >
            <span className="tracking-widest uppercase mb-1.5 text-[11px] group-hover:text-[#38bdf8] transition-colors">
              {hero.scrollIndicatorText}
            </span>
            <div className="w-4 h-8 sm:w-5 sm:h-9 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-[#0284c7] group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all">
              <div className="w-1.5 h-2 rounded-full bg-[#38bdf8] animate-bounce" />
            </div>
          </a>
        </Reveal>

      </div>
    </section>
  );
};
