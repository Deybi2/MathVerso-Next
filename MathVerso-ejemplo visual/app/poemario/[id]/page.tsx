// =============================================================================
// PÁGINA DE DETALLE DE POEMA - Matemáticas en Verso
// =============================================================================
// Muestra un poema específico con opciones de favorito y compartir.
// =============================================================================

"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Heart, Share2 } from "lucide-react"
import { BarraInferior } from "@/componentes/navegacion/barra-inferior"
import { todosLosPoemas } from "@/datos/poemas-ejemplo"
import { cn } from "@/lib/utils"
import type { Poema } from "@/tipos/poemario"

export default function PaginaDetallePoema() {
  const router = useRouter()
  const params = useParams()
  const [poema, setPoema] = useState<Poema | null>(null)
  const [esFavorito, setEsFavorito] = useState(false)

  useEffect(() => {
    const poemaEncontrado = todosLosPoemas.find((p) => p.id === params.id)
    if (poemaEncontrado) {
      setPoema(poemaEncontrado)
      // Cargar estado de favorito desde localStorage
      const favoritosGuardados = localStorage.getItem("mathverso_favoritos")
      if (favoritosGuardados) {
        const favoritos = JSON.parse(favoritosGuardados)
        setEsFavorito(favoritos.includes(poemaEncontrado.id))
      }
    }
  }, [params.id])

  const alternarFavorito = () => {
    if (!poema) return
    const favoritosGuardados = localStorage.getItem("mathverso_favoritos")
    let favoritos: string[] = favoritosGuardados ? JSON.parse(favoritosGuardados) : []

    if (esFavorito) {
      favoritos = favoritos.filter((id) => id !== poema.id)
    } else {
      favoritos.push(poema.id)
    }

    localStorage.setItem("mathverso_favoritos", JSON.stringify(favoritos))
    setEsFavorito(!esFavorito)
  }

  const compartirPoema = async () => {
    if (!poema) return
    const textoCompartir = `"${poema.titulo}" - ${poema.autor}\n\n${poema.contenido}\n\nMatemáticas en Verso`

    if (navigator.share) {
      await navigator.share({ title: poema.titulo, text: textoCompartir })
    } else {
      await navigator.clipboard.writeText(textoCompartir)
    }
  }

  const obtenerColorCategoria = (categoria: string) => {
    const colores: Record<string, string> = {
      algebra: "from-emerald-500 to-emerald-600",
      geometria: "from-violet-500 to-violet-600",
      aritmetica: "from-blue-500 to-blue-600",
      probabilidad: "from-amber-500 to-amber-600",
      calculo: "from-red-500 to-red-600",
    }
    return colores[categoria] || "from-slate-500 to-slate-600"
  }

  if (!poema) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p>Cargando poema...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-200">
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-amber-200 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-amber-100 rounded-full">
            <ArrowLeft size={24} className="text-amber-800" />
          </button>
          <h1 className="font-serif font-bold text-amber-900">Poema</h1>
          <div className="flex gap-2">
            <button onClick={alternarFavorito} className="p-2 hover:bg-amber-100 rounded-full">
              <Heart size={24} className={cn(esFavorito ? "fill-red-500 text-red-500" : "text-amber-600")} />
            </button>
            <button onClick={compartirPoema} className="p-2 hover:bg-amber-100 rounded-full">
              <Share2 size={24} className="text-amber-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        <div className={cn("rounded-3xl p-6 shadow-xl bg-gradient-to-br", obtenerColorCategoria(poema.categoria))}>
          <div className="bg-white/20 rounded-2xl p-6">
            <h2 className="font-serif text-2xl font-bold text-white text-center mb-4">{poema.titulo}</h2>
            <div className="bg-white/90 rounded-xl p-5 mb-4">
              <p className="font-serif text-slate-800 leading-relaxed whitespace-pre-line text-center">
                {poema.contenido}
              </p>
            </div>
            <p className="text-white/80 text-center text-sm italic">- {poema.autor}</p>
            <div className="mt-4 flex justify-center">
              <span className="bg-white/20 px-3 py-1 rounded-full text-white text-xs">{poema.temaMatematico}</span>
            </div>
          </div>
        </div>
      </main>

      <BarraInferior />
    </div>
  )
}
