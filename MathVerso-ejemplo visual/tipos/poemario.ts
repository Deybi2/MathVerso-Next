// =============================================================================
// TIPOS DEL POEMARIO - Matemáticas en Verso
// =============================================================================
// Define las interfaces para los poemas matemáticos.
// =============================================================================

export interface Poema {
  id: string
  titulo: string
  contenido: string
  autor: string
  categoria: "aritmetica" | "algebra" | "geometria" | "calculo" | "probabilidad" | "general"
  temaMatematico: string
  añoEscolar: number
  fechaCreacion: string
  esFavorito?: boolean
  vecesLeido?: number
  desbloqueado: boolean
  monedasParaDesbloquear?: number
}

export interface ColeccionPoemas {
  id: string
  titulo: string
  descripcion: string
  poemas: Poema[]
  colorFondo: string
  colorTexto: string
  icono: string
}

export interface EstadoPoemario {
  poemasDesbloqueados: string[]
  poemasLeidos: string[]
  poemasFavoritos: string[]
  totalPoemas: number
  poemasColeccionados: number
}
