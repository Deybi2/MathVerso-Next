// =============================================================================
// VALIDADORES DE RESPUESTAS - Matemáticas en Verso
// =============================================================================
// Este archivo contiene las funciones para validar las respuestas
// de los ejercicios según su tipo.
// =============================================================================

import type { EjercicioConcreto } from "@/tipos/dominio"

/**
 * Valida la respuesta del usuario para un ejercicio
 */
export function validarRespuesta(ejercicio: EjercicioConcreto, respuestaUsuario: string | number | string[]): boolean {
  if (!ejercicio || respuestaUsuario === null || respuestaUsuario === undefined) {
    return false
  }

  const { tipo, respuestaCorrecta } = ejercicio

  switch (tipo) {
    case "seleccion_multiple":
      return validarSeleccionMultiple(respuestaUsuario, respuestaCorrecta)

    case "respuesta_numerica":
      return validarRespuestaNumerica(respuestaUsuario, respuestaCorrecta)

    case "completar_espacios":
      return validarCompletarEspacios(respuestaUsuario, respuestaCorrecta)

    case "texto_libre":
      return validarTextoLibre(respuestaUsuario)

    default:
      return false
  }
}

/**
 * Valida una respuesta de selección múltiple
 */
function validarSeleccionMultiple(
  respuesta: string | number | string[],
  correcta: string | number | string[],
): boolean {
  if (Array.isArray(correcta)) {
    if (Array.isArray(respuesta)) {
      return arraysIguales(respuesta, correcta)
    }
    return correcta.includes(String(respuesta))
  }
  return String(respuesta) === String(correcta)
}

/**
 * Valida una respuesta numérica
 */
function validarRespuestaNumerica(
  respuesta: string | number | string[],
  correcta: string | number | string[],
): boolean {
  const usuarioNum = Number.parseFloat(String(respuesta))
  const correctoNum = Number.parseFloat(String(correcta))

  if (isNaN(usuarioNum) || isNaN(correctoNum)) return false

  // Permitir margen de error para decimales
  const margenError = 0.001
  return Math.abs(usuarioNum - correctoNum) < margenError
}

/**
 * Valida respuestas de completar espacios
 */
function validarCompletarEspacios(
  respuesta: string | number | string[],
  correcta: string | number | string[],
): boolean {
  if (Array.isArray(correcta) && Array.isArray(respuesta)) {
    return arraysIguales(
      respuesta.map(normalizarTexto),
      correcta.map((v) => normalizarTexto(String(v))),
    )
  }
  return normalizarTexto(String(respuesta)) === normalizarTexto(String(correcta))
}

/**
 * Valida texto libre (solo verifica que tenga contenido mínimo)
 */
function validarTextoLibre(respuesta: string | number | string[]): boolean {
  const texto = normalizarTexto(String(respuesta))
  return texto.length >= 3
}

/**
 * Compara dos arrays ignorando orden
 */
function arraysIguales(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false
  const sorted1 = [...arr1].sort()
  const sorted2 = [...arr2].sort()
  return sorted1.every((item, index) => item === sorted2[index])
}

/**
 * Normaliza texto para comparación
 */
function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .replace(/[^\w\s]/g, "") // Remover puntuación
}

/**
 * Calcula la puntuación obtenida por un ejercicio
 */
export function calcularPuntuacion(ejercicio: EjercicioConcreto, esCorrecto: boolean, tiempoUtilizado: number): number {
  if (!esCorrecto) return 0

  let puntuacionBase = ejercicio.puntos || 10

  // Ajustar por dificultad
  switch (ejercicio.dificultad) {
    case "facil":
      puntuacionBase *= 1
      break
    case "medio":
      puntuacionBase *= 1.5
      break
    case "dificil":
      puntuacionBase *= 2
      break
  }

  // Bonus por velocidad
  const tiempoOptimo = ejercicio.tiempoEstimado
  const ratioTiempo = tiempoUtilizado / tiempoOptimo

  if (ratioTiempo <= 0.5) {
    puntuacionBase += 10 // Muy rápido
  } else if (ratioTiempo <= 0.8) {
    puntuacionBase += 5 // Rápido
  }

  return Math.round(puntuacionBase)
}

/**
 * Formatea el tiempo en formato mm:ss
 */
export function formatearTiempo(segundos: number): string {
  const mins = Math.floor(segundos / 60)
  const secs = Math.floor(segundos % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
