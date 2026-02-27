// =============================================================================
// HOOK DE ESTADO DE APLICACIÓN - Matemáticas en Verso
// =============================================================================
// Este hook maneja el estado global de navegación entre categorías,
// lecciones, actividades y ejercicios.
// =============================================================================

"use client"

import { useState, useCallback } from "react"
import type { Categoria, Leccion, Actividad, EjercicioConcreto, EstadoModales } from "@/tipos/dominio"

interface EstadoNavegacion {
  categoriaActual: Categoria | null
  leccionActual: Leccion | null
  actividadActual: Actividad | null
  ejercicioActual: EjercicioConcreto | null
  indiceEjercicio: number
}

interface EstadoModalState {
  modales: EstadoModales
  datosModal: DatosModal | null
}

interface DatosModal {
  puntuacion?: number
  mensaje?: string
  poema?: string
  experiencia?: number
  monedas?: number
}

const estadoInicial: EstadoNavegacion = {
  categoriaActual: null,
  leccionActual: null,
  actividadActual: null,
  ejercicioActual: null,
  indiceEjercicio: 0,
}

const modalesInicial: EstadoModales = {
  respuestaCorrecta: false,
  respuestaIncorrecta: false,
  nivelCompletado: false,
  leccionCompletada: false,
  categoriaCompletada: false,
  añoCompletado: false,
}

export function useEstadoAplicacion() {
  const [navegacion, setNavegacion] = useState<EstadoNavegacion>(estadoInicial)
  const [modalState, setModalState] = useState<EstadoModalState>({
    modales: modalesInicial,
    datosModal: null,
  })

  // Seleccionar categoría
  const seleccionarCategoria = useCallback((categoria: Categoria) => {
    setNavegacion((prev) => ({
      ...prev,
      categoriaActual: categoria,
      leccionActual: null,
      actividadActual: null,
      ejercicioActual: null,
      indiceEjercicio: 0,
    }))
  }, [])

  // Seleccionar lección
  const seleccionarLeccion = useCallback((leccion: Leccion) => {
    setNavegacion((prev) => ({
      ...prev,
      leccionActual: leccion,
      actividadActual: null,
      ejercicioActual: null,
      indiceEjercicio: 0,
    }))
  }, [])

  // Seleccionar actividad
  const seleccionarActividad = useCallback((actividad: Actividad) => {
    const primerEjercicio = actividad.ejercicios[0] || null
    setNavegacion((prev) => ({
      ...prev,
      actividadActual: actividad,
      ejercicioActual: primerEjercicio,
      indiceEjercicio: 0,
    }))
  }, [])

  // Siguiente ejercicio
  const siguienteEjercicio = useCallback(() => {
    setNavegacion((prev) => {
      if (!prev.actividadActual) return prev

      const nuevoIndice = prev.indiceEjercicio + 1
      const ejercicios = prev.actividadActual.ejercicios

      if (nuevoIndice >= ejercicios.length) {
        return prev // No hay más ejercicios
      }

      return {
        ...prev,
        ejercicioActual: ejercicios[nuevoIndice],
        indiceEjercicio: nuevoIndice,
      }
    })
  }, [])

  // Volver al mapa
  const volverAlMapa = useCallback(() => {
    setNavegacion(estadoInicial)
  }, [])

  // Volver a la categoría
  const volverACategoria = useCallback(() => {
    setNavegacion((prev) => ({
      ...prev,
      leccionActual: null,
      actividadActual: null,
      ejercicioActual: null,
      indiceEjercicio: 0,
    }))
  }, [])

  // Volver a la lección
  const volverALeccion = useCallback(() => {
    setNavegacion((prev) => ({
      ...prev,
      actividadActual: null,
      ejercicioActual: null,
      indiceEjercicio: 0,
    }))
  }, [])

  // Abrir modal
  const abrirModal = useCallback((modal: keyof EstadoModales, datos?: DatosModal) => {
    setModalState((prev) => ({
      modales: { ...prev.modales, [modal]: true },
      datosModal: datos || null,
    }))
  }, [])

  // Cerrar modal
  const cerrarModal = useCallback((modal: keyof EstadoModales) => {
    setModalState((prev) => ({
      ...prev,
      modales: { ...prev.modales, [modal]: false },
    }))
  }, [])

  // Cerrar todos los modales
  const cerrarTodosLosModales = useCallback(() => {
    setModalState({
      modales: modalesInicial,
      datosModal: null,
    })
  }, [])

  // Verificar si hay más ejercicios
  const hayMasEjercicios = useCallback(() => {
    if (!navegacion.actividadActual) return false
    return navegacion.indiceEjercicio < navegacion.actividadActual.ejercicios.length - 1
  }, [navegacion.actividadActual, navegacion.indiceEjercicio])

  // Obtener progreso de la actividad
  const obtenerProgresoActividad = useCallback(() => {
    if (!navegacion.actividadActual) return { actual: 0, total: 0, porcentaje: 0 }

    const total = navegacion.actividadActual.ejercicios.length
    const actual = navegacion.indiceEjercicio + 1
    const porcentaje = Math.round((actual / total) * 100)

    return { actual, total, porcentaje }
  }, [navegacion.actividadActual, navegacion.indiceEjercicio])

  return {
    navegacion,
    modales: modalState.modales,
    datosModal: modalState.datosModal,
    acciones: {
      seleccionarCategoria,
      seleccionarLeccion,
      seleccionarActividad,
      siguienteEjercicio,
      volverAlMapa,
      volverACategoria,
      volverALeccion,
      abrirModal,
      cerrarModal,
      cerrarTodosLosModales,
    },
    utilidades: {
      hayMasEjercicios,
      obtenerProgresoActividad,
    },
  }
}
