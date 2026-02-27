// =============================================================================
// PANTALLA DE MISIONES DIARIAS - Matemáticas en Verso
// =============================================================================
// Muestra las misiones diarias del usuario con sus recompensas.
// =============================================================================

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Target, Coins, Star, CheckCircle, Clock, Zap, Trophy, Flame, Award } from "lucide-react"
import { BarraInferior } from "@/componentes/navegacion/barra-inferior"
import { useAplicacion } from "@/contextos/contexto-aplicacion"
import { cn } from "@/lib/utils"

export default function PantallaMisiones() {
  const router = useRouter()
  const { estado, dispatch } = useAplicacion()

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!estado.usuarioActual) {
      router.push("/bienvenida")
    }
  }, [estado.usuarioActual, router])

  // Generar misiones si no existen
  useEffect(() => {
    if (estado.misionesDiarias.length === 0) {
      dispatch({ type: "GENERAR_MISIONES_DIARIAS" })
    }
  }, [estado.misionesDiarias.length, dispatch])

  const reclamarRecompensa = (misionId: string) => {
    const mision = estado.misionesDiarias.find((m) => m.id === misionId)
    if (!mision || !mision.completada) return

    // La recompensa ya se aplica en el reducer al marcar como completada
    dispatch({ type: "COMPLETAR_MISION", payload: misionId })
  }

  const obtenerIconoMision = (tipo: string) => {
    switch (tipo) {
      case "ejercicios":
        return <Target size={24} className="text-blue-500" />
      case "tiempo":
        return <Clock size={24} className="text-purple-500" />
      case "racha":
        return <Flame size={24} className="text-orange-500" />
      case "perfecto":
        return <Award size={24} className="text-yellow-500" />
      default:
        return <Trophy size={24} className="text-emerald-500" />
    }
  }

  const obtenerColorFondo = (tipo: string) => {
    switch (tipo) {
      case "ejercicios":
        return "bg-blue-100"
      case "tiempo":
        return "bg-purple-100"
      case "racha":
        return "bg-orange-100"
      case "perfecto":
        return "bg-yellow-100"
      default:
        return "bg-emerald-100"
    }
  }

  if (!estado.usuarioActual) {
    return null
  }

  const misionesCompletadas = estado.misionesDiarias.filter((m) => m.completada).length
  const totalMisiones = estado.misionesDiarias.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700">
      {/* Header */}
      <header className="sticky top-0 bg-indigo-700/90 backdrop-blur-sm border-b border-indigo-500 z-10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => router.push("/mapa")} className="p-2 hover:bg-indigo-600 rounded-full">
              <ArrowLeft size={24} className="text-white" />
            </button>
            <div className="flex items-center gap-2">
              <Target size={20} className="text-amber-300" />
              <h1 className="font-serif text-xl font-bold text-white italic">Misiones Diarias</h1>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4 pb-24">
        {/* Resumen de progreso */}
        <div className="bg-white/10 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium">Progreso del día</span>
            <span className="text-white/80 text-sm">
              {misionesCompletadas}/{totalMisiones} completadas
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-amber-400 to-yellow-300 h-3 rounded-full transition-all duration-500"
              style={{ width: totalMisiones > 0 ? `${(misionesCompletadas / totalMisiones) * 100}%` : "0%" }}
            />
          </div>
          {misionesCompletadas === totalMisiones && totalMisiones > 0 && (
            <div className="mt-3 flex items-center gap-2 text-amber-300">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">¡Todas las misiones completadas!</span>
            </div>
          )}
        </div>

        {/* Recompensas totales del día */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star size={18} className="text-amber-500" />
              <span className="font-bold text-slate-800">
                {estado.misionesDiarias.reduce((acc, m) => acc + (m.completada ? m.recompensaXP : 0), 0)}
              </span>
            </div>
            <p className="text-slate-500 text-xs">XP ganado hoy</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Coins size={18} className="text-amber-500" />
              <span className="font-bold text-slate-800">
                {estado.misionesDiarias.reduce((acc, m) => acc + (m.completada ? m.recompensaMonedas : 0), 0)}
              </span>
            </div>
            <p className="text-slate-500 text-xs">Monedas ganadas</p>
          </div>
        </div>

        {/* Lista de misiones */}
        <div className="space-y-3">
          {estado.misionesDiarias.map((mision) => (
            <div
              key={mision.id}
              className={cn("bg-white rounded-xl p-4 transition-all", mision.completada && "ring-2 ring-emerald-400")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    obtenerColorFondo(mision.tipo),
                  )}
                >
                  {mision.completada ? (
                    <CheckCircle size={24} className="text-emerald-500" />
                  ) : (
                    obtenerIconoMision(mision.tipo)
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={cn("font-bold text-slate-800", mision.completada && "text-emerald-600")}>
                    {mision.titulo}
                  </h3>
                  <p className="text-slate-500 text-sm">{mision.descripcion}</p>

                  {/* Barra de progreso */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400">Progreso</span>
                      <span className="text-slate-600 font-medium">
                        {mision.progresoActual}/{mision.objetivo}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          mision.completada ? "bg-emerald-500" : "bg-indigo-500",
                        )}
                        style={{ width: `${Math.min((mision.progresoActual / mision.objetivo) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Recompensas */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1 text-xs">
                      <Star size={14} className="text-amber-500" />
                      <span className="text-slate-600">+{mision.recompensaXP} XP</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Coins size={14} className="text-amber-500" />
                      <span className="text-slate-600">+{mision.recompensaMonedas}</span>
                    </div>
                  </div>
                </div>

                {/* Botón de reclamar */}
                {mision.progresoActual >= mision.objetivo && !mision.completada && (
                  <button
                    onClick={() => reclamarRecompensa(mision.id)}
                    className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Zap size={14} />
                    Reclamar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay misiones */}
        {estado.misionesDiarias.length === 0 && (
          <div className="text-center py-12">
            <Target size={48} className="mx-auto text-white/30 mb-4" />
            <p className="text-white/60">Cargando misiones...</p>
          </div>
        )}

        {/* Información adicional */}
        <div className="mt-6 bg-white/10 rounded-xl p-4">
          <h3 className="text-white font-medium mb-2">Sobre las misiones</h3>
          <ul className="text-white/70 text-sm space-y-1">
            <li>• Las misiones se renuevan cada día a medianoche</li>
            <li>• Completa ejercicios para avanzar en tus misiones</li>
            <li>• Las recompensas se suman automáticamente al completar</li>
          </ul>
        </div>
      </main>

      <BarraInferior />
    </div>
  )
}
