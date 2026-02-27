// =============================================================================
// DATOS DE EJEMPLO - Lecciones Completas
// =============================================================================

import type { Leccion } from "@/tipos/dominio"

export const leccionesEjemplo: Leccion[] = [
  // =========================================================================
  // CATEGORÍA 1: Estructuras y Relaciones Numéricas
  // =========================================================================
  {
    id: "leccion-1-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    categoriaId: "categoria-1",
    titulo: "Aritmética: Las Ecuaciones del Ingenio",
    descripcion:
      "Operaciones básicas aplicadas al entorno técnico industrial: sumas, restas, multiplicaciones y divisiones.",
    orden: 1,
    actividades: [],
    poemaRecompensa: {
      titulo: "El Coro de los Números",
      contenido: `Doce tornillos, quince tuercas,
la suma es un poema mecánico,
que no entiende de desamores,
solo de engranajes perfectos.

Así el taller se alza, pieza a pieza,
con la aritmética por bandera,
cada número, una dulce certeza,
que en la fría chapa, la vida genera.`,
      autor: "Matemáticas en Verso",
    },
    metadata: {
      icono: "➕",
      color: "#10B981",
      duracionEstimada: 45,
      dificultadPromedio: 1,
      puntosTotales: 500,
    },
  },
  {
    id: "leccion-1-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    categoriaId: "categoria-1",
    titulo: "Geometría del Plano: Diseños Rectos y Curvos",
    descripcion: "Perímetros y áreas de figuras básicas aplicados a diseños industriales.",
    orden: 2,
    actividades: [],
    poemaRecompensa: {
      titulo: "El Verso del Metal",
      contenido: `El cuadrado, la forma de la base,
el rectángulo, el panel en su andar.
La geometría, la pasión que nace,
del hierro y del frío sudor, al trabajar.

Cada trazo, un verso de metal,
cada ángulo, un gemido del esfuerzo,
diseñando el futuro, sin final,
en cada plano, hallamos un universo.`,
      autor: "Matemáticas en Verso",
    },
    metadata: {
      icono: "📐",
      color: "#3B82F6",
      duracionEstimada: 50,
      dificultadPromedio: 2,
      puntosTotales: 450,
    },
  },
  {
    id: "leccion-1-3",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    categoriaId: "categoria-1",
    titulo: "Potencias y Raíces: La Esencia del Cálculo",
    descripcion: "Domina las potencias y raíces para calcular áreas, volúmenes y dimensiones.",
    orden: 3,
    actividades: [],
    poemaRecompensa: {
      titulo: "La Potencia del Alma",
      contenido: `La potencia, una fuerza que se anida,
en el corazón del número que vibra.
El cuadrado, la superficie henchida,
el cubo, el espacio que nos libra.

Siete por siete, la placa se extiende,
cuatro por cuatro y cuatro, el volumen se eleva.
Así la máquina su destino enciende,
en cada número, una nueva prueba.`,
      autor: "Matemáticas en Verso",
    },
    metadata: {
      icono: "⚡",
      color: "#8B5CF6",
      duracionEstimada: 55,
      dificultadPromedio: 3,
      puntosTotales: 550,
    },
  },
  {
    id: "leccion-1-4",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    categoriaId: "categoria-1",
    titulo: "Proporcionalidad: Las Medidas del Éxito",
    descripcion: "Comprende la proporcionalidad directa e inversa en problemas de escala y reparto.",
    orden: 4,
    actividades: [],
    poemaRecompensa: {
      titulo: "Danza de Proporciones",
      contenido: `Si la pieza aumenta, el metal acompaña,
directa es la danza, sin ningún temor.
La proporción, la dulce trama,
que nos une, en cada labor.

El plano pequeño, un sueño escondido,
la escala, la llave que lo hará real.
Así el ingeniero, siempre convencido,
halla en los números, su verdad cabal.`,
      autor: "Matemáticas en Verso",
    },
    metadata: {
      icono: "⚖️",
      color: "#F59E0B",
      duracionEstimada: 60,
      dificultadPromedio: 3,
      puntosTotales: 600,
    },
  },
]
