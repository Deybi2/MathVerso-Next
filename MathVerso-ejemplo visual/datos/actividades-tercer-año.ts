// =============================================================================
// DATOS DE ACTIVIDADES - 3er Año (Geometría Analítica)
// =============================================================================
// Actividades (niveles) para cada lección del 3er año.
// =============================================================================

import type { Actividad } from "@/tipos/dominio"

export const actividadesTercerAño: Actividad[] = [
  // =========================================================================
  // LECCIÓN 3-1: El Plano Cartesiano
  // =========================================================================
  {
    id: "actividad-3-1-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-1",
    titulo: "Nivel 1: Ubicando Puntos en el Plano",
    objetivo: "Identificar coordenadas y ubicar puntos en los cuatro cuadrantes",
    descripcion: "Aprende a leer y escribir coordenadas (x, y) y a ubicar puntos en el plano cartesiano.",
    orden: 1,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: false,
      puntosTotales: 100,
      tiempoEstimadoTotal: 15,
    },
  },
  {
    id: "actividad-3-1-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-1",
    titulo: "Nivel 2: Los Cuatro Cuadrantes",
    objetivo: "Identificar en qué cuadrante se encuentra un punto según sus signos",
    descripcion: "Domina la identificación de cuadrantes basándote en los signos de las coordenadas.",
    orden: 2,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: true,
      puntosTotales: 120,
      tiempoEstimadoTotal: 20,
    },
  },

  // =========================================================================
  // LECCIÓN 3-2: La Recta
  // =========================================================================
  {
    id: "actividad-3-2-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-2",
    titulo: "Nivel 1: La Pendiente de una Recta",
    objetivo: "Calcular la pendiente de una recta dados dos puntos",
    descripcion: "Aprende a calcular m = (y₂ - y₁) / (x₂ - x₁) para cualquier par de puntos.",
    orden: 1,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: false,
      puntosTotales: 130,
      tiempoEstimadoTotal: 25,
    },
  },
  {
    id: "actividad-3-2-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-2",
    titulo: "Nivel 2: Ecuación Pendiente-Ordenada",
    objetivo: "Escribir y usar la ecuación y = mx + b",
    descripcion: "Domina la forma pendiente-ordenada de la ecuación de la recta.",
    orden: 2,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: true,
      puntosTotales: 150,
      tiempoEstimadoTotal: 30,
    },
  },
  {
    id: "actividad-3-2-3",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-2",
    titulo: "Nivel 3: Rectas Paralelas y Perpendiculares",
    objetivo: "Identificar y crear rectas paralelas y perpendiculares",
    descripcion:
      "Aprende la relación entre pendientes de rectas paralelas (iguales) y perpendiculares (opuestas recíprocas).",
    orden: 3,
    ejercicios: [],
    metadata: {
      tipo: "evaluacion",
      requiereCompletarAnterior: true,
      puntosTotales: 180,
      tiempoEstimadoTotal: 35,
    },
  },

  // =========================================================================
  // LECCIÓN 3-3: Distancia y Punto Medio
  // =========================================================================
  {
    id: "actividad-3-3-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-3",
    titulo: "Nivel 1: Distancia Entre Dos Puntos",
    objetivo: "Calcular la distancia entre dos puntos usando la fórmula",
    descripcion: "Aplica d = √[(x₂-x₁)² + (y₂-y₁)²] para medir distancias en el plano.",
    orden: 1,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: false,
      puntosTotales: 140,
      tiempoEstimadoTotal: 25,
    },
  },
  {
    id: "actividad-3-3-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-3",
    titulo: "Nivel 2: El Punto Medio del Segmento",
    objetivo: "Encontrar el punto medio entre dos puntos",
    descripcion: "Calcula M = ((x₁+x₂)/2, (y₁+y₂)/2) para encontrar el centro de un segmento.",
    orden: 2,
    ejercicios: [],
    metadata: {
      tipo: "evaluacion",
      requiereCompletarAnterior: true,
      puntosTotales: 160,
      tiempoEstimadoTotal: 30,
    },
  },

  // =========================================================================
  // LECCIÓN 3-4: La Circunferencia
  // =========================================================================
  {
    id: "actividad-3-4-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-4",
    titulo: "Nivel 1: Ecuación Canónica de la Circunferencia",
    objetivo: "Identificar centro y radio a partir de la ecuación",
    descripcion: "Aprende a leer (x-h)² + (y-k)² = r² e identificar el centro (h, k) y radio r.",
    orden: 1,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: false,
      puntosTotales: 150,
      tiempoEstimadoTotal: 25,
    },
  },
  {
    id: "actividad-3-4-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-4",
    titulo: "Nivel 2: Construyendo Circunferencias",
    objetivo: "Escribir la ecuación de una circunferencia dado su centro y radio",
    descripcion: "Practica escribir ecuaciones de circunferencias a partir de sus elementos.",
    orden: 2,
    ejercicios: [],
    metadata: {
      tipo: "evaluacion",
      requiereCompletarAnterior: true,
      puntosTotales: 180,
      tiempoEstimadoTotal: 35,
    },
  },

  // =========================================================================
  // LECCIÓN 3-5: La Parábola
  // =========================================================================
  {
    id: "actividad-3-5-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-5",
    titulo: "Nivel 1: El Vértice de la Parábola",
    objetivo: "Encontrar el vértice de una parábola",
    descripcion: "Calcula el vértice usando x = -b/(2a) y sustituyendo en la función.",
    orden: 1,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: false,
      puntosTotales: 160,
      tiempoEstimadoTotal: 30,
    },
  },
  {
    id: "actividad-3-5-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-5",
    titulo: "Nivel 2: Raíces y Discriminante",
    objetivo: "Encontrar las raíces de una parábola usando el discriminante",
    descripcion: "Usa b² - 4ac para determinar el número de raíces y calcularlas.",
    orden: 2,
    ejercicios: [],
    metadata: {
      tipo: "desafio",
      requiereCompletarAnterior: true,
      puntosTotales: 200,
      tiempoEstimadoTotal: 40,
    },
  },

  // =========================================================================
  // LECCIÓN 3-6: Vectores
  // =========================================================================
  {
    id: "actividad-3-6-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-6",
    titulo: "Nivel 1: Componentes de un Vector",
    objetivo: "Identificar y calcular las componentes de un vector",
    descripcion: "Aprende a expresar vectores en términos de sus componentes (vx, vy).",
    orden: 1,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: false,
      puntosTotales: 140,
      tiempoEstimadoTotal: 25,
    },
  },
  {
    id: "actividad-3-6-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-3-6",
    titulo: "Nivel 2: Suma y Resta de Vectores",
    objetivo: "Realizar operaciones básicas con vectores",
    descripcion: "Suma y resta vectores componente a componente.",
    orden: 2,
    ejercicios: [],
    metadata: {
      tipo: "evaluacion",
      requiereCompletarAnterior: true,
      puntosTotales: 170,
      tiempoEstimadoTotal: 35,
    },
  },
]
