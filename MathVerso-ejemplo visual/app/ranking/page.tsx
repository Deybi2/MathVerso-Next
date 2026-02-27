// =============================================================================
// PANTALLA DEL RANKING - Matemáticas en Verso
// =============================================================================
// Muestra la tabla de clasificación con los mejores jugadores.
// =============================================================================

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trophy, Medal, Star, Flame, Crown } from "lucide-react"
import { BarraInferior } from "@/componentes/navegacion/barra-inferior"
import { jugadoresRankingEjemplo, rankingSemanal, rankingMensual } from "@/datos/ranking-ejemplo"
import { cn } from "@/lib/utils"
import type { JugadorRanking } from "@/tipos/ranking"

type TipoRanking = "global" | "semanal" | "mensual"

const pestanasRanking = [
  { id: "global" as TipoRanking, etiqueta: "Global" },
  { id: "semanal" as TipoRanking, etiqueta: "Semanal" },
  { id: "mensual" as TipoRanking, etiqueta: "Mensual" },
]

export default function PantallaRanking() {
  const router = useRouter()
  const [tipoRanking, setTipoRanking] = useState<TipoRanking>("global")

  const obtenerJugadores = (): JugadorRanking[] => {
    switch (tipoRanking) {
      case "semanal":
        return rankingSemanal
      case "mensual":
        return rankingMensual
      default:
        return jugadoresRankingEjemplo
    }
  }

  const jugadores = obtenerJugadores()

  const obtenerIconoPosicion = (posicion: number) => {
    switch (posicion) {
      case 1:
        return <Crown size={20} className="text-amber-500" />
      case 2:
        return <Medal size={20} className="text-slate-400" />
      case 3:
        return <Medal size={20} className="text-amber-700" />
      default:
        return <span className="text-slate-500 font-bold text-sm">{posicion}</span>
    }
  }

  const obtenerColorFondo = (posicion: number, esUsuarioActual: boolean) => {
    if (esUsuarioActual) return "bg-emerald-100 border-emerald-300"
    switch (posicion) {
      case 1:
        return "bg-amber-50 border-amber-200"
      case 2:
        return "bg-slate-50 border-slate-200"
      case 3:
        return "bg-orange-50 border-orange-200"
      default:
        return "bg-white border-slate-100"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-600 to-teal-700">
      {/* Header */}
      <header className="sticky top-0 bg-teal-700/90 backdrop-blur-sm border-b border-teal-500 z-10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => router.push("/mapa")} className="p-2 hover:bg-teal-600 rounded-full">
              <ArrowLeft size={24} className="text-white" />
            </button>
            <div className="flex items-center gap-2">
              <Trophy size={20} className="text-amber-300" />
              <h1 className="font-serif text-xl font-bold text-white italic">Maestros del Verso Numérico</h1>
            </div>
            <div className="w-10" />
          </div>

          {/* Pestañas de tipo de ranking */}
          <div className="flex gap-2">
            {pestanasRanking.map((pestana) => (
              <button
                key={pestana.id}
                onClick={() => setTipoRanking(pestana.id)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                  tipoRanking === pestana.id ? "bg-white text-teal-700" : "bg-teal-800 text-white hover:bg-teal-600",
                )}
              >
                {pestana.etiqueta}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Lista de jugadores */}
      <main className="max-w-lg mx-auto px-4 py-4 pb-24">
        {/* Top 3 destacados */}
        {jugadores.length >= 3 && (
          <div className="flex justify-center items-end gap-3 mb-6">
            {/* Segundo lugar */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-2 border-4 border-slate-400">
                <span className="text-2xl font-bold text-slate-600">{jugadores[1].nombreUsuario.charAt(0)}</span>
              </div>
              <Medal size={24} className="text-slate-400 mb-1" />
              <p className="text-white text-xs font-medium truncate max-w-[80px]">{jugadores[1].nombreUsuario}</p>
              <p className="text-amber-300 text-xs">{jugadores[1].experienciaTotal} XP</p>
            </div>

            {/* Primer lugar */}
            <div className="flex flex-col items-center -mt-6">
              <div className="w-20 h-20 rounded-full bg-amber-200 flex items-center justify-center mb-2 border-4 border-amber-400 shadow-lg">
                <span className="text-3xl font-bold text-amber-700">{jugadores[0].nombreUsuario.charAt(0)}</span>
              </div>
              <Crown size={28} className="text-amber-400 mb-1" />
              <p className="text-white text-sm font-bold truncate max-w-[90px]">{jugadores[0].nombreUsuario}</p>
              <p className="text-amber-300 text-sm font-bold">{jugadores[0].experienciaTotal} XP</p>
            </div>

            {/* Tercer lugar */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center mb-2 border-4 border-orange-400">
                <span className="text-2xl font-bold text-orange-700">{jugadores[2].nombreUsuario.charAt(0)}</span>
              </div>
              <Medal size={24} className="text-amber-700 mb-1" />
              <p className="text-white text-xs font-medium truncate max-w-[80px]">{jugadores[2].nombreUsuario}</p>
              <p className="text-amber-300 text-xs">{jugadores[2].experienciaTotal} XP</p>
            </div>
          </div>
        )}

        {/* Lista completa */}
        <div className="space-y-2">
          {jugadores.map((jugador) => (
            <div
              key={jugador.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border-2 transition-all",
                obtenerColorFondo(jugador.posicion, jugador.esUsuarioActual || false),
              )}
            >
              {/* Posición */}
              <div className="w-8 h-8 flex items-center justify-center">{obtenerIconoPosicion(jugador.posicion)}</div>

              {/* Avatar */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  jugador.esUsuarioActual ? "bg-emerald-500 text-white" : "bg-teal-100 text-teal-700",
                )}
              >
                <span className="font-bold">{jugador.nombreUsuario.charAt(0)}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "font-medium truncate",
                      jugador.esUsuarioActual ? "text-emerald-700" : "text-slate-800",
                    )}
                  >
                    {jugador.nombreUsuario}
                  </p>
                  {jugador.esUsuarioActual && (
                    <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">Tú</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-amber-500" />
                    Nivel {jugador.nivel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame size={12} className="text-orange-500" />
                    {jugador.rachaActual}
                  </span>
                </div>
              </div>

              {/* XP */}
              <div className="text-right">
                <p className="font-bold text-amber-600">{jugador.experienciaTotal}</p>
                <p className="text-xs text-slate-400">XP</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BarraInferior />
    </div>
  )
}
