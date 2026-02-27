// =============================================================================
// CLIENTE POCKETBASE - Matemáticas en Verso
// =============================================================================
// Este archivo configura la conexión con PocketBase.
//
// IMPORTANTE: Debes modificar la URL de PocketBase con tu IP o dominio.
// =============================================================================

import PocketBase from "pocketbase"

// URL de PocketBase - Reemplazar con tu IP o dominio
// Ejemplo: 'http://192.168.1.100:8090' o 'https://tu-dominio.com'
const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090"

// Crear instancia única del cliente PocketBase
export const pb = new PocketBase(POCKETBASE_URL)

// Deshabilitar auto-cancelación para evitar problemas con solicitudes múltiples
pb.autoCancellation(false)

// -----------------------------------------------------------------------------
// Funciones de Utilidad para Autenticación
// -----------------------------------------------------------------------------

/**
 * Verifica si el usuario está autenticado
 */
export const estaAutenticado = (): boolean => {
  return pb.authStore.isValid
}

/**
 * Obtiene el usuario actual autenticado
 */
export const obtenerUsuarioActual = () => {
  return pb.authStore.model
}

/**
 * Cierra la sesión del usuario actual
 */
export const cerrarSesion = () => {
  pb.authStore.clear()
}

/**
 * Refresca el token de autenticación
 */
export const refrescarToken = async () => {
  try {
    await pb.collection("usuarios").authRefresh()
    return true
  } catch {
    pb.authStore.clear()
    return false
  }
}

// -----------------------------------------------------------------------------
// Funciones de Utilidad para Colecciones
// -----------------------------------------------------------------------------

/**
 * Obtiene un registro por ID con manejo de errores
 */
export const obtenerRegistro = async <T>(\
  coleccion: string, \
  id: string, \
  opciones?: object\
)
: Promise<T | null> =>
{
  try {
    return await pb.collection(coleccion).getOne(id, opciones) as T;
  } catch (error) {
    console.error(`Error obteniendo registro de ${coleccion}:`, error)
    return null;
  }
}

/**
 * Obtiene una lista de registros con filtros
 */
export const obtenerLista = async <T>(\
  coleccion: string,\
  pagina: number = 1,\
  porPagina: number = 50,\
  filtro?: string,\
  ordenar?: string\
)
: Promise<T[]> =>
{
  try {
    const resultado = await pb.collection(coleccion).getList(pagina, porPagina, {
      filter: filtro,
      sort: ordenar,
    })
    return resultado.items as T[];
  } catch (error) {
    console.error(`Error obteniendo lista de ${coleccion}:`, error)
    return [];
  }
}

/**
 * Crea un nuevo registro
 */
export const crearRegistro = async <T>(\
  coleccion: string,\
  datos: object\
)
: Promise<T | null> =>
{
  try {
    return await pb.collection(coleccion).create(datos) as T;
  } catch (error) {
    console.error(`Error creando registro en ${coleccion}:`, error)
    return null;
  }
}

/**
 * Actualiza un registro existente
 */
export const actualizarRegistro = async <T>(\
  coleccion: string,\
  id: string,\
  datos: object\
)
: Promise<T | null> =>
{
  try {
    return await pb.collection(coleccion).update(id, datos) as T;
  } catch (error) {
    console.error(`Error actualizando registro en ${coleccion}:`, error)
    return null;
  }
}

export default pb
