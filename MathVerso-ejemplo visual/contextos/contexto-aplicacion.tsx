// =============================================================================
// CONTEXTO DE APLICACIÓN - Matemáticas en Verso
// =============================================================================
// Provee el estado global de la aplicación con persistencia en localStorage.
// =============================================================================

"use client"

import { useState } from "react"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import {
  type EstadoGlobal,
  type UsuarioGuardado,
  type MisionDiaria,
  ESTADO_INICIAL,
  ESTADO_ADMIN,
} from "@/tipos/estado-global"

// -----------------------------------------------------------------------------
// Tipos de Acciones
// -----------------------------------------------------------------------------

type AccionEstado =
  | { type: "INICIAR_SESION"; payload: UsuarioGuardado }
  | { type: "CERRAR_SESION" }
  | { type: "CARGAR_ESTADO"; payload: EstadoGlobal }
  | { type: "AGREGAR_MONEDAS"; payload: number }
  | { type: "RESTAR_MONEDAS"; payload: number }
  | { type: "AGREGAR_EXPERIENCIA"; payload: number }
  | { type: "AGREGAR_ESTRELLAS"; payload: number }
  | { type: "PENALIZAR_ERROR"; payload: number }
  | { type: "COMPLETAR_EJERCICIO"; payload: { ejercicioId: string; correcto: boolean; xp: number; monedas: number } }
  | { type: "COMPLETAR_ACTIVIDAD"; payload: { actividadId: string; siguienteActividadId?: string } }
  | { type: "COMPLETAR_LECCION"; payload: { leccionId: string; siguienteLeccionId?: string } }
  | { type: "COMPLETAR_CATEGORIA"; payload: { categoriaId: string; siguienteCategoriaId?: string } }
  | { type: "DESBLOQUEAR_LECCION"; payload: string }
  | { type: "DESBLOQUEAR_ACTIVIDAD"; payload: string }
  | { type: "DESBLOQUEAR_CATEGORIA"; payload: string }
  | { type: "USAR_PISTA" }
  | { type: "COMPRAR_PISTAS"; payload: number }
  | { type: "ACTIVAR_DOBLE_XP"; payload: number } // días de duración
  | { type: "ACTIVAR_PROTECCION_RACHA"; payload: number }
  | { type: "DESBLOQUEAR_FRAGMENTO"; payload: string }
  | { type: "DESBLOQUEAR_POEMA"; payload: string }
  | { type: "ACTUALIZAR_RACHA" }
  | { type: "GENERAR_MISIONES_DIARIAS" }
  | { type: "ACTUALIZAR_PROGRESO_MISION"; payload: { misionId: string; progreso: number } }
  | { type: "COMPLETAR_MISION"; payload: string }
  | { type: "ACTUALIZAR_CONFIGURACION"; payload: Partial<EstadoGlobal["configuracion"]> }
  | { type: "DESBLOQUEAR_LOGRO"; payload: string }

// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------

