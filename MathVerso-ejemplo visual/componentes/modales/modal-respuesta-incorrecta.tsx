// =============================================================================
// MODAL RESPUESTA INCORRECTA - Matemáticas en Verso
// =============================================================================
// Modal que se muestra cuando el usuario responde incorrectamente.
// Fondo amarillo/dorado con explicación y opción de reintentar.
// =============================================================================

"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ModalRespuestaIncorrectaProps {
  estaAbierto: boolean
  onReintentar: () => void
  explicacion: string
  respuestaCorrecta?: string
}

export function ModalRespuestaIncorrecta({
  estaAbierto,
  onReintentar,
  explicacion,
  respuestaCorrecta,
}: ModalRespuestaIncorrectaProps) {
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
      <div className="relative w-full max-w-sm bg-amber-400 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Contenido */}
        <div className="p-6 text-center">
          {/* Título */}
          <h2 className="text-2xl font-bold text-red-600 mb-2">¡Revisa tu Método!</h2>

          {/* Respuesta correcta */}
          {respuestaCorrecta && (
            <p className="text-slate-700 text-sm mb-4">La respuesta correcta era: {respuestaCorrecta}</p>
          )}

          {/* Explicación */}
          <div className="bg-white/80 rounded-xl p-4 mb-6 text-left">
            <p className="text-slate-700 text-sm leading-relaxed">{explicacion}</p>
          </div>

          {/* Botón reintentar */}
          <Button
            onClick={onReintentar}
            className="w-full py-6 text-lg font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
          >
            Reintentar
          </Button>
        </div>
      </div>
    </div>
  )
}
