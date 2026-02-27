// =============================================================================
// PANTALLA DE LA TIENDA - Matemáticas en Verso
// =============================================================================
// Permite a los usuarios comprar artículos con monedas o suscribirse a planes.
// Usa el estado global para monedas y compras persistentes.
// =============================================================================

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Coins,
  ShoppingBag,
  Check,
  Sparkles,
  Crown,
  Building,
  Zap,
  Shield,
  BookOpen,
  Gift,
} from "lucide-react"
import { BarraInferior } from "@/componentes/navegacion/barra-inferior"
import { useAplicacion } from "@/contextos/contexto-aplicacion"
import { cn } from "@/lib/utils"

type TabTienda = "articulos" | "suscripciones"

interface ArticuloTienda {
  id: string
  nombre: string
  descripcion: string
  icono: React.ReactNode
  precioMonedas: number
  colorFondo: string
  tipo: "pistas" | "dobleXP" | "proteccionRacha" | "fragmentoPoema" | "monedas"
  cantidad?: number
  duracionDias?: number
  destacado?: boolean
}

interface PlanSuscripcion {
  id: string
  nombre: string
  descripcion: string
  tipo: "estudiantes" | "profesores" | "escuelas"
  precioMensual: number
  precioAnual: number
  caracteristicas: string[]
  colorFondo: string
  popular?: boolean
}

const articulosTiendaData: ArticuloTienda[] = [
  {
    id: "pistas-5",
    nombre: "5 Pistas Adicionales",
    descripcion: "Obtén ayuda cuando la necesites",
    icono: <Sparkles size={24} className="text-amber-500" />,
    precioMonedas: 100,
    colorFondo: "bg-amber-100",
    tipo: "pistas",
    cantidad: 5,
  },
  {
    id: "pistas-15",
    nombre: "15 Pistas Adicionales",
    descripcion: "Pack grande de pistas",
    icono: <Sparkles size={24} className="text-amber-500" />,
    precioMonedas: 250,
    colorFondo: "bg-amber-100",
    tipo: "pistas",
    cantidad: 15,
    destacado: true,
  },
  {
    id: "dobleXP-1",
    nombre: "Doble XP (1 día)",
    descripcion: "Duplica tu experiencia por 24 horas",
    icono: <Zap size={24} className="text-yellow-500" />,
    precioMonedas: 150,
    colorFondo: "bg-yellow-100",
    tipo: "dobleXP",
    duracionDias: 1,
  },
  {
    id: "dobleXP-3",
    nombre: "Doble XP (3 días)",
    descripcion: "Duplica tu experiencia por 3 días",
    icono: <Zap size={24} className="text-yellow-500" />,
    precioMonedas: 350,
    colorFondo: "bg-yellow-100",
    tipo: "dobleXP",
    duracionDias: 3,
    destacado: true,
  },
  {
    id: "proteccion-7",
    nombre: "Protección de Racha (7 días)",
    descripcion: "No pierdas tu racha aunque falles",
    icono: <Shield size={24} className="text-blue-500" />,
    precioMonedas: 200,
    colorFondo: "bg-blue-100",
    tipo: "proteccionRacha",
    duracionDias: 7,
  },
  {
    id: "fragmento-poema",
    nombre: "Fragmento de Poema",
    descripcion: "Desbloquea un fragmento aleatorio",
    icono: <BookOpen size={24} className="text-purple-500" />,
    precioMonedas: 500,
    colorFondo: "bg-purple-100",
    tipo: "fragmentoPoema",
  },
  {
    id: "cofre-monedas",
    nombre: "Cofre de Monedas",
    descripcion: "Obtén 200 monedas extra",
    icono: <Gift size={24} className="text-emerald-500" />,
    precioMonedas: 0, // Gratis una vez al día
    colorFondo: "bg-emerald-100",
    tipo: "monedas",
    cantidad: 200,
  },
]

