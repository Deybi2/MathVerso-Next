// =============================================================================
// MODAL NIVEL COMPLETADO - Matemáticas en Verso
// =============================================================================
// Modal que se muestra cuando el usuario completa todos los ejercicios
// de un nivel/actividad. Fondo morado con resumen de logros.
// =============================================================================

"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star, Coins, BookOpen } from "lucide-react"

interface ModalNivelCompletadoProps {
  estaAbierto: boolean
  onContinuar: () => void
  xpGanado?: number
  monedasGanadas?: number
  poemasGanados?: number
}

export function ModalNivelCompletado({
  estaAbierto,
  onContinuar,
  xpGanado = 75,
  monedasGanadas = 20,
  poemasGanados = 1,
}: ModalNivelCompletadoProps) {
  useEffect(() => {
    if (estaAbierto) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [estaAbierto])

  if (!estaAbierto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-purple-600 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Contenido */}
        <div className="p-8 text-center text-white">
          {/* Título */}
          <h2 className="text-2xl font-bold text-amber-300 mb-2">¡Nivel Completado!</h2>
          <p className="text-purple-200 mb-6">Has superado el desafío</p>

          {/* Estadísticas */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3">
              <span className="flex items-center gap-2">
                <Star size={18} className="text-amber-300" />
                <span>XP-Totales Ganados:</span>
              </span>
              <span className="font-bold text-amber-300">{xpGanado}</span>
            </div>

            <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3">
              <span className="flex items-center gap-2">
                <Coins size={18} className="text-amber-300" />
                <span>Monedas Recolectadas:</span>
              </span>
              <span className="font-bold text-amber-300">{monedasGanadas}</span>
            </div>

            <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3">
              <span className="flex items-center gap-2">
                <BookOpen size={18} className="text-amber-300" />
                <span>Poemas Ganados:</span>
              </span>
              <span className="font-bold text-amber-300">{poemasGanados}</span>
            </div>
          </div>

          {/* Botón continuar */}
          <Button
            onClick={onContinuar}
            className="w-full py-6 text-lg font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-xl"
          >
            Continuar mi Camino
          </Button>
        </div>
      </div>
    </div>
  )
}
