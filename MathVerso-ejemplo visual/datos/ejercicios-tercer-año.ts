// =============================================================================
// DATOS DE EJERCICIOS - 3er Año (Geometría Analítica)
// =============================================================================
// Ejercicios completos para todas las actividades del 3er año.
// =============================================================================

import type { EjercicioConcreto } from "@/tipos/dominio"

export const ejerciciosTercerAño: EjercicioConcreto[] = [
  // =========================================================================
  // ACTIVIDAD 3-1-1: Ubicando Puntos en el Plano
  // =========================================================================
  {
    id: "ejercicio-3-1-1-1",
    actividadId: "actividad-3-1-1",
    tipo: "seleccion_multiple",
    pregunta:
      "¿Cuáles son las coordenadas del punto que está 3 unidades a la derecha del origen y 4 unidades hacia arriba?",
    descripcion: "El Primer Punto",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 45,
    orden: 1,
    opciones: [
      { id: "a", texto: "(4, 3)", esCorrecta: false },
      { id: "b", texto: "(3, 4)", esCorrecta: true },
      { id: "c", texto: "(-3, 4)", esCorrecta: false },
      { id: "d", texto: "(3, -4)", esCorrecta: false },
    ],
    respuestaCorrecta: "b",
    pistaPoetica: "Primero el paso horizontal (x), luego el salto vertical (y). Derecha es positivo, arriba también.",
    explicacionCorrecto: "Correcto. 3 a la derecha = x positivo = 3. 4 arriba = y positivo = 4. El punto es (3, 4).",
    explicacionIncorrecto:
      "Recuerda: primero x (horizontal), luego y (vertical). Derecha y arriba son positivos. El punto es (3, 4).",
  },
  {
    id: "ejercicio-3-1-1-2",
    actividadId: "actividad-3-1-1",
    tipo: "respuesta_numerica",
    pregunta: "Si un punto tiene coordenadas (7, -2), ¿cuántas unidades está a la derecha del origen?",
    descripcion: "Leyendo Coordenadas",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 30,
    orden: 2,
    respuestaCorrecta: 7,
    pistaPoetica: "La primera coordenada (x) indica el desplazamiento horizontal. Positivo es derecha.",
    explicacionCorrecto: "Exacto. La coordenada x = 7 indica 7 unidades a la derecha del origen.",
    explicacionIncorrecto: "La primera coordenada es x = 7, que representa 7 unidades a la derecha del origen.",
  },
  {
    id: "ejercicio-3-1-1-3",
    actividadId: "actividad-3-1-1",
    tipo: "seleccion_multiple",
    pregunta: "¿Cuál es el punto que está en el origen del plano cartesiano?",
    descripcion: "El Centro del Universo Matemático",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 30,
    orden: 3,
    opciones: [
      { id: "a", texto: "(1, 1)", esCorrecta: false },
      { id: "b", texto: "(0, 1)", esCorrecta: false },
      { id: "c", texto: "(0, 0)", esCorrecta: true },
      { id: "d", texto: "(1, 0)", esCorrecta: false },
    ],
    respuestaCorrecta: "c",
    pistaPoetica: "El origen es donde los ejes se cruzan. Sin desplazamiento horizontal ni vertical.",
    explicacionCorrecto: "Perfecto. El origen es el punto (0, 0), donde se cruzan los ejes X e Y.",
    explicacionIncorrecto: "El origen es el punto donde ambas coordenadas son cero: (0, 0).",
  },

  // =========================================================================
  // ACTIVIDAD 3-1-2: Los Cuatro Cuadrantes
  // =========================================================================
  {
    id: "ejercicio-3-1-2-1",
    actividadId: "actividad-3-1-2",
    tipo: "seleccion_multiple",
    pregunta: "El punto (-5, 3) se encuentra en el cuadrante:",
    descripcion: "Identificando Cuadrantes",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 45,
    orden: 1,
    opciones: [
      { id: "a", texto: "I (Primer cuadrante)", esCorrecta: false },
      { id: "b", texto: "II (Segundo cuadrante)", esCorrecta: true },
      { id: "c", texto: "III (Tercer cuadrante)", esCorrecta: false },
      { id: "d", texto: "IV (Cuarto cuadrante)", esCorrecta: false },
    ],
    respuestaCorrecta: "b",
    pistaPoetica:
      "x negativo, y positivo: arriba a la izquierda. El segundo cuadrante es el refugio de los que van contra la corriente pero miran al cielo.",
    explicacionCorrecto:
      "Correcto. En el cuadrante II: x es negativo (-), y es positivo (+). (-5, 3) cumple: x=-5 (<0), y=3 (>0).",
    explicacionIncorrecto:
      "Cuadrantes: I (+,+), II (-,+), III (-,-), IV (+,-). Como x=-5 (<0) e y=3 (>0), es cuadrante II.",
  },
  {
    id: "ejercicio-3-1-2-2",
    actividadId: "actividad-3-1-2",
    tipo: "seleccion_multiple",
    pregunta: "¿En qué cuadrante se encuentra el punto (4, -7)?",
    descripcion: "Bajo el Horizonte",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 45,
    orden: 2,
    opciones: [
      { id: "a", texto: "I", esCorrecta: false },
      { id: "b", texto: "II", esCorrecta: false },
      { id: "c", texto: "III", esCorrecta: false },
      { id: "d", texto: "IV", esCorrecta: true },
    ],
    respuestaCorrecta: "d",
    pistaPoetica: "Derecha y abajo: el cuarto cuadrante, donde x brilla positivo pero y se sumerge.",
    explicacionCorrecto: "Excelente. Cuadrante IV: x positivo, y negativo. (4, -7) tiene x=4 (>0), y=-7 (<0).",
    explicacionIncorrecto:
      "El cuadrante IV tiene x>0 e y<0. Como 4>0 y -7<0, el punto (4, -7) está en el cuadrante IV.",
  },

  // =========================================================================
  // ACTIVIDAD 3-2-1: La Pendiente de una Recta
  // =========================================================================
  {
    id: "ejercicio-3-2-1-1",
    actividadId: "actividad-3-2-1",
    tipo: "respuesta_numerica",
    pregunta: "Calcula la pendiente de la recta que pasa por los puntos A(1, 2) y B(4, 8). Usa m = (y₂-y₁)/(x₂-x₁)",
    descripcion: "La Inclinación del Camino",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 90,
    orden: 1,
    respuestaCorrecta: 2,
    pistaPoetica:
      "La pendiente mide cuánto sube (o baja) la recta por cada unidad horizontal. Resta las y, resta las x, y divide.",
    explicacionCorrecto: "Perfecto. m = (8-2)/(4-1) = 6/3 = 2. La recta sube 2 unidades por cada unidad horizontal.",
    explicacionIncorrecto: "m = (y₂-y₁)/(x₂-x₁) = (8-2)/(4-1) = 6/3 = 2. La pendiente es 2.",
  },
  {
    id: "ejercicio-3-2-1-2",
    actividadId: "actividad-3-2-1",
    tipo: "seleccion_multiple",
    pregunta: "Si la pendiente de una recta es -3, ¿qué significa esto?",
    descripcion: "Interpretando la Pendiente",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 60,
    orden: 2,
    opciones: [
      { id: "a", texto: "La recta sube 3 unidades por cada unidad horizontal", esCorrecta: false },
      { id: "b", texto: "La recta baja 3 unidades por cada unidad horizontal", esCorrecta: true },
      { id: "c", texto: "La recta es horizontal", esCorrecta: false },
      { id: "d", texto: "La recta es vertical", esCorrecta: false },
    ],
    respuestaCorrecta: "b",
    pistaPoetica: "Pendiente negativa: la recta desciende. Como una colina que baja hacia la derecha.",
    explicacionCorrecto:
      "Correcto. Una pendiente de -3 indica que la recta baja 3 unidades por cada unidad que avanza a la derecha.",
    explicacionIncorrecto:
      "Una pendiente negativa indica que la recta desciende. m=-3 significa bajar 3 por cada 1 horizontal.",
  },
  {
    id: "ejercicio-3-2-1-3",
    actividadId: "actividad-3-2-1",
    tipo: "respuesta_numerica",
    pregunta: "Calcula la pendiente de la recta que pasa por (0, 5) y (2, 5).",
    descripcion: "La Recta Horizontal",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 60,
    orden: 3,
    respuestaCorrecta: 0,
    pistaPoetica:
      "Cuando ambos puntos tienen la misma altura (y), la recta no sube ni baja. Es plana como el horizonte.",
    explicacionCorrecto: "Exacto. m = (5-5)/(2-0) = 0/2 = 0. La recta horizontal tiene pendiente cero.",
    explicacionIncorrecto:
      "m = (5-5)/(2-0) = 0/2 = 0. Como las y son iguales, la recta es horizontal y su pendiente es 0.",
  },

  // =========================================================================
  // ACTIVIDAD 3-2-2: Ecuación Pendiente-Ordenada
  // =========================================================================
  {
    id: "ejercicio-3-2-2-1",
    actividadId: "actividad-3-2-2",
    tipo: "seleccion_multiple",
    pregunta: "En la ecuación y = 3x - 5, ¿cuál es la pendiente y cuál es la ordenada al origen?",
    descripcion: "Leyendo la Ecuación",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 45,
    orden: 1,
    opciones: [
      { id: "a", texto: "m = -5, b = 3", esCorrecta: false },
      { id: "b", texto: "m = 3, b = -5", esCorrecta: true },
      { id: "c", texto: "m = 3, b = 5", esCorrecta: false },
      { id: "d", texto: "m = -3, b = -5", esCorrecta: false },
    ],
    respuestaCorrecta: "b",
    pistaPoetica: "En y = mx + b, m acompaña a la x (es el coeficiente), y b es el término independiente.",
    explicacionCorrecto: "Correcto. En y = 3x - 5: m (pendiente) = 3, b (ordenada al origen) = -5.",
    explicacionIncorrecto:
      "En y = mx + b: el número que multiplica a x es m (pendiente) = 3, y el término solo es b = -5.",
  },
  {
    id: "ejercicio-3-2-2-2",
    actividadId: "actividad-3-2-2",
    tipo: "respuesta_numerica",
    pregunta: "Una recta tiene pendiente m = 2 y pasa por el punto (0, 4). ¿Cuál es el valor de y cuando x = 3?",
    descripcion: "Usando la Ecuación",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 90,
    orden: 2,
    respuestaCorrecta: 10,
    pistaPoetica: "La ecuación es y = 2x + 4 (porque pasa por (0, 4), la ordenada al origen es 4). Sustituye x = 3.",
    explicacionCorrecto: "Excelente. y = 2x + 4. Para x = 3: y = 2(3) + 4 = 6 + 4 = 10.",
    explicacionIncorrecto: "La ecuación es y = 2x + 4. Sustituyendo x = 3: y = 2(3) + 4 = 6 + 4 = 10.",
  },

  // =========================================================================
  // ACTIVIDAD 3-3-1: Distancia Entre Dos Puntos
  // =========================================================================
  {
    id: "ejercicio-3-3-1-1",
    actividadId: "actividad-3-3-1",
    tipo: "respuesta_numerica",
    pregunta: "Calcula la distancia entre los puntos A(1, 2) y B(4, 6). Usa d = √[(x₂-x₁)² + (y₂-y₁)²]",
    descripcion: "La Distancia Perfecta",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 120,
    orden: 1,
    respuestaCorrecta: 5,
    pistaPoetica:
      "Resta las x, resta las y, eleva al cuadrado cada una, suma y saca la raíz. El teorema de Pitágoras te guía.",
    explicacionCorrecto: "Perfecto. d = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5 unidades.",
    explicacionIncorrecto: "d = √[(4-1)² + (6-2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5.",
  },
  {
    id: "ejercicio-3-3-1-2",
    actividadId: "actividad-3-3-1",
    tipo: "respuesta_numerica",
    pregunta: "¿Cuál es la distancia entre el origen (0, 0) y el punto (3, 4)?",
    descripcion: "Desde el Centro",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 90,
    orden: 2,
    respuestaCorrecta: 5,
    pistaPoetica: "El triángulo 3-4-5 es famoso. Es un triángulo rectángulo perfecto donde la hipotenusa es 5.",
    explicacionCorrecto: "Correcto. d = √[3² + 4²] = √[9 + 16] = √25 = 5. El clásico triángulo 3-4-5.",
    explicacionIncorrecto: "d = √[(3-0)² + (4-0)²] = √[9 + 16] = √25 = 5.",
  },

  // =========================================================================
  // ACTIVIDAD 3-3-2: El Punto Medio del Segmento
  // =========================================================================
  {
    id: "ejercicio-3-3-2-1",
    actividadId: "actividad-3-3-2",
    tipo: "seleccion_multiple",
    pregunta: "¿Cuál es el punto medio entre A(2, 4) y B(6, 10)?",
    descripcion: "El Centro del Segmento",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 90,
    orden: 1,
    opciones: [
      { id: "a", texto: "(4, 7)", esCorrecta: true },
      { id: "b", texto: "(4, 6)", esCorrecta: false },
      { id: "c", texto: "(3, 7)", esCorrecta: false },
      { id: "d", texto: "(8, 14)", esCorrecta: false },
    ],
    respuestaCorrecta: "a",
    pistaPoetica:
      "El punto medio es el promedio de las coordenadas. Suma las x y divide entre 2, haz lo mismo con las y.",
    explicacionCorrecto: "Excelente. M = ((2+6)/2, (4+10)/2) = (8/2, 14/2) = (4, 7).",
    explicacionIncorrecto: "Punto medio: ((x₁+x₂)/2, (y₁+y₂)/2) = ((2+6)/2, (4+10)/2) = (4, 7).",
  },

  // =========================================================================
  // ACTIVIDAD 3-4-1: Ecuación de la Circunferencia
  // =========================================================================
  {
    id: "ejercicio-3-4-1-1",
    actividadId: "actividad-3-4-1",
    tipo: "seleccion_multiple",
    pregunta: "En la ecuación (x-3)² + (y+2)² = 25, ¿cuál es el centro de la circunferencia?",
    descripcion: "Encontrando el Centro",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 60,
    orden: 1,
    opciones: [
      { id: "a", texto: "(3, 2)", esCorrecta: false },
      { id: "b", texto: "(-3, 2)", esCorrecta: false },
      { id: "c", texto: "(3, -2)", esCorrecta: true },
      { id: "d", texto: "(-3, -2)", esCorrecta: false },
    ],
    respuestaCorrecta: "c",
    pistaPoetica:
      "En (x-h)² + (y-k)² = r², el centro es (h, k). Cuidado con los signos: (x-3) implica h=3, (y+2) implica k=-2.",
    explicacionCorrecto: "Correcto. (x-3)² indica h=3, y (y+2)² = (y-(-2))² indica k=-2. Centro: (3, -2).",
    explicacionIncorrecto:
      "En (x-h)² + (y-k)² = r²: de (x-3)² sacamos h=3, de (y+2)² = (y-(-2))² sacamos k=-2. Centro: (3, -2).",
  },
  {
    id: "ejercicio-3-4-1-2",
    actividadId: "actividad-3-4-1",
    tipo: "respuesta_numerica",
    pregunta: "En la ecuación x² + y² = 49, ¿cuál es el radio de la circunferencia?",
    descripcion: "El Radio del Círculo",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 45,
    orden: 2,
    respuestaCorrecta: 7,
    pistaPoetica: "La ecuación x² + y² = r² tiene centro en el origen. El radio es la raíz cuadrada del número solo.",
    explicacionCorrecto: "Perfecto. Si r² = 49, entonces r = √49 = 7.",
    explicacionIncorrecto: "x² + y² = 49 significa r² = 49, por lo tanto r = √49 = 7.",
  },

  // =========================================================================
  // ACTIVIDAD 3-5-1: El Vértice de la Parábola
  // =========================================================================
  {
    id: "ejercicio-3-5-1-1",
    actividadId: "actividad-3-5-1",
    tipo: "respuesta_numerica",
    pregunta: "Para la parábola y = x² - 6x + 8, calcula la coordenada x del vértice usando x = -b/(2a).",
    descripcion: "El Punto Más Alto o Más Bajo",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 90,
    orden: 1,
    respuestaCorrecta: 3,
    pistaPoetica: "a = 1, b = -6, c = 8. El vértice está en x = -b/(2a). Sustituye y calcula.",
    explicacionCorrecto: "Excelente. x = -(-6)/(2·1) = 6/2 = 3. El vértice tiene x = 3.",
    explicacionIncorrecto: "Con a=1, b=-6: x = -b/(2a) = -(-6)/(2·1) = 6/2 = 3.",
  },
  {
    id: "ejercicio-3-5-1-2",
    actividadId: "actividad-3-5-1",
    tipo: "seleccion_multiple",
    pregunta: "Si el coeficiente a de una parábola es positivo (a > 0), ¿cómo es la parábola?",
    descripcion: "La Orientación de la Parábola",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 45,
    orden: 2,
    opciones: [
      { id: "a", texto: "Abre hacia arriba (tiene un mínimo)", esCorrecta: true },
      { id: "b", texto: "Abre hacia abajo (tiene un máximo)", esCorrecta: false },
      { id: "c", texto: "Es una recta", esCorrecta: false },
      { id: "d", texto: "Es un círculo", esCorrecta: false },
    ],
    respuestaCorrecta: "a",
    pistaPoetica:
      "a positiva: sonrisa feliz (∪). a negativa: ceño fruncido (∩). La forma de la parábola depende del signo de a.",
    explicacionCorrecto: "Correcto. Cuando a > 0, la parábola abre hacia arriba y tiene un punto mínimo (vértice).",
    explicacionIncorrecto: "Si a > 0, la parábola abre hacia arriba como una U. Si a < 0, abre hacia abajo como una ∩.",
  },

  // =========================================================================
  // ACTIVIDAD 3-6-1: Componentes de un Vector
  // =========================================================================
  {
    id: "ejercicio-3-6-1-1",
    actividadId: "actividad-3-6-1",
    tipo: "seleccion_multiple",
    pregunta: "Si un vector va del punto A(1, 2) al punto B(4, 6), ¿cuáles son sus componentes?",
    descripcion: "Las Coordenadas del Movimiento",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 60,
    orden: 1,
    opciones: [
      { id: "a", texto: "(5, 8)", esCorrecta: false },
      { id: "b", texto: "(3, 4)", esCorrecta: true },
      { id: "c", texto: "(4, 6)", esCorrecta: false },
      { id: "d", texto: "(-3, -4)", esCorrecta: false },
    ],
    respuestaCorrecta: "b",
    pistaPoetica: "Las componentes son la diferencia: (x₂-x₁, y₂-y₁). Es cuánto te mueves en cada dirección.",
    explicacionCorrecto: "Perfecto. Componentes = (4-1, 6-2) = (3, 4). El vector se mueve 3 en x y 4 en y.",
    explicacionIncorrecto: "Las componentes de un vector AB son (x_B - x_A, y_B - y_A) = (4-1, 6-2) = (3, 4).",
  },
  {
    id: "ejercicio-3-6-1-2",
    actividadId: "actividad-3-6-1",
    tipo: "respuesta_numerica",
    pregunta: "Calcula la magnitud (longitud) del vector v = (3, 4). Usa |v| = √(vx² + vy²)",
    descripcion: "La Fuerza del Vector",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 60,
    orden: 2,
    respuestaCorrecta: 5,
    pistaPoetica: "La magnitud es la hipotenusa del triángulo formado por las componentes. Pitágoras te ayuda.",
    explicacionCorrecto: "Excelente. |v| = √(3² + 4²) = √(9 + 16) = √25 = 5.",
    explicacionIncorrecto: "|v| = √(vx² + vy²) = √(3² + 4²) = √(9 + 16) = √25 = 5.",
  },

  // =========================================================================
  // ACTIVIDAD 3-6-2: Suma de Vectores
  // =========================================================================
  {
    id: "ejercicio-3-6-2-1",
    actividadId: "actividad-3-6-2",
    tipo: "seleccion_multiple",
    pregunta: "Si u = (2, 3) y v = (4, -1), ¿cuál es u + v?",
    descripcion: "Uniendo Fuerzas",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 60,
    orden: 1,
    opciones: [
      { id: "a", texto: "(6, 2)", esCorrecta: true },
      { id: "b", texto: "(2, 4)", esCorrecta: false },
      { id: "c", texto: "(-2, 4)", esCorrecta: false },
      { id: "d", texto: "(6, -2)", esCorrecta: false },
    ],
    respuestaCorrecta: "a",
    pistaPoetica: "Suma componente a componente: (ux + vx, uy + vy). Cada dirección se suma por separado.",
    explicacionCorrecto: "Correcto. u + v = (2+4, 3+(-1)) = (6, 2).",
    explicacionIncorrecto: "La suma de vectores es componente a componente: (2+4, 3+(-1)) = (6, 2).",
  },
  {
    id: "ejercicio-3-6-2-2",
    actividadId: "actividad-3-6-2",
    tipo: "seleccion_multiple",
    pregunta: "Si u = (5, 2) y v = (3, 4), ¿cuál es u - v?",
    descripcion: "Restando Direcciones",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 60,
    orden: 2,
    opciones: [
      { id: "a", texto: "(8, 6)", esCorrecta: false },
      { id: "b", texto: "(2, -2)", esCorrecta: true },
      { id: "c", texto: "(-2, 2)", esCorrecta: false },
      { id: "d", texto: "(2, 2)", esCorrecta: false },
    ],
    respuestaCorrecta: "b",
    pistaPoetica: "Resta componente a componente: (ux - vx, uy - vy). La diferencia indica el cambio entre vectores.",
    explicacionCorrecto: "Perfecto. u - v = (5-3, 2-4) = (2, -2).",
    explicacionIncorrecto: "La resta de vectores: (5-3, 2-4) = (2, -2).",
  },
]
