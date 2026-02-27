// =============================================================================
// HOOK MOTOR DE EJERCICIOS - Matemáticas en Verso
// =============================================================================
// Este hook maneja toda la lógica de los ejercicios: estados, validación,
// puntuación, tiempo y progreso.
// =============================================================================

"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import type { EjercicioConcreto, RespuestaEjercicio } from "@/tipos/dominio"
import { validarRespuesta, calcularPuntuacion } from "@/lib/validadores"

type EstadoEjercicioType = "inicial" | "resolviendo" | "verificado" | "correcto" | "incorrecto" | "completado"

interface EstadoMotorEjercicio {
  ejercicioActual: EjercicioConcreto | null
  respuestaUsuario: string | number | string[] | null
  esCorrecto: boolean | null
  mostrarExplicacion: boolean
  mostrarPista: boolean
  intentos: number
  tiempoInicio: Date | null
  tiempoTranscurrido: number
  estado: EstadoEjercicioType
  puntuacionObtenida: number
}

interface AccionesMotorEjercicio {
  iniciarEjercicio: (ejercicio: EjercicioConcreto) => void
  establecerRespuesta: (respuesta: string | number | string[]) => void
  enviarRespuesta: () => RespuestaEjercicio | null
  reiniciarEjercicio: () => void
  siguienteEjercicio: () => void
  mostrarPistaFunc: () => void
  obtenerRetroalimentacion: () => {
    esCorrecto: boolean
    mensaje: string
    explicacion: string
  }
}

interface MetadataMotorEjercicio {
  tiempoTranscurrido: number
  porcentajeCompletado: number
  puedeEnviar: boolean
  necesitaAyuda: boolean
}

export interface UseMotorEjerciciosReturn {
  estado: EstadoMotorEjercicio
  acciones: AccionesMotorEjercicio
  metadata: MetadataMotorEjercicio
}

const estadoInicial: EstadoMotorEjercicio = {
  ejercicioActual: null,
  respuestaUsuario: null,
  esCorrecto: null,
  mostrarExplicacion: false,
  mostrarPista: false,
  intentos: 0,
  tiempoInicio: null,
  tiempoTranscurrido: 0,
  estado: "inicial",
  puntuacionObtenida: 0,
}

