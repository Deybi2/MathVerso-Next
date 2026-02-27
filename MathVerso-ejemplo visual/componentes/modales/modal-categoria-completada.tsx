// =============================================================================
// MODAL CATEGORÍA COMPLETADA - Matemáticas en Verso
// =============================================================================
// Modal que se muestra cuando el usuario completa todas las lecciones
// de una categoría (año escolar). Celebración especial.
// =============================================================================

"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ModalCategoriaCompletadaProps {
  estaAbierto: boolean
  onContinuar: () => void
  nombreCategoria: string
  mensaje?: string
}

export function ModalCategoriaCompletada({
  estaAbierto,
  onContinuar,
  nombreCategoria = "Estructuras y Relaciones Numéricas",
  mensaje = "Eres un verdadero Constructor Numérico",
}: ModalCategoriaCompletadaProps) {
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
          <h2 className="text-2xl font-bold text-amber-300 mb-2">¡Año Completado!</h2>

          {/* Mensaje */}
          <div className="mb-6">
            <p className="text-purple-200 mb-2">Has forjado tu camino a través de</p>
            <h3 className="text-xl font-bold text-amber-300">{nombreCategoria}</h3>
          </div>

          {/* Logro */}
          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <p className="text-purple-100 italic">{mensaje}</p>
          </div>

          {/* Botón */}
          <Button
            onClick={onContinuar}
            className="w-full py-6 text-lg font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-xl"
          >
            Explorar Nuevos Desafíos
          </Button>
        </div>
      </div>
    </div>
  )
}
