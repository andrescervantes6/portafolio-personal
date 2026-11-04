"use client";

import React from "react";
import { portfolioContent } from "@/data/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { IconLink } from "@/components/ui/IconLink";
import { Reveal } from "@/components/animations/Reveal";

export const Contact: React.FC = () => {
  const { contactSection } = portfolioContent;

  return (
    <section id={contactSection.id} className="py-20 sm:py-32 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal direction="up" duration={0.7}>
          <SectionTitle
            badge={contactSection.badge}
            title={contactSection.title}
            subtitle={contactSection.description}
            align="center"
          />
        </Reveal>

        {/* Magnetic Icon Links Grid */}
        <Reveal direction="up" delay={0.2} duration={0.8}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {contactSection.links.map((link) => (
              <IconLink
                key={link.id}
                name={link.name}
                href={link.href}
                icon={link.icon}
                label={link.label}
                isExternal={link.isExternal}
              />
            ))}
          </div>
        </Reveal>

        {/* Quick direct CTA */}
        <Reveal direction="up" delay={0.35} duration={0.7} className="mt-12">
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Respondo habitualmente en menos de 24 horas.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

