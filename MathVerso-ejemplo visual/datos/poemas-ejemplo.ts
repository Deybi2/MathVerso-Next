// =============================================================================
// DATOS DE POEMAS - Matemáticas en Verso
// =============================================================================
// Colección completa de poemas matemáticos organizados por categoría.
// Incluye poemas especiales para el 3er año de secundaria (Geometría Analítica).
// =============================================================================

import type { Poema, ColeccionPoemas } from "@/tipos/poemario"

// -----------------------------------------------------------------------------
// Poemas de Álgebra
// -----------------------------------------------------------------------------

export const poemasAlgebra: Poema[] = [
  {
    id: "poema-algebra-1",
    titulo: "Ecuación de Amor",
    contenido: `Si "x" es tu risa, "y" es mi esperar,
resolvamos juntos sin despejar.
Que la solución, clara y real,
sea un abrazo, dulce y total.

En el plano de nuestros días,
las variables son melodías.
Cada incógnita que despejamos,
es un secreto que nos regalamos.`,
    autor: "Matemáticas en Verso",
    categoria: "algebra",
    temaMatematico: "Ecuaciones lineales",
    añoEscolar: 2,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: true,
    vecesLeido: 0,
  },
  {
    id: "poema-algebra-2",
    titulo: "Enteros y Complejos",
    contenido: `Los números enteros caminan en fila,
desde el negativo hasta el positivo.
Cada paso que das es una vigilia,
hacia el cero, siempre activo.

Los complejos bailan en otro plano,
donde lo imaginario es real.
Con la "i" de la mano,
resuelven todo lo que es crucial.`,
    autor: "Matemáticas en Verso",
    categoria: "algebra",
    temaMatematico: "Números complejos",
    añoEscolar: 3,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: true,
    vecesLeido: 0,
  },
  {
    id: "poema-algebra-3",
    titulo: "Fracción de Ti",
    contenido: `Eres el numerador de mis sueños,
yo soy tu denominador fiel.
Juntos formamos diseños,
más dulces que la miel.

Simplificamos hasta lo esencial,
encontrando la fracción perfecta.
En este amor irracional,
nuestra suma es directa.`,
    autor: "Matemáticas en Verso",
    categoria: "algebra",
    temaMatematico: "Fracciones algebraicas",
    añoEscolar: 2,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: true,
    vecesLeido: 0,
  },
  {
    id: "poema-algebra-4",
    titulo: "Sistemas de Esperanza",
    contenido: `Dos ecuaciones, dos caminos,
se cruzan en un punto ideal.
Como dos destinos divinos,
encuentran la solución final.

El método de sustitución,
reemplaza lo que no entendemos.
Y en cada operación,
más cerca de la verdad nos vemos.`,
    autor: "Matemáticas en Verso",
    categoria: "algebra",
    temaMatematico: "Sistemas de ecuaciones",
    añoEscolar: 2,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: false,
    monedasParaDesbloquear: 100,
    vecesLeido: 0,
  },
  {
    id: "poema-algebra-5",
    titulo: "Polinomio del Corazón",
    contenido: `Cada término es un latido,
cada exponente una emoción.
El polinomio construido,
es la suma de toda pasión.

Factorizamos los problemas,
buscando raíces comunes.
En los más difíciles teoremas,
encontramos las comuniones.`,
    autor: "Matemáticas en Verso",
    categoria: "algebra",
    temaMatematico: "Polinomios",
    añoEscolar: 3,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: false,
    monedasParaDesbloquear: 150,
    vecesLeido: 0,
  },
]

// -----------------------------------------------------------------------------
// Poemas de Geometría (3er Año - Geometría Analítica)
// -----------------------------------------------------------------------------

