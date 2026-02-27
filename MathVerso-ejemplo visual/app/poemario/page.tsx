// =============================================================================
// PANTALLA DEL POEMARIO - Matemáticas en Verso
// =============================================================================
// Muestra la colección de poemas matemáticos con funcionalidad de favoritos,
// desbloqueo y compartir.
// =============================================================================

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, Share2, Lock, Coins, BookOpen, Filter, ChevronRight } from "lucide-react"
import { BarraInferior } from "@/componentes/navegacion/barra-inferior"
import { usarPoemario } from "@/hooks/usar-poemario"
import { cn } from "@/lib/utils"
import type { Poema } from "@/tipos/poemario"

const categoriasFiltro = [
  { id: "todos", etiqueta: "Todos", color: "bg-slate-500" },
  { id: "favoritos", etiqueta: "Favoritos", color: "bg-pink-500" },
  { id: "algebra", etiqueta: "Álgebra", color: "bg-emerald-500" },
  { id: "geometria", etiqueta: "Geometría", color: "bg-violet-500" },
  { id: "aritmetica", etiqueta: "Aritmética", color: "bg-blue-500" },
  { id: "probabilidad", etiqueta: "Probabilidad", color: "bg-amber-500" },
  { id: "calculo", etiqueta: "Cálculo", color: "bg-red-500" },
]

