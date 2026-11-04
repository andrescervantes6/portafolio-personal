"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioContent } from "@/data/content";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (typeof window === "undefined") return;
      setScrolled(window.scrollY > 30);

      const sections = portfolioContent.navigation.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        if (typeof document === "undefined") continue;
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090b]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/40 py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="#inicio"
          className="group flex items-center gap-2.5 text-white font-medium text-sm tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-lg px-1.5 py-1"
          aria-label="Ir al inicio"
        >
          <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#38bdf8] group-hover:border-[#0284c7] group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] group-hover:scale-105 transition-all">
            AC
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm leading-tight text-white group-hover:text-neutral-200 transition-colors">
              Andrés Cervantes
            </span>
            <span className="text-[10px] text-neutral-400 font-mono tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
              DISPONIBLE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 bg-surface/60 border border-white/[0.06] rounded-full px-3 py-1.5 backdrop-blur-md"
          aria-label="Navegación principal"
        >
          {portfolioContent.navigation.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-[#38bdf8] bg-[#0284c7]/20 border border-[#0284c7]/40 shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            href="#contacto"
            variant="primary"
            size="sm"
            className="text-xs"
          >
            <span>Hablemos</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          className="md:hidden p-2 rounded-lg bg-surface-elevated border border-white/10 text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-[57px] bg-[#0c0e12]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl transition-all"
        >
          <nav className="flex flex-col gap-3">
            {portfolioContent.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="text-base font-medium text-neutral-300 hover:text-[#38bdf8] py-2 border-b border-white/[0.04] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3">
              <Button
                href="#contacto"
                variant="primary"
                size="md"
                className="w-full text-center"
                onClick={handleLinkClick}
              >
                <span>Hablemos</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
