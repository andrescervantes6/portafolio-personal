import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08090b] text-[#f4f5f7] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md w-full bg-[#111317] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
        <span className="text-5xl font-extrabold text-[#38bdf8] font-mono block mb-3">404</span>
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Página no encontrada
        </h1>
        <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
          La ruta que intentas visitar no existe o ha sido reubicada.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-lg shadow-[#0284c7]/30 transition-all active:scale-95 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Volver al portafolio</span>
        </Link>
      </div>
    </div>
  );
}

