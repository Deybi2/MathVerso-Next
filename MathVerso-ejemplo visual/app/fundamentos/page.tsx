// =============================================================================
// PANTALLA DE FUNDAMENTOS - Matemáticas en Verso
// =============================================================================
// Muestra las categorías de fundamentos matemáticos para consulta.
// =============================================================================

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, ChevronRight, Lightbulb, Calculator, FileText } from "lucide-react"
import { BarraInferior } from "@/componentes/navegacion/barra-inferior"
import { categoriasFundamentos } from "@/datos/fundamentos-ejemplo"
import { cn } from "@/lib/utils"
import type { CategoriaFundamento, ConceptoFundamental } from "@/tipos/fundamentos"

export default function PantallaFundamentos() {
  const router = useRouter()
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaFundamento | null>(null)
  const [conceptoSeleccionado, setConceptoSeleccionado] = useState<ConceptoFundamental | null>(null)

  // Vista de detalle de concepto
  if (conceptoSeleccionado && categoriaSeleccionada) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
        <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-slate-200 z-10">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={() => setConceptoSeleccionado(null)} className="p-2 hover:bg-slate-100 rounded-full">
              <ArrowLeft size={24} className="text-slate-700" />
            </button>
            <div>
              <p className="text-xs text-slate-500">{categoriaSeleccionada.nombre}</p>
              <h1 className="font-bold text-slate-800">{conceptoSeleccionado.titulo}</h1>
            </div>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 py-4 pb-24">
          {/* Descripción */}
          <p className="text-slate-600 mb-4">{conceptoSeleccionado.descripcion}</p>

          {/* Contenido principal */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-slate-500" />
              <h2 className="font-bold text-slate-700">Explicación</h2>
            </div>
            <div className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">
              {conceptoSeleccionado.contenido}
            </div>
          </div>

          {/* Fórmulas */}
          {conceptoSeleccionado.formulas && conceptoSeleccionado.formulas.length > 0 && (
            <div className="bg-amber-50 rounded-xl p-4 shadow-sm mb-4 border border-amber-200">
              <div className="flex items-center gap-2 mb-3">
                <Calculator size={18} className="text-amber-600" />
                <h2 className="font-bold text-amber-800">Fórmulas Clave</h2>
              </div>
              <ul className="space-y-2">
                {conceptoSeleccionado.formulas.map((formula, index) => (
                  <li key={index} className="text-amber-700 text-sm font-mono bg-amber-100 px-3 py-2 rounded-lg">
                    {formula}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ejemplos */}
          {conceptoSeleccionado.ejemplos.length > 0 && (
            <div className="bg-emerald-50 rounded-xl p-4 shadow-sm mb-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={18} className="text-emerald-600" />
                <h2 className="font-bold text-emerald-800">Ejemplos</h2>
              </div>
              <div className="space-y-4">
                {conceptoSeleccionado.ejemplos.map((ejemplo) => (
                  <div key={ejemplo.id} className="bg-white rounded-lg p-3 border border-emerald-200">
                    <h3 className="font-medium text-slate-800 text-sm mb-2">{ejemplo.titulo}</h3>
                    <div className="bg-slate-50 rounded p-2 mb-2">
                      <p className="text-slate-700 text-sm font-medium">Problema:</p>
                      <p className="text-slate-600 text-sm whitespace-pre-line">{ejemplo.problema}</p>
                    </div>
                    <div className="bg-emerald-100 rounded p-2 mb-2">
                      <p className="text-emerald-700 text-sm font-medium">Solución: {ejemplo.solucion}</p>
                    </div>
                    <p className="text-slate-500 text-xs">{ejemplo.explicacion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Consejos */}
          {conceptoSeleccionado.consejos.length > 0 && (
            <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={18} className="text-blue-600" />
                <h2 className="font-bold text-blue-800">Consejos</h2>
              </div>
              <ul className="space-y-2">
                {conceptoSeleccionado.consejos.map((consejo, index) => (
                  <li key={index} className="flex items-start gap-2 text-blue-700 text-sm">
                    <span className="text-blue-400 mt-1">•</span>
                    {consejo}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>

        <BarraInferior />
      </div>
    )
  }

  // Vista de conceptos de una categoría
  if (categoriaSeleccionada) {
    return (
      <div className={cn("min-h-screen bg-gradient-to-b", categoriaSeleccionada.colorFondo)}>
        <header className="sticky top-0 bg-black/10 backdrop-blur-sm z-10">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={() => setCategoriaSeleccionada(null)} className="p-2 hover:bg-white/10 rounded-full">
              <ArrowLeft size={24} className="text-white" />
            </button>
            <div>
              <h1 className="font-bold text-white text-lg">{categoriaSeleccionada.nombre}</h1>
              <p className="text-white/70 text-xs">{categoriaSeleccionada.descripcion}</p>
            </div>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 py-4 pb-24">
          <div className="space-y-3">
            {categoriaSeleccionada.conceptos.map((concepto) => (
              <button
                key={concepto.id}
                onClick={() => setConceptoSeleccionado(concepto)}
                className="w-full text-left bg-white/90 hover:bg-white rounded-xl p-4 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800">{concepto.titulo}</h3>
                    <p className="text-slate-500 text-sm mt-1">{concepto.descripcion}</p>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
              </button>
            ))}
          </div>
        </main>

        <BarraInferior />
      </div>
    )
  }

  // Vista principal de categorías
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-600 to-teal-700">
      <header className="sticky top-0 bg-teal-700/90 backdrop-blur-sm border-b border-teal-500 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => router.push("/mapa")} className="p-2 hover:bg-teal-600 rounded-full">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-amber-300" />
            <h1 className="font-serif text-xl font-bold text-white">Fundamentos</h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4 pb-24">
        <p className="text-teal-100 text-sm mb-4 text-center">Consulta los conceptos básicos de matemáticas</p>

        <div className="space-y-3">
          {categoriasFundamentos.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaSeleccionada(categoria)}
              className={cn(
                "w-full text-left rounded-xl p-4 transition-all shadow-md bg-gradient-to-r",
                categoria.colorFondo,
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                    {categoria.icono}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{categoria.nombre}</h3>
                    <p className="text-white/70 text-sm">{categoria.descripcion}</p>
                  </div>
                </div>
                <ChevronRight size={24} className="text-white/70" />
              </div>
            </button>
          ))}
        </div>
      </main>

      <BarraInferior />
    </div>
  )
}
