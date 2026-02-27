// =============================================================================
// DATOS DE EJEMPLO - Ejercicios Completos
// =============================================================================
// Ejercicios basados en el contenido proporcionado por el usuario.
// Incluye ejercicios de aritmética, geometría, álgebra y probabilidad.
// =============================================================================

import type { EjercicioConcreto } from "@/tipos/dominio"

export const ejerciciosEjemplo: EjercicioConcreto[] = [
  // =========================================================================
  // ACTIVIDAD 1-1-1: Sumas que Construyen Puentes
  // =========================================================================
  {
    id: "ejercicio-1-1-1-1",
    actividadId: "actividad-1-1-1",
    tipo: "seleccion_multiple",
    pregunta:
      "Un motor requiere 12 tornillos grandes, 15 tuercas medianas y 8 arandelas pequeñas. ¿Cuántas piezas de fijación se necesitan en total?",
    descripcion: "El Inventario del Armario",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 60,
    orden: 1,
    opciones: [
      { id: "a", texto: "30", esCorrecta: false },
      { id: "b", texto: "35", esCorrecta: true },
      { id: "c", texto: "27", esCorrecta: false },
      { id: "d", texto: "32", esCorrecta: false },
    ],
    respuestaCorrecta: "b",
    pistaPoetica:
      "Los tornillos y tuercas, como versos dispersos, se unen en un coro, creando algo inmenso. Suma cada parte para hallar el todo.",
    explicacionCorrecto:
      "¡Excelente! Has sumado correctamente: 12 + 15 + 8 = 35 piezas. Como un poema que une versos, la suma une las partes.",
    explicacionIncorrecto:
      "No desesperes, cada parte cuenta. Recuerda que la suma es la unión, el todo. Si juntas 12 con 15 y luego con 8, verás la cifra exacta: 12 + 15 + 8 = 35.",
  },
  {
    id: "ejercicio-1-1-1-2",
    actividadId: "actividad-1-1-1",
    tipo: "respuesta_numerica",
    pregunta:
      "Un taller recibe un pedido de 25 piezas metálicas y otro de 18 piezas de plástico. ¿Cuántas piezas debe entregar en total?",
    descripcion: "El Pedido Conjunto",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 45,
    orden: 2,
    respuestaCorrecta: 43,
    pistaPoetica: "Dos pedidos, un destino. La suma los une en un solo camino.",
    explicacionCorrecto: "¡Perfecto! 25 + 18 = 43 piezas. El taller cumple con su compromiso.",
    explicacionIncorrecto:
      "Recuerda sumar ambas cantidades: 25 piezas metálicas + 18 piezas de plástico = 43 piezas en total.",
  },

  // =========================================================================
  // ACTIVIDAD 1-1-2: Restas que Reparan Heridas
  // =========================================================================
  {
    id: "ejercicio-1-1-2-1",
    actividadId: "actividad-1-1-2",
    tipo: "respuesta_numerica",
    pregunta:
      "Un tanque de combustible tiene una capacidad de 75 litros. Si ya se han utilizado 28 litros, ¿cuántos litros quedan disponibles?",
    descripcion: "El Tanque de Combustible",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 45,
    orden: 1,
    respuestaCorrecta: 47,
    pistaPoetica: "Al quitar lo que se fue, el vacío se revela, la verdad que queda, cual gota que consuela.",
    explicacionCorrecto: "¡Correcto! 75 - 28 = 47 litros. El tanque, como un corazón, muestra cuánto le queda de vida.",
    explicacionIncorrecto:
      "La resta es el acto de lo que queda, lo que resiste. Desde el total (75), quita lo que se fue (28): 75 - 28 = 47 litros.",
  },
  {
    id: "ejercicio-1-1-2-2",
    actividadId: "actividad-1-1-2",
    tipo: "respuesta_numerica",
    pregunta:
      "Un plano requiere un cable de 1.5 metros. Si tienes uno de 2.8 metros, ¿cuánto debes cortar para que sea la medida exacta?",
    descripcion: "El Corte Preciso del Cable",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 60,
    orden: 2,
    respuestaCorrecta: 1.3,
    pistaPoetica: "La tijera del cálculo recorta lo excesivo, para que el diseño alcance su destino decisivo.",
    explicacionCorrecto: "¡Exacto! 2.8 - 1.5 = 1.3 metros. La exactitud es la llave del ingeniero.",
    explicacionIncorrecto:
      "Resta la medida necesaria de la que tienes: 2.8 - 1.5 = 1.3 metros. La ingeniería no perdona el error.",
  },
  {
    id: "ejercicio-1-1-2-3",
    actividadId: "actividad-1-1-2",
    tipo: "respuesta_numerica",
    pregunta: "Si un proyecto debía durar 45 días y ya han pasado 29, ¿cuántos días quedan para finalizarlo?",
    descripcion: "El Tiempo Perdido",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 45,
    orden: 3,
    respuestaCorrecta: 16,
    pistaPoetica: "El reloj avanza, el tiempo se nos va. La resta, un lamento que el destino nos da.",
    explicacionCorrecto: "¡Bien hecho! 45 - 29 = 16 días. El tiempo es un recurso preciado.",
    explicacionIncorrecto:
      "Desde el total de días (45), sustrae los días ya vividos (29): 45 - 29 = 16 días restantes.",
  },

  // =========================================================================
  // ACTIVIDAD 1-1-3: Multiplicaciones que Potencian
  // =========================================================================
  {
    id: "ejercicio-1-1-3-1",
    actividadId: "actividad-1-1-3",
    tipo: "respuesta_numerica",
    pregunta: "Si una máquina produce 15 piezas por hora, ¿cuántas piezas producirá en un turno de 8 horas?",
    descripcion: "Producción por Turno",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 60,
    orden: 1,
    respuestaCorrecta: 120,
    pistaPoetica: "Cada hora, un verso; cada verso, una pieza. La multiplicación te da la gran riqueza.",
    explicacionCorrecto:
      "¡Perfecto! 15 × 8 = 120 piezas. La multiplicación es el camino rápido para sumar varias veces la misma cantidad.",
    explicacionIncorrecto:
      "Si cada hora son 15 piezas, en 8 horas serán 15 veces 8. La máquina no se detiene: 15 × 8 = 120 piezas.",
  },
  {
    id: "ejercicio-1-1-3-2",
    actividadId: "actividad-1-1-3",
    tipo: "respuesta_numerica",
    pregunta: "Si cada metro de cable cuesta $3 y necesitas 25 metros, ¿cuál será el costo total?",
    descripcion: "El Costo de los Materiales",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 45,
    orden: 2,
    respuestaCorrecta: 75,
    pistaPoetica: "Cada metro, un precio; cada precio, una suma. La multiplicación, la cifra que asuma.",
    explicacionCorrecto: "¡Correcto! 3 × 25 = $75. El presupuesto del taller es sagrado.",
    explicacionIncorrecto:
      "Multiplica el costo unitario por la cantidad: $3 × 25 metros = $75 total. El cable tiene un costo que se acumula.",
  },

  // =========================================================================
  // ACTIVIDAD 1-1-4: Divisiones que Distribuyen la Riqueza
  // =========================================================================
  {
    id: "ejercicio-1-1-4-1",
    actividadId: "actividad-1-1-4",
    tipo: "respuesta_numerica",
    pregunta:
      "Un taller tiene 60 herramientas y quiere distribuirlas equitativamente entre 5 estaciones de trabajo. ¿Cuántas herramientas tendrá cada estación?",
    descripcion: "Reparto Equitativo de Herramientas",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 45,
    orden: 1,
    respuestaCorrecta: 12,
    pistaPoetica: "El total se comparte, en partes iguales se divide. La división, la justicia que al fin decide.",
    explicacionCorrecto: "¡Excelente! 60 ÷ 5 = 12 herramientas por estación. Justicia matemática.",
    explicacionIncorrecto: "Divide el total entre los grupos: 60 ÷ 5 = 12. Cada estación recibe su parte justa.",
  },
  {
    id: "ejercicio-1-1-4-2",
    actividadId: "actividad-1-1-4",
    tipo: "respuesta_numerica",
    pregunta:
      "Si se necesitan 3 minutos para producir una pieza, ¿cuántas piezas se producirán en 120 minutos (2 horas)?",
    descripcion: "Ciclos de Producción",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 60,
    orden: 2,
    respuestaCorrecta: 40,
    pistaPoetica: "El tiempo avanza, los ciclos se suceden. La división te muestra cuántos sueños, al fin, proceden.",
    explicacionCorrecto: "¡Bien! 120 ÷ 3 = 40 piezas. El ritmo de producción es clave.",
    explicacionIncorrecto:
      "Divide el tiempo total por el tiempo de cada pieza: 120 ÷ 3 = 40 ciclos completos = 40 piezas.",
  },

  // =========================================================================
  // ACTIVIDAD 1-2-1: Geometría - Perímetros
  // =========================================================================
  {
    id: "ejercicio-1-2-1-1",
    actividadId: "actividad-1-2-1",
    tipo: "seleccion_multiple",
    pregunta: "Calcula el perímetro de una placa de metal cuadrada con un lado de 8 cm.",
    descripcion: "El Borde de la Placa Cuadrada",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 45,
    orden: 1,
    opciones: [
      { id: "a", texto: "16 cm", esCorrecta: false },
      { id: "b", texto: "24 cm", esCorrecta: false },
      { id: "c", texto: "32 cm", esCorrecta: true },
      { id: "d", texto: "64 cm", esCorrecta: false },
    ],
    respuestaCorrecta: "c",
    pistaPoetica: "El camino que rodea la forma, su longitud, es el verso que el contorno informa.",
    explicacionCorrecto: "¡Correcto! Perímetro = 4 × lado = 4 × 8 = 32 cm. La silueta del metal revelada.",
    explicacionIncorrecto:
      "El perímetro de un cuadrado es la suma de sus 4 lados iguales: 8 + 8 + 8 + 8 = 32 cm, o 4 × 8 = 32 cm.",
  },
  {
    id: "ejercicio-1-2-1-2",
    actividadId: "actividad-1-2-1",
    tipo: "respuesta_numerica",
    pregunta: "Un panel rectangular tiene 12 cm de largo y 5 cm de ancho. ¿Cuál es su perímetro?",
    descripcion: "El Marco del Panel Rectangular",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 50,
    orden: 2,
    respuestaCorrecta: 34,
    pistaPoetica: "El largo y el ancho se abrazan, dos veces, para rodear el sueño que en el diseño creces.",
    explicacionCorrecto: "¡Perfecto! 2 × (12 + 5) = 2 × 17 = 34 cm. El contorno del panel revelado.",
    explicacionIncorrecto: "Perímetro del rectángulo = 2 × (largo + ancho) = 2 × (12 + 5) = 2 × 17 = 34 cm.",
  },

  // =========================================================================
  // ACTIVIDAD 1-2-2: Geometría - Áreas
  // =========================================================================
  {
    id: "ejercicio-1-2-2-1",
    actividadId: "actividad-1-2-2",
    tipo: "respuesta_numerica",
    pregunta: "El área de un engranaje circular tiene un radio de 5 cm. ¿Cuál es su área aproximada? (Usa π ≈ 3.14)",
    descripcion: "La Superficie del Engranaje Circular",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 90,
    orden: 1,
    respuestaCorrecta: 78.5,
    pistaPoetica: "El espacio que encierra la forma, su interior, es el alma que el diseño le dio con fervor.",
    explicacionCorrecto:
      "¡Excelente! Área = π × r² = 3.14 × 5² = 3.14 × 25 = 78.5 cm². El engranaje revela su secreto numérico.",
    explicacionIncorrecto:
      "Recuerda la fórmula del área del círculo: π × r². Entonces: 3.14 × 5 × 5 = 3.14 × 25 = 78.5 cm².",
  },
  {
    id: "ejercicio-1-2-2-2",
    actividadId: "actividad-1-2-2",
    tipo: "respuesta_numerica",
    pregunta: "Una placa base rectangular mide 20 cm de largo y 10 cm de ancho. ¿Cuál es su área?",
    descripcion: "El Área de la Placa Base",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 45,
    orden: 2,
    respuestaCorrecta: 200,
    pistaPoetica: "El largo y el ancho se entrelazan, multiplicando el espacio que el diseño abraza.",
    explicacionCorrecto: "¡Correcto! 20 × 10 = 200 cm². La superficie vital de la pieza.",
    explicacionIncorrecto:
      "El área del rectángulo es largo × ancho = 20 × 10 = 200 cm². Es el espacio que cubre la pieza.",
  },

  // =========================================================================
  // ACTIVIDAD 1-3-1: Potencias
  // =========================================================================
  {
    id: "ejercicio-1-3-1-1",
    actividadId: "actividad-1-3-1",
    tipo: "respuesta_numerica",
    pregunta: "Si una pieza cuadrada tiene 7 cm de lado, ¿cuál es el área de su superficie? (área = lado²)",
    descripcion: "La Superficie del Cuadrado Perfecto",
    dificultad: "facil",
    puntos: 10,
    tiempoEstimado: 45,
    orden: 1,
    respuestaCorrecta: 49,
    pistaPoetica: "El lado por sí mismo, un secreto esconde: el área que en el cuadrado, fiel, responde.",
    explicacionCorrecto: "¡Perfecto! 7² = 7 × 7 = 49 cm². La potencia revela el área.",
    explicacionIncorrecto: "El área de un cuadrado es lado al cuadrado: 7² = 7 × 7 = 49 cm².",
  },
  {
    id: "ejercicio-1-3-1-2",
    actividadId: "actividad-1-3-1",
    tipo: "respuesta_numerica",
    pregunta: "Una caja cúbica tiene aristas de 4 cm. ¿Cuál es el volumen del contenedor? (volumen = lado³)",
    descripcion: "El Volumen del Cubo Industrial",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 60,
    orden: 2,
    respuestaCorrecta: 64,
    pistaPoetica: "El lado tres veces multiplicado, el volumen sagrado, en el espacio atrapado.",
    explicacionCorrecto: "¡Excelente! 4³ = 4 × 4 × 4 = 64 cm³. El cubo revela su capacidad.",
    explicacionIncorrecto: "El volumen del cubo es lado al cubo: 4³ = 4 × 4 × 4 = 64 cm³.",
  },

  // =========================================================================
  // ACTIVIDAD 1-3-2: Raíces
  // =========================================================================
  {
    id: "ejercicio-1-3-2-1",
    actividadId: "actividad-1-3-2",
    tipo: "respuesta_numerica",
    pregunta:
      "Una pieza cuadrada tiene un área de 81 cm². ¿Cuánto mide cada uno de sus lados? (Calcula la raíz cuadrada de 81)",
    descripcion: "El Lado Oculto del Área",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 60,
    orden: 1,
    respuestaCorrecta: 9,
    pistaPoetica: "El área es un secreto, el lado, un lamento. La raíz te desvela el primer fundamento.",
    explicacionCorrecto: "¡Correcto! √81 = 9 cm (porque 9 × 9 = 81). El lado emerge del área.",
    explicacionIncorrecto:
      "La raíz cuadrada es el número que multiplicado por sí mismo da 81. Como 9 × 9 = 81, entonces √81 = 9.",
  },
  {
    id: "ejercicio-1-3-2-2",
    actividadId: "actividad-1-3-2",
    tipo: "respuesta_numerica",
    pregunta:
      "Un contenedor cúbico tiene un volumen de 27 m³. ¿Cuánto mide la arista de este contenedor? (Calcula la raíz cúbica de 27)",
    descripcion: "La Arista del Misterio Cúbico",
    dificultad: "dificil",
    puntos: 20,
    tiempoEstimado: 90,
    orden: 2,
    respuestaCorrecta: 3,
    pistaPoetica: "El volumen se expande, la arista se diluye. La raíz cúbica, su verdad contribuye.",
    explicacionCorrecto: "¡Excelente! ∛27 = 3 m (porque 3 × 3 × 3 = 27). La arista del cubo revelada.",
    explicacionIncorrecto:
      "La raíz cúbica es el número que multiplicado por sí mismo tres veces da 27. Como 3 × 3 × 3 = 27, entonces ∛27 = 3.",
  },

  // =========================================================================
  // ACTIVIDAD 1-4-1: Proporcionalidad Directa
  // =========================================================================
  {
    id: "ejercicio-1-4-1-1",
    actividadId: "actividad-1-4-1",
    tipo: "respuesta_numerica",
    pregunta:
      "Si para fabricar 3 piezas se usan 1.5 kg de metal, ¿cuántos kilogramos se necesitarán para fabricar 10 piezas?",
    descripcion: "El Consumo de Material",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 90,
    orden: 1,
    respuestaCorrecta: 5,
    pistaPoetica: "Si uno crece, el otro le acompaña. La proporción directa, una historia sin maraña.",
    explicacionCorrecto: "¡Perfecto! 10 × 1.5 ÷ 3 = 15 ÷ 3 = 5 kg. La proporción directa revela la verdad.",
    explicacionIncorrecto:
      "En proporcionalidad directa: 3 piezas → 1.5 kg, entonces 10 piezas → x kg. x = (10 × 1.5) ÷ 3 = 5 kg.",
  },
  {
    id: "ejercicio-1-4-1-2",
    actividadId: "actividad-1-4-1",
    tipo: "respuesta_numerica",
    pregunta: "Un plano está a escala 1:50. Si una pared mide 10 cm en el plano, ¿cuántos metros mide en la realidad?",
    descripcion: "Escala de un Plano Real",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 90,
    orden: 2,
    respuestaCorrecta: 5,
    pistaPoetica: "El plano miente pequeño, el mundo es gigante. La escala te susurra la verdad, constante.",
    explicacionCorrecto: "¡Correcto! 10 cm × 50 = 500 cm = 5 m. La escala revela la magnitud real.",
    explicacionIncorrecto: "En escala 1:50, cada cm del plano son 50 cm reales. 10 cm × 50 = 500 cm = 5 metros.",
  },

  // =========================================================================
  // ACTIVIDAD 1-4-2: Proporcionalidad Inversa
  // =========================================================================
  {
    id: "ejercicio-1-4-2-1",
    actividadId: "actividad-1-4-2",
    tipo: "respuesta_numerica",
    pregunta:
      "Si 4 obreros tardan 6 días en construir un muro, ¿cuántos días tardarían 8 obreros en construir el mismo muro?",
    descripcion: "Obreros y Tiempo de Trabajo",
    dificultad: "dificil",
    puntos: 20,
    tiempoEstimado: 120,
    orden: 1,
    respuestaCorrecta: 3,
    pistaPoetica: "Si uno aumenta, el otro se diluye. La proporción inversa, un lamento que fluye.",
    explicacionCorrecto: "¡Excelente! 4 × 6 = 8 × x → 24 = 8x → x = 3 días. Más obreros, menos tiempo.",
    explicacionIncorrecto:
      "En proporcionalidad inversa: 4 obreros × 6 días = 8 obreros × x días. 24 = 8x, entonces x = 3 días.",
  },
  {
    id: "ejercicio-1-4-2-2",
    actividadId: "actividad-1-4-2",
    tipo: "respuesta_numerica",
    pregunta:
      "Un camión viaja a 60 km/h y tarda 4 horas en llegar a su destino. Si quisiera llegar en 3 horas, ¿a qué velocidad promedio debería ir?",
    descripcion: "Velocidad y Tiempo de Viaje",
    dificultad: "dificil",
    puntos: 20,
    tiempoEstimado: 120,
    orden: 2,
    respuestaCorrecta: 80,
    pistaPoetica: "El tiempo se acorta, la velocidad crece. La proporción inversa, el viaje estremece.",
    explicacionCorrecto: "¡Perfecto! 60 × 4 = v × 3 → 240 = 3v → v = 80 km/h. Más velocidad, menos tiempo.",
    explicacionIncorrecto: "Velocidad × Tiempo = Distancia constante. 60 × 4 = v × 3 → 240 = 3v → v = 80 km/h.",
  },

  // =========================================================================
  // ACTIVIDAD PROBABILIDAD (1-1-2 en las imágenes)
  // =========================================================================
  {
    id: "ejercicio-prob-1",
    actividadId: "actividad-1-1-2",
    tipo: "respuesta_numerica",
    pregunta:
      "En una caja con 50 piezas, 5 tienen defectos. Si tomas una pieza al azar, ¿cuál es la probabilidad de que esté defectuosa? (Expresa como decimal, ej: 0.1)",
    descripcion: "Fallas en la Línea de Ensamblaje",
    dificultad: "medio",
    puntos: 15,
    tiempoEstimado: 90,
    orden: 1,
    respuestaCorrecta: 0.1,
    pistaPoetica:
      "La probabilidad es la relación entre los casos que te interesan (defectuosos) y el total de casos posibles. Divide el número de piezas defectuosas por el número total.",
    explicacionCorrecto:
      "¡Solución Brillante! 5/50 = 1/10 = 0.1. La probabilidad de sacar una pieza defectuosa es del 10%.",
    explicacionIncorrecto:
      "Divide el número de piezas defectuosas (5) por el total (50): 5 ÷ 50 = 0.1 (equivalente a 1/10 o 10%).",
  },
]
