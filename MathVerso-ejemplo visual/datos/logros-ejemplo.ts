// =============================================================================
// DATOS DE LOGROS - Matemáticas en Verso
// =============================================================================

import type { LogroDefinido, LogroUsuario } from "@/tipos/logros"

export const logrosDefinidos: LogroDefinido[] = [
  // Logros de ejercicios
  {
    id: "primer-problema",
    nombre: "Primer Problema Resuelto",
    descripcion: "Resuelve tu primer ejercicio correctamente",
    icono: "🎯",
    tipo: "ejercicios",
    requisito: 1,
    recompensaMonedas: 10,
    recompensaXP: 25,
    colorFondo: "from-emerald-400 to-emerald-500",
    colorIcono: "bg-emerald-100",
  },
  {
    id: "diez-ejercicios",
    nombre: "Aprendiz Dedicado",
    descripcion: "Resuelve 10 ejercicios correctamente",
    icono: "📚",
    tipo: "ejercicios",
    requisito: 10,
    recompensaMonedas: 50,
    recompensaXP: 100,
    colorFondo: "from-blue-400 to-blue-500",
    colorIcono: "bg-blue-100",
  },
  {
    id: "cincuenta-ejercicios",
    nombre: "Maestro en Formación",
    descripcion: "Resuelve 50 ejercicios correctamente",
    icono: "🏆",
    tipo: "ejercicios",
    requisito: 50,
    recompensaMonedas: 200,
    recompensaXP: 500,
    colorFondo: "from-amber-400 to-amber-500",
    colorIcono: "bg-amber-100",
  },
  {
    id: "cien-ejercicios",
    nombre: "Sabio Numérico",
    descripcion: "Resuelve 100 ejercicios correctamente",
    icono: "👑",
    tipo: "ejercicios",
    requisito: 100,
    recompensaMonedas: 500,
    recompensaXP: 1000,
    colorFondo: "from-violet-400 to-violet-500",
    colorIcono: "bg-violet-100",
  },

  // Logros de racha
  {
    id: "racha-7",
    nombre: "Racha de 7 Días",
    descripcion: "Mantén una racha de 7 días consecutivos",
    icono: "🔥",
    tipo: "racha",
    requisito: 7,
    recompensaMonedas: 100,
    recompensaXP: 200,
    colorFondo: "from-orange-400 to-orange-500",
    colorIcono: "bg-orange-100",
  },
  {
    id: "racha-30",
    nombre: "Constancia Mensual",
    descripcion: "Mantén una racha de 30 días consecutivos",
    icono: "💪",
    tipo: "racha",
    requisito: 30,
    recompensaMonedas: 500,
    recompensaXP: 1000,
    colorFondo: "from-red-400 to-red-500",
    colorIcono: "bg-red-100",
  },

  // Logros de lecciones
  {
    id: "primera-leccion",
    nombre: "Primera Lección",
    descripcion: "Completa tu primera lección",
    icono: "📖",
    tipo: "lecciones",
    requisito: 1,
    recompensaMonedas: 25,
    recompensaXP: 50,
    colorFondo: "from-teal-400 to-teal-500",
    colorIcono: "bg-teal-100",
  },
  {
    id: "cinco-lecciones",
    nombre: "Estudiante Aplicado",
    descripcion: "Completa 5 lecciones",
    icono: "🎓",
    tipo: "lecciones",
    requisito: 5,
    recompensaMonedas: 150,
    recompensaXP: 300,
    colorFondo: "from-cyan-400 to-cyan-500",
    colorIcono: "bg-cyan-100",
  },

  // Logros de categorías
  {
    id: "primera-categoria",
    nombre: "Año Conquistado",
    descripcion: "Completa todas las lecciones de un año escolar",
    icono: "🌟",
    tipo: "categorias",
    requisito: 1,
    recompensaMonedas: 1000,
    recompensaXP: 2000,
    colorFondo: "from-yellow-400 to-yellow-500",
    colorIcono: "bg-yellow-100",
  },

  // Logros de poemas
  {
    id: "primer-poema",
    nombre: "Poeta Iniciado",
    descripcion: "Desbloquea tu primer poema",
    icono: "📜",
    tipo: "poemas",
    requisito: 1,
    recompensaMonedas: 20,
    recompensaXP: 40,
    colorFondo: "from-pink-400 to-pink-500",
    colorIcono: "bg-pink-100",
  },
  {
    id: "diez-poemas",
    nombre: "Coleccionista de Versos",
    descripcion: "Desbloquea 10 poemas",
    icono: "📚",
    tipo: "poemas",
    requisito: 10,
    recompensaMonedas: 200,
    recompensaXP: 400,
    colorFondo: "from-rose-400 to-rose-500",
    colorIcono: "bg-rose-100",
  },

  // Logros especiales
  {
    id: "perfeccionista",
    nombre: "Perfeccionista",
    descripcion: "Completa una lección sin errores",
    icono: "💎",
    tipo: "especial",
    requisito: 1,
    recompensaMonedas: 300,
    recompensaXP: 600,
    colorFondo: "from-indigo-400 to-indigo-500",
    colorIcono: "bg-indigo-100",
  },
]

// Estado de ejemplo del usuario
export const logrosUsuarioEjemplo: LogroUsuario[] = [
  {
    logroId: "primer-problema",
    desbloqueado: true,
    progreso: 1,
    fechaDesbloqueo: new Date().toISOString(),
  },
  {
    logroId: "racha-7",
    desbloqueado: true,
    progreso: 7,
    fechaDesbloqueo: new Date().toISOString(),
  },
  {
    logroId: "diez-ejercicios",
    desbloqueado: false,
    progreso: 7,
  },
  {
    logroId: "cincuenta-ejercicios",
    desbloqueado: false,
    progreso: 7,
  },
  {
    logroId: "cien-ejercicios",
    desbloqueado: false,
    progreso: 7,
  },
  {
    logroId: "racha-30",
    desbloqueado: false,
    progreso: 15,
  },
  {
    logroId: "primera-leccion",
    desbloqueado: false,
    progreso: 0,
  },
  {
    logroId: "cinco-lecciones",
    desbloqueado: false,
    progreso: 0,
  },
  {
    logroId: "primera-categoria",
    desbloqueado: false,
    progreso: 0,
  },
  {
    logroId: "primer-poema",
    desbloqueado: false,
    progreso: 0,
  },
  {
    logroId: "diez-poemas",
    desbloqueado: false,
    progreso: 0,
  },
  {
    logroId: "perfeccionista",
    desbloqueado: false,
    progreso: 0,
  },
]