const planesSuscripcionData: PlanSuscripcion[] = [
  {
    id: "premium-estudiantes",
    nombre: "Versión Premium",
    descripcion: "Estudiantes",
    tipo: "estudiantes",
    precioMensual: 99,
    precioAnual: 990,
    caracteristicas: [
      "Sin anuncios",
      "Pistas ilimitadas",
      "Acceso a todos los poemas",
      "Doble XP permanente",
      "Protección de racha",
    ],
    colorFondo: "from-emerald-500 to-teal-600",
    popular: true,
  },
  {
    id: "pro-profesores",
    nombre: "Versión Pro",
    descripcion: "Profesores",
    tipo: "profesores",
    precioMensual: 299,
    precioAnual: 2990,
    caracteristicas: [
      "Todo de Premium",
      "Panel de estudiantes",
      "Reportes de progreso",
      "Crear ejercicios personalizados",
      "Soporte prioritario",
    ],
    colorFondo: "from-violet-500 to-purple-600",
  },
  {
    id: "enterprise-escuelas",
    nombre: "Versión Enterprise",
    descripcion: "Escuelas",
    tipo: "escuelas",
    precioMensual: 999,
    precioAnual: 9990,
    caracteristicas: [
      "Todo de Pro",
      "Licencias ilimitadas",
      "Integración con SIS",
      "Dashboard administrativo",
      "Capacitación incluida",
      "Soporte dedicado",
    ],
    colorFondo: "from-slate-700 to-slate-900",
  },
]

