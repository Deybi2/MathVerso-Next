// =============================================================================
// DATOS DE LECCIONES - 3er Año (Geometría Analítica)
// =============================================================================
// Lecciones completas para la categoría 3 (3er año de secundaria técnica).
// =============================================================================

import type { Leccion } from "@/tipos/dominio"

export const leccionesTercerAño: Leccion[] = [
  {
    id: "leccion-3-1",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    categoriaId: "categoria-3",
    titulo: "El Plano Cartesiano: Coordenadas del Destino",
    descripcion: "Aprende a ubicar puntos en el plano y a navegar por los cuatro cuadrantes.",
    orden: 1,
    actividades: [],
    poemaRecompensa: {
      titulo: "El Mapa de Descartes",
      contenido: `René Descartes soñó una noche estrellada,
con ejes que cruzan en el centro del todo.
La X corre horizontal, de prisa, de nada,
La Y sube vertical, buscando acomodo.

Cada punto tiene nombre: x e y,
coordenadas que ubican su lugar.
En este plano, sin rey ni ley,
las matemáticas aprenden a volar.`,
      autor: "Matemáticas en Verso",
    },
    metadata: {
      icono: "📍",
      color: "#8B5CF6",
      duracionEstimada: 40,
      dificultadPromedio: 2,
      puntosTotales: 400,
    },
  },
  {
    id: "leccion-3-2",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    categoriaId: "categoria-3",
    titulo: "La Recta: Caminos que se Extienden",
    descripcion: "Domina la ecuación de la recta, la pendiente y la ordenada al origen.",
    orden: 2,
    actividades: [],
    poemaRecompensa: {
      titulo: "La Pendiente del Camino",
      contenido: `y = mx + b, la fórmula sagrada,
donde m es la pendiente, el ángulo del viaje.
La b, el punto donde todo nace y nada,
el cruce con el eje, el primer paisaje.

Si m es positiva, la recta asciende,
si es negativa, baja sin cesar.
Horizontal si m es cero, el camino se extiende,
vertical si m no existe, al infinito va a llegar.`,
      autor: "Matemáticas en Verso",
    },
    metadata: {
      icono: "📏",
      color: "#10B981",
      duracionEstimada: 55,
      dificultadPromedio: 3,
      puntosTotales: 550,
    },
  },
  {
    id: "leccion-3-3",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    categoriaId: "categoria-3",
    titulo: "Distancia y Punto Medio: Medidas del Espacio",
    descripcion: "Calcula distancias entre puntos y encuentra puntos medios en el plano.",
    orden: 3,
    actividades: [],
    poemaRecompensa: {
      titulo: "La Distancia Entre Dos Almas",
      contenido: `La distancia entre dos puntos es un lamento,
la raíz de la suma de cuadrados.
X₂ menos x₁, el primer argumento,
y₂ menos y₁, los pasos contados.

El punto medio divide el camino,
la mitad de las sumas, el centro encontrado.
Entre dos lugares, un solo destino,
el equilibrio perfecto, el punto sagrado.`,
      autor: "Matemáticas en Verso",
    },
    metadata: {
      icono: "📐",
      color: "#F59E0B",
      duracionEstimada: 50,
      dificultadPromedio: 3,
      puntosTotales: 500,
    },
  },
  {
    id: "leccion-3-4",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    categoriaId: "categoria-3",
    titulo: "La Circunferencia: El Círculo Perfecto",
    descripcion: "Explora la ecuación de la circunferencia y sus propiedades geométricas.",
    orden: 4,
    actividades: [],
    poemaRecompensa: {
      titulo: "El Círculo Sin Fin",
      contenido: `El círculo es la forma más perfecta,
todos sus puntos equidistantes del centro.
(x - h)² + (y - k)² = r², la recta
ecuación que encierra el misterio adentro.

h y k son el centro, el corazón,
r es el radio, la distancia constante.
Cada punto del borde, una canción,
a la misma distancia, siempre elegante.`,
      autor: "Matemáticas en Verso",
    },
    metadata: {
      icono: "⭕",
      color: "#EC4899",
      duracionEstimada: 60,
      dificultadPromedio: 4,
      puntosTotales: 600,
    },
  },
  {
    id: "leccion-3-5",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    categoriaId: "categoria-3",
    titulo: "La Parábola: Curvas que Alcanzan el Cielo",
    descripcion: "Estudia la parábola, su vértice, foco y directriz.",
    orden: 5,
    actividades: [],
    poemaRecompensa: {
      titulo: "El Vuelo Parabólico",
      contenido: `La parábola sube y luego cae,
o desciende y luego se eleva.
Su vértice es el punto que atrae,
el máximo o mínimo que lleva.

y = ax² + bx + c, la función,
que modela el vuelo del balón.
Si a es positiva, mira al sol,
si es negativa, busca el crisol.`,
      autor: "Matemáticas en Verso",
    },
    metadata: {
      icono: "🏹",
      color: "#EF4444",
      duracionEstimada: 65,
      dificultadPromedio: 4,
      puntosTotales: 650,
    },
  },
  {
    id: "leccion-3-6",
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
    categoriaId: "categoria-3",
    titulo: "Vectores: Fuerzas con Dirección",
    descripcion: "Aprende sobre vectores, sus operaciones y aplicaciones en física.",
    orden: 6,
    actividades: [],
    poemaRecompensa: {
      titulo: "Vectores del Viento",
      contenido: `Los vectores tienen dirección,
magnitud y sentido verdadero.
Como el viento en su canción,
nos guían por el sendero.

La suma de vectores es unión,
de fuerzas que se combinan.
Cada componente es una razón,
que las matemáticas afinan.`,
      autor: "Matemáticas en Verso",
    },
    metadata: {
      icono: "➡️",
      color: "#6366F1",
      duracionEstimada: 55,
      dificultadPromedio: 4,
      puntosTotales: 550,
    },
  },
]
