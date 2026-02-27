// =============================================================================
// HOOK DE AUTENTICACIÓN - Matemáticas en Verso
// =============================================================================
// Este hook maneja todo el estado y las acciones de autenticación.
// =============================================================================

"use client"

import { useState, useEffect, useCallback } from "react"
import { pb, cerrarSesion as cerrarSesionPB } from "@/lib/pocketbase"
import type { Usuario, ProgresoUsuario, EstadisticasUsuario } from "@/tipos/dominio"

interface EstadoAutenticacion {
  usuario: Usuario | null
  cargando: boolean
  error: string | null
}

interface AccionesAutenticacion {
  iniciarSesion: (email: string, contraseña: string) => Promise<boolean>
  registrar: (email: string, contraseña: string, nombre: string) => Promise<boolean>
  cerrarSesion: () => void
  actualizarPerfil: (datos: Partial<Usuario>) => Promise<boolean>
  limpiarError: () => void
}

export interface UseAutenticacionReturn {
  estado: EstadoAutenticacion
  acciones: AccionesAutenticacion
}

export function useAutenticacion(): UseAutenticacionReturn {
  const [estado, setEstado] = useState<EstadoAutenticacion>({
    usuario: null,
    cargando: true,
    error: null,
  })

  // Cargar usuario al iniciar
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        if (pb.authStore.isValid && pb.authStore.model) {
          // Refrescar token
          await pb.collection("usuarios").authRefresh()

          // Obtener datos completos del usuario
          const usuarioData = await pb.collection("usuarios").getOne(pb.authStore.model.id)

          setEstado({
            usuario: usuarioData as unknown as Usuario,
            cargando: false,
            error: null,
          })
        } else {
          setEstado({
            usuario: null,
            cargando: false,
            error: null,
          })
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error)
        pb.authStore.clear()
        setEstado({
          usuario: null,
          cargando: false,
          error: null,
        })
      }
    }

    cargarUsuario()
  }, [])

  // Iniciar sesión
  const iniciarSesion = useCallback(async (email: string, contraseña: string): Promise<boolean> => {
    try {
      setEstado((prev) => ({ ...prev, error: null, cargando: true }))

      const authData = await pb.collection("usuarios").authWithPassword(email, contraseña)

      setEstado({
        usuario: authData.record as unknown as Usuario,
        cargando: false,
        error: null,
      })

      return true
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : "Error al iniciar sesión"
      setEstado((prev) => ({
        ...prev,
        cargando: false,
        error: mensaje,
      }))
      return false
    }
  }, [])

  // Registrar nuevo usuario
  const registrar = useCallback(async (email: string, contraseña: string, nombre: string): Promise<boolean> => {
    try {
      setEstado((prev) => ({ ...prev, error: null, cargando: true }))

      // Crear usuario
      const nuevoUsuario = await pb.collection("usuarios").create({
        email,
        password: contraseña,
        passwordConfirm: contraseña,
        nombre,
        nombreUsuario: email.split("@")[0],
        configuracion: {
          tema: "auto",
          notificaciones: true,
          sonidos: true,
          dificultadPreferida: "medio",
        },
      })

      // Iniciar sesión automáticamente
      await pb.collection("usuarios").authWithPassword(email, contraseña)

      // Crear progreso inicial del usuario
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
        monedas: 500, // Monedas iniciales
      }

      await pb.collection("progreso_usuarios").create({
        usuarioId: nuevoUsuario.id,
        categoriasCompletadas: [],
        leccionesCompletadas: [],
        actividadesCompletadas: [],
        ejerciciosResueltos: [],
        estadisticas: estadisticasIniciales,
      } as Partial<ProgresoUsuario>)

      setEstado({
        usuario: nuevoUsuario as unknown as Usuario,
        cargando: false,
        error: null,
      })

      return true
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : "Error al registrar usuario"
      setEstado((prev) => ({
        ...prev,
        cargando: false,
        error: mensaje,
      }))
      return false
    }
  }, [])

  // Cerrar sesión
  const cerrarSesion = useCallback(() => {
    cerrarSesionPB()
    setEstado({
      usuario: null,
      cargando: false,
      error: null,
    })
  }, [])

  // Actualizar perfil
  const actualizarPerfil = useCallback(
    async (datos: Partial<Usuario>): Promise<boolean> => {
      if (!estado.usuario) return false

      try {
        const usuarioActualizado = await pb.collection("usuarios").update(estado.usuario.id, datos)

        setEstado((prev) => ({
          ...prev,
          usuario: usuarioActualizado as unknown as Usuario,
        }))

        return true
      } catch (error: unknown) {
        const mensaje = error instanceof Error ? error.message : "Error al actualizar perfil"
        setEstado((prev) => ({
          ...prev,
          error: mensaje,
        }))
        return false
      }
    },
    [estado.usuario],
  )

  // Limpiar error
  const limpiarError = useCallback(() => {
    setEstado((prev) => ({ ...prev, error: null }))
  }, [])

  return {
    estado,
    acciones: {
      iniciarSesion,
      registrar,
      cerrarSesion,
      actualizarPerfil,
      limpiarError,
    },
  }
}
