// =============================================================================
// HOOK DEL POEMARIO - Matemáticas en Verso
// =============================================================================
// Maneja el estado y las acciones del poemario: favoritos, desbloqueo, compartir.
// =============================================================================

"use client"

import { useState, useCallback, useEffect } from "react"
import type { Poema, EstadoPoemario } from "@/tipos/poemario"
import { todosLosPoemas } from "@/datos/poemas-ejemplo"

const CLAVE_STORAGE_FAVORITOS = "mathverso_favoritos"
const CLAVE_STORAGE_DESBLOQUEADOS = "mathverso_poemas_desbloqueados"

export function usarPoemario(monedasUsuario: number, onGastarMonedas: (cantidad: number) => void) {
  const [poemas, setPoemas] = useState<Poema[]>([])
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [poemasDesbloqueados, setPoemasDesbloqueados] = useState<string[]>([])
  const [poemaSeleccionado, setPoemaSeleccionado] = useState<Poema | null>(null)
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos")
  const [cargando, setCargando] = useState(true)

  // Cargar datos iniciales del localStorage
  useEffect(() => {
    const favoritosGuardados = localStorage.getItem(CLAVE_STORAGE_FAVORITOS)
    const desbloqueadosGuardados = localStorage.getItem(CLAVE_STORAGE_DESBLOQUEADOS)

    if (favoritosGuardados) {
      setFavoritos(JSON.parse(favoritosGuardados))
    }

    if (desbloqueadosGuardados) {
      setPoemasDesbloqueados(JSON.parse(desbloqueadosGuardados))
    }

    // Cargar poemas y marcar favoritos/desbloqueados
    const poemasConEstado = todosLosPoemas.map((poema) => ({
      ...poema,
      esFavorito: favoritosGuardados ? JSON.parse(favoritosGuardados).includes(poema.id) : false,
      desbloqueado:
        poema.desbloqueado || (desbloqueadosGuardados ? JSON.parse(desbloqueadosGuardados).includes(poema.id) : false),
    }))

    setPoemas(poemasConEstado)
    setCargando(false)
  }, [])

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    if (!cargando) {
      localStorage.setItem(CLAVE_STORAGE_FAVORITOS, JSON.stringify(favoritos))
    }
  }, [favoritos, cargando])

  // Guardar desbloqueados en localStorage cuando cambien
  useEffect(() => {
    if (!cargando) {
      localStorage.setItem(CLAVE_STORAGE_DESBLOQUEADOS, JSON.stringify(poemasDesbloqueados))
    }
  }, [poemasDesbloqueados, cargando])

  // Alternar favorito
  const alternarFavorito = useCallback((poemaId: string) => {
    setFavoritos((prev) => {
      if (prev.includes(poemaId)) {
        return prev.filter((id) => id !== poemaId)
      }
      return [...prev, poemaId]
    })

    setPoemas((prev) =>
      prev.map((poema) => (poema.id === poemaId ? { ...poema, esFavorito: !poema.esFavorito } : poema)),
    )
  }, [])

  // Desbloquear poema con monedas
  const desbloquearPoema = useCallback(
    (poemaId: string) => {
      const poema = poemas.find((p) => p.id === poemaId)
      if (!poema || poema.desbloqueado) return false

      const costo = poema.monedasParaDesbloquear || 0
      if (monedasUsuario < costo) return false

      onGastarMonedas(costo)
      setPoemasDesbloqueados((prev) => [...prev, poemaId])
      setPoemas((prev) => prev.map((p) => (p.id === poemaId ? { ...p, desbloqueado: true } : p)))

      return true
    },
    [poemas, monedasUsuario, onGastarMonedas],
  )

  // Compartir poema
  const compartirPoema = useCallback(async (poema: Poema) => {
    const textoCompartir = `📜 "${poema.titulo}" - ${poema.autor}\n\n${poema.contenido}\n\n🎓 Matemáticas en Verso - Aprende matemáticas con poesía`

    if (navigator.share) {
      try {
        await navigator.share({
          title: poema.titulo,
          text: textoCompartir,
        })
        return true
      } catch {
        // Usuario canceló o error
        return false
      }
    } else {
      // Fallback: copiar al portapapeles
      try {
        await navigator.clipboard.writeText(textoCompartir)
        return true
      } catch {
        return false
      }
    }
  }, [])

  // Obtener poemas filtrados
  const poemasFiltrados = useCallback(() => {
    if (filtroCategoria === "todos") {
      return poemas
    }
    if (filtroCategoria === "favoritos") {
      return poemas.filter((p) => p.esFavorito)
    }
    return poemas.filter((p) => p.categoria === filtroCategoria)
  }, [poemas, filtroCategoria])

  // Estadísticas del poemario
  const estadisticas: EstadoPoemario = {
    poemasDesbloqueados: poemasDesbloqueados,
    poemasLeidos: [],
    poemasFavoritos: favoritos,
    totalPoemas: poemas.length,
    poemasColeccionados: poemas.filter((p) => p.desbloqueado).length,
  }

  return {
    poemas,
    poemasFiltrados: poemasFiltrados(),
    poemaSeleccionado,
    setPoemaSeleccionado,
    favoritos,
    alternarFavorito,
    desbloquearPoema,
    compartirPoema,
    filtroCategoria,
    setFiltroCategoria,
    estadisticas,
    cargando,
  }
}
