// =============================================================================
// PANTALLA DE EJERCICIO - Matemáticas en Verso
// =============================================================================
// Muestra un ejercicio individual con su pregunta, opciones y feedback.
// Esta es la pantalla principal donde el usuario resuelve los ejercicios.
// =============================================================================

"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Lightbulb } from "lucide-react"
import { ejerciciosEjemplo } from "@/datos/ejercicios-ejemplo"
import { validarRespuesta, calcularPuntuacion, formatearTiempo } from "@/lib/validadores"
import { ModalRespuestaCorrecta } from "@/componentes/modales/modal-respuesta-correcta"
import { ModalRespuestaIncorrecta } from "@/componentes/modales/modal-respuesta-incorrecta"
import { ModalNivelCompletado } from "@/componentes/modales/modal-nivel-completado"
import type { EjercicioConcreto } from "@/tipos/dominio"

export default function PantallaActividad() {
  const router = useRouter()
  const params = useParams()
  const actividadId = params.id as string

  // Estado de ejercicios
  const [ejercicios] = useState<EjercicioConcreto[]>(ejerciciosEjemplo.filter((e) => e.actividadId === actividadId))
  const [indiceActual, setIndiceActual] = useState(0)
  const [respuestaUsuario, setRespuestaUsuario] = useState<string>("")
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string | null>(null)
  const [tiempoInicio, setTiempoInicio] = useState<Date>(new Date())
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0)
  const [intentos, setIntentos] = useState(0)
  const [mostrarPista, setMostrarPista] = useState(false)

  // Estados de modales
  const [modalCorrecto, setModalCorrecto] = useState(false)
  const [modalIncorrecto, setModalIncorrecto] = useState(false)
  const [modalNivelCompletado, setModalNivelCompletado] = useState(false)

  // Datos para el modal
  const [puntuacionObtenida, setPuntuacionObtenida] = useState(0)
  const [explicacionActual, setExplicacionActual] = useState("")

  const ejercicioActual = ejercicios[indiceActual]

  // Timer
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoTranscurrido((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(intervalo)
  }, [])

  // Resetear cuando cambia el ejercicio
  useEffect(() => {
    setRespuestaUsuario("")
    setOpcionSeleccionada(null)
    setMostrarPista(false)
    setTiempoInicio(new Date())
    setIntentos(0)
  }, [indiceActual])

  if (!ejercicioActual) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No hay ejercicios disponibles</p>
      </div>
    )
  }

  const manejarComprobar = () => {
    const respuesta = ejercicioActual.tipo === "seleccion_multiple" ? opcionSeleccionada : respuestaUsuario
    const esCorrecto = validarRespuesta(ejercicioActual, respuesta || "")
    const tiempoUtilizado = (new Date().getTime() - tiempoInicio.getTime()) / 1000
    const puntuacion = calcularPuntuacion(ejercicioActual, esCorrecto, tiempoUtilizado)

    setIntentos((prev) => prev + 1)
    setPuntuacionObtenida(puntuacion)

    if (esCorrecto) {
      setExplicacionActual(ejercicioActual.explicacionCorrecto)
      setModalCorrecto(true)
    } else {
      setExplicacionActual(ejercicioActual.explicacionIncorrecto)
      setModalIncorrecto(true)
    }
  }

  const manejarContinuar = () => {
    setModalCorrecto(false)

    if (indiceActual < ejercicios.length - 1) {
      setIndiceActual((prev) => prev + 1)
      setTiempoTranscurrido(0)
    } else {
      // Nivel completado
      setModalNivelCompletado(true)
    }
  }

  const manejarReintentar = () => {
    setModalIncorrecto(false)
    setRespuestaUsuario("")
    setOpcionSeleccionada(null)
  }

  const manejarFinalizarNivel = () => {
    setModalNivelCompletado(false)
    router.back()
  }

  const progresoActual = ((indiceActual + 1) / ejercicios.length) * 100

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header con progreso */}
      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          {/* Barra de progreso */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progresoActual}%` }}
              />
            </div>
            <span className="text-sm font-medium text-slate-600">
              {indiceActual + 1}/{ejercicios.length}
            </span>
          </div>

          {/* Tiempo */}
          <div className="flex justify-between text-sm text-slate-500">
            <span>Tiempo: {formatearTiempo(tiempoTranscurrido)}</span>
            <span>Intentos: {intentos}</span>
          </div>
        </div>
      </header>

      {/* Contenido del ejercicio */}
      <main className="flex-1 p-4 max-w-lg mx-auto w-full">
        {/* Título del ejercicio */}
        <div className="bg-slate-800 text-white rounded-t-xl p-3 text-center">
          <h2 className="font-semibold">{ejercicioActual.descripcion || "Fallas en la Línea de Ensamblaje"}</h2>
        </div>

        {/* Contenedor del problema */}
        <div className="bg-white rounded-b-xl shadow-md p-5 mb-6">
          {/* Pregunta */}
          <p className="text-slate-700 mb-6 leading-relaxed">{ejercicioActual.pregunta}</p>

          {/* Opciones o input según el tipo */}
          {ejercicioActual.tipo === "seleccion_multiple" && ejercicioActual.opciones && (
            <div className="space-y-3">
              {ejercicioActual.opciones.map((opcion) => (
                <button
                  key={opcion.id}
                  onClick={() => setOpcionSeleccionada(opcion.id)}
                  className={cn(
                    "w-full p-4 rounded-lg text-left border-2 transition-all",
                    opcionSeleccionada === opcion.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300",
                  )}
                >
                  {opcion.texto}
                </button>
              ))}
            </div>
          )}

          {ejercicioActual.tipo === "respuesta_numerica" && (
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Tu respuesta"
                value={respuestaUsuario}
                onChange={(e) => setRespuestaUsuario(e.target.value)}
                className="text-lg py-6 text-center border-slate-300"
              />
              <p className="text-xs text-slate-400 text-center">(Expresa como fracción simplificada o decimal).</p>
            </div>
          )}
        </div>

        {/* Pista */}
        {mostrarPista && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="text-amber-500 shrink-0 mt-1" size={18} />
              <p className="text-amber-800 text-sm italic">{ejercicioActual.pistaPoetica}</p>
            </div>
          </div>
        )}
      </main>

      {/* Botones de acción */}
      <footer className="bg-white border-t border-slate-200 p-4 sticky bottom-0">
        <div className="max-w-lg mx-auto space-y-3">
          <Button
            onClick={manejarComprobar}
            disabled={!respuestaUsuario && !opcionSeleccionada}
            className="w-full py-6 text-lg font-semibold bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50"
          >
            Comprobar
          </Button>

          <Button
            onClick={() => setMostrarPista(true)}
            variant="outline"
            disabled={mostrarPista}
            className="w-full py-4 border-slate-300"
          >
            Pedir Pista
          </Button>
        </div>
      </footer>

      {/* Modales */}
      <ModalRespuestaCorrecta
        estaAbierto={modalCorrecto}
        onContinuar={manejarContinuar}
        puntuacion={puntuacionObtenida}
      />

      <ModalRespuestaIncorrecta
        estaAbierto={modalIncorrecto}
        onReintentar={manejarReintentar}
        explicacion={explicacionActual}
        respuestaCorrecta={String(ejercicioActual.respuestaCorrecta)}
      />

      <ModalNivelCompletado
        estaAbierto={modalNivelCompletado}
        onContinuar={manejarFinalizarNivel}
        xpGanado={150}
        monedasGanadas={20}
        poemasGanados={1}
      />
    </div>
  )
}
