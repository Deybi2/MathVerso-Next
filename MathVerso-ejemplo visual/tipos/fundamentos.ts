// =============================================================================
// TIPOS DE FUNDAMENTOS - Matemáticas en Verso
// =============================================================================

export interface ConceptoFundamental {
  id: string
  titulo: string
  descripcion: string
  contenido: string
  ejemplos: EjemploFundamento[]
  formulas?: string[]
  consejos: string[]
}

export interface EjemploFundamento {
  id: string
  titulo: string
  problema: string
  solucion: string
  explicacion: string
}

export interface CategoriaFundamento {
  id: string
  nombre: string
  descripcion: string
  icono: string
  colorFondo: string
  colorTexto: string
  conceptos: ConceptoFundamental[]
}
