// =============================================================================
// PANTALLA DE DETALLE DE CATEGORÍA - Matemáticas en Verso
// =============================================================================
// Muestra las lecciones disponibles dentro de una categoría.
// =============================================================================

"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, CheckCircle, Clock, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { leccionesEjemplo } from "@/datos/lecciones-ejemplo"
import type { Leccion } from "@/tipos/dominio"

export default function PantallaCategoria() {
  const router = useRouter()
  const params = useParams()
  const categoriaId = params.id as string

  // En producción, esto vendría de PocketBase
  const [lecciones] = useState<Leccion[]>(leccionesEjemplo.filter((l) => l.categoriaId === categoriaId))

  const obtenerEstadoLeccion = (leccionId: string): "completada" | "en-progreso" | "bloqueada" => {
    // Simular estados - en producción vendría del progreso del usuario
    const estados: Record<string, "completada" | "en-progreso" | "bloqueada"> = {
      "leccion-1-1": "completada",
      "leccion-1-2": "completada",
      "leccion-1-3": "en-progreso",
      "leccion-1-4": "bloqueada",
    }
    return estados[leccionId] || "bloqueada"
  }

  const manejarClickLeccion = (leccion: Leccion) => {
    const estado = obtenerEstadoLeccion(leccion.id)
    if (estado !== "bloqueada") {
      router.push(`/leccion/${leccion.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <button onClick={() => router.push("/mapa")} className="flex items-center gap-2 mb-3 hover:opacity-80">
            <ArrowLeft size={20} />
            <span>Lecciones</span>
          </button>
          <h1 className="text-xl font-bold">Estructuras y Relaciones Numéricas</h1>
        </div>
      </header>

      {/* Lista de lecciones */}
      <main className="p-4 max-w-lg mx-auto">
        <div className="space-y-3">
          {lecciones.map((leccion) => {
            const estado = obtenerEstadoLeccion(leccion.id)
            const estaCompletada = estado === "completada"
            const estaEnProgreso = estado === "en-progreso"
            const estaBloqueada = estado === "bloqueada"

            return (
              <button
                key={leccion.id}
                onClick={() => manejarClickLeccion(leccion)}
                disabled={estaBloqueada}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-all",
                  "border-2 shadow-sm",
                  estaCompletada && "bg-emerald-50 border-emerald-300",
                  estaEnProgreso && "bg-amber-50 border-amber-300",
                  estaBloqueada && "bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{leccion.metadata.icono}</span>
                      <h3 className={cn("font-semibold", estaBloqueada ? "text-slate-400" : "text-slate-800")}>
                        {leccion.titulo}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-1">{leccion.descripcion}</p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <BookOpen size={12} />
                        {leccion.actividades.length} actividades
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {leccion.metadata.duracionEstimada} min
                      </span>
                    </div>
                  </div>

                  {/* Estado */}
                  <div className="ml-3">
                    {estaCompletada && <CheckCircle className="text-emerald-500" size={24} />}
                    {estaEnProgreso && (
                      <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">En progreso</span>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}
