// =============================================================================
// PANTALLA DE PERFIL - Matemáticas en Verso
// =============================================================================
// Muestra el perfil del usuario con estadísticas y acceso a ajustes.
// Usa el estado global para mostrar datos reales del usuario.
// =============================================================================

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Settings,
  Star,
  Flame,
  Crown,
  LogOut,
  User,
  ChevronRight,
  Trophy,
  BookOpen,
  Zap,
  Shield,
  Target,
} from "lucide-react"
import { BarraInferior } from "@/componentes/navegacion/barra-inferior"
import { useAplicacion } from "@/contextos/contexto-aplicacion"

export default function PantallaPerfil() {
  const router = useRouter()
  const { estado, dispatch } = useAplicacion()
  const [mostrarConfirmacionCerrar, setMostrarConfirmacionCerrar] = useState(false)

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!estado.usuarioActual) {
      router.push("/bienvenida")
    }
  }, [estado.usuarioActual, router])

  const manejarCerrarSesion = () => {
    // Guardar estado antes de cerrar
    if (estado.usuarioActual) {
      const clave = `mathverso_estado_${estado.usuarioActual.id}`
      localStorage.setItem(clave, JSON.stringify(estado))
    }

    dispatch({ type: "CERRAR_SESION" })
    localStorage.removeItem("mathverso_estado")
    router.push("/bienvenida")
  }

  if (!estado.usuarioActual) {
    return null
  }

  const estadisticas = [
    {
      icono: <Star size={20} className="text-amber-500" />,
      valor: estado.estadisticas.experiencia,
      etiqueta: "XP Actual",
    },
    {
      icono: <Crown size={20} className="text-violet-500" />,
      valor: estado.estadisticas.nivel,
      etiqueta: "Nivel Actual",
    },
    {
      icono: <Flame size={20} className="text-orange-500" />,
      valor: `${estado.estadisticas.rachaActual} días`,
      etiqueta: "Racha Más Larga",
    },
  ]

  const menuItems = [
    {
      icono: <Trophy size={20} />,
      etiqueta: "Mis Logros",
      descripcion: `${estado.inventario.logrosDesbloqueados.length} desbloqueados`,
      ruta: "/logros",
    },
    {
      icono: <BookOpen size={20} />,
      etiqueta: "Mi Poemario",
      descripcion: `${estado.inventario.poemasDesbloqueados.length} poemas`,
      ruta: "/poemario",
    },
    {
      icono: <Target size={20} />,
      etiqueta: "Misiones Diarias",
      descripcion: `${estado.misionesDiarias.filter((m) => m.completada).length}/${estado.misionesDiarias.length} completadas`,
      ruta: "/misiones",
    },
    { icono: <Settings size={20} />, etiqueta: "Ajustes", descripcion: "Configuración de la app", ruta: "/ajustes" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-600 to-teal-700">
      {/* Header */}
      <header className="sticky top-0 bg-teal-700/90 backdrop-blur-sm border-b border-teal-500 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.push("/mapa")} className="p-2 hover:bg-teal-600 rounded-full">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="font-bold text-white text-lg">Cuenta</h1>
          <button onClick={() => router.push("/ajustes")} className="p-2 hover:bg-teal-600 rounded-full">
            <Settings size={24} className="text-white" />
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Avatar y nombre */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center mb-3 border-4 border-white shadow-lg">
            <User size={48} className="text-slate-400" />
          </div>
          <h2 className="font-bold text-white text-xl">
            {estado.usuarioActual.nombreUsuario}
            {estado.usuarioActual.esAdmin && (
              <span className="ml-2 text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">Admin</span>
            )}
          </h2>
          <p className="text-teal-200 text-sm">{estado.usuarioActual.email}</p>
        </div>

        {/* Power-ups activos */}
        {(estado.inventario.dobleXPActivo || estado.inventario.proteccionRachaActiva) && (
          <div className="bg-white/10 rounded-xl p-3 mb-4">
            <p className="text-white text-xs font-medium mb-2">Power-ups Activos:</p>
            <div className="flex flex-wrap gap-2">
              {estado.inventario.dobleXPActivo && (
                <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full flex items-center gap-1">
                  <Zap size={12} /> Doble XP
                </span>
              )}
              {estado.inventario.proteccionRachaActiva && (
                <span className="text-xs bg-blue-400 text-blue-900 px-2 py-1 rounded-full flex items-center gap-1">
                  <Shield size={12} /> Protección Racha
                </span>
              )}
            </div>
          </div>
        )}

        {/* Estadísticas principales */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
          <div className="space-y-3">
            {estadisticas.map((stat, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  {stat.icono}
                  <span className="text-slate-600">{stat.etiqueta}</span>
                </div>
                <span className="font-bold text-slate-800">{stat.valor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Barra de progreso de nivel */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600 text-sm">Progreso al nivel {estado.estadisticas.nivel + 1}</span>
            <span className="text-slate-800 font-bold text-sm">
              {estado.estadisticas.experiencia}/{estado.estadisticas.experienciaParaSiguienteNivel} XP
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-violet-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(estado.estadisticas.experiencia / estado.estadisticas.experienciaParaSiguienteNivel) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Estadísticas adicionales */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{estado.estadisticas.ejerciciosTotales}</p>
            <p className="text-teal-200 text-xs">Ejercicios Resueltos</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{estado.progreso.leccionesCompletadas.length}</p>
            <p className="text-teal-200 text-xs">Lecciones Completadas</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">
              {estado.estadisticas.ejerciciosTotales > 0
                ? Math.round((estado.estadisticas.ejerciciosCorrectos / estado.estadisticas.ejerciciosTotales) * 100)
                : 0}
              %
            </p>
            <p className="text-teal-200 text-xs">Precisión</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{estado.inventario.pistasDisponibles}</p>
            <p className="text-teal-200 text-xs">Pistas Disponibles</p>
          </div>
        </div>

        {/* Menú de opciones */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.ruta)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="text-teal-600">{item.icono}</div>
                <div className="text-left">
                  <p className="font-medium text-slate-800">{item.etiqueta}</p>
                  <p className="text-slate-500 text-xs">{item.descripcion}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </button>
          ))}
        </div>

        {/* Botón cerrar sesión */}
        <button
          onClick={() => setMostrarConfirmacionCerrar(true)}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </main>

      <BarraInferior />

      {/* Modal de confirmación */}
      {mostrarConfirmacionCerrar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-xl text-slate-800 text-center mb-2">¿Cerrar sesión?</h3>
            <p className="text-slate-500 text-center mb-6">Tu progreso está guardado. Podrás volver cuando quieras.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setMostrarConfirmacionCerrar(false)}
                className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-medium text-slate-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={manejarCerrarSesion}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold text-white transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
