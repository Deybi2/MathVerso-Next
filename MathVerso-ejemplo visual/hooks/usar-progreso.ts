// =============================================================================
// HOOK DE PROGRESO - Matemáticas en Verso
// =============================================================================
// Este hook maneja el progreso del usuario: actualización, persistencia
// y sincronización con PocketBase.
// =============================================================================

"use client"

import { useState, useCallback, useEffect } from "react"
import type {
  ProgresoUsuario,
  ProgresoCategoria,
  ProgresoLeccion,
  ProgresoActividad,
  ProgresoEjercicio,
  EstadisticasUsuario,
  RespuestaEjercicio,
} from "@/tipos/dominio"
import { pb, actualizarRegistro } from "@/lib/pocketbase"

const estadisticasIniciales: EstadisticasUsuario = {
  puntuacionTotal: 0,
  ejerciciosTotales: 0,
  ejerciciosCorrectos: 0,
  tiempoTotal: 0,
  rachaActual: 0,
  rachaMaxima: 0,
  poemasColeccionados: [],
  logrosDesbloqueados: [],
  ultimaActividad: new Date().toISOString(),
  nivel: 1,
  experiencia: 0,
  monedas: 500,
}

interface UseProgresoReturn {
  progreso: ProgresoUsuario | null
  cargando: boolean
  error: string | null
  acciones: {
    cargarProgreso: (usuarioId: string) => Promise<void>
    registrarEjercicioCompletado: (respuesta: RespuestaEjercicio) => Promise<void>
    marcarActividadCompletada: (actividadId: string, puntuacion: number) => Promise<void>
    marcarLeccionCompletada: (leccionId: string, puntuacion: number) => Promise<void>
    marcarCategoriaCompletada: (categoriaId: string) => Promise<void>
    agregarPoema: (poemaId: string) => Promise<void>
    agregarLogro: (logroId: string) => Promise<void>
    incrementarMonedas: (cantidad: number) => Promise<void>
    incrementarExperiencia: (cantidad: number) => Promise<void>
    actualizarRacha: () => Promise<void>
    sincronizarConServidor: () => Promise<void>
  }
  estadisticas: EstadisticasUsuario
}