function reducerEstado(estado: EstadoGlobal, accion: AccionEstado): EstadoGlobal {
  switch (accion.type) {
    case "INICIAR_SESION": {
      const esAdmin = accion.payload.esAdmin
      const estadoBase = esAdmin ? ESTADO_ADMIN : ESTADO_INICIAL
      return {
        ...estadoBase,
        usuarioActual: accion.payload,
      }
    }

    case "CERRAR_SESION":
      return ESTADO_INICIAL

    case "CARGAR_ESTADO":
      return accion.payload

    case "AGREGAR_MONEDAS":
      return {
        ...estado,
        estadisticas: {
          ...estado.estadisticas,
          monedas: estado.estadisticas.monedas + accion.payload,
        },
      }

    case "RESTAR_MONEDAS":
      return {
        ...estado,
        estadisticas: {
          ...estado.estadisticas,
          monedas: Math.max(0, estado.estadisticas.monedas - accion.payload),
        },
      }

    case "AGREGAR_EXPERIENCIA": {
      let nuevaExperiencia = estado.estadisticas.experiencia + accion.payload
      let nuevoNivel = estado.estadisticas.nivel
      let xpParaSiguiente = estado.estadisticas.experienciaParaSiguienteNivel
      let monedasBonus = 0

      // Aplicar doble XP si está activo
      if (estado.inventario.dobleXPActivo) {
        const fechaFin = estado.inventario.dobleXPHastaFecha
        if (fechaFin && new Date(fechaFin) > new Date()) {
          nuevaExperiencia = estado.estadisticas.experiencia + accion.payload * 2
        }
      }

      // Subir de nivel si corresponde
      while (nuevaExperiencia >= xpParaSiguiente) {
        nuevaExperiencia -= xpParaSiguiente
        nuevoNivel += 1
        xpParaSiguiente = nuevoNivel * 100
        monedasBonus += 50 // Bonus por subir de nivel
      }

      return {
        ...estado,
        estadisticas: {
          ...estado.estadisticas,
          experiencia: nuevaExperiencia,
          nivel: nuevoNivel,
          experienciaParaSiguienteNivel: xpParaSiguiente,
          monedas: estado.estadisticas.monedas + monedasBonus,
        },
      }
    }

    case "AGREGAR_ESTRELLAS":
      return {
        ...estado,
        estadisticas: {
          ...estado.estadisticas,
          estrellas: estado.estadisticas.estrellas + accion.payload,
        },
      }

    case "PENALIZAR_ERROR": {
      // Penalización por error: quitar XP (mínimo 0)
      const xpPenalizado = Math.min(accion.payload, estado.estadisticas.experiencia)
      return {
        ...estado,
        estadisticas: {
          ...estado.estadisticas,
          experiencia: estado.estadisticas.experiencia - xpPenalizado,
          rachaActual: estado.inventario.proteccionRachaActiva ? estado.estadisticas.rachaActual : 0,
        },
      }
    }

    case "COMPLETAR_EJERCICIO": {
      const { ejercicioId, correcto, xp, monedas } = accion.payload
      const nuevosEjercicios = estado.progreso.ejerciciosCompletados.includes(ejercicioId)
        ? estado.progreso.ejerciciosCompletados
        : [...estado.progreso.ejerciciosCompletados, ejercicioId]

      let nuevaExperiencia = estado.estadisticas.experiencia
      let nuevasMonedas = estado.estadisticas.monedas
      let nuevaRacha = estado.estadisticas.rachaActual
      let nuevasEstrellas = estado.estadisticas.estrellas

      if (correcto) {
        nuevaExperiencia += xp
        nuevasMonedas += monedas
        nuevaRacha += 1
        nuevasEstrellas += Math.floor(xp / 2)
      } else {
        // Penalización por error
        nuevaExperiencia = Math.max(0, nuevaExperiencia - 5)
        if (!estado.inventario.proteccionRachaActiva) {
          nuevaRacha = 0
        }
      }

      // Verificar subida de nivel
      let nuevoNivel = estado.estadisticas.nivel
      let xpParaSiguiente = estado.estadisticas.experienciaParaSiguienteNivel
      while (nuevaExperiencia >= xpParaSiguiente) {
        nuevaExperiencia -= xpParaSiguiente
        nuevoNivel += 1
        xpParaSiguiente = nuevoNivel * 100
        nuevasMonedas += 50
      }

      return {
        ...estado,
        estadisticas: {
          ...estado.estadisticas,
          experiencia: nuevaExperiencia,
          monedas: nuevasMonedas,
          nivel: nuevoNivel,
          experienciaParaSiguienteNivel: xpParaSiguiente,
          estrellas: nuevasEstrellas,
          rachaActual: nuevaRacha,
          rachaMaxima: Math.max(estado.estadisticas.rachaMaxima, nuevaRacha),
          ejerciciosTotales: estado.estadisticas.ejerciciosTotales + 1,
          ejerciciosCorrectos: estado.estadisticas.ejerciciosCorrectos + (correcto ? 1 : 0),
          ultimaActividad: new Date().toISOString(),
        },
        progreso: {
          ...estado.progreso,
          ejerciciosCompletados: nuevosEjercicios,
        },
      }
    }

    case "COMPLETAR_ACTIVIDAD": {
      const { actividadId, siguienteActividadId } = accion.payload
      const nuevasActividadesCompletadas = estado.progreso.actividadesCompletadas.includes(actividadId)
        ? estado.progreso.actividadesCompletadas
        : [...estado.progreso.actividadesCompletadas, actividadId]

      let nuevasDesbloqueadas = estado.progreso.actividadesDesbloqueadas
      if (siguienteActividadId && !nuevasDesbloqueadas.includes(siguienteActividadId)) {
        nuevasDesbloqueadas = [...nuevasDesbloqueadas, siguienteActividadId]
      }

      return {
        ...estado,
        progreso: {
          ...estado.progreso,
          actividadesCompletadas: nuevasActividadesCompletadas,
          actividadesDesbloqueadas: nuevasDesbloqueadas,
        },
      }
    }

    case "COMPLETAR_LECCION": {
      const { leccionId, siguienteLeccionId } = accion.payload
      const nuevasLeccionesCompletadas = estado.progreso.leccionesCompletadas.includes(leccionId)
        ? estado.progreso.leccionesCompletadas
        : [...estado.progreso.leccionesCompletadas, leccionId]

      let nuevasDesbloqueadas = estado.progreso.leccionesDesbloqueadas
      if (siguienteLeccionId && !nuevasDesbloqueadas.includes(siguienteLeccionId)) {
        nuevasDesbloqueadas = [...nuevasDesbloqueadas, siguienteLeccionId]
      }

      return {
        ...estado,
        progreso: {
          ...estado.progreso,
          leccionesCompletadas: nuevasLeccionesCompletadas,
          leccionesDesbloqueadas: nuevasDesbloqueadas,
        },
      }
    }

    case "COMPLETAR_CATEGORIA": {
      const { categoriaId, siguienteCategoriaId } = accion.payload
      const nuevasCategoriasCompletadas = estado.progreso.categoriasCompletadas.includes(categoriaId)
        ? estado.progreso.categoriasCompletadas
        : [...estado.progreso.categoriasCompletadas, categoriaId]

      let nuevasDesbloqueadas = estado.progreso.categoriasDesbloqueadas
      if (siguienteCategoriaId && !nuevasDesbloqueadas.includes(siguienteCategoriaId)) {
        nuevasDesbloqueadas = [...nuevasDesbloqueadas, siguienteCategoriaId]
      }

      return {
        ...estado,
        progreso: {
          ...estado.progreso,
          categoriasCompletadas: nuevasCategoriasCompletadas,
          categoriasDesbloqueadas: nuevasDesbloqueadas,
        },
      }
    }

    case "DESBLOQUEAR_LECCION":
      if (estado.progreso.leccionesDesbloqueadas.includes(accion.payload)) {
        return estado
      }
      return {
        ...estado,
        progreso: {
          ...estado.progreso,
          leccionesDesbloqueadas: [...estado.progreso.leccionesDesbloqueadas, accion.payload],
        },
      }

    case "DESBLOQUEAR_ACTIVIDAD":
      if (estado.progreso.actividadesDesbloqueadas.includes(accion.payload)) {
        return estado
      }
      return {
        ...estado,
        progreso: {
          ...estado.progreso,
          actividadesDesbloqueadas: [...estado.progreso.actividadesDesbloqueadas, accion.payload],
        },
      }

    case "DESBLOQUEAR_CATEGORIA":
      if (estado.progreso.categoriasDesbloqueadas.includes(accion.payload)) {
        return estado
      }
      return {
        ...estado,
        progreso: {
          ...estado.progreso,
          categoriasDesbloqueadas: [...estado.progreso.categoriasDesbloqueadas, accion.payload],
        },
      }

    case "USAR_PISTA":
      if (estado.inventario.pistasDisponibles <= 0) return estado
      return {
        ...estado,
        inventario: {
          ...estado.inventario,
          pistasDisponibles: estado.inventario.pistasDisponibles - 1,
        },
      }

    case "COMPRAR_PISTAS":
      return {
        ...estado,
        inventario: {
          ...estado.inventario,
          pistasDisponibles: estado.inventario.pistasDisponibles + accion.payload,
        },
      }

    case "ACTIVAR_DOBLE_XP": {
      const fechaFin = new Date()
      fechaFin.setDate(fechaFin.getDate() + accion.payload)
      return {
        ...estado,
        inventario: {
          ...estado.inventario,
          dobleXPActivo: true,
          dobleXPHastaFecha: fechaFin.toISOString(),
        },
      }
    }

    case "ACTIVAR_PROTECCION_RACHA": {
      const fechaFin = new Date()
      fechaFin.setDate(fechaFin.getDate() + accion.payload)
      return {
        ...estado,
        inventario: {
          ...estado.inventario,
          proteccionRachaActiva: true,
          proteccionRachaHastaFecha: fechaFin.toISOString(),
        },
      }
    }

    case "DESBLOQUEAR_FRAGMENTO":
      if (estado.inventario.fragmentosPoemas.includes(accion.payload)) {
        return estado
      }
      return {
        ...estado,
        inventario: {
          ...estado.inventario,
          fragmentosPoemas: [...estado.inventario.fragmentosPoemas, accion.payload],
        },
      }

    case "DESBLOQUEAR_POEMA":
      if (estado.inventario.poemasDesbloqueados.includes(accion.payload)) {
        return estado
      }
      return {
        ...estado,
        inventario: {
          ...estado.inventario,
          poemasDesbloqueados: [...estado.inventario.poemasDesbloqueados, accion.payload],
        },
      }

    case "ACTUALIZAR_RACHA": {
      const hoy = new Date().toDateString()
      const ultimaActividad = estado.estadisticas.ultimaActividad
        ? new Date(estado.estadisticas.ultimaActividad).toDateString()
        : null

      if (hoy === ultimaActividad) return estado

      const ayer = new Date()
      ayer.setDate(ayer.getDate() - 1)
      const ayerStr = ayer.toDateString()

      let nuevaRacha = estado.estadisticas.rachaActual
      if (ultimaActividad === ayerStr) {
        nuevaRacha += 1
      } else if (ultimaActividad !== hoy) {
        // Si no jugó ayer y no tiene protección, reiniciar racha
        if (!estado.inventario.proteccionRachaActiva) {
          nuevaRacha = 1
        }
      }

      return {
        ...estado,
        estadisticas: {
          ...estado.estadisticas,
          rachaActual: nuevaRacha,
          rachaMaxima: Math.max(estado.estadisticas.rachaMaxima, nuevaRacha),
          ultimaActividad: new Date().toISOString(),
        },
      }
    }

    case "GENERAR_MISIONES_DIARIAS": {
      const hoy = new Date().toDateString()
      const misionesActuales = estado.misionesDiarias

      // Si ya se generaron hoy, no regenerar
      if (misionesActuales.length > 0 && new Date(misionesActuales[0].fechaAsignada).toDateString() === hoy) {
        return estado
      }

      const nuevasMisiones: MisionDiaria[] = [
        {
          id: `mision-${Date.now()}-1`,
          titulo: "Matemático Matutino",
          descripcion: "Completa 5 ejercicios",
          tipo: "ejercicios",
          objetivo: 5,
          progresoActual: 0,
          completada: false,
          recompensaXP: 50,
          recompensaMonedas: 25,
          fechaAsignada: new Date().toISOString(),
        },
        {
          id: `mision-${Date.now()}-2`,
          titulo: "Perfeccionista",
          descripcion: "Responde 3 ejercicios sin errores",
          tipo: "perfecto",
          objetivo: 3,
          progresoActual: 0,
          completada: false,
          recompensaXP: 75,
          recompensaMonedas: 40,
          fechaAsignada: new Date().toISOString(),
        },
        {
          id: `mision-${Date.now()}-3`,
          titulo: "Constancia",
          descripcion: "Mantén tu racha activa",
          tipo: "racha",
          objetivo: 1,
          progresoActual: estado.estadisticas.rachaActual > 0 ? 1 : 0,
          completada: estado.estadisticas.rachaActual > 0,
          recompensaXP: 30,
          recompensaMonedas: 15,
          fechaAsignada: new Date().toISOString(),
        },
      ]

      return {
        ...estado,
        misionesDiarias: nuevasMisiones,
      }
    }

    case "ACTUALIZAR_PROGRESO_MISION": {
      const { misionId, progreso } = accion.payload
      return {
        ...estado,
        misionesDiarias: estado.misionesDiarias.map((mision) =>
          mision.id === misionId
            ? {
                ...mision,
                progresoActual: Math.min(progreso, mision.objetivo),
                completada: progreso >= mision.objetivo,
              }
            : mision,
        ),
      }
    }

    case "COMPLETAR_MISION": {
      const mision = estado.misionesDiarias.find((m) => m.id === accion.payload)
      if (!mision || mision.completada) return estado

      return {
        ...estado,
        estadisticas: {
          ...estado.estadisticas,
          experiencia: estado.estadisticas.experiencia + mision.recompensaXP,
          monedas: estado.estadisticas.monedas + mision.recompensaMonedas,
        },
        misionesDiarias: estado.misionesDiarias.map((m) => (m.id === accion.payload ? { ...m, completada: true } : m)),
      }
    }

    case "ACTUALIZAR_CONFIGURACION":
      return {
        ...estado,
        configuracion: {
          ...estado.configuracion,
          ...accion.payload,
        },
      }

    case "DESBLOQUEAR_LOGRO":
      if (estado.inventario.logrosDesbloqueados.includes(accion.payload)) {
        return estado
      }
      return {
        ...estado,
        inventario: {
          ...estado.inventario,
          logrosDesbloqueados: [...estado.inventario.logrosDesbloqueados, accion.payload],
        },
        estadisticas: {
          ...estado.estadisticas,
          monedas: estado.estadisticas.monedas + 100, // Bonus por logro
        },
      }

    default:
      return estado
  }
}

