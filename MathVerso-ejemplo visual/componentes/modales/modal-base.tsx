// =============================================================================
// MODAL BASE - Matemáticas en Verso
// =============================================================================
// Componente base reutilizable para todos los modales de la aplicación.
// =============================================================================

"use client"

import type React from "react"

import { useEffect, useCallback } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type TamañoModal = "xs" | "sm" | "md" | "lg" | "xl" | "full"
type ColorModal = "default" | "success" | "warning" | "error" | "info" | "purple"

interface ModalBaseProps {
  estaAbierto: boolean
  onCerrar?: () => void
  titulo?: string
  children: React.ReactNode
  tamaño?: TamañoModal
  color?: ColorModal
  mostrarCerrar?: boolean
  cerrarAlClickFuera?: boolean
  className?: string
}

const tamañoClases: Record<TamañoModal, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4",
}

const colorClases: Record<ColorModal, string> = {
  default: "bg-white",
  success: "bg-emerald-500",
  warning: "bg-amber-400",
  error: "bg-red-500",
  info: "bg-blue-500",
  purple: "bg-purple-600",
}

export function ModalBase({
  estaAbierto,
  onCerrar,
  titulo,
  children,
  tamaño = "sm",
  color = "default",
  mostrarCerrar = false,
  cerrarAlClickFuera = true,
  className,
}: ModalBaseProps) {
  // Manejar tecla Escape
  const manejarEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && estaAbierto && onCerrar) {
        onCerrar()
      }
    },
    [estaAbierto, onCerrar],
  )

  // Prevenir scroll y escuchar Escape
  useEffect(() => {
    if (estaAbierto) {
      document.addEventListener("keydown", manejarEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", manejarEscape)
      document.body.style.overflow = "unset"
    }
  }, [estaAbierto, manejarEscape])

  if (!estaAbierto) return null

  const manejarClickOverlay = () => {
    if (cerrarAlClickFuera && onCerrar) {
      onCerrar()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={manejarClickOverlay} />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full rounded-3xl shadow-2xl overflow-hidden",
          "animate-in zoom-in-95 duration-200",
          tamañoClases[tamaño],
          colorClases[color],
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titulo ? "modal-titulo" : undefined}
      >
        {/* Botón cerrar */}
        {mostrarCerrar && onCerrar && (
          <button
            onClick={onCerrar}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/20 transition-colors z-10"
            aria-label="Cerrar modal"
          >
            <X size={20} className="text-white" />
          </button>
        )}

        {/* Título */}
        {titulo && (
          <div className="p-4 border-b border-white/10">
            <h2 id="modal-titulo" className="text-xl font-bold text-white text-center">
              {titulo}
            </h2>
          </div>
        )}

        {/* Contenido */}
        {children}
      </div>
    </div>
  )
}
