// =============================================================================
// TIPOS DE DOMINIO - Matemáticas en Verso
// =============================================================================
// Este archivo contiene todas las interfaces y tipos utilizados en la aplicación.
// Todos los nombres están en español para facilitar la comprensión.
// =============================================================================

// -----------------------------------------------------------------------------
// Tipos Base
// -----------------------------------------------------------------------------

export interface EntidadBase {
  id: string
  creado: string
  actualizado: string
}

// -----------------------------------------------------------------------------
// Usuario y Autenticación
// -----------------------------------------------------------------------------

export interface Usuario extends EntidadBase {
  email: string
  nombreUsuario: string
  nombre: string
  avatar?: string
  configuracion: ConfiguracionUsuario
}

export interface ConfiguracionUsuario {
  tema: "claro" | "oscuro" | "auto"
  notificaciones: boolean
  sonidos: boolean
  dificultadPreferida: "facil" | "medio" | "dificil"
}

// -----------------------------------------------------------------------------
// Progreso del Usuario
// -----------------------------------------------------------------------------

export interface ProgresoUsuario extends EntidadBase {
  usuarioId: string
  categoriasCompletadas: ProgresoCategoria[]
  leccionesCompletadas: ProgresoLeccion[]
  actividadesCompletadas: ProgresoActividad[]
  ejerciciosResueltos: ProgresoEjercicio[]
  estadisticas: EstadisticasUsuario
}

export interface ProgresoCategoria {
  categoriaId: string
  completada: boolean
  fechaCompletado?: string
  puntuacion: number
  tiempoTotal: number
}

export interface ProgresoLeccion {
  leccionId: string
  completada: boolean
  fechaCompletado?: string
  puntuacion: number
  intentos: number
}

export interface ProgresoActividad {
  actividadId: string
  completada: boolean
  fechaCompletado?: string
  puntuacion: number
  tiempoPromedio: number
}

export interface ProgresoEjercicio {
  ejercicioId: string
  resuelto: boolean
  esCorrecto: boolean
  fechaResolucion: string
  tiempoUtilizado: number
  intentos: number
  respuestaUsuario: string | number | string[]
}

export interface EstadisticasUsuario {
  puntuacionTotal: number
  ejerciciosTotales: number
  ejerciciosCorrectos: number
  tiempoTotal: number
  rachaActual: number
  rachaMaxima: number
  poemasColeccionados: string[]
  logrosDesbloqueados: string[]
  ultimaActividad: string
  nivel: number
  experiencia: number
  monedas: number
}

// -----------------------------------------------------------------------------
// Ejercicios
// -----------------------------------------------------------------------------

export type TipoEjercicio = "seleccion_multiple" | "respuesta_numerica" | "completar_espacios" | "texto_libre"

export interface OpcionEjercicio {
  id: string
  texto: string
  esCorrecta: boolean
}

export interface EjercicioBase {
  id: string
  tipo: TipoEjercicio
  pregunta: string
  descripcion?: string
  dificultad: "facil" | "medio" | "dificil"
  puntos: number
  tiempoEstimado: number
}

export interface EjercicioConcreto extends EjercicioBase {
  actividadId: string
  orden: number
  opciones?: OpcionEjercicio[]
  respuestaCorrecta: string | number | string[]
  pistaPoetica: string
  explicacionCorrecto: string
  explicacionIncorrecto: string
  sugerencia?: string
}

// -----------------------------------------------------------------------------
// Actividades
// -----------------------------------------------------------------------------

export interface Actividad extends EntidadBase {
  leccionId: string
  titulo: string
  objetivo: string
  descripcion: string
  orden: number
  ejercicios: EjercicioConcreto[]
  metadata: MetadataActividad
}

export interface MetadataActividad {
  tipo: "practica" | "evaluacion" | "refuerzo" | "desafio"
  requiereCompletarAnterior: boolean
  puntosTotales: number
  tiempoEstimadoTotal: number
}

// -----------------------------------------------------------------------------
// Lecciones
// -----------------------------------------------------------------------------

export interface Leccion extends EntidadBase {
  categoriaId: string
  titulo: string
  descripcion: string
  orden: number
  actividades: Actividad[]
  poemaRecompensa: PoemaRecompensa
  metadata: MetadataLeccion
}

export interface PoemaRecompensa {
  titulo: string
  contenido: string
  autor: string
}

export interface MetadataLeccion {
  icono: string
  color: string
  duracionEstimada: number
  dificultadPromedio: number
  puntosTotales: number
}

// -----------------------------------------------------------------------------
// Categorías (Años Escolares)
// -----------------------------------------------------------------------------

export interface Categoria extends EntidadBase {
  titulo: string
  subtitulo?: string
  descripcion: string
  año: number
  orden: number
  lecciones: Leccion[]
  poemaEpico: PoemaEpico
  metadata: MetadataCategoria
  estadisticas: EstadisticasCategoria
}

export interface PoemaEpico {
  titulo: string
  contenido: string
  autor: string
  fragmentos: string[]
}

export interface MetadataCategoria {
  color: string
  colorGradiente: string
  icono: string
  desbloqueado: boolean
  requisitos: string[]
  nivelRequerido: number
}

export interface EstadisticasCategoria {
  leccionesTotales: number
  actividadesTotales: number
  ejerciciosTotales: number
  puntosTotales: number
  duracionTotal: number
}

// -----------------------------------------------------------------------------
// Estado de la Aplicación
// -----------------------------------------------------------------------------

export interface EstadoAplicacion {
  usuario: Usuario | null
  progreso: ProgresoUsuario | null
  categoriaActual: Categoria | null
  leccionActual: Leccion | null
  actividadActual: Actividad | null
  ejercicioActual: EjercicioConcreto | null
  modales: EstadoModales
  ui: EstadoUI
}

export interface EstadoModales {
  respuestaCorrecta: boolean
  respuestaIncorrecta: boolean
  nivelCompletado: boolean
  leccionCompletada: boolean
  categoriaCompletada: boolean
  añoCompletado: boolean
}

export interface EstadoUI {
  menuAbierto: boolean
  tema: "claro" | "oscuro"
  sonidosActivados: boolean
  cargando: boolean
}

// -----------------------------------------------------------------------------
// Respuestas de Ejercicios
// -----------------------------------------------------------------------------

export interface RespuestaEjercicio {
  ejercicioId: string
  actividadId: string
  leccionId: string
  categoriaId: string
  respuestaUsuario: string | number | string[]
  esCorrecta: boolean
  tiempoUtilizado: number
  intentos: number
  fecha: string
  puntuacionObtenida: number
  detalles: DetallesRespuesta
}

export interface DetallesRespuesta {
  retroalimentacion: string
  explicacion: string
}

// -----------------------------------------------------------------------------
// Logros y Recompensas
// -----------------------------------------------------------------------------

export interface Logro extends EntidadBase {
  nombre: string
  descripcion: string
  icono: string
  tipo: "ejercicios" | "lecciones" | "categorias" | "especial"
  requisitos: Record<string, number>
  recompensa: RecompensaLogro
}

export interface RecompensaLogro {
  puntos: number
  experiencia: number
  poema?: string
  titulo?: string
}
