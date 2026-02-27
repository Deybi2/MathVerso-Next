// =============================================================================
// PANTALLA DE FRAGMENTOS DE POEMAS - Matemáticas en Verso
// =============================================================================
// Muestra los poemas especiales y el progreso de colección de fragmentos.
// =============================================================================

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, Lock, CheckCircle, Sparkles, ChevronRight } from "lucide-react"
import { BarraInferior } from "@/componentes/navegacion/barra-inferior"
import { useAplicacion } from "@/contextos/contexto-aplicacion"
import { poemasEspecialesData, verificarPoemaCompleto } from "@/datos/poemas-especiales"
import { cn } from "@/lib/utils"

export default function PantallaFragmentos() {
  const router = useRouter()
  const { estado } = useAplicacion()
  const [poemaSeleccionado, setPoemaSeleccionado] = useState<string | null>(null)

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!estado.usuarioActual) {
      router.push("/bienvenida")
    }
  }, [estado.usuarioActual, router])

  if (!estado.usuarioActual) {
    return null
  }

  const fragmentosDesbloqueados = estado.inventario.fragmentosPoemas
  const poemaActivo = poemasEspecialesData.find((p) => p.id === poemaSeleccionado)

  const obtenerProgresoPoema = (poemaId: string) => {
    const poema = poemasEspecialesData.find((p) => p.id === poemaId)
    if (!poema) return { desbloqueados: 0, total: 0 }

    const desbloqueados = poema.fragmentos.filter((f) => fragmentosDesbloqueados.includes(f.id)).length

    return { desbloqueados, total: poema.fragmentos.length }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-600 to-orange-700">
      {/* Header */}
      <header className="sticky top-0 bg-amber-700/90 backdrop-blur-sm border-b border-amber-500 z-10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => router.push("/poemario")} className="p-2 hover:bg-amber-600 rounded-full">
              <ArrowLeft size={24} className="text-white" />
            </button>
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-amber-200" />
              <h1 className="font-serif text-xl font-bold text-white italic">Fragmentos</h1>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4 pb-24">
        {/* Resumen */}
        <div className="bg-white/10 rounded-2xl p-4 mb-6">
          <p className="text-white/80 text-sm mb-2">
            Colecciona fragmentos comprándolos en la tienda para desbloquear poemas especiales completos.
          </p>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-300" />
            <span className="text-amber-200 text-sm">{fragmentosDesbloqueados.length} fragmentos coleccionados</span>
          </div>
        </div>

        {/* Lista de poemas especiales */}
        <div className="space-y-4">
          {poemasEspecialesData.map((poema) => {
            const progreso = obtenerProgresoPoema(poema.id)
            const completo = verificarPoemaCompleto(poema.id, fragmentosDesbloqueados)

            return (
              <button
                key={poema.id}
                onClick={() => setPoemaSeleccionado(poema.id)}
                className={cn(
                  "w-full text-left rounded-xl p-4 transition-all",
                  completo
                    ? "bg-emerald-500/20 border-2 border-emerald-400"
                    : "bg-white/10 border-2 border-transparent",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center",
                      completo ? "bg-emerald-500" : "bg-amber-500/30",
                    )}
                  >
                    {completo ? (
                      <CheckCircle size={28} className="text-white" />
                    ) : (
                      <BookOpen size={28} className="text-amber-200" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{poema.titulo}</h3>
                    <p className="text-white/60 text-sm">{poema.autor}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-white/20 rounded-full h-2">
                        <div
                          className={cn(
                            "h-2 rounded-full transition-all",
                            completo ? "bg-emerald-400" : "bg-amber-400",
                          )}
                          style={{ width: `${(progreso.desbloqueados / progreso.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-white/80 text-xs">
                        {progreso.desbloqueados}/{progreso.total}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-white/50" />
                </div>
              </button>
            )
          })}
        </div>

        {/* Ir a la tienda */}
        <button
          onClick={() => router.push("/tienda")}
          className="w-full mt-6 py-4 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-colors"
        >
          Comprar Fragmentos en la Tienda
        </button>
      </main>

      <BarraInferior />

      {/* Modal de poema seleccionado */}
      {poemaActivo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h2 className="font-serif text-2xl font-bold text-slate-800 mb-1">{poemaActivo.titulo}</h2>
            <p className="text-slate-500 text-sm mb-4">por {poemaActivo.autor}</p>

            {verificarPoemaCompleto(poemaActivo.id, fragmentosDesbloqueados) ? (
              <div className="bg-amber-50 rounded-xl p-4 mb-4">
                <p className="text-slate-700 whitespace-pre-line font-serif italic leading-relaxed">
                  {poemaActivo.contenidoCompleto}
                </p>
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                {poemaActivo.fragmentos.map((fragmento) => {
                  const desbloqueado = fragmentosDesbloqueados.includes(fragmento.id)
                  return (
                    <div
                      key={fragmento.id}
                      className={cn(
                        "rounded-xl p-4 border-2",
                        desbloqueado ? "bg-amber-50 border-amber-200" : "bg-slate-100 border-slate-200",
                      )}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-slate-500">
                          Fragmento {fragmento.numeroFragmento}/{fragmento.totalFragmentos}
                        </span>
                        {desbloqueado ? (
                          <CheckCircle size={14} className="text-emerald-500" />
                        ) : (
                          <Lock size={14} className="text-slate-400" />
                        )}
                      </div>
                      {desbloqueado ? (
                        <p className="text-slate-700 whitespace-pre-line font-serif italic text-sm leading-relaxed">
                          {fragmento.contenido}
                        </p>
                      ) : (
                        <p className="text-slate-400 text-sm">??? ??? ??? ???</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <button
              onClick={() => setPoemaSeleccionado(null)}
              className="w-full py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-medium text-slate-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
