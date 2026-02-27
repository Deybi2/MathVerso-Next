// =============================================================================
// ÍNDICE DE DATOS - Matemáticas en Verso
// =============================================================================
// Exporta todos los datos de ejemplo para facilitar su importación.
// =============================================================================

// Datos del 1er año (existentes)
export { categoriasEjemplo } from "./categorias-ejemplo"
export { leccionesEjemplo } from "./lecciones-ejemplo"
export { actividadesEjemplo } from "./actividades-ejemplo"
export { ejerciciosEjemplo } from "./ejercicios-ejemplo"

// Datos del 3er año (Geometría Analítica)
export { leccionesTercerAño } from "./lecciones-tercer-año"
export { actividadesTercerAño } from "./actividades-tercer-año"
export { ejerciciosTercerAño } from "./ejercicios-tercer-año"

// Datos del Poemario
export { todosLosPoemas, coleccionesPoemas, obtenerPoemasPorAño, obtenerPoemasDesbloqueados } from "./poemas-ejemplo"

// Datos del Ranking
export { jugadoresRankingEjemplo, rankingSemanal, rankingMensual } from "./ranking-ejemplo"

// Datos de la Tienda
export { articulosTienda, planesSuscripcion } from "./tienda-ejemplo"

// Datos de Logros
export { logrosDefinidos, logrosUsuarioEjemplo } from "./logros-ejemplo"

// Datos de Fundamentos
export { categoriasFundamentos } from "./fundamentos-ejemplo"

// -----------------------------------------------------------------------------
// Función auxiliar para obtener datos por categoría
// -----------------------------------------------------------------------------

import { leccionesTercerAño } from "./lecciones-tercer-año"
import { actividadesTercerAño } from "./actividades-tercer-año"
import { ejerciciosTercerAño } from "./ejercicios-tercer-año"
import { leccionesEjemplo } from "./lecciones-ejemplo"
import { actividadesEjemplo } from "./actividades-ejemplo"
import { ejerciciosEjemplo } from "./ejercicios-ejemplo"

export function obtenerLeccionesPorCategoria(categoriaId: string) {
  if (categoriaId === "categoria-3") {
    return leccionesTercerAño
  }
  return leccionesEjemplo.filter((l) => l.categoriaId === categoriaId)
}

export function obtenerActividadesPorLeccion(leccionId: string) {
  const actividadesTercer = actividadesTercerAño.filter((a) => a.leccionId === leccionId)
  if (actividadesTercer.length > 0) return actividadesTercer
  return actividadesEjemplo.filter((a) => a.leccionId === leccionId)
}

export function obtenerEjerciciosPorActividad(actividadId: string) {
  const ejerciciosTercer = ejerciciosTercerAño.filter((e) => e.actividadId === actividadId)
  if (ejerciciosTercer.length > 0) return ejerciciosTercer
  return ejerciciosEjemplo.filter((e) => e.actividadId === actividadId)
}
