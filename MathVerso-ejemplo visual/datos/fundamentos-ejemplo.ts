// =============================================================================
// DATOS DE FUNDAMENTOS - Matemáticas en Verso
// =============================================================================

import type { CategoriaFundamento } from "@/tipos/fundamentos"

export const categoriasFundamentos: CategoriaFundamento[] = [
  {
    id: "aritmetica",
    nombre: "Aritmética",
    descripcion: "Operaciones básicas con números",
    icono: "123",
    colorFondo: "from-red-500 to-red-600",
    colorTexto: "text-white",
    conceptos: [
      {
        id: "operaciones-basicas",
        titulo: "Operaciones Básicas",
        descripcion: "Suma, resta, multiplicación y división",
        contenido: `Las cuatro operaciones básicas son el fundamento de todas las matemáticas:

**Suma (+)**: Combina cantidades. 5 + 3 = 8
**Resta (-)**: Encuentra la diferencia. 8 - 3 = 5
**Multiplicación (×)**: Suma repetida. 4 × 3 = 12
**División (÷)**: Reparte en partes iguales. 12 ÷ 3 = 4

El orden de las operaciones (PEMDAS):
1. Paréntesis
2. Exponentes
3. Multiplicación y División (izq. a der.)
4. Adición y Sustracción (izq. a der.)`,
        ejemplos: [
          {
            id: "ej-1",
            titulo: "Orden de operaciones",
            problema: "Calcula: 2 + 3 × 4",
            solucion: "14",
            explicacion: "Primero multiplicamos 3 × 4 = 12, luego sumamos 2 + 12 = 14",
          },
        ],
        formulas: ["a + b = b + a (Conmutativa)", "a × (b + c) = a×b + a×c (Distributiva)"],
        consejos: ["Siempre sigue el orden PEMDAS", "Verifica tu resultado con la operación inversa"],
      },
      {
        id: "fracciones",
        titulo: "Fracciones",
        descripcion: "Partes de un todo",
        contenido: `Una fracción representa una parte de un todo.

**Numerador**: El número de arriba (cuántas partes tenemos)
**Denominador**: El número de abajo (en cuántas partes se divide el todo)

**Suma de fracciones con mismo denominador**:
a/c + b/c = (a+b)/c

**Suma con diferente denominador**:
Primero encontrar el mínimo común múltiplo (MCM)`,
        ejemplos: [
          {
            id: "ej-2",
            titulo: "Suma de fracciones",
            problema: "Suma: 1/4 + 2/4",
            solucion: "3/4",
            explicacion: "Como tienen el mismo denominador, sumamos los numeradores: 1 + 2 = 3",
          },
        ],
        formulas: ["a/b + c/b = (a+c)/b", "a/b × c/d = (a×c)/(b×d)"],
        consejos: ["Siempre simplifica las fracciones al final", "Para sumar, necesitas el mismo denominador"],
      },
    ],
  },
  {
    id: "algebra",
    nombre: "Álgebra",
    descripcion: "El lenguaje de las matemáticas",
    icono: "x",
    colorFondo: "from-amber-500 to-amber-600",
    colorTexto: "text-white",
    conceptos: [
      {
        id: "ecuaciones-lineales",
        titulo: "Ecuaciones Lineales",
        descripcion: "Encontrar el valor de la incógnita",
        contenido: `Una ecuación lineal tiene la forma ax + b = c

**Pasos para resolver**:
1. Agrupa términos semejantes
2. Despeja la variable
3. Simplifica

**Ejemplo**: 2x + 5 = 11
1. Resta 5 de ambos lados: 2x = 6
2. Divide entre 2: x = 3`,
        ejemplos: [
          {
            id: "ej-3",
            titulo: "Ecuación simple",
            problema: "Resuelve: 3x - 7 = 8",
            solucion: "x = 5",
            explicacion: "Suma 7: 3x = 15. Divide entre 3: x = 5",
          },
        ],
        formulas: ["ax + b = c → x = (c - b)/a"],
        consejos: ["Lo que haces de un lado, hazlo del otro", "Verifica sustituyendo el resultado"],
      },
      {
        id: "sistemas-ecuaciones",
        titulo: "Sistemas de Ecuaciones",
        descripcion: "Dos ecuaciones, dos incógnitas",
        contenido: `Un sistema de ecuaciones tiene dos o más ecuaciones con las mismas variables.

**Métodos de solución**:
1. **Sustitución**: Despeja una variable y sustituye
2. **Eliminación**: Suma o resta para eliminar una variable
3. **Igualación**: Iguala las expresiones de la misma variable`,
        ejemplos: [
          {
            id: "ej-4",
            titulo: "Sistema 2x2",
            problema: "x + y = 5\n2x - y = 1",
            solucion: "x = 2, y = 3",
            explicacion: "Sumando ambas: 3x = 6, x = 2. Sustituyendo: y = 3",
          },
        ],
        formulas: ["Sustitución: y = f(x) → sustituir en la otra ecuación"],
        consejos: ["Elige el método más sencillo según el problema", "Verifica en ambas ecuaciones"],
      },
    ],
  },
  {
    id: "geometria",
    nombre: "Geometría",
    descripcion: "Formas y espacios",
    icono: "△",
    colorFondo: "from-emerald-500 to-emerald-600",
    colorTexto: "text-white",
    conceptos: [
      {
        id: "plano-cartesiano",
        titulo: "Plano Cartesiano",
        descripcion: "Coordenadas en el plano",
        contenido: `El plano cartesiano tiene dos ejes perpendiculares:
- **Eje X** (horizontal): valores positivos a la derecha
- **Eje Y** (vertical): valores positivos hacia arriba

**Coordenadas**: (x, y) indica la posición de un punto
- x: distancia horizontal desde el origen
- y: distancia vertical desde el origen

**Cuadrantes**:
I: (+, +)  II: (-, +)  III: (-, -)  IV: (+, -)`,
        ejemplos: [
          {
            id: "ej-5",
            titulo: "Ubicar un punto",
            problema: "Ubica el punto P(3, -2)",
            solucion: "Cuadrante IV",
            explicacion: "x = 3 (positivo, derecha), y = -2 (negativo, abajo)",
          },
        ],
        formulas: ["Origen: (0, 0)"],
        consejos: ["Siempre lee primero x, luego y", "Practica ubicando puntos en papel cuadriculado"],
      },
      {
        id: "distancia-puntos",
        titulo: "Distancia entre Puntos",
        descripcion: "Medir en el plano",
        contenido: `La distancia entre dos puntos P₁(x₁, y₁) y P₂(x₂, y₂) se calcula con:

d = √[(x₂ - x₁)² + (y₂ - y₁)²]

Esta fórmula viene del teorema de Pitágoras aplicado al plano cartesiano.`,
        ejemplos: [
          {
            id: "ej-6",
            titulo: "Calcular distancia",
            problema: "Distancia entre A(1, 2) y B(4, 6)",
            solucion: "5 unidades",
            explicacion: "d = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5",
          },
        ],
        formulas: ["d = √[(x₂-x₁)² + (y₂-y₁)²]"],
        consejos: [
          "Recuerda: la raíz de un cuadrado perfecto da entero",
          "Dibuja el triángulo rectángulo para visualizar",
        ],
      },
    ],
  },
  {
    id: "calculo",
    nombre: "Cálculo",
    descripcion: "Cambio y movimiento",
    icono: "∫",
    colorFondo: "from-blue-500 to-blue-600",
    colorTexto: "text-white",
    conceptos: [
      {
        id: "limites",
        titulo: "Límites",
        descripcion: "El comportamiento cerca de un punto",
        contenido: `El límite describe hacia dónde se acerca una función cuando x se aproxima a un valor.

lim(x→a) f(x) = L

Significa: cuando x se acerca a "a", f(x) se acerca a "L"

**Propiedades**:
- Límite de una suma = suma de límites
- Límite de un producto = producto de límites`,
        ejemplos: [
          {
            id: "ej-7",
            titulo: "Límite simple",
            problema: "lim(x→2) (x² - 4)/(x - 2)",
            solucion: "4",
            explicacion: "Factorizando: (x+2)(x-2)/(x-2) = x+2. Evaluando en x=2: 4",
          },
        ],
        formulas: ["lim(x→a) [f(x) + g(x)] = lim f(x) + lim g(x)"],
        consejos: ["Si da 0/0, intenta factorizar", "Visualiza la gráfica para entender el comportamiento"],
      },
    ],
  },
  {
    id: "probabilidad",
    nombre: "Probabilidad",
    descripcion: "El azar y los datos",
    icono: "🎲",
    colorFondo: "from-violet-500 to-violet-600",
    colorTexto: "text-white",
    conceptos: [
      {
        id: "probabilidad-simple",
        titulo: "Probabilidad Simple",
        descripcion: "La posibilidad de que algo ocurra",
        contenido: `La probabilidad mide qué tan probable es un evento.

P(A) = Casos favorables / Casos totales

**Rango**: 0 ≤ P(A) ≤ 1
- P = 0: Imposible
- P = 1: Seguro
- P = 0.5: Igual de probable que no ocurra

**Espacio muestral**: Todos los resultados posibles`,
        ejemplos: [
          {
            id: "ej-8",
            titulo: "Probabilidad de dado",
            problema: "Probabilidad de sacar un 6 en un dado",
            solucion: "1/6",
            explicacion: "1 caso favorable (el 6) entre 6 casos posibles (1,2,3,4,5,6)",
          },
          {
            id: "ej-9",
            titulo: "Piezas defectuosas",
            problema: "Tienes 50 piezas, 5 defectuosas. ¿Probabilidad de sacar una defectuosa?",
            solucion: "1/10 o 0.1",
            explicacion: "5 defectuosas / 50 totales = 5/50 = 1/10",
          },
        ],
        formulas: ["P(A) = n(A) / n(S)", "P(A') = 1 - P(A)"],
        consejos: [
          "La probabilidad siempre está entre 0 y 1",
          "Simplifica las fracciones para expresar mejor",
          "Divide el número de piezas defectuosas por el total para obtener la probabilidad",
        ],
      },
    ],
  },
]
