// =============================================================================
// PANTALLA DE AJUSTES - Matemáticas en Verso
// =============================================================================
// Permite configurar notificaciones, modo nocturno y otras opciones.
// =============================================================================

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bell, Moon, Volume2, Info, Shield, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConfiguracionApp {
  notificaciones: boolean
  modoNocturno: boolean
  sonidos: boolean
}

const CLAVE_STORAGE_CONFIG = "mathverso_configuracion"

export default function PantallaAjustes() {
  const router = useRouter()
  const [configuracion, setConfiguracion] = useState<ConfiguracionApp>({
    notificaciones: true,
    modoNocturno: false,
    sonidos: true,
  })

  // Cargar configuración del localStorage
  useEffect(() => {
    const configGuardada = localStorage.getItem(CLAVE_STORAGE_CONFIG)
    if (configGuardada) {
      setConfiguracion(JSON.parse(configGuardada))
    }
  }, [])

  // Guardar configuración cuando cambie
  useEffect(() => {
    localStorage.setItem(CLAVE_STORAGE_CONFIG, JSON.stringify(configuracion))
  }, [configuracion])

  const alternarConfiguracion = (clave: keyof ConfiguracionApp) => {
    setConfiguracion((prev) => ({
      ...prev,
      [clave]: !prev[clave],
    }))
  }

  const opcionesAjuste = [
    {
      id: "notificaciones",
      icono: <Bell size={20} />,
      etiqueta: "Notificaciones",
      descripcion: "Recibe recordatorios para practicar",
      valor: configuracion.notificaciones,
      onChange: () => alternarConfiguracion("notificaciones"),
    },
    {
      id: "modoNocturno",
      icono: <Moon size={20} />,
      etiqueta: "Modo Nocturno",
      descripcion: "Activa el tema oscuro",
      valor: configuracion.modoNocturno,
      onChange: () => alternarConfiguracion("modoNocturno"),
    },
    {
      id: "sonidos",
      icono: <Volume2 size={20} />,
      etiqueta: "Sonidos",
      descripcion: "Efectos de sonido en la app",
      valor: configuracion.sonidos,
      onChange: () => alternarConfiguracion("sonidos"),
    },
  ]

  const opcionesInformacion = [
    {
      icono: <Info size={20} />,
      etiqueta: "Acerca de",
      descripcion: "Versión 1.0.0",
      accion: () => {},
    },
    {
      icono: <Shield size={20} />,
      etiqueta: "Privacidad",
      descripcion: "Política de privacidad",
      accion: () => {},
    },
    {
      icono: <HelpCircle size={20} />,
      etiqueta: "Ayuda",
      descripcion: "Centro de ayuda",
      accion: () => {},
    },
  ]

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-slate-200 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={24} className="text-slate-700" />
          </button>
          <h1 className="font-bold text-slate-800 text-lg">Ajustes</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Opciones de configuración */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
          <h2 className="px-4 py-3 text-sm font-medium text-slate-500 bg-slate-50">Preferencias</h2>
          {opcionesAjuste.map((opcion, index) => (
            <div
              key={opcion.id}
              className={cn(
                "flex items-center justify-between p-4",
                index < opcionesAjuste.length - 1 && "border-b border-slate-100",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="text-slate-500">{opcion.icono}</div>
                <div>
                  <p className="font-medium text-slate-800">{opcion.etiqueta}</p>
                  <p className="text-slate-500 text-xs">{opcion.descripcion}</p>
                </div>
              </div>
              {/* Toggle Switch */}
              <button
                onClick={opcion.onChange}
                className={cn(
                  "relative w-12 h-7 rounded-full transition-colors",
                  opcion.valor ? "bg-emerald-500" : "bg-slate-300",
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform",
                    opcion.valor ? "translate-x-6" : "translate-x-1",
                  )}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Información */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <h2 className="px-4 py-3 text-sm font-medium text-slate-500 bg-slate-50">Información</h2>
          {opcionesInformacion.map((opcion, index) => (
            <button
              key={index}
              onClick={opcion.accion}
              className={cn(
                "w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors",
                index < opcionesInformacion.length - 1 && "border-b border-slate-100",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="text-slate-500">{opcion.icono}</div>
                <div className="text-left">
                  <p className="font-medium text-slate-800">{opcion.etiqueta}</p>
                  <p className="text-slate-500 text-xs">{opcion.descripcion}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Versión */}
        <p className="text-center text-slate-400 text-xs mt-6">Matemáticas en Verso v1.0.0</p>
      </main>
    </div>
  )
}
