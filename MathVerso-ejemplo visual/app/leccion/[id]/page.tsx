// =============================================================================
// PANTALLA DE DETALLE DE LECCIÓN - Matemáticas en Verso
// =============================================================================
// Muestra las actividades (niveles) disponibles dentro de una lección.
// =============================================================================

"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, CheckCircle, Play, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { actividadesEjemplo } from "@/datos/actividades-ejemplo"
import type { Actividad } from "@/tipos/dominio"

export default function PantallaLeccion() {
  const router = useRouter()
  const params = useParams()
  const leccionId = params.id as string

  // En producción, esto vendría de PocketBase
  const [actividades] = useState<Actividad[]>(actividadesEjemplo.filter((a) => a.leccionId === leccionId))

  const obtenerEstadoActividad = (actividadId: string): "completada" | "en-progreso" | "bloqueada" => {
    // Simular estados
    const estados: Record<string, "completada" | "en-progreso" | "bloqueada"> = {
      "actividad-1-1-1": "completada",
      "actividad-1-1-2": "en-progreso",
      "actividad-1-1-3": "bloqueada",
      "actividad-1-1-4": "bloqueada",
    }
    return estados[actividadId] || "bloqueada"
  }

  const manejarClickActividad = (actividad: Actividad) => {
    const estado = obtenerEstadoActividad(actividad.id)
    if (estado !== "bloqueada") {
      router.push(`/actividad/${actividad.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <button onClick={() => router.back()} className="flex items-center gap-2 mb-3 hover:opacity-80">
            <ArrowLeft size={20} />
            <span>Actividad</span>
          </button>
          <h1 className="text-xl font-bold">Álgebra: Ecuaciones Cuadráticas</h1>
        </div>
      </header>

      {/* Lista de actividades (niveles) */}
      <main className="p-4 max-w-lg mx-auto">
        <div className="space-y-3">
          {actividades.map((actividad, index) => {
            const estado = obtenerEstadoActividad(actividad.id)
            const estaCompletada = estado === "completada"
            const estaEnProgreso = estado === "en-progreso"
            const estaBloqueada = estado === "bloqueada"

            return (
              <button
                key={actividad.id}
                onClick={() => manejarClickActividad(actividad)}
                disabled={estaBloqueada}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-all",
                  "border-2 shadow-sm",
                  estaCompletada && "bg-emerald-50 border-emerald-300",
                  estaEnProgreso && "bg-amber-50 border-amber-300",
                  estaBloqueada && "bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed",
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Número de nivel */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                      estaCompletada && "bg-emerald-500 text-white",
                      estaEnProgreso && "bg-amber-500 text-white",
                      estaBloqueada && "bg-slate-300 text-slate-500",
                    )}
                  >
                    {estaBloqueada ? <Lock size={16} /> : estaCompletada ? <CheckCircle size={18} /> : index + 1}
                  </div>

                  {/* Contenido */}
                  <div className="flex-1">
                    <h3 className={cn("font-semibold", estaBloqueada ? "text-slate-400" : "text-slate-800")}>
                      Nivel {index + 1}: {actividad.titulo}
                    </h3>
                    <p className="text-sm text-slate-500">{actividad.objetivo}</p>
                  </div>

                  {/* Indicador de estado */}
                  {estaEnProgreso && <Play size={20} className="text-amber-600" />}
                </div>
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}
