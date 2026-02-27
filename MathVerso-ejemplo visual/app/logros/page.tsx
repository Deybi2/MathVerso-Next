// =============================================================================
// PANTALLA DE LOGROS - Matemáticas en Verso
// =============================================================================
// Muestra los logros desbloqueados y pendientes en un grid visual.
// =============================================================================

"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trophy, Lock, Star, Coins } from "lucide-react"
import { BarraInferior } from "@/componentes/navegacion/barra-inferior"
import { logrosDefinidos, logrosUsuarioEjemplo } from "@/datos/logros-ejemplo"
import { cn } from "@/lib/utils"
import type { LogroDefinido, LogroUsuario } from "@/tipos/logros"

type FiltroLogros = "todos" | "desbloqueados" | "pendientes"

export default function PantallaLogros() {
  const router = useRouter()
  const [filtro, setFiltro] = useState<FiltroLogros>("todos")
  const [logroSeleccionado, setLogroSeleccionado] = useState<{
    logro: LogroDefinido
    estado: LogroUsuario | undefined
  } | null>(null)

  const logrosConEstado = useMemo(() => {
    return logrosDefinidos.map((logro) => {
      const estado = logrosUsuarioEjemplo.find((l) => l.logroId === logro.id)
      return { logro, estado }
    })
  }, [])

  const logrosFiltrados = useMemo(() => {
    switch (filtro) {
      case "desbloqueados":
        return logrosConEstado.filter((l) => l.estado?.desbloqueado)
      case "pendientes":
        return logrosConEstado.filter((l) => !l.estado?.desbloqueado)
      default:
        return logrosConEstado
    }
  }, [logrosConEstado, filtro])

  const estadisticas = useMemo(() => {
    const desbloqueados = logrosConEstado.filter((l) => l.estado?.desbloqueado).length
    return {
      total: logrosConEstado.length,
      desbloqueados,
      porcentaje: Math.round((desbloqueados / logrosConEstado.length) * 100),
    }
  }, [logrosConEstado])

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-600 to-violet-700">
      {/* Header */}
      <header className="sticky top-0 bg-violet-700/90 backdrop-blur-sm border-b border-violet-500 z-10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => router.push("/mapa")} className="p-2 hover:bg-violet-600 rounded-full">
              <ArrowLeft size={24} className="text-white" />
            </button>
            <div className="flex items-center gap-2">
              <Trophy size={20} className="text-amber-300" />
              <h1 className="font-serif text-xl font-bold text-white">Logros</h1>
            </div>
            <div className="flex items-center gap-1 bg-violet-800 px-3 py-1 rounded-full">
              <span className="text-amber-300 font-bold text-sm">{estadisticas.desbloqueados}</span>
              <span className="text-violet-300 text-xs">/{estadisticas.total}</span>
            </div>
          </div>

          {/* Barra de progreso general */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-violet-200 mb-1">
              <span>Progreso total</span>
              <span>{estadisticas.porcentaje}%</span>
            </div>
            <div className="w-full bg-violet-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all"
                style={{ width: `${estadisticas.porcentaje}%` }}
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-2">
            {[
              { id: "todos" as FiltroLogros, etiqueta: "Todos" },
              { id: "desbloqueados" as FiltroLogros, etiqueta: "Desbloqueados" },
              { id: "pendientes" as FiltroLogros, etiqueta: "Pendientes" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFiltro(f.id)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                  filtro === f.id ? "bg-white text-violet-700" : "bg-violet-800 text-white hover:bg-violet-600",
                )}
              >
                {f.etiqueta}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid de logros */}
      <main className="max-w-lg mx-auto px-4 py-4 pb-24">
        <div className="grid grid-cols-3 gap-3">
          {logrosFiltrados.map(({ logro, estado }) => {
            const estaDesbloqueado = estado?.desbloqueado
            const progreso = estado?.progreso || 0
            const porcentajeProgreso = Math.min((progreso / logro.requisito) * 100, 100)

            return (
              <button
                key={logro.id}
                onClick={() => setLogroSeleccionado({ logro, estado })}
                className={cn(
                  "aspect-square rounded-2xl p-3 flex flex-col items-center justify-center relative overflow-hidden transition-all",
                  estaDesbloqueado ? `bg-gradient-to-br ${logro.colorFondo} shadow-lg` : "bg-slate-600/50",
                )}
              >
                {/* Indicador de bloqueado */}
                {!estaDesbloqueado && (
                  <div className="absolute top-2 right-2">
                    <Lock size={14} className="text-slate-400" />
                  </div>
                )}

                {/* Icono */}
                <div className={cn("text-3xl mb-1", estaDesbloqueado ? "" : "grayscale opacity-50")}>
                  {estaDesbloqueado ? logro.icono : "❓"}
                </div>

                {/* Nombre */}
                <p
                  className={cn(
                    "text-[10px] font-medium text-center leading-tight",
                    estaDesbloqueado ? "text-white" : "text-slate-400",
                  )}
                >
                  {estaDesbloqueado ? logro.nombre : "???"}
                </p>

                {/* Barra de progreso si no está desbloqueado */}
                {!estaDesbloqueado && porcentajeProgreso > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700">
                    <div className="h-full bg-amber-400" style={{ width: `${porcentajeProgreso}%` }} />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </main>

      <BarraInferior />

      {/* Modal de detalle de logro */}
      {logroSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div
                className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-4xl",
                  logroSeleccionado.estado?.desbloqueado
                    ? `bg-gradient-to-br ${logroSeleccionado.logro.colorFondo}`
                    : "bg-slate-200",
                )}
              >
                {logroSeleccionado.estado?.desbloqueado ? logroSeleccionado.logro.icono : "❓"}
              </div>
              <h3 className="font-bold text-xl text-slate-800">
                {logroSeleccionado.estado?.desbloqueado ? logroSeleccionado.logro.nombre : "Logro Bloqueado"}
              </h3>
              <p className="text-slate-500 text-sm mt-1">{logroSeleccionado.logro.descripcion}</p>
            </div>

            {/* Progreso */}
            {!logroSeleccionado.estado?.desbloqueado && (
              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-600">Progreso</span>
                  <span className="font-bold text-slate-800">
                    {logroSeleccionado.estado?.progreso || 0} / {logroSeleccionado.logro.requisito}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-amber-500 h-3 rounded-full"
                    style={{
                      width: `${Math.min(((logroSeleccionado.estado?.progreso || 0) / logroSeleccionado.logro.requisito) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Recompensas */}
            <div className="bg-amber-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-amber-600 font-medium mb-2">Recompensas</p>
              <div className="flex justify-center gap-6">
                <div className="flex items-center gap-1">
                  <Coins size={18} className="text-amber-600" />
                  <span className="font-bold text-amber-700">{logroSeleccionado.logro.recompensaMonedas}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={18} className="text-violet-600" />
                  <span className="font-bold text-violet-700">{logroSeleccionado.logro.recompensaXP} XP</span>
                </div>
              </div>
            </div>

            {/* Fecha de desbloqueo si aplica */}
            {logroSeleccionado.estado?.desbloqueado && logroSeleccionado.estado.fechaDesbloqueo && (
              <p className="text-center text-xs text-slate-400 mb-4">
                Desbloqueado el {new Date(logroSeleccionado.estado.fechaDesbloqueo).toLocaleDateString()}
              </p>
            )}

            <button
              onClick={() => setLogroSeleccionado(null)}
              className="w-full py-3 bg-violet-500 hover:bg-violet-600 rounded-xl font-bold text-white transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
