"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { portfolioContent, Project } from "@/data/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/animations/Reveal";
import {
  ExternalLink,
  Github,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Lock,
  ShoppingBag,
  Tractor,
  Truck,
  Sparkles,
} from "lucide-react";

interface FeaturedProjectProps {
  projects?: Project[];
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  projects = portfolioContent.featuredProjectSection.projects,
}) => {
  const { featuredProjectSection } = portfolioContent;
  const [activeImageIndex, setActiveImageIndex] = useState<{ [key: string]: number }>({});
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; alt: string } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectImage = (projectId: string, index: number) => {
    setActiveImageIndex((prev) => ({ ...prev, [projectId]: index }));
  };

  const getTabIcon = (index: number) => {
    switch (index) {
      case 0:
        return <ShoppingBag className="w-4 h-4" />;
      case 1:
        return <Tractor className="w-4 h-4" />;
      case 2:
        return <Truck className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id={featuredProjectSection.id} className="py-16 sm:py-28 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <Reveal direction="up" duration={0.7}>
          <SectionTitle
            badge={featuredProjectSection.badge}
            title={featuredProjectSection.title}
            subtitle={featuredProjectSection.subtitle}
          />
        </Reveal>

        <div className="flex flex-col gap-16">
          {projects.map((project, projectIndex) => {
            const currentImgIndex = activeImageIndex[project.id] ?? 0;
            const currentImage = project.images[currentImgIndex] || project.images[0];

            const handlePrev = (e: React.MouseEvent) => {
              e.stopPropagation();
              const prevIdx = (currentImgIndex - 1 + project.images.length) % project.images.length;
              handleSelectImage(project.id, prevIdx);
            };

            const handleNext = (e: React.MouseEvent) => {
              e.stopPropagation();
              const nextIdx = (currentImgIndex + 1) % project.images.length;
              handleSelectImage(project.id, nextIdx);
            };

            return (
              <Reveal
                key={project.id}
                direction="up"
                delay={projectIndex * 0.12}
                duration={0.7}
              >
                <Card
                  className="p-5 sm:p-8 md:p-10 border-white/[0.1] bg-[#0c0e12]/95 backdrop-blur-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(14,165,233,0.22)]"
                  spotlightColor="rgba(14, 165, 233, 0.16)"
                >
                  {/* Fila superior: Información del proyecto, tecnologías y botones de acción */}
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-white/[0.08]">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] font-semibold">
                          {project.tagline}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
                        {project.description}
                      </p>

                      {/* Stack de tecnologías */}
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mr-1">
                          Stack:
                        </span>
                        {project.technologies.map((tech) => (
                          <Chip
                            key={tech}
                            variant="default"
                            size="sm"
                            className="bg-white/[0.04] text-neutral-200 border-white/[0.08]"
                          >
                            {tech}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 lg:pt-0 w-full sm:w-auto">
                      <Button
                        href={project.liveUrl}
                        isExternal
                        variant="primary"
                        size="md"
                        className="font-semibold shadow-lg shadow-[#0284c7]/30 hover:shadow-[0_0_25px_rgba(56,189,248,0.45)] w-full sm:w-auto"
                      >
                        <span>Ver {project.title} en vivo</span>
                        <ExternalLink className="w-4 h-4 ml-1.5" />
                      </Button>
                      <Button
                        href={project.githubUrl}
                        isExternal
                        variant="secondary"
                        size="md"
                        className="w-full sm:w-auto"
                      >
                        <Github className="w-4 h-4 mr-1.5" />
                        <span>Ver código</span>
                      </Button>
                    </div>
                  </div>

                  {/* Selector interactivo de vistas del ecosistema */}
                  <div className="pt-6 sm:pt-8 pb-5 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                        Vistas de la plataforma ({currentImgIndex + 1}/{project.images.length}):
                      </span>
                      <span className="text-xs text-[#38bdf8] font-mono">
                        {currentImage.description}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {project.images.map((img, idx) => {
                        const isSelected = idx === currentImgIndex;
                        return (
                          <button
                            key={img.src}
                            onClick={() => handleSelectImage(project.id, idx)}
                            className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 ${
                              isSelected
                                ? "bg-[#0284c7]/15 border-[#38bdf8]/60 text-white shadow-lg shadow-[#0284c7]/25"
                                : "bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.05] hover:border-white/15"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-[#0284c7] text-white shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                                  : "bg-white/[0.05] text-neutral-400"
                              }`}
                            >
                              {getTabIcon(idx)}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-semibold truncate leading-tight">
                                {img.title}
                              </span>
                              <span className="text-[10px] font-mono text-neutral-500 truncate">
                                {img.badge}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lienzo del Navegador macOS para mostrar la captura */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#14171f] shadow-2xl group">
                    
                    {/* Barra de título del navegador macOS */}
                    <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#0d0f14] border-b border-white/[0.08] select-none">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
                      </div>

                      {/* URL dinámica de la vista activa */}
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-md bg-[#161920] border border-white/[0.06] text-[10px] sm:text-[11px] font-mono text-neutral-300 max-w-[200px] sm:max-w-sm w-full mx-2 sm:mx-4 justify-center">
                        <Lock className="w-3 h-3 text-[#38bdf8] flex-shrink-0" />
                        <span className="truncate">https://{currentImage.urlPath}</span>
                      </div>

                      {/* Botón para ampliar / Lightbox */}
                      <button
                        onClick={() =>
                          setLightboxImage({
                            src: currentImage.src,
                            title: currentImage.title,
                            alt: currentImage.alt,
                          })
                        }
                        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white text-xs font-medium transition-colors"
                        title="Ver en resolución completa"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-[11px]">Ampliar</span>
                      </button>
                    </div>

                    {/* Contenedor de la captura con proporción nativa (1855x995) y tamaños optimizados */}
                    <div
                      onClick={() =>
                        setLightboxImage({
                          src: currentImage.src,
                          title: currentImage.title,
                          alt: currentImage.alt,
                        })
                      }
                      className="relative w-full aspect-[1855/995] bg-[#fbfaf5] cursor-zoom-in overflow-hidden"
                    >
                      <Image
                        src={currentImage.src}
                        alt={currentImage.alt}
                        fill
                        priority={projectIndex === 0 && currentImgIndex === 0}
                        sizes="(max-width: 480px) 340px, (max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
                        className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.01]"
                      />

                      {/* Flechas de navegación rápida en la imagen */}
                      <button
                        onClick={handlePrev}
                        aria-label="Captura anterior"
                        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0c0e12]/80 hover:bg-[#0c0e12] border border-white/20 text-white flex items-center justify-center opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 shadow-xl backdrop-blur-md"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={handleNext}
                        aria-label="Siguiente captura"
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0c0e12]/80 hover:bg-[#0c0e12] border border-white/20 text-white flex items-center justify-center opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 shadow-xl backdrop-blur-md"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    {/* Pie del marco con indicadores */}
                    <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#0d0f14] border-t border-white/[0.06] text-xs text-neutral-400">
                      <span className="font-mono text-[10px] sm:text-[11px] text-neutral-400 truncate max-w-[200px] sm:max-w-none">
                        {currentImage.title} — {currentImage.badge}
                      </span>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {project.images.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => handleSelectImage(project.id, dotIdx)}
                            aria-label={`Ir a captura ${dotIdx + 1}`}
                            className={`h-2 rounded-full transition-all ${
                              dotIdx === currentImgIndex
                                ? "w-5 sm:w-6 bg-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                                : "w-2 bg-white/20 hover:bg-white/40"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal para inspeccionar la interfaz en alta resolución */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-center items-center p-3 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div className="w-full max-w-6xl flex items-center justify-between pb-3 text-white">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold truncate max-w-[220px] sm:max-w-none">{lightboxImage.title}</span>
              <span className="text-[10px] sm:text-xs font-mono text-neutral-400">• Cultivus</span>
            </div>
            <button
              onClick={() => setLightboxImage(null)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white transition-colors"
              aria-label="Cerrar vista completa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative w-full max-w-6xl aspect-[1855/995] rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-[#fbfaf5]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-contain"
            />
          </div>
          <span className="text-[11px] text-neutral-400 font-mono mt-3">
            Toca afuera o presiona ESC para cerrar
          </span>
        </div>
      )}
    </section>
  );
};
