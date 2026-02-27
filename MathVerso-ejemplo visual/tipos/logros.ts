// =============================================================================
// TIPOS DE LOGROS - Matemáticas en Verso
// =============================================================================

export interface LogroDefinido {
  id: string
  nombre: string
  descripcion: string
  icono: string
  tipo: "ejercicios" | "racha" | "lecciones" | "categorias" | "poemas" | "especial"
  requisito: number
  recompensaMonedas: number
  recompensaXP: number
  colorFondo: string
  colorIcono: string
}

export interface LogroUsuario {
  logroId: string
  desbloqueado: boolean
  progreso: number
  fechaDesbloqueo?: string
}