export default function PantallaPoemario() {
  const router = useRouter()
  const [monedasUsuario, setMonedasUsuario] = useState(500)
  const [mensajeExito, setMensajeExito] = useState<string | null>(null)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const manejarGastarMonedas = (cantidad: number) => {
    setMonedasUsuario((prev) => prev - cantidad)
  }

  const {
    poemasFiltrados,
    poemaSeleccionado,
    setPoemaSeleccionado,
    alternarFavorito,
    desbloquearPoema,
    compartirPoema,
    filtroCategoria,
    setFiltroCategoria,
    estadisticas,
    cargando,
  } = usarPoemario(monedasUsuario, manejarGastarMonedas)

  const manejarCompartir = async (poema: Poema) => {
    const exito = await compartirPoema(poema)
    if (exito) {
      setMensajeExito("Poema copiado al portapapeles")
      setTimeout(() => setMensajeExito(null), 2000)
    }
  }

  const manejarDesbloquear = (poema: Poema) => {
    const exito = desbloquearPoema(poema.id)
    if (exito) {
      setMensajeExito(`"${poema.titulo}" desbloqueado`)
      setTimeout(() => setMensajeExito(null), 2000)
    } else {
      setMensajeExito("No tienes suficientes monedas")
      setTimeout(() => setMensajeExito(null), 2000)
    }
  }

  const obtenerColorCategoria = (categoria: string) => {
    const colores: Record<string, string> = {
      algebra: "from-emerald-500 to-emerald-600",
      geometria: "from-violet-500 to-violet-600",
      aritmetica: "from-blue-500 to-blue-600",
      probabilidad: "from-amber-500 to-amber-600",
      calculo: "from-red-500 to-red-600",
      general: "from-slate-500 to-slate-600",
    }
    return colores[categoria] || "from-slate-500 to-slate-600"
  }

  if (cargando) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-600 to-teal-700 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full" />
      </div>
    )
  }

  // Vista de detalle de poema
  if (poemaSeleccionado) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-200">
        {/* Header */}
        <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-amber-200 z-10">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={() => setPoemaSeleccionado(null)} className="p-2 hover:bg-amber-100 rounded-full">
              <ArrowLeft size={24} className="text-amber-800" />
            </button>
            <h1 className="font-serif font-bold text-amber-900">Poema</h1>
            <div className="flex gap-2">
              <button
                onClick={() => alternarFavorito(poemaSeleccionado.id)}
                className="p-2 hover:bg-amber-100 rounded-full"
              >
                <Heart
                  size={24}
                  className={cn(poemaSeleccionado.esFavorito ? "fill-red-500 text-red-500" : "text-amber-600")}
                />
              </button>
              <button
                onClick={() => manejarCompartir(poemaSeleccionado)}
                className="p-2 hover:bg-amber-100 rounded-full"
              >
                <Share2 size={24} className="text-amber-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Contenido del poema */}
        <main className="max-w-lg mx-auto px-4 py-6 pb-24">
          <div
            className={cn(
              "rounded-3xl p-6 shadow-xl bg-gradient-to-br",
              obtenerColorCategoria(poemaSeleccionado.categoria),
            )}
          >
            <div className="bg-white/20 rounded-2xl p-6">
              <h2 className="font-serif text-2xl font-bold text-white text-center mb-4">{poemaSeleccionado.titulo}</h2>
              <div className="bg-white/90 rounded-xl p-5 mb-4">
                <p className="font-serif text-slate-800 leading-relaxed whitespace-pre-line text-center">
                  {poemaSeleccionado.contenido}
                </p>
              </div>
              <p className="text-white/80 text-center text-sm italic">- {poemaSeleccionado.autor}</p>
              <div className="mt-4 flex justify-center">
                <span className="bg-white/20 px-3 py-1 rounded-full text-white text-xs">
                  {poemaSeleccionado.temaMatematico}
                </span>
              </div>
            </div>
          </div>
        </main>

        <BarraInferior />

        {/* Mensaje de éxito */}
        {mensajeExito && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-4">
            {mensajeExito}
          </div>
        )}
      </div>
    )
  }

  // Vista de lista de poemas
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-600 to-teal-700">
      {/* Header */}
      <header className="sticky top-0 bg-teal-700/90 backdrop-blur-sm border-b border-teal-500 z-10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => router.push("/mapa")} className="p-2 hover:bg-teal-600 rounded-full">
              <ArrowLeft size={24} className="text-white" />
            </button>
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-amber-300" />
              <h1 className="font-serif text-xl font-bold text-white">Poemario</h1>
            </div>
            <div className="flex items-center gap-1 bg-teal-800 px-3 py-1 rounded-full">
              <span className="text-amber-300 font-bold text-sm">{estadisticas.poemasColeccionados}</span>
              <span className="text-teal-300 text-xs">/{estadisticas.totalPoemas}</span>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center gap-1 bg-teal-800 px-3 py-2 rounded-lg text-white text-sm"
            >
              <Filter size={16} />
              Filtrar
            </button>
            <div className="flex-1 overflow-x-auto flex gap-2 pb-1 scrollbar-hide">
              {!mostrarFiltros &&
                categoriasFiltro.slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFiltroCategoria(cat.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors",
                      filtroCategoria === cat.id ? "bg-white text-teal-700 font-bold" : "bg-teal-800 text-white",
                    )}
                  >
                    {cat.etiqueta}
                  </button>
                ))}
            </div>
          </div>

          {/* Panel de filtros expandido */}
          {mostrarFiltros && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {categoriasFiltro.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFiltroCategoria(cat.id)
                    setMostrarFiltros(false)
                  }}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs transition-colors",
                    filtroCategoria === cat.id ? "bg-white text-teal-700 font-bold" : "bg-teal-800 text-white",
                  )}
                >
                  {cat.etiqueta}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Lista de poemas */}
      <main className="max-w-lg mx-auto px-4 py-4 pb-24">
        <div className="space-y-3">
          {poemasFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-teal-300 mb-4" />
              <p className="text-white/80">No hay poemas en esta categoría</p>
            </div>
          ) : (
            poemasFiltrados.map((poema) => (
              <button
                key={poema.id}
                onClick={() => poema.desbloqueado && setPoemaSeleccionado(poema)}
                disabled={!poema.desbloqueado}
                className={cn(
                  "w-full text-left rounded-xl p-4 transition-all",
                  poema.desbloqueado
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md"
                    : "bg-slate-600/50 cursor-not-allowed",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-white">{poema.titulo}</h3>
                      {poema.esFavorito && <Heart size={14} className="fill-red-400 text-red-400" />}
                    </div>
                    <p className="text-white/70 text-xs mt-1">
                      {poema.desbloqueado ? `— ${poema.autor}` : "Poema bloqueado"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {poema.desbloqueado ? (
                      <ChevronRight size={20} className="text-white/70" />
                    ) : (
                      <div className="flex items-center gap-1">
                        <Lock size={16} className="text-amber-300" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            manejarDesbloquear(poema)
                          }}
                          className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 px-2 py-1 rounded-full text-white text-xs"
                        >
                          <Coins size={12} />
                          {poema.monedasParaDesbloquear}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </main>

      <BarraInferior />

      {/* Mensaje de éxito */}
      {mensajeExito && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-4">
          {mensajeExito}
        </div>
      )}
    </div>
  )
}
