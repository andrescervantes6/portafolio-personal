import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { QuickFacts } from "@/components/sections/QuickFacts";
import { Passions } from "@/components/sections/Passions";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { TradingJourney } from "@/components/sections/TradingJourney";
import { Principles } from "@/components/sections/Principles";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { Background } from "@/components/animations/Background";
import { portfolioContent } from "@/data/content";

/* 
 * Preparado para cuando se active la sección de Servicios:
 * import { Services } from "@/components/sections/Services";
 */

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Sutil background animado con degradados y partículas (desactivable en móvil) */}
      <Background />

      {/* Barra de navegación superior fija */}
      <Navbar />

      {/* Contenido principal en orden */}
      <main className="flex flex-col w-full">
        <Hero />
        <QuickFacts />
        <Passions />
        <FeaturedProject />
        <TradingJourney />
        <Principles />

        {/* 
          * Espacio preparado para futura sección de Servicios:
          * {portfolioContent.servicesSection.enabled && <Services />}
          */}

        <Contact />
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}