export const poemasGeometria: Poema[] = [
  {
    id: "poema-geometria-1",
    titulo: "El Plano Cartesiano",
    contenido: `René Descartes soñó una noche,
con ejes que cruzan el infinito.
La X y la Y, como un broche,
unieron lo grande y lo chiquito.

Cada punto tiene su lugar,
coordenadas que lo definen.
En este plano de par en par,
las figuras se combinan.`,
    autor: "Matemáticas en Verso",
    categoria: "geometria",
    temaMatematico: "Plano cartesiano",
    añoEscolar: 3,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: true,
    vecesLeido: 0,
  },
  {
    id: "poema-geometria-2",
    titulo: "La Recta del Destino",
    contenido: `y = mx + b, la fórmula sagrada,
donde m es la pendiente del camino.
La b, el punto donde nada,
comienza su destino.

Una recta puede ser tu vida,
con pendiente positiva o negativa.
Cada decisión bien medida,
te hace más sensitiva.`,
    autor: "Matemáticas en Verso",
    categoria: "geometria",
    temaMatematico: "Ecuación de la recta",
    añoEscolar: 3,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: true,
    vecesLeido: 0,
  },
  {
    id: "poema-geometria-3",
    titulo: "Distancia Entre Dos Almas",
    contenido: `La distancia entre dos puntos,
es la raíz de la suma cuadrada.
Los corazones que están juntos,
tienen distancia calculada.

d = √[(x₂-x₁)² + (y₂-y₁)²],
la fórmula del amor medido.
Aunque estés lejos, siempre serás,
el punto más querido.`,
    autor: "Matemáticas en Verso",
    categoria: "geometria",
    temaMatematico: "Distancia entre dos puntos",
    añoEscolar: 3,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: true,
    vecesLeido: 0,
  },
  {
    id: "poema-geometria-4",
    titulo: "El Círculo Perfecto",
    contenido: `El círculo es la forma más bella,
todos sus puntos equidistantes.
Como una brillante estrella,
sus propiedades son elegantes.

x² + y² = r², la ecuación,
que describe la perfección.
En cada circunferencia hay una lección,
de unidad y conexión.`,
    autor: "Matemáticas en Verso",
    categoria: "geometria",
    temaMatematico: "Ecuación de la circunferencia",
    añoEscolar: 3,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: false,
    monedasParaDesbloquear: 200,
    vecesLeido: 0,
  },
  {
    id: "poema-geometria-5",
    titulo: "Vectores del Viento",
    contenido: `Los vectores tienen dirección,
magnitud y sentido verdadero.
Como el viento en su canción,
nos guían por el sendero.

La suma de vectores es unión,
de fuerzas que se combinan.
En cada operación,
las direcciones se afinan.`,
    autor: "Matemáticas en Verso",
    categoria: "geometria",
    temaMatematico: "Vectores",
    añoEscolar: 3,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: false,
    monedasParaDesbloquear: 250,
    vecesLeido: 0,
  },
  {
    id: "poema-geometria-6",
    titulo: "La Parábola del Éxito",
    contenido: `La parábola sube y luego baja,
o baja y luego sube con vigor.
Su vértice es la atalaya,
desde donde se ve mejor.

y = ax² + bx + c, la función,
que modela el vuelo del balón.
En cada tiro hay precisión,
matemática y pasión.`,
    autor: "Matemáticas en Verso",
    categoria: "geometria",
    temaMatematico: "Parábola",
    añoEscolar: 3,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: false,
    monedasParaDesbloquear: 300,
    vecesLeido: 0,
  },
]

// -----------------------------------------------------------------------------
// Poemas de Aritmética
// -----------------------------------------------------------------------------

export const poemasAritmetica: Poema[] = [
  {
    id: "poema-aritmetica-1",
    titulo: "La Danza de los Números",
    contenido: `Los números bailan sin parar,
del uno al infinito van.
Cada cifra tiene su lugar,
en esta fiesta que darán.

La suma es un abrazo cálido,
la resta es decir adiós.
El producto es algo válido,
y el cociente divide a dos.`,
    autor: "Matemáticas en Verso",
    categoria: "aritmetica",
    temaMatematico: "Operaciones básicas",
    añoEscolar: 1,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: true,
    vecesLeido: 0,
  },
  {
    id: "poema-aritmetica-2",
    titulo: "Primos y Compuestos",
    contenido: `Los números primos son especiales,
solo se dividen entre uno y ellos mismos.
Son los guardianes celestiales,
de los secretos y los criptogramas.

Los compuestos tienen muchos factores,
pueden dividirse de mil maneras.
Son los grandes colaboradores,
en las operaciones verdaderas.`,
    autor: "Matemáticas en Verso",
    categoria: "aritmetica",
    temaMatematico: "Números primos",
    añoEscolar: 1,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: true,
    vecesLeido: 0,
  },
  {
    id: "poema-aritmetica-3",
    titulo: "El Cero Misterioso",
    contenido: `El cero es nada y es todo,
el vacío que completa.
Sin él, de ningún modo,
nuestra cuenta sería perfecta.

Es el punto de partida,
el centro del termómetro.
En la matemática de la vida,
el cero es el barómetro.`,
    autor: "Matemáticas en Verso",
    categoria: "aritmetica",
    temaMatematico: "El cero",
    añoEscolar: 1,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: false,
    monedasParaDesbloquear: 50,
    vecesLeido: 0,
  },
]

// -----------------------------------------------------------------------------
// Poemas de Probabilidad
// -----------------------------------------------------------------------------

