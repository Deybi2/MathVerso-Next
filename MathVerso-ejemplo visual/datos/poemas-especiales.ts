// =============================================================================
// POEMAS ESPECIALES CON FRAGMENTOS - Matemáticas en Verso
// =============================================================================
// Define los poemas especiales que se desbloquean coleccionando fragmentos.
// =============================================================================

import type { PoemaEspecial, FragmentoPoema } from "@/tipos/estado-global"

export const poemasEspecialesData: PoemaEspecial[] = [
  {
    id: "poema-especial-pitagoras",
    titulo: "El Teorema Eterno",
    autor: "Matemáticas en Verso",
    completado: false,
    contenidoCompleto: `En el triángulo sagrado,
donde el ángulo recto mora,
un secreto fue guardado
que el tiempo aún atesora.

El cateto al cuadrado
junto a su hermano fiel,
dan el hipotenusa elevado
en ecuación de papel.

A² más B² dan C²,
verdad que Pitágoras halló,
y en las estrellas también
su belleza se plasmó.`,
    fragmentos: [
      {
        id: "frag-pit-1",
        poemaId: "poema-especial-pitagoras",
        numeroFragmento: 1,
        totalFragmentos: 3,
        contenido: `En el triángulo sagrado,
donde el ángulo recto mora,
un secreto fue guardado
que el tiempo aún atesora.`,
        desbloqueado: false,
      },
      {
        id: "frag-pit-2",
        poemaId: "poema-especial-pitagoras",
        numeroFragmento: 2,
        totalFragmentos: 3,
        contenido: `El cateto al cuadrado
junto a su hermano fiel,
dan el hipotenusa elevado
en ecuación de papel.`,
        desbloqueado: false,
      },
      {
        id: "frag-pit-3",
        poemaId: "poema-especial-pitagoras",
        numeroFragmento: 3,
        totalFragmentos: 3,
        contenido: `A² más B² dan C²,
verdad que Pitágoras halló,
y en las estrellas también
su belleza se plasmó.`,
        desbloqueado: false,
      },
    ],
  },
  {
    id: "poema-especial-fibonacci",
    titulo: "La Espiral Dorada",
    autor: "Matemáticas en Verso",
    completado: false,
    contenidoCompleto: `Uno más uno, dos serán,
dos más uno, tres vendrán,
tres y dos, cinco traerán,
y así la espiral crecerá.

En la concha del nautilo,
en el girasol también,
la secuencia sigue el hilo
de la naturaleza fiel.

Fibonacci descubrió
lo que la vida ya sabía,
que en cada pétalo grabó
su perfecta geometría.`,
    fragmentos: [
      {
        id: "frag-fib-1",
        poemaId: "poema-especial-fibonacci",
        numeroFragmento: 1,
        totalFragmentos: 3,
        contenido: `Uno más uno, dos serán,
dos más uno, tres vendrán,
tres y dos, cinco traerán,
y así la espiral crecerá.`,
        desbloqueado: false,
      },
      {
        id: "frag-fib-2",
        poemaId: "poema-especial-fibonacci",
        numeroFragmento: 2,
        totalFragmentos: 3,
        contenido: `En la concha del nautilo,
en el girasol también,
la secuencia sigue el hilo
de la naturaleza fiel.`,
        desbloqueado: false,
      },
      {
        id: "frag-fib-3",
        poemaId: "poema-especial-fibonacci",
        numeroFragmento: 3,
        totalFragmentos: 3,
        contenido: `Fibonacci descubrió
lo que la vida ya sabía,
que en cada pétalo grabó
su perfecta geometría.`,
        desbloqueado: false,
      },
    ],
  },
  {
    id: "poema-especial-euler",
    titulo: "La Identidad Perfecta",
    autor: "Matemáticas en Verso",
    completado: false,
    contenidoCompleto: `e elevado a pi por i,
más uno da el cero,
la ecuación más bella aquí
que guardó el matemático fiero.

Euler unió en una expresión
lo imaginario con lo real,
creando la perfecta unión
de belleza sin igual.

Cinco constantes en armonía,
cero, uno, e, pi e i,
danzan en sinfonía
la ecuación que yo escribí.`,
    fragmentos: [
      {
        id: "frag-eul-1",
        poemaId: "poema-especial-euler",
        numeroFragmento: 1,
        totalFragmentos: 3,
        contenido: `e elevado a pi por i,
más uno da el cero,
la ecuación más bella aquí
que guardó el matemático fiero.`,
        desbloqueado: false,
      },
      {
        id: "frag-eul-2",
        poemaId: "poema-especial-euler",
        numeroFragmento: 2,
        totalFragmentos: 3,
        contenido: `Euler unió en una expresión
lo imaginario con lo real,
creando la perfecta unión
de belleza sin igual.`,
        desbloqueado: false,
      },
      {
        id: "frag-eul-3",
        poemaId: "poema-especial-euler",
        numeroFragmento: 3,
        totalFragmentos: 3,
        contenido: `Cinco constantes en armonía,
cero, uno, e, pi e i,
danzan en sinfonía
la ecuación que yo escribí.`,
        desbloqueado: false,
      },
    ],
  },
]

export function obtenerTodosLosFragmentos(): FragmentoPoema[] {
  return poemasEspecialesData.flatMap((poema) => poema.fragmentos)
}

export function obtenerFragmentoAleatorio(fragmentosDesbloqueados: string[]): FragmentoPoema | null {
  const todosLosFragmentos = obtenerTodosLosFragmentos()
  const fragmentosDisponibles = todosLosFragmentos.filter((f) => !fragmentosDesbloqueados.includes(f.id))

  if (fragmentosDisponibles.length === 0) return null

  const indiceAleatorio = Math.floor(Math.random() * fragmentosDisponibles.length)
  return fragmentosDisponibles[indiceAleatorio]
}

export function verificarPoemaCompleto(poemaId: string, fragmentosDesbloqueados: string[]): boolean {
  const poema = poemasEspecialesData.find((p) => p.id === poemaId)
  if (!poema) return false

  return poema.fragmentos.every((f) => fragmentosDesbloqueados.includes(f.id))
}