// -----------------------------------------------------------------------------
// Contexto
// -----------------------------------------------------------------------------

interface ContextoAplicacionType {
  estado: EstadoGlobal
  dispatch: React.Dispatch<AccionEstado>
  guardarEstado: () => void
}

const ContextoAplicacion = createContext<ContextoAplicacionType | null>(null)

// -----------------------------------------------------------------------------
// Provider
// -----------------------------------------------------------------------------

const CLAVE_STORAGE = "mathverso_estado"
const CLAVE_USUARIOS = "mathverso_usuarios"

export function ProveedorAplicacion({ children }: { children: ReactNode }) {
  const [estado, dispatch] = useReducer(reducerEstado, ESTADO_INICIAL)
  const [cargado, setCargado] = useState(false)

  // Cargar estado al iniciar
  useEffect(() => {
    try {
      const estadoGuardado = localStorage.getItem(CLAVE_STORAGE)
      if (estadoGuardado) {
        const estadoParseado = JSON.parse(estadoGuardado) as EstadoGlobal
        dispatch({ type: "CARGAR_ESTADO", payload: estadoParseado })
      }

      // Crear cuenta admin si no existe
      const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS)
      const usuarios: UsuarioGuardado[] = usuariosGuardados ? JSON.parse(usuariosGuardados) : []
      const adminExiste = usuarios.some((u) => u.email === "admin@mathverso.com")

      if (!adminExiste) {
        const adminUser: UsuarioGuardado = {
          id: "admin-001",
          email: "admin@mathverso.com",
          nombreUsuario: "Admin",
          nombre: "Administrador",
          contraseña: "admin123",
          esAdmin: true,
          fechaRegistro: new Date().toISOString(),
        }
        usuarios.push(adminUser)
        localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))
      }
    } catch (error) {
      console.error("Error cargando estado:", error)
    }
    setCargado(true)
  }, [])

  // Guardar estado cuando cambie
  useEffect(() => {
    if (cargado && estado.usuarioActual) {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(estado))
    }
  }, [estado, cargado])

  const guardarEstado = () => {
    if (estado.usuarioActual) {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(estado))
    }
  }

  if (!cargado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-amber-700">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <ContextoAplicacion.Provider value={{ estado, dispatch, guardarEstado }}>{children}</ContextoAplicacion.Provider>
  )
}

