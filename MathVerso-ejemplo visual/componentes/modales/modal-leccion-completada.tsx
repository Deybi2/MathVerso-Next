// =============================================================================
// MODAL LECCIÓN COMPLETADA - Matemáticas en Verso
// =============================================================================
// Modal que se muestra cuando el usuario completa una lección completa.
// Fondo morado con lista de niveles completados.
// =============================================================================

"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface NivelCompletado {
  nombre: string
  completado: boolean
}

interface ModalLeccionCompletadaProps {
  estaAbierto: boolean
  onContinuar: () => void
  nombreLeccion: string
  nombreCategoria: string
  nivelesCompletados?: NivelCompletado[]
}

export function ModalLeccionCompletada({
  estaAbierto,
  onContinuar,
  nombreLeccion = "Estadística y Probabilidad",
  nombreCategoria = "El Azar del Ensamblaje",
  nivelesCompletados = [
    { nombre: "Nivel 1: Números que Cuentan Historias", completado: true },
    { nombre: "Nivel 2: La Probabilidad del Siguiente Paso", completado: true },
  ],
}: ModalLeccionCompletadaProps) {
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
        <div className="p-6 text-center text-white">
          {/* Título */}
          <h2 className="text-xl font-bold text-amber-300 mb-1">¡Lección Completada!</h2>
          <p className="text-purple-200 text-sm mb-4">Has dominado</p>

          {/* Nombre de la categoría y lección */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-amber-300">{nombreLeccion}:</h3>
            <p className="text-purple-100">{nombreCategoria}</p>
          </div>

          {/* Lista de niveles */}
          <div className="bg-white/10 rounded-xl p-4 mb-6 text-left space-y-2">
            {nivelesCompletados.map((nivel, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle size={16} className={nivel.completado ? "text-emerald-400" : "text-purple-400"} />
                <span className="text-sm">{nivel.nombre}</span>
              </div>
            ))}
          </div>

          {/* Botón */}
          <Button
            onClick={onContinuar}
            className="w-full py-5 text-lg font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-xl"
          >
            Explorar Nuevos Desafíos
          </Button>
        </div>
      </div>
    </div>
  )
}
