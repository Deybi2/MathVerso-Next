// =============================================================================
// TIPOS DE ESTADO GLOBAL - Matemáticas en Verso
// =============================================================================
// Define la estructura completa del estado global de la aplicación.
// =============================================================================

export interface UsuarioGuardado {
  id: string
  email: string
  nombreUsuario: string
  nombre: string
  contraseña: string // En producción usar hash
  esAdmin: boolean
  fechaRegistro: string
}

export interface EstadisticasGlobales {
  estrellas: number
  monedas: number
  nivel: number
  experiencia: number
  experienciaParaSiguienteNivel: number
  rachaActual: number
  rachaMaxima: number
  ultimaActividad: string
  ejerciciosTotales: number
  ejerciciosCorrectos: number
  tiempoTotalJugado: number
}

export interface ProgresoGlobal {
  categoriasDesbloqueadas: string[]
  categoriasCompletadas: string[]
  leccionesDesbloqueadas: string[]
  leccionesCompletadas: string[]
  actividadesDesbloqueadas: string[]
  actividadesCompletadas: string[]
  ejerciciosCompletados: string[]
}

export interface MisionDiaria {
  id: string
  titulo: string
  descripcion: string
  tipo: "ejercicios" | "tiempo" | "racha" | "perfecto"
  objetivo: number
  progresoActual: number
  completada: boolean
  recompensaXP: number
  recompensaMonedas: number
  fechaAsignada: string
}

export interface FragmentoPoema {
  id: string
  poemaId: string
  numeroFragmento: number
  totalFragmentos: number
  contenido: string
  desbloqueado: boolean
}

export interface PoemaEspecial {
  id: string
  titulo: string
  autor: string
  fragmentos: FragmentoPoema[]
  completado: boolean
  contenidoCompleto: string
}

export interface InventarioUsuario {
  pistasDisponibles: number
  dobleXPActivo: boolean
  dobleXPHastaFecha: string | null
  proteccionRachaActiva: boolean
  proteccionRachaHastaFecha: string | null
  fragmentosPoemas: string[] // IDs de fragmentos desbloqueados
  poemasCompletados: string[] // IDs de poemas especiales completados
  poemasDesbloqueados: string[] // IDs de poemas normales desbloqueados
  logrosDesbloqueados: string[]
}

export interface EstadoGlobal {
  usuarioActual: UsuarioGuardado | null
  estadisticas: EstadisticasGlobales
  progreso: ProgresoGlobal
  inventario: InventarioUsuario
  misionesDiarias: MisionDiaria[]
  poemasEspeciales: PoemaEspecial[]
  configuracion: ConfiguracionApp
}

export interface ConfiguracionApp {
  notificaciones: boolean
  modoNocturno: boolean
  sonidos: boolean
  idioma: string
}

export const ESTADO_INICIAL: EstadoGlobal = {
  usuarioActual: null,
  estadisticas: {
    estrellas: 0,
    monedas: 500,
    nivel: 1,
    experiencia: 0,
    experienciaParaSiguienteNivel: 100,
    rachaActual: 0,
    rachaMaxima: 0,
    ultimaActividad: "",
    ejerciciosTotales: 0,
    ejerciciosCorrectos: 0,
    tiempoTotalJugado: 0,
  },
  progreso: {
    categoriasDesbloqueadas: ["categoria-1"],
    categoriasCompletadas: [],
    leccionesDesbloqueadas: ["leccion-1-1"],
    leccionesCompletadas: [],
    actividadesDesbloqueadas: ["actividad-1-1-1"],
    actividadesCompletadas: [],
    ejerciciosCompletados: [],
  },
  inventario: {
    pistasDisponibles: 3,
    dobleXPActivo: false,
    dobleXPHastaFecha: null,
    proteccionRachaActiva: false,
    proteccionRachaHastaFecha: null,
    fragmentosPoemas: [],
    poemasCompletados: [],
    poemasDesbloqueados: [],
    logrosDesbloqueados: [],
  },
  misionesDiarias: [],
  poemasEspeciales: [],
  configuracion: {
    notificaciones: true,
    modoNocturno: false,
    sonidos: true,
    idioma: "es",
  },
}

// Estado para admin con todo desbloqueado
export const ESTADO_ADMIN: EstadoGlobal = {
  usuarioActual: null,
  estadisticas: {
    estrellas: 99999,
    monedas: 99999,
    nivel: 99,
    experiencia: 0,
    experienciaParaSiguienteNivel: 100,
    rachaActual: 365,
    rachaMaxima: 365,
    ultimaActividad: new Date().toISOString(),
    ejerciciosTotales: 1000,
    ejerciciosCorrectos: 1000,
    tiempoTotalJugado: 360000,
  },
  progreso: {
    categoriasDesbloqueadas: ["categoria-1", "categoria-2", "categoria-3"],
    categoriasCompletadas: ["categoria-1", "categoria-2", "categoria-3"],
    leccionesDesbloqueadas: [],
    leccionesCompletadas: [],
    actividadesDesbloqueadas: [],
    actividadesCompletadas: [],
    ejerciciosCompletados: [],
  },
  inventario: {
    pistasDisponibles: 999,
    dobleXPActivo: true,
    dobleXPHastaFecha: "2099-12-31",
    proteccionRachaActiva: true,
    proteccionRachaHastaFecha: "2099-12-31",
    fragmentosPoemas: [],
    poemasCompletados: [],
    poemasDesbloqueados: [],
    logrosDesbloqueados: [],
  },
  misionesDiarias: [],
  poemasEspeciales: [],
  configuracion: {
    notificaciones: true,
    modoNocturno: false,
    sonidos: true,
    idioma: "es",
  },
}
