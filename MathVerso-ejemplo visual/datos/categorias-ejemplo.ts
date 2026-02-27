// =============================================================================
// DATOS DE EJEMPLO - Categorías Completas (Años Escolares)
// =============================================================================

import type { Categoria } from "@/tipos/dominio"

export const categoriasEjemplo: Categoria[] = [
  {
    id: "categoria-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    titulo: "Estructuras y Relaciones Numéricas",
    subtitulo: "1° Año de Secundaria Técnica",
    descripcion:
      "Consolida las bases numéricas y la lógica del pensamiento matemático aplicado al entorno técnico industrial.",
    año: 1,
    orden: 1,
    lecciones: [],
    poemaEpico: {
      titulo: "El Inicio del Camino",
      contenido: `Los números son estrellas en el firmamento del saber,
cada uno brilla con luz propia, esperando ser descubierto.
En este primer año, aprenderás a ver
cómo las matemáticas dan forma a todo lo que has cubierto.

Desde el tornillo más pequeño hasta la máquina gigante,
los números son el lenguaje que todo lo une.
Avanza con valor, joven estudiante,
que el conocimiento te espera y te consume.`,
      autor: "Matemáticas en Verso",
      fragmentos: [
        "Los números son estrellas...",
        "Cada tornillo cuenta una historia...",
        "La suma es el primer paso...",
      ],
    },
    metadata: {
      color: "#3B82F6",
      colorGradiente: "from-blue-500 to-blue-600",
      icono: "📐",
      desbloqueado: true,
      requisitos: [],
      nivelRequerido: 1,
    },
    estadisticas: {
      leccionesTotales: 4,
      actividadesTotales: 10,
      ejerciciosTotales: 30,
      puntosTotales: 2100,
      duracionTotal: 210,
    },
  },
  {
    id: "categoria-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    titulo: "Álgebra y Funciones",
    subtitulo: "2° Año de Secundaria Técnica",
    descripcion: "Domina el lenguaje algebraico y las funciones matemáticas para modelar situaciones del taller.",
    año: 2,
    orden: 2,
    lecciones: [],
    poemaEpico: {
      titulo: "Las Letras que Danzan",
      contenido: `Donde los números se visten de letras,
las ecuaciones cobran vida propia.
Las incógnitas, como secretas señas,
esperan ser reveladas en la copia.

La X es un misterio que resolver,
la Y una respuesta que encontrar.
El álgebra te enseñará a ver
lo que los números no pueden contar.`,
      autor: "Matemáticas en Verso",
      fragmentos: [],
    },
    metadata: {
      color: "#10B981",
      colorGradiente: "from-emerald-500 to-emerald-600",
      icono: "🔢",
      desbloqueado: false,
      requisitos: ["categoria-1"],
      nivelRequerido: 5,
    },
    estadisticas: {
      leccionesTotales: 5,
      actividadesTotales: 15,
      ejerciciosTotales: 45,
      puntosTotales: 3000,
      duracionTotal: 300,
    },
  },
  {
    id: "categoria-3",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    titulo: "Geometría Analítica",
    subtitulo: "3° Año de Secundaria Técnica",
    descripcion: "Explora las figuras y el espacio con precisión matemática usando coordenadas y vectores.",
    año: 3,
    orden: 3,
    lecciones: [],
    poemaEpico: {
      titulo: "Formas en el Espacio",
      contenido: `Las figuras geométricas cuentan historias
de ángulos perfectos y líneas rectas.
El espacio guarda infinitas memorias
de formas que el ingeniero conecta.`,
      autor: "Matemáticas en Verso",
      fragmentos: [],
    },
    metadata: {
      color: "#8B5CF6",
      colorGradiente: "from-violet-500 to-violet-600",
      icono: "📊",
      desbloqueado: false,
      requisitos: ["categoria-1", "categoria-2"],
      nivelRequerido: 10,
    },
    estadisticas: {
      leccionesTotales: 6,
      actividadesTotales: 18,
      ejerciciosTotales: 54,
      puntosTotales: 3600,
      duracionTotal: 360,
    },
  },
  {
    id: "categoria-4",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    titulo: "Estadística y Probabilidad",
    subtitulo: "4° Año de Secundaria Técnica",
    descripcion: "Analiza datos, interpreta estadísticas y calcula probabilidades en contextos industriales.",
    año: 4,
    orden: 4,
    lecciones: [],
    poemaEpico: {
      titulo: "El Azar del Destino",
      contenido: `El destino de la pieza está escrito
en las estadísticas del taller.
La probabilidad, como un grito,
nos dice qué puede suceder.`,
      autor: "Matemáticas en Verso",
      fragmentos: [],
    },
    metadata: {
      color: "#F59E0B",
      colorGradiente: "from-amber-500 to-amber-600",
      icono: "🎲",
      desbloqueado: false,
      requisitos: ["categoria-1", "categoria-2", "categoria-3"],
      nivelRequerido: 15,
    },
    estadisticas: {
      leccionesTotales: 5,
      actividadesTotales: 15,
      ejerciciosTotales: 45,
      puntosTotales: 3000,
      duracionTotal: 300,
    },
  },
  {
    id: "categoria-5",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    titulo: "Cálculo Diferencial",
    subtitulo: "5° Año de Secundaria Técnica",
    descripcion: "Introducción al cálculo: límites, derivadas y sus aplicaciones en ingeniería.",
    año: 5,
    orden: 5,
    lecciones: [],
    poemaEpico: {
      titulo: "El Infinito Cercano",
      contenido: `El límite se acerca, pero nunca llega,
la derivada mide el cambio constante.
En cada curva, una nueva entrega,
de conocimiento que te hace brillante.`,
      autor: "Matemáticas en Verso",
      fragmentos: [],
    },
    metadata: {
      color: "#EF4444",
      colorGradiente: "from-red-500 to-red-600",
      icono: "📈",
      desbloqueado: false,
      requisitos: ["categoria-1", "categoria-2", "categoria-3", "categoria-4"],
      nivelRequerido: 20,
    },
    estadisticas: {
      leccionesTotales: 6,
      actividadesTotales: 18,
      ejerciciosTotales: 54,
      puntosTotales: 4000,
      duracionTotal: 400,
    },
  },
  {
    id: "categoria-6",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    titulo: "Cálculo Integral y Aplicaciones",
    subtitulo: "6° Año de Secundaria Técnica",
    descripcion: "Domina las integrales y sus aplicaciones en el cálculo de áreas, volúmenes y trabajo.",
    año: 6,
    orden: 6,
    lecciones: [],
    poemaEpico: {
      titulo: "La Suma Infinita",
      contenido: `La integral suma lo que parece infinito,
el área bajo la curva, un tesoro escondido.
El volumen de un sólido, un enigma bendito,
que el cálculo revela como un fiel amigo.`,
      autor: "Matemáticas en Verso",
      fragmentos: [],
    },
    metadata: {
      color: "#EC4899",
      colorGradiente: "from-pink-500 to-pink-600",
      icono: "∫",
      desbloqueado: false,
      requisitos: ["categoria-1", "categoria-2", "categoria-3", "categoria-4", "categoria-5"],
      nivelRequerido: 25,
    },
    estadisticas: {
      leccionesTotales: 6,
      actividadesTotales: 18,
      ejerciciosTotales: 54,
      puntosTotales: 4500,
      duracionTotal: 450,
    },
  },
]