export function useProgreso(usuarioId?: string): UseProgresoReturn {
  const [progreso, setProgreso] = useState<ProgresoUsuario | null>(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cargar progreso del usuario
  const cargarProgreso = useCallback(async (id: string) => {
    setCargando(true)
    setError(null)

    try {
      const resultado = await pb.collection("progreso_usuarios").getFirstListItem(`usuarioId="${id}"`)

      setProgreso(resultado as unknown as ProgresoUsuario)
    } catch (err) {
      console.error("Error cargando progreso:", err)

      // Si no existe, crear progreso inicial
      try {
        const nuevoProgreso = await pb.collection("progreso_usuarios").create({
          usuarioId: id,
          categoriasCompletadas: [],
          leccionesCompletadas: [],
          actividadesCompletadas: [],
          ejerciciosResueltos: [],
          estadisticas: estadisticasIniciales,
        })

        setProgreso(nuevoProgreso as unknown as ProgresoUsuario)
      } catch (createErr) {
        setError("Error creando progreso inicial")
        console.error("Error creando progreso:", createErr)
      }
    } finally {
      setCargando(false)
    }
  }, [])

  // Cargar progreso al montar si hay usuarioId
  useEffect(() => {
    if (usuarioId) {
      cargarProgreso(usuarioId)
    }
  }, [usuarioId, cargarProgreso])

  // Registrar ejercicio completado
  const registrarEjercicioCompletado = useCallback(
    async (respuesta: RespuestaEjercicio) => {
      if (!progreso) return

      const nuevoProgresoEjercicio: ProgresoEjercicio = {
        ejercicioId: respuesta.ejercicioId,
        resuelto: true,
        esCorrecto: respuesta.esCorrecta,
        fechaResolucion: respuesta.fecha,
        tiempoUtilizado: respuesta.tiempoUtilizado,
        intentos: respuesta.intentos,
        respuestaUsuario: respuesta.respuestaUsuario,
      }

      const nuevasEstadisticas = { ...progreso.estadisticas }
      nuevasEstadisticas.ejerciciosTotales += 1
      nuevasEstadisticas.tiempoTotal += respuesta.tiempoUtilizado

      if (respuesta.esCorrecta) {
        nuevasEstadisticas.ejerciciosCorrectos += 1
        nuevasEstadisticas.puntuacionTotal += respuesta.puntuacionObtenida
        nuevasEstadisticas.rachaActual += 1
        nuevasEstadisticas.rachaMaxima = Math.max(nuevasEstadisticas.rachaMaxima, nuevasEstadisticas.rachaActual)

        // Calcular experiencia ganada
        const xpGanado = Math.floor(respuesta.puntuacionObtenida / 2)
        nuevasEstadisticas.experiencia += xpGanado

        // Verificar si sube de nivel
        const xpParaNivel = nuevasEstadisticas.nivel * 100
        if (nuevasEstadisticas.experiencia >= xpParaNivel) {
          nuevasEstadisticas.nivel += 1
          nuevasEstadisticas.experiencia -= xpParaNivel
          nuevasEstadisticas.monedas += 50 // Bonus por subir de nivel
        }
      } else {
        nuevasEstadisticas.rachaActual = 0
      }

      nuevasEstadisticas.ultimaActividad = new Date().toISOString()

      const nuevoProgreso: ProgresoUsuario = {
        ...progreso,
        ejerciciosResueltos: [...progreso.ejerciciosResueltos, nuevoProgresoEjercicio],
        estadisticas: nuevasEstadisticas,
      }

      setProgreso(nuevoProgreso)

      // Sincronizar con servidor
      await actualizarRegistro("progreso_usuarios", progreso.id, {
        ejerciciosResueltos: nuevoProgreso.ejerciciosResueltos,
        estadisticas: nuevoProgreso.estadisticas,
      })
    },
    [progreso],
  )

  // Marcar actividad completada
  const marcarActividadCompletada = useCallback(
    async (actividadId: string, puntuacion: number) => {
      if (!progreso) return

      const nuevaActividad: ProgresoActividad = {
        actividadId,
        completada: true,
        fechaCompletado: new Date().toISOString(),
        puntuacion,
        tiempoPromedio: 0,
      }

      const nuevoProgreso: ProgresoUsuario = {
        ...progreso,
        actividadesCompletadas: [...progreso.actividadesCompletadas, nuevaActividad],
      }

      setProgreso(nuevoProgreso)

      await actualizarRegistro("progreso_usuarios", progreso.id, {
        actividadesCompletadas: nuevoProgreso.actividadesCompletadas,
      })
    },
    [progreso],
  )

  // Marcar lección completada
  const marcarLeccionCompletada = useCallback(
    async (leccionId: string, puntuacion: number) => {
      if (!progreso) return

      const nuevaLeccion: ProgresoLeccion = {
        leccionId,
        completada: true,
        fechaCompletado: new Date().toISOString(),
        puntuacion,
        intentos: 1,
      }

      const nuevoProgreso: ProgresoUsuario = {
        ...progreso,
        leccionesCompletadas: [...progreso.leccionesCompletadas, nuevaLeccion],
      }

      setProgreso(nuevoProgreso)

      await actualizarRegistro("progreso_usuarios", progreso.id, {
        leccionesCompletadas: nuevoProgreso.leccionesCompletadas,
      })
    },
    [progreso],
  )

  // Marcar categoría completada
  const marcarCategoriaCompletada = useCallback(
    async (categoriaId: string) => {
      if (!progreso) return

      const nuevaCategoria: ProgresoCategoria = {
        categoriaId,
        completada: true,
        fechaCompletado: new Date().toISOString(),
        puntuacion: 0,
        tiempoTotal: 0,
      }

      const nuevoProgreso: ProgresoUsuario = {
        ...progreso,
        categoriasCompletadas: [...progreso.categoriasCompletadas, nuevaCategoria],
      }

      setProgreso(nuevoProgreso)

      await actualizarRegistro("progreso_usuarios", progreso.id, {
        categoriasCompletadas: nuevoProgreso.categoriasCompletadas,
      })
    },
    [progreso],
  )

  // Agregar poema coleccionado
  const agregarPoema = useCallback(
    async (poemaId: string) => {
      if (!progreso) return
      if (progreso.estadisticas.poemasColeccionados.includes(poemaId)) return

      const nuevasEstadisticas = {
        ...progreso.estadisticas,
        poemasColeccionados: [...progreso.estadisticas.poemasColeccionados, poemaId],
      }

      setProgreso({ ...progreso, estadisticas: nuevasEstadisticas })

      await actualizarRegistro("progreso_usuarios", progreso.id, {
        estadisticas: nuevasEstadisticas,
      })
    },
    [progreso],
  )

  // Agregar logro desbloqueado
  const agregarLogro = useCallback(
    async (logroId: string) => {
      if (!progreso) return
      if (progreso.estadisticas.logrosDesbloqueados.includes(logroId)) return

      const nuevasEstadisticas = {
        ...progreso.estadisticas,
        logrosDesbloqueados: [...progreso.estadisticas.logrosDesbloqueados, logroId],
        monedas: progreso.estadisticas.monedas + 100, // Bonus por logro
      }

      setProgreso({ ...progreso, estadisticas: nuevasEstadisticas })

      await actualizarRegistro("progreso_usuarios", progreso.id, {
        estadisticas: nuevasEstadisticas,
      })
    },
    [progreso],
  )

  // Incrementar monedas
  const incrementarMonedas = useCallback(
    async (cantidad: number) => {
      if (!progreso) return

      const nuevasEstadisticas = {
        ...progreso.estadisticas,
        monedas: progreso.estadisticas.monedas + cantidad,
      }

      setProgreso({ ...progreso, estadisticas: nuevasEstadisticas })

      await actualizarRegistro("progreso_usuarios", progreso.id, {
        estadisticas: nuevasEstadisticas,
      })
    },
    [progreso],
  )

  // Incrementar experiencia
  const incrementarExperiencia = useCallback(
    async (cantidad: number) => {
      if (!progreso) return

      const nuevasEstadisticas = { ...progreso.estadisticas }
      nuevasEstadisticas.experiencia += cantidad

      // Verificar si sube de nivel
      const xpParaNivel = nuevasEstadisticas.nivel * 100
      while (nuevasEstadisticas.experiencia >= xpParaNivel) {
        nuevasEstadisticas.nivel += 1
        nuevasEstadisticas.experiencia -= xpParaNivel
        nuevasEstadisticas.monedas += 50
      }

      setProgreso({ ...progreso, estadisticas: nuevasEstadisticas })

      await actualizarRegistro("progreso_usuarios", progreso.id, {
        estadisticas: nuevasEstadisticas,
      })
    },
    [progreso],
  )

  // Actualizar racha
  const actualizarRacha = useCallback(async () => {
    if (!progreso) return

    const hoy = new Date().toDateString()
    const ultimaActividad = new Date(progreso.estadisticas.ultimaActividad).toDateString()

    let nuevaRacha = progreso.estadisticas.rachaActual

    if (hoy !== ultimaActividad) {
      const ayer = new Date()
      ayer.setDate(ayer.getDate() - 1)

      if (ultimaActividad === ayer.toDateString()) {
        nuevaRacha += 1
      } else {
        nuevaRacha = 1
      }
    }

    const nuevasEstadisticas = {
      ...progreso.estadisticas,
      rachaActual: nuevaRacha,
      rachaMaxima: Math.max(progreso.estadisticas.rachaMaxima, nuevaRacha),
      ultimaActividad: new Date().toISOString(),
    }

    setProgreso({ ...progreso, estadisticas: nuevasEstadisticas })

    await actualizarRegistro("progreso_usuarios", progreso.id, {
      estadisticas: nuevasEstadisticas,
    })
  }, [progreso])

  // Sincronizar con servidor
  const sincronizarConServidor = useCallback(async () => {
    if (!progreso) return

    try {
      await actualizarRegistro("progreso_usuarios", progreso.id, progreso)
    } catch (err) {
      console.error("Error sincronizando:", err)
      setError("Error al sincronizar con el servidor")
    }
  }, [progreso])

  return {
    progreso,
    cargando,
    error,
    acciones: {
      cargarProgreso,
      registrarEjercicioCompletado,
      marcarActividadCompletada,
      marcarLeccionCompletada,
      marcarCategoriaCompletada,
      agregarPoema,
      agregarLogro,
      incrementarMonedas,
      incrementarExperiencia,
      actualizarRacha,
      sincronizarConServidor,
    },
    estadisticas: progreso?.estadisticas || estadisticasIniciales,
  }
}
