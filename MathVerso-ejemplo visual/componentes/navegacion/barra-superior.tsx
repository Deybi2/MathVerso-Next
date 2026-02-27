// =============================================================================
// BARRA SUPERIOR - Matemáticas en Verso
// =============================================================================
// Muestra las estadísticas del usuario: estrellas, monedas, nivel y racha.
// =============================================================================

"use client"

import { Star, Coins, Flame, User } from "lucide-react"
import { useRouter } from "next/navigation"

interface BarraSuperiorProps {
  estrellas?: number
  monedas?: number
  nivel?: number
  racha?: number
}

export function BarraSuperior({ estrellas = 0, monedas = 0, nivel = 1, racha = 0 }: BarraSuperiorProps) {
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 z-50 shadow-md">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        {/* Racha */}
        {racha > 0 && (
          <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1 text-xs">
            <Flame size={14} className="text-orange-300" />
            <span>Racha Más Larga: {racha} días</span>
          </div>
        )}

        {/* Espaciador */}
        <div className="flex-1" />

        {/* Estadísticas */}
        <div className="flex items-center gap-4">
          {/* Estrellas / XP */}
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-300 fill-yellow-300" />
            <span className="font-semibold text-sm">{estrellas.toLocaleString()}</span>
          </div>

          {/* Monedas */}
          <div className="flex items-center gap-1">
            <Coins size={16} className="text-yellow-300" />
            <span className="font-semibold text-sm">{monedas.toLocaleString()}</span>
          </div>

          {/* Nivel */}
          <button
            onClick={() => router.push("/perfil")}
            className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1"
          >
            <User size={14} />
            <span className="text-xs font-medium">Nivel {nivel}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
