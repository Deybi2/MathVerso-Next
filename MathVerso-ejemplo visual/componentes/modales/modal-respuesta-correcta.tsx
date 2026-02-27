// =============================================================================
// MODAL RESPUESTA CORRECTA - Matemáticas en Verso
// =============================================================================
// Modal que se muestra cuando el usuario responde correctamente un ejercicio.
// Fondo verde con mensaje de celebración.
// =============================================================================

"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface ModalRespuestaCorrectaProps {
  estaAbierto: boolean
  onContinuar: () => void
  puntuacion?: number
  mensaje?: string
}

export function ModalRespuestaCorrecta({
  estaAbierto,
  onContinuar,
  puntuacion = 15,
  mensaje = "¡Solución Brillante!",
}: ModalRespuestaCorrectaProps) {
  // Prevenir scroll del body cuando el modal está abierto
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
      <div className="relative w-full max-w-sm bg-emerald-500 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Contenido */}
        <div className="p-8 text-center text-white">
          {/* Título */}
          <h2 className="text-3xl font-bold mb-4">{mensaje}</h2>

          {/* Puntuación */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-amber-300 font-semibold">Respuesta Correcta</span>
            <span className="flex items-center gap-1 text-amber-300">
              +{puntuacion} <Star size={16} className="fill-amber-300" />
            </span>
          </div>

          {/* Botón continuar */}
          <Button
            onClick={onContinuar}
            className="w-full py-6 text-lg font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-xl"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}
