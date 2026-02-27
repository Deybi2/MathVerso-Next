// =============================================================================
// BARRA DE NAVEGACIÓN INFERIOR - Matemáticas en Verso
// =============================================================================
// Barra de navegación fija en la parte inferior de la pantalla.
// =============================================================================

"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import { Map, ImageIcon, Trophy, ShoppingBag, BookOpen, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ItemNavegacion {
  id: string
  etiqueta: string
  icono: React.ReactNode
  ruta: string
}

const itemsNavegacion: ItemNavegacion[] = [
  { id: "mapa", etiqueta: "Mapa", icono: <Map size={20} />, ruta: "/mapa" },
  { id: "poemario", etiqueta: "Poemario", icono: <ImageIcon size={20} />, ruta: "/poemario" },
  { id: "ranking", etiqueta: "Ranking", icono: <Trophy size={20} />, ruta: "/ranking" },
  { id: "tienda", etiqueta: "Tienda", icono: <ShoppingBag size={20} />, ruta: "/tienda" },
  { id: "logros", etiqueta: "Logros", icono: <CheckCircle size={20} />, ruta: "/logros" },
  { id: "fundamentos", etiqueta: "Fundamentos", icono: <BookOpen size={20} />, ruta: "/fundamentos" },
]

export function BarraInferior() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center py-2 px-1">
        {itemsNavegacion.map((item) => {
          const estaActivo = pathname === item.ruta

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.ruta)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px]",
                estaActivo ? "text-emerald-600 bg-emerald-50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
              )}
            >
              <span className={cn(estaActivo && "text-emerald-600")}>{item.icono}</span>
              <span className="text-[10px] mt-1 font-medium">{item.etiqueta}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