// -----------------------------------------------------------------------------
// Hook personalizado
// -----------------------------------------------------------------------------

export function useAplicacion() {
  const contexto = useContext(ContextoAplicacion)
  if (!contexto) {
    throw new Error("useAplicacion debe usarse dentro de ProveedorAplicacion")
  }
  return contexto
}

// -----------------------------------------------------------------------------
// Funciones de utilidad para usuarios
// -----------------------------------------------------------------------------

export function obtenerUsuarios(): UsuarioGuardado[] {
  if (typeof window === "undefined") return []
  const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS)
  return usuariosGuardados ? JSON.parse(usuariosGuardados) : []
}

export function guardarUsuario(usuario: UsuarioGuardado): boolean {
  const usuarios = obtenerUsuarios()
  const existe = usuarios.some((u) => u.email === usuario.email)
  if (existe) return false

  usuarios.push(usuario)
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))
  return true
}

export function buscarUsuarioPorEmail(email: string): UsuarioGuardado | null {
  const usuarios = obtenerUsuarios()
  return usuarios.find((u) => u.email === email) || null
}

export function validarCredenciales(email: string, contraseña: string): UsuarioGuardado | null {
  const usuario = buscarUsuarioPorEmail(email)
  if (usuario && usuario.contraseña === contraseña) {
    return usuario
  }
  return null
}

export function obtenerEstadoUsuario(usuarioId: string): EstadoGlobal | null {
  if (typeof window === "undefined") return null
  const clave = `mathverso_estado_${usuarioId}`
  const estadoGuardado = localStorage.getItem(clave)
  return estadoGuardado ? JSON.parse(estadoGuardado) : null
}

export function guardarEstadoUsuario(usuarioId: string, estado: EstadoGlobal): void {
  if (typeof window === "undefined") return
  const clave = `mathverso_estado_${usuarioId}`
  localStorage.setItem(clave, JSON.stringify(estado))
}
