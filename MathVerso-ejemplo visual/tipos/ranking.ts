// =============================================================================
// TIPOS DEL RANKING - Matemáticas en Verso
// =============================================================================

export interface JugadorRanking {
  id: string
  nombreUsuario: string
  avatar?: string
  experienciaTotal: number
  nivel: number
  rachaActual: number
  ejerciciosCompletados: number
  posicion: number
  esUsuarioActual?: boolean
}

export interface TablaRanking {
  tipo: "global" | "semanal" | "mensual"
  jugadores: JugadorRanking[]
  actualizadoEn: string
}