export const poemasProbabilidad: Poema[] = [
  {
    id: "poema-probabilidad-1",
    titulo: "El Azar del Ensamblaje",
    contenido: `Tienes 50 piezas en total,
5 de ellas no sirven.
La probabilidad es esa fracción
que nace al dividir lo que falla
entre todo lo que existe.

El destino de la pieza está escrito,
en números que no mienten.
Cada probabilidad es un conflicto,
entre lo seguro y lo que se siente.`,
    autor: "Matemáticas en Verso",
    categoria: "probabilidad",
    temaMatematico: "Probabilidad simple",
    añoEscolar: 3,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: true,
    vecesLeido: 0,
  },
  {
    id: "poema-probabilidad-2",
    titulo: "Dados del Destino",
    contenido: `Un dado tiene seis caras,
cada una con igual oportunidad.
Las probabilidades claras,
nos hablan de la realidad.

1/6 para cada número,
la suerte es democrática.
En este juego lúmbrico,
la matemática es pragmática.`,
    autor: "Matemáticas en Verso",
    categoria: "probabilidad",
    temaMatematico: "Espacio muestral",
    añoEscolar: 3,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: false,
    monedasParaDesbloquear: 150,
    vecesLeido: 0,
  },
]

// -----------------------------------------------------------------------------
// Poemas de Cálculo
// -----------------------------------------------------------------------------

export const poemasCalculo: Poema[] = [
  {
    id: "poema-calculo-1",
    titulo: "El Límite del Horizonte",
    contenido: `El límite se acerca pero nunca llega,
como el horizonte al caminar.
La función se entrega,
a un valor sin alcanzar.

lim(x→a) f(x) = L,
la promesa de lo que será.
En cada épsilon hay un umbral,
que la delta cruzará.`,
    autor: "Matemáticas en Verso",
    categoria: "calculo",
    temaMatematico: "Límites",
    añoEscolar: 5,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: false,
    monedasParaDesbloquear: 500,
    vecesLeido: 0,
  },
  {
    id: "poema-calculo-2",
    titulo: "La Derivada del Tiempo",
    contenido: `La derivada mide el cambio,
la velocidad del instante.
En cada momento no hay extraño,
solo matemática brillante.

dy/dx es la pendiente,
de la curva en cada punto.
Lo infinitamente pequeño presente,
revela todo el conjunto.`,
    autor: "Matemáticas en Verso",
    categoria: "calculo",
    temaMatematico: "Derivadas",
    añoEscolar: 5,
    fechaCreacion: new Date().toISOString(),
    desbloqueado: false,
    monedasParaDesbloquear: 500,
    vecesLeido: 0,
  },
]

// -----------------------------------------------------------------------------
// Colección completa exportada
// -----------------------------------------------------------------------------

export const todosLosPoemas: Poema[] = [
  ...poemasAlgebra,
  ...poemasGeometria,
  ...poemasAritmetica,
  ...poemasProbabilidad,
  ...poemasCalculo,
]

export const coleccionesPoemas: ColeccionPoemas[] = [
  {
    id: "col-algebra",
    titulo: "Álgebra",
    descripcion: "Poemas sobre ecuaciones, sistemas y polinomios",
    poemas: poemasAlgebra,
    colorFondo: "from-emerald-500 to-emerald-600",
    colorTexto: "text-white",
    icono: "x",
  },
  {
    id: "col-geometria",
    titulo: "Geometría",
    descripcion: "Poemas sobre figuras, planos y vectores",
    poemas: poemasGeometria,
    colorFondo: "from-violet-500 to-violet-600",
    colorTexto: "text-white",
    icono: "△",
  },
  {
    id: "col-aritmetica",
    titulo: "Aritmética",
    descripcion: "Poemas sobre números y operaciones",
    poemas: poemasAritmetica,
    colorFondo: "from-blue-500 to-blue-600",
    colorTexto: "text-white",
    icono: "123",
  },
  {
    id: "col-probabilidad",
    titulo: "Probabilidad",
    descripcion: "Poemas sobre azar y estadística",
    poemas: poemasProbabilidad,
    colorFondo: "from-amber-500 to-amber-600",
    colorTexto: "text-white",
    icono: "🎲",
  },
  {
    id: "col-calculo",
    titulo: "Cálculo",
    descripcion: "Poemas sobre límites y derivadas",
    poemas: poemasCalculo,
    colorFondo: "from-red-500 to-red-600",
    colorTexto: "text-white",
    icono: "∫",
  },
]

// Función para obtener poemas por año escolar
export const obtenerPoemasPorAño = (año: number): Poema[] => {
  return todosLosPoemas.filter((poema) => poema.añoEscolar === año)
}

// Función para obtener poemas desbloqueados
export const obtenerPoemasDesbloqueados = (): Poema[] => {
  return todosLosPoemas.filter((poema) => poema.desbloqueado)
}
