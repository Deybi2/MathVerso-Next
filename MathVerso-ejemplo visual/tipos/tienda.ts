// =============================================================================
// TIPOS DE LA TIENDA - Matemáticas en Verso
// =============================================================================

export interface ArticuloTienda {
  id: string
  nombre: string
  descripcion: string
  tipo: "consumible" | "permanente" | "suscripcion"
  precioMonedas?: number
  precioDinero?: number
  moneda?: "MXN" | "USD"
  icono: string
  cantidad?: number
  colorFondo: string
  disponible: boolean
  destacado?: boolean
}

export interface PlanSuscripcion {
  id: string
  nombre: string
  descripcion: string
  tipo: "estudiantes" | "profesores" | "escuelas"
  precioMensual: number
  precioAnual: number
  moneda: "MXN" | "USD"
  caracteristicas: string[]
  colorFondo: string
  colorTexto: string
  popular?: boolean
}

export interface CompraRealizada {
  id: string
  articuloId: string
  fecha: string
  cantidad: number
  precioTotal: number
}