export function useMotorEjercicios(): UseMotorEjerciciosReturn {
  const [estado, setEstado] = useState<EstadoMotorEjercicio>(estadoInicial)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const ayudaTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Timer para el tiempo transcurrido
  useEffect(() => {
    if (estado.estado === "resolviendo" && estado.tiempoInicio) {
      timerRef.current = setInterval(() => {
        setEstado((prev) => ({
          ...prev,
          tiempoTranscurrido: Math.floor((new Date().getTime() - prev.tiempoInicio!.getTime()) / 1000),
        }))
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [estado.estado, estado.tiempoInicio])

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (ayudaTimerRef.current) clearTimeout(ayudaTimerRef.current)
    }
  }, [])

  // Iniciar ejercicio
  const iniciarEjercicio = useCallback((ejercicio: EjercicioConcreto) => {
    // Limpiar timers anteriores
    if (timerRef.current) clearInterval(timerRef.current)
    if (ayudaTimerRef.current) clearTimeout(ayudaTimerRef.current)

    setEstado({
      ejercicioActual: ejercicio,
      respuestaUsuario: null,
      esCorrecto: null,
      mostrarExplicacion: false,
      mostrarPista: false,
      intentos: 0,
      tiempoInicio: new Date(),
      tiempoTranscurrido: 0,
      estado: "resolviendo",
      puntuacionObtenida: 0,
    })

    // Timer para sugerir ayuda después del 70% del tiempo estimado
    if (ejercicio.tiempoEstimado > 30) {
      ayudaTimerRef.current = setTimeout(
        () => {
          setEstado((prev) => ({
            ...prev,
            necesitaAyuda: true,
          }))
        },
        ejercicio.tiempoEstimado * 1000 * 0.7,
      )
    }
  }, [])

  // Establecer respuesta del usuario
  const establecerRespuesta = useCallback((respuesta: string | number | string[]) => {
    setEstado((prev) => ({
      ...prev,
      respuestaUsuario: respuesta,
    }))
  }, [])

  // Enviar y validar respuesta
  const enviarRespuesta = useCallback((): RespuestaEjercicio | null => {
    if (!estado.ejercicioActual || estado.respuestaUsuario === null || estado.estado !== "resolviendo") {
      return null
    }

    const tiempoFinal = new Date()
    const tiempoUtilizado = estado.tiempoInicio ? (tiempoFinal.getTime() - estado.tiempoInicio.getTime()) / 1000 : 0

    const esCorrecto = validarRespuesta(estado.ejercicioActual, estado.respuestaUsuario)
    const puntuacion = calcularPuntuacion(estado.ejercicioActual, esCorrecto, tiempoUtilizado)

    const respuesta: RespuestaEjercicio = {
      ejercicioId: estado.ejercicioActual.id,
      actividadId: estado.ejercicioActual.actividadId,
      leccionId: "",
      categoriaId: "",
      respuestaUsuario: estado.respuestaUsuario,
      esCorrecta: esCorrecto,
      tiempoUtilizado,
      intentos: estado.intentos + 1,
      fecha: tiempoFinal.toISOString(),
      puntuacionObtenida: puntuacion,
      detalles: {
        retroalimentacion: esCorrecto ? "¡Excelente trabajo!" : "Sigue intentando",
        explicacion: esCorrecto
          ? estado.ejercicioActual.explicacionCorrecto
          : estado.ejercicioActual.explicacionIncorrecto,
      },
    }

    setEstado((prev) => ({
      ...prev,
      esCorrecto,
      mostrarExplicacion: true,
      intentos: prev.intentos + 1,
      estado: esCorrecto ? "correcto" : "incorrecto",
      puntuacionObtenida: puntuacion,
    }))

    // Guardar en historial local
    guardarEnHistorial(respuesta)

    return respuesta
  }, [estado])

  // Reiniciar ejercicio actual
  const reiniciarEjercicio = useCallback(() => {
    if (estado.ejercicioActual) {
      setEstado((prev) => ({
        ...prev,
        respuestaUsuario: null,
        esCorrecto: null,
        mostrarExplicacion: false,
        mostrarPista: false,
        tiempoInicio: new Date(),
        tiempoTranscurrido: 0,
        estado: "resolviendo",
        puntuacionObtenida: 0,
      }))
    }
  }, [estado.ejercicioActual])

  // Preparar para el siguiente ejercicio
  const siguienteEjercicio = useCallback(() => {
    setEstado(estadoInicial)
  }, [])

  // Mostrar pista
  const mostrarPistaFunc = useCallback(() => {
    setEstado((prev) => ({
      ...prev,
      mostrarPista: true,
    }))
  }, [])

  // Obtener retroalimentación
  const obtenerRetroalimentacion = useCallback(() => {
    if (!estado.ejercicioActual || estado.esCorrecto === null) {
      return {
        esCorrecto: false,
        mensaje: "",
        explicacion: "",
      }
    }

    return {
      esCorrecto: estado.esCorrecto,
      mensaje: estado.esCorrecto ? "¡Solución Brillante!" : "¡Revisa tu Método!",
      explicacion: estado.esCorrecto
        ? estado.ejercicioActual.explicacionCorrecto
        : estado.ejercicioActual.explicacionIncorrecto,
    }
  }, [estado.ejercicioActual, estado.esCorrecto])

  // Calcular metadata
  const porcentajeCompletado = estado.ejercicioActual
    ? Math.min((estado.tiempoTranscurrido / estado.ejercicioActual.tiempoEstimado) * 100, 100)
    : 0

  const puedeEnviar = estado.respuestaUsuario !== null && estado.estado === "resolviendo"

  const necesitaAyuda = estado.intentos > 0 && porcentajeCompletado > 70

  return {
    estado,
    acciones: {
      iniciarEjercicio,
      establecerRespuesta,
      enviarRespuesta,
      reiniciarEjercicio,
      siguienteEjercicio,
      mostrarPistaFunc,
      obtenerRetroalimentacion,
    },
    metadata: {
      tiempoTranscurrido: estado.tiempoTranscurrido,
      porcentajeCompletado,
      puedeEnviar,
      necesitaAyuda,
    },
  }
}

// Función auxiliar para guardar en historial local
function guardarEnHistorial(respuesta: RespuestaEjercicio) {
  try {
    const historialString = localStorage.getItem("historialEjercicios")
    const historial: RespuestaEjercicio[] = historialString ? JSON.parse(historialString) : []
    historial.push(respuesta)
    // Mantener solo los últimos 100 registros
    const historialRecortado = historial.slice(-100)
    localStorage.setItem("historialEjercicios", JSON.stringify(historialRecortado))
  } catch (error) {
    console.error("Error guardando historial:", error)
  }
}
