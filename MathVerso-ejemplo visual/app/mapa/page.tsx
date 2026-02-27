// =============================================================================
// PANTALLA DEL MAPA PRINCIPAL - Matemáticas en Verso
// =============================================================================
// Muestra todas las categorías (años escolares) disponibles para el usuario.
// Esta es la pantalla principal después de iniciar sesión.
// Usa el estado global para mostrar progreso real del usuario.
// =============================================================================

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BarraSuperior } from "@/componentes/navegacion/barra-superior"
import { BarraInferior } from "@/componentes/navegacion/barra-inferior"
import { TarjetaCategoria } from "@/componentes/mapa/tarjeta-categoria"
import { useAplicacion } from "@/contextos/contexto-aplicacion"
import { categoriasEjemplo } from "@/datos/categorias-ejemplo"
import type { Categoria } from "@/tipos/dominio"

export default function PantallaMapa() {
  const router = useRouter()
  const { estado, dispatch } = useAplicacion()

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!estado.usuarioActual) {
      router.push("/bienvenida")
    }
  }, [estado.usuarioActual, router])

  // Generar misiones diarias al entrar al mapa
  useEffect(() => {
    dispatch({ type: "GENERAR_MISIONES_DIARIAS" })
    dispatch({ type: "ACTUALIZAR_RACHA" })
  }, [dispatch])

  // Obtener progreso por categoría
  const obtenerProgreso = (categoriaId: string): number => {
    const categoria = categoriasEjemplo.find((c) => c.id === categoriaId)
    if (!categoria) return 0

    const leccionesCategoria = categoria.lecciones.map((l) => l.id)
    const leccionesCompletadas = estado.progreso.leccionesCompletadas.filter((id) =>
      leccionesCategoria.includes(id),
    ).length

    if (leccionesCategoria.length === 0) return 0
    return Math.round((leccionesCompletadas / leccionesCategoria.length) * 100)
  }

  const estaDesbloqueada = (categoria: Categoria): boolean => {
    return estado.progreso.categoriasDesbloqueadas.includes(categoria.id)
  }

  const estaCompletada = (categoriaId: string): boolean => {
    return estado.progreso.categoriasCompletadas.includes(categoriaId)
  }

  const manejarClickCategoria = (categoria: Categoria) => {
    if (estaDesbloqueada(categoria)) {
      router.push(`/categoria/${categoria.id}`)
    }
  }

  if (!estado.usuarioActual) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Barra superior con estadísticas del estado global */}
      <BarraSuperior
        estrellas={estado.estadisticas.estrellas}
        monedas={estado.estadisticas.monedas}
        nivel={estado.estadisticas.nivel}
        racha={estado.estadisticas.rachaActual}
      />

      {/* Contenido principal */}
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-lg mx-auto">
          {/* Sección de la mascota y libro */}
          <div className="flex items-start gap-4 mb-6">
            {/* Libro de poemas */}
            <div className="flex-1 bg-amber-100 rounded-xl p-3 border-2 border-amber-200 shadow-md">
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                <h2 className="text-amber-900 font-serif font-bold text-sm mb-1">Matemáticas Básicas</h2>
                <p className="text-amber-700 text-xs italic leading-relaxed">
                  {estado.progreso.categoriasCompletadas.length > 0
                    ? `${estado.progreso.categoriasCompletadas.length} categoría(s) completada(s)`
                    : "Comienza tu aventura matemática"}
                </p>
                <div className="mt-2 pt-2 border-t border-amber-200">
                  <p className="text-amber-600 text-[10px] leading-relaxed">
                    Lecciones completadas: {estado.progreso.leccionesCompletadas.length}
                  </p>
                  <p className="text-amber-600 text-[10px]">
                    Ejercicios resueltos: {estado.estadisticas.ejerciciosTotales}
                  </p>
                  <p className="text-amber-600 text-[10px]">
                    Precisión:{" "}
                    {estado.estadisticas.ejerciciosTotales > 0
                      ? Math.round(
                          (estado.estadisticas.ejerciciosCorrectos / estado.estadisticas.ejerciciosTotales) * 100,
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>

            {/* Mascota */}
            <div className="w-24 h-28 relative">
              <Image
                src="/cute-kawaii-fox-mascot-with-math-symbols-japanese-.jpg"
                alt="Mascota"
                fill
                className="object-cover rounded-xl border-2 border-amber-200"
              />
            </div>
          </div>

          {/* Información del usuario */}
          <div className="bg-white/50 rounded-xl p-3 mb-4 border border-amber-200">
            <p className="text-amber-800 text-sm font-medium">
              Bienvenido, {estado.usuarioActual.nombreUsuario}
              {estado.usuarioActual.esAdmin && (
                <span className="ml-2 text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">Admin</span>
              )}
            </p>
            <p className="text-amber-600 text-xs">
              Nivel {estado.estadisticas.nivel} • {estado.estadisticas.experiencia}/
              {estado.estadisticas.experienciaParaSiguienteNivel} XP
            </p>
          </div>

          {/* Misiones diarias si hay */}
          {estado.misionesDiarias.length > 0 && (
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-3 mb-4 text-white">
              <h3 className="font-bold text-sm mb-2">Misiones Diarias</h3>
              <div className="space-y-1">
                {estado.misionesDiarias.slice(0, 2).map((mision) => (
                  <div key={mision.id} className="flex items-center justify-between text-xs">
                    <span className={mision.completada ? "line-through opacity-60" : ""}>{mision.titulo}</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded">
                      {mision.progresoActual}/{mision.objetivo}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => router.push("/misiones")}
                className="text-xs underline mt-2 opacity-80 hover:opacity-100"
              >
                Ver todas las misiones
              </button>
            </div>
          )}

          {/* Lista de categorías */}
          <div className="space-y-4">
            {categoriasEjemplo.map((categoria) => (
              <TarjetaCategoria
                key={categoria.id}
                categoria={categoria}
                progreso={obtenerProgreso(categoria.id)}
                estaDesbloqueada={estaDesbloqueada(categoria)}
                estaCompletada={estaCompletada(categoria.id)}
                onClick={() => manejarClickCategoria(categoria)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Barra de navegación inferior */}
      <BarraInferior />
    </div>
  )
}
