// =============================================================================
// SERVICIO DE AUTENTICACIÓN (POCKETBASE)
// =============================================================================
// Este archivo encapsula toda la comunicación externa con PocketBase para
// mantener las pantallas limpias y facilitar futuros cambios de backend.
// =============================================================================

import { ClientResponseError } from "pocketbase"
import { pb } from "@/lib/pocketbase"
import type { UsuarioGuardado } from "@/tipos/estado-global"

interface RegistrarUsuarioParams {
  email: string
  contraseña: string
  nombreUsuario: string
}

const COLECCION_USUARIOS = "usuarios"
const COLECCION_PROGRESO = "progreso_usuarios"

const construirUsuarioApp = (registro: Record<string, unknown>): UsuarioGuardado => {
  const email = String(registro.email ?? "")
  const nombreUsuario = String(registro.nombreUsuario ?? email.split("@")[0] ?? "Usuario")

  return {
    id: String(registro.id ?? ""),
    email,
    nombreUsuario,
    nombre: String(registro.nombre ?? nombreUsuario),
    contraseña: "",
    esAdmin: Boolean(registro.esAdmin ?? false),
    fechaRegistro: String(registro.created ?? new Date().toISOString()),
  }
}

export async function iniciarSesionPocketBase(email: string, contraseña: string): Promise<UsuarioGuardado> {
  const authData = await pb.collection(COLECCION_USUARIOS).authWithPassword(email, contraseña)
  return construirUsuarioApp(authData.record as unknown as Record<string, unknown>)
}

export async function registrarUsuarioPocketBase({
  email,
  contraseña,
  nombreUsuario,
}: RegistrarUsuarioParams): Promise<UsuarioGuardado> {
  const nuevoUsuario = await pb.collection(COLECCION_USUARIOS).create({
    email,
    password: contraseña,
    passwordConfirm: contraseña,
    nombre: nombreUsuario,
    nombreUsuario,
  })

  await pb.collection(COLECCION_USUARIOS).authWithPassword(email, contraseña)

  // Inicializa progreso para el usuario nuevo. Si la colección no existe todavía,
  // el registro de usuario igual queda creado y podrá completarse en la siguiente fase.
  try {
    await pb.collection(COLECCION_PROGRESO).create({
      usuarioId: nuevoUsuario.id,
      categoriasCompletadas: [],
      leccionesCompletadas: [],
      actividadesCompletadas: [],
      ejerciciosResueltos: [],
      estadisticas: {
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
      },
    })
  } catch (error) {
    if (!(error instanceof ClientResponseError && error.status === 404)) {
      throw error
    }
  }

  return construirUsuarioApp(nuevoUsuario as unknown as Record<string, unknown>)
}
