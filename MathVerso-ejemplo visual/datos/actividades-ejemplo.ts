// =============================================================================
// DATOS DE EJEMPLO - Actividades Completas (Niveles)
// =============================================================================

import type { Actividad } from "@/tipos/dominio"

export const actividadesEjemplo: Actividad[] = [
  // =========================================================================
  // LECCIÓN 1-1: Aritmética
  // =========================================================================
  {
    id: "actividad-1-1-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-1-1",
    titulo: "Sumas que Construyen Puentes",
    objetivo: "Practicar la suma de números enteros en contextos de ingeniería y ensamblaje",
    descripcion: "Aprende a sumar componentes, materiales y recursos en situaciones reales del taller industrial.",
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
    id: "actividad-1-1-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-1-1",
    titulo: "Restas que Reparan Heridas",
    objetivo: "Practicar la resta de números enteros en contextos de ajustes y consumo de recursos",
    descripcion: "Domina el arte de calcular lo que queda, lo que falta y lo que se consume en el taller.",
    orden: 2,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: true,
      puntosTotales: 120,
      tiempoEstimadoTotal: 20,
    },
  },
  {
    id: "actividad-1-1-3",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-1-1",
    titulo: "Multiplicaciones que Potencian",
    objetivo: "Practicar la multiplicación en el cálculo de cantidades totales y repeticiones",
    descripcion: "Aprende a multiplicar para calcular producción, costos y recursos en serie.",
    orden: 3,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: true,
      puntosTotales: 150,
      tiempoEstimadoTotal: 25,
    },
  },
  {
    id: "actividad-1-1-4",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-1-1",
    titulo: "Divisiones que Distribuyen la Riqueza",
    objetivo: "Practicar la división en problemas de reparto equitativo y cálculo de cuotas",
    descripcion: "Domina el arte de distribuir recursos de manera justa y eficiente.",
    orden: 4,
    ejercicios: [],
    metadata: {
      tipo: "evaluacion",
      requiereCompletarAnterior: true,
      puntosTotales: 200,
      tiempoEstimadoTotal: 30,
    },
  },

  // =========================================================================
  // LECCIÓN 1-2: Geometría del Plano
  // =========================================================================
  {
    id: "actividad-1-2-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-1-2",
    titulo: "Figuras que Trazan el Destino del Metal",
    objetivo: "Calcular perímetros de cuadrados y rectángulos",
    descripcion: "Aprende a medir el contorno de las piezas metálicas y los paneles del taller.",
    orden: 1,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: false,
      puntosTotales: 100,
      tiempoEstimadoTotal: 20,
    },
  },
  {
    id: "actividad-1-2-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-1-2",
    titulo: "Áreas que Revelan el Alma de las Piezas",
    objetivo: "Calcular áreas de cuadrados, rectángulos y círculos",
    descripcion: "Domina el cálculo de superficies para diseños industriales.",
    orden: 2,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: true,
      puntosTotales: 150,
      tiempoEstimadoTotal: 30,
    },
  },

  // =========================================================================
  // LECCIÓN 1-3: Potencias y Raíces
  // =========================================================================
  {
    id: "actividad-1-3-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-1-3",
    titulo: "El Poder de los Números Elevados",
    objetivo: "Calcular potencias de números enteros",
    descripcion: "Aprende a elevar números al cuadrado y al cubo para calcular áreas y volúmenes.",
    orden: 1,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: false,
      puntosTotales: 120,
      tiempoEstimadoTotal: 25,
    },
  },
  {
    id: "actividad-1-3-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-1-3",
    titulo: "Las Raíces de un Problema Antiguo",
    objetivo: "Calcular raíces cuadradas exactas y aproximar otras",
    descripcion: "Domina las raíces para encontrar dimensiones a partir de áreas y volúmenes.",
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
  // LECCIÓN 1-4: Proporcionalidad
  // =========================================================================
  {
    id: "actividad-1-4-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-1-4",
    titulo: "Directamente al Corazón del Taller",
    objetivo: "Resolver problemas de proporcionalidad directa",
    descripcion: "Aprende a usar reglas de tres y escalas en diseños industriales.",
    orden: 1,
    ejercicios: [],
    metadata: {
      tipo: "practica",
      requiereCompletarAnterior: false,
      puntosTotales: 150,
      tiempoEstimadoTotal: 30,
    },
  },
  {
    id: "actividad-1-4-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    leccionId: "leccion-1-4",
    titulo: "Inversamente al Problema",
    objetivo: "Resolver problemas de proporcionalidad inversa",
    descripcion: "Domina las relaciones inversas entre obreros, tiempo, velocidad y más.",
    orden: 2,
    ejercicios: [],
    metadata: {
      tipo: "desafio",
      requiereCompletarAnterior: true,
      puntosTotales: 200,
      tiempoEstimadoTotal: 40,
    },
  },
]
