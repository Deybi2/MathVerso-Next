// =============================================================================
// TARJETA DE CATEGORÍA - Matemáticas en Verso
// =============================================================================
// Componente que muestra una categoría (año escolar) en el mapa.
// =============================================================================

"use client"

import { Lock, CheckCircle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Categoria } from "@/tipos/dominio"

interface TarjetaCategoriaProps {
  categoria: Categoria
  progreso: number // Porcentaje de 0 a 100
  estaDesbloqueada: boolean
  estaCompletada: boolean
  onClick: () => void
}

export function TarjetaCategoria({
  categoria,
  progreso,
  estaDesbloqueada,
  estaCompletada,
  onClick,
}: TarjetaCategoriaProps) {
  return (
    <button
      onClick={onClick}
      disabled={!estaDesbloqueada}
      className={cn(
        "w-full p-4 rounded-xl text-left transition-all duration-200",
        "border-2 shadow-md",
        estaDesbloqueada
          ? "bg-white hover:shadow-lg hover:scale-[1.02] cursor-pointer"
          : "bg-slate-100 cursor-not-allowed opacity-60",
        estaCompletada ? "border-emerald-400" : "border-slate-200",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Contenido principal */}
        <div className="flex-1">
          {/* Icono y estado */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{categoria.metadata.icono}</span>
            {estaCompletada && <CheckCircle size={16} className="text-emerald-500" />}
            {!estaDesbloqueada && <Lock size={16} className="text-slate-400" />}
          </div>

          {/* Título */}
          <h3 className={cn("font-bold text-lg mb-1", estaDesbloqueada ? "text-slate-800" : "text-slate-500")}>
            {categoria.titulo}
          </h3>

          {/* Descripción */}
          <p className="text-sm text-slate-500 line-clamp-2">{categoria.descripcion}</p>

          {/* Barra de progreso */}
          {estaDesbloqueada && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Progreso</span>
                <span>{Math.round(progreso)}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progreso}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Flecha */}
        {estaDesbloqueada && (
          <ChevronRight size={24} className={cn("text-slate-400 mt-2", estaCompletada && "text-emerald-500")} />
        )}
      </div>

      {/* Estadísticas de la categoría */}
      {estaDesbloqueada && (
        <div className="flex gap-4 mt-3 pt-3 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{categoria.estadisticas.leccionesTotales}</span> Lecciones
          </div>
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{categoria.estadisticas.ejerciciosTotales}</span> Ejercicios
          </div>
        </div>
      )}
    </button>
  )
}
