"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("Application Error caught by error.tsx boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#08090b] text-[#f4f5f7] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md w-full bg-[#111317] border border-red-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-5 text-red-400">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Algo no cargó correctamente
        </h1>

        <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
          Ocurrió un problema al renderizar este componente en tu dispositivo.
        </p>

        {/* Mensaje de error legible */}
        <div className="bg-[#090a0d] border border-white/10 rounded-xl p-3.5 mb-6 text-left overflow-x-auto text-xs font-mono text-red-300/90 max-h-36 overflow-y-auto">
          <div className="font-semibold text-neutral-300 mb-1">Detalle del error:</div>
          <div>{error.message || "Error desconocido de renderizado"}</div>
          {error.digest && (
            <div className="text-[10px] text-neutral-500 mt-1">Digest: {error.digest}</div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-lg shadow-[#0284c7]/25 transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar carga</span>
          </button>

          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white text-xs font-medium border border-white/10 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Recargar inicio</span>
          </a>
        </div>
      </div>
    </div>
  );
}