export default function PantallaTienda() {
  const router = useRouter()
  const { estado, dispatch } = useAplicacion()
  const [tabActiva, setTabActiva] = useState<TabTienda>("articulos")
  const [mensajeExito, setMensajeExito] = useState<string | null>(null)
  const [articuloSeleccionado, setArticuloSeleccionado] = useState<ArticuloTienda | null>(null)
  const [planSeleccionado, setPlanSeleccionado] = useState<PlanSuscripcion | null>(null)
  const [cofreReclamadoHoy, setCofreReclamadoHoy] = useState(false)

  // Verificar si el cofre ya fue reclamado hoy
  useEffect(() => {
    const ultimoReclamo = localStorage.getItem("mathverso_ultimo_cofre")
    if (ultimoReclamo) {
      const hoy = new Date().toDateString()
      setCofreReclamadoHoy(ultimoReclamo === hoy)
    }
  }, [])

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!estado.usuarioActual) {
      router.push("/bienvenida")
    }
  }, [estado.usuarioActual, router])

  const manejarCompraArticulo = (articulo: ArticuloTienda) => {
    // Caso especial: cofre gratis
    if (articulo.tipo === "monedas" && articulo.precioMonedas === 0) {
      if (cofreReclamadoHoy) {
        setMensajeExito("Ya reclamaste el cofre hoy. Vuelve mañana.")
        setTimeout(() => setMensajeExito(null), 3000)
        return
      }
      dispatch({ type: "AGREGAR_MONEDAS", payload: articulo.cantidad || 200 })
      localStorage.setItem("mathverso_ultimo_cofre", new Date().toDateString())
      setCofreReclamadoHoy(true)
      setMensajeExito(`¡Has recibido ${articulo.cantidad} monedas!`)
      setArticuloSeleccionado(null)
      setTimeout(() => setMensajeExito(null), 3000)
      return
    }

    if (estado.estadisticas.monedas < articulo.precioMonedas) {
      setMensajeExito("No tienes suficientes monedas")
      setTimeout(() => setMensajeExito(null), 3000)
      return
    }

    // Restar monedas
    dispatch({ type: "RESTAR_MONEDAS", payload: articulo.precioMonedas })

    // Aplicar efecto según tipo
    switch (articulo.tipo) {
      case "pistas":
        dispatch({ type: "COMPRAR_PISTAS", payload: articulo.cantidad || 5 })
        setMensajeExito(`¡Has comprado ${articulo.cantidad} pistas!`)
        break
      case "dobleXP":
        dispatch({ type: "ACTIVAR_DOBLE_XP", payload: articulo.duracionDias || 1 })
        setMensajeExito(`¡Doble XP activado por ${articulo.duracionDias} día(s)!`)
        break
      case "proteccionRacha":
        dispatch({ type: "ACTIVAR_PROTECCION_RACHA", payload: articulo.duracionDias || 7 })
        setMensajeExito(`¡Protección de racha activada por ${articulo.duracionDias} días!`)
        break
      case "fragmentoPoema":
        // Generar ID de fragmento aleatorio
        const fragmentoId = `fragmento-${Date.now()}`
        dispatch({ type: "DESBLOQUEAR_FRAGMENTO", payload: fragmentoId })
        setMensajeExito("¡Has desbloqueado un nuevo fragmento de poema!")
        break
    }

    setArticuloSeleccionado(null)
    setTimeout(() => setMensajeExito(null), 3000)
  }

  const obtenerIconoPlan = (tipo: string) => {
    switch (tipo) {
      case "estudiantes":
        return <Sparkles size={24} />
      case "profesores":
        return <Crown size={24} />
      case "escuelas":
        return <Building size={24} />
      default:
        return <Sparkles size={24} />
    }
  }

  if (!estado.usuarioActual) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-700">
      {/* Header */}
      <header className="sticky top-0 bg-emerald-700/90 backdrop-blur-sm border-b border-emerald-500 z-10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => router.push("/mapa")} className="p-2 hover:bg-emerald-600 rounded-full">
              <ArrowLeft size={24} className="text-white" />
            </button>
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-amber-300" />
              <h1 className="font-serif text-xl font-bold text-white italic">Adquiere Sabiduría</h1>
            </div>
            <div className="flex items-center gap-1 bg-amber-500 px-3 py-1 rounded-full">
              <Coins size={16} className="text-white" />
              <span className="text-white font-bold text-sm">{estado.estadisticas.monedas}</span>
            </div>
          </div>

          {/* Info de power-ups activos */}
          {(estado.inventario.dobleXPActivo || estado.inventario.proteccionRachaActiva) && (
            <div className="flex gap-2 mb-2">
              {estado.inventario.dobleXPActivo && (
                <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full flex items-center gap-1">
                  <Zap size={12} /> Doble XP activo
                </span>
              )}
              {estado.inventario.proteccionRachaActiva && (
                <span className="text-xs bg-blue-400 text-blue-900 px-2 py-1 rounded-full flex items-center gap-1">
                  <Shield size={12} /> Racha protegida
                </span>
              )}
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setTabActiva("articulos")}
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                tabActiva === "articulos"
                  ? "bg-white text-emerald-700"
                  : "bg-emerald-800 text-white hover:bg-emerald-600",
              )}
            >
              Artículos
            </button>
            <button
              onClick={() => setTabActiva("suscripciones")}
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                tabActiva === "suscripciones"
                  ? "bg-white text-emerald-700"
                  : "bg-emerald-800 text-white hover:bg-emerald-600",
              )}
            >
              Suscripciones
            </button>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-lg mx-auto px-4 py-4 pb-24">
        {/* Info de pistas disponibles */}
        <div className="bg-white/10 rounded-xl p-3 mb-4 flex items-center justify-between">
          <span className="text-white text-sm">Pistas disponibles:</span>
          <span className="text-white font-bold">{estado.inventario.pistasDisponibles}</span>
        </div>

        {tabActiva === "articulos" ? (
          <div className="space-y-3">
            {articulosTiendaData.map((articulo) => {
              const esCofreGratis = articulo.tipo === "monedas" && articulo.precioMonedas === 0
              const deshabilitado = esCofreGratis && cofreReclamadoHoy

              return (
                <button
                  key={articulo.id}
                  onClick={() => setArticuloSeleccionado(articulo)}
                  disabled={deshabilitado}
                  className={cn(
                    "w-full text-left rounded-xl p-4 border-2 transition-all",
                    deshabilitado
                      ? "bg-slate-100 border-slate-200 opacity-60"
                      : "bg-white hover:shadow-md border-slate-200",
                    articulo.destacado && !deshabilitado && "ring-2 ring-amber-400",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", articulo.colorFondo)}>
                      {articulo.icono}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-800">{articulo.nombre}</h3>
                        {articulo.destacado && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                            Destacado
                          </span>
                        )}
                        {esCofreGratis && (
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                            {cofreReclamadoHoy ? "Mañana" : "¡Gratis!"}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 text-xs mt-1">{articulo.descripcion}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-100 px-3 py-2 rounded-lg">
                      <Coins size={16} className="text-amber-600" />
                      <span className="font-bold text-amber-700">{esCofreGratis ? "0" : articulo.precioMonedas}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {planesSuscripcionData.map((plan) => (
              <div
                key={plan.id}
                className={cn("rounded-2xl p-5 bg-gradient-to-br shadow-lg relative overflow-hidden", plan.colorFondo)}
              >
                {plan.popular && (
                  <div className="absolute top-3 right-3 bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-bold">Popular</span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    {obtenerIconoPlan(plan.tipo)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{plan.nombre}</h3>
                    <p className="text-white/70 text-sm">({plan.descripcion})</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">${plan.precioMensual.toLocaleString()}</span>
                    <span className="text-white/70 text-sm">/mes</span>
                  </div>
                  <p className="text-white/60 text-xs">o ${plan.precioAnual.toLocaleString()}/año</p>
                </div>

                <ul className="space-y-2 mb-4">
                  {plan.caracteristicas.slice(0, 4).map((caracteristica, index) => (
                    <li key={index} className="flex items-center gap-2 text-white/90 text-sm">
                      <Check size={16} className="text-white/70" />
                      {caracteristica}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setPlanSeleccionado(plan)}
                  className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-colors"
                >
                  Seleccionar Plan
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <BarraInferior />

      {/* Modal de confirmación de artículo */}
      {articuloSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3",
                  articuloSeleccionado.colorFondo,
                )}
              >
                {articuloSeleccionado.icono}
              </div>
              <h3 className="font-bold text-xl text-slate-800">{articuloSeleccionado.nombre}</h3>
              <p className="text-slate-500 text-sm mt-1">{articuloSeleccionado.descripcion}</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Precio:</span>
                <div className="flex items-center gap-1">
                  <Coins size={18} className="text-amber-600" />
                  <span className="font-bold text-amber-700 text-lg">{articuloSeleccionado.precioMonedas}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-slate-600">Tus monedas:</span>
                <span
                  className={cn(
                    "font-bold",
                    estado.estadisticas.monedas >= articuloSeleccionado.precioMonedas
                      ? "text-emerald-600"
                      : "text-red-500",
                  )}
                >
                  {estado.estadisticas.monedas}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setArticuloSeleccionado(null)}
                className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-medium text-slate-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => manejarCompraArticulo(articuloSeleccionado)}
                disabled={
                  estado.estadisticas.monedas < articuloSeleccionado.precioMonedas &&
                  articuloSeleccionado.precioMonedas > 0
                }
                className={cn(
                  "flex-1 py-3 rounded-xl font-bold transition-colors",
                  estado.estadisticas.monedas >= articuloSeleccionado.precioMonedas ||
                    articuloSeleccionado.precioMonedas === 0
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed",
                )}
              >
                {articuloSeleccionado.precioMonedas === 0 ? "Reclamar" : "Comprar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de suscripción */}
      {planSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 bg-gradient-to-br",
                  planSeleccionado.colorFondo,
                )}
              >
                <span className="text-white">{obtenerIconoPlan(planSeleccionado.tipo)}</span>
              </div>
              <h3 className="font-bold text-xl text-slate-800">{planSeleccionado.nombre}</h3>
              <p className="text-slate-500 text-sm mt-1">{planSeleccionado.descripcion}</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">${planSeleccionado.precioMensual}</p>
                  <p className="text-xs text-slate-500">por mes</p>
                </div>
                <div className="border-l border-slate-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">${planSeleccionado.precioAnual}</p>
                  <p className="text-xs text-slate-500">por año</p>
                </div>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              {planSeleccionado.caracteristicas.map((caracteristica, index) => (
                <li key={index} className="flex items-center gap-2 text-slate-600 text-sm">
                  <Check size={16} className="text-emerald-500" />
                  {caracteristica}
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <button
                onClick={() => setPlanSeleccionado(null)}
                className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-medium text-slate-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setMensajeExito("Redirigiendo a pago...")
                  setPlanSeleccionado(null)
                  setTimeout(() => setMensajeExito(null), 3000)
                }}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold text-white transition-colors"
              >
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de éxito */}
      {mensajeExito && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-4">
          {mensajeExito}
        </div>
      )}
    </div>
  )
}
