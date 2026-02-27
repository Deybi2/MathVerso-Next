// =============================================================================
// PANTALLA DE INICIO DE SESIÓN - Matemáticas en Verso
// =============================================================================
// Formulario para iniciar sesión con una cuenta existente.
// Autentica contra PocketBase y conserva el estado local de juego por usuario.
// =============================================================================

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useAplicacion, obtenerEstadoUsuario } from "@/contextos/contexto-aplicacion"
import { iniciarSesionPocketBase } from "@/lib/servicio-autenticacion"
import { ESTADO_INICIAL, ESTADO_ADMIN } from "@/tipos/estado-global"

export default function PantallaInicioSesion() {
  const router = useRouter()
  const { dispatch } = useAplicacion()

  const [formulario, setFormulario] = useState({
    email: "",
    contraseña: "",
  })
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const manejarCambio = (campo: string, valor: string) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }))
    setError(null)
  }

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)
    setError(null)

    try {
      const usuario = await iniciarSesionPocketBase(formulario.email, formulario.contraseña)

      let estadoUsuario = obtenerEstadoUsuario(usuario.id)

      if (!estadoUsuario) {
        // Si es admin, usar estado admin; si no, crear estado inicial
        if (usuario.esAdmin) {
          estadoUsuario = {
            ...ESTADO_ADMIN,
            usuarioActual: usuario,
          }
        } else {
          estadoUsuario = {
            ...ESTADO_INICIAL,
            usuarioActual: usuario,
          }
        }
      } else {
        // Actualizar referencia al usuario actual
        estadoUsuario.usuarioActual = usuario
      }

      dispatch({ type: "CARGAR_ESTADO", payload: estadoUsuario })

      // Guardar en localStorage general
      localStorage.setItem("mathverso_estado", JSON.stringify(estadoUsuario))

      router.push("/mapa")
    } catch {
      setError("No se pudo iniciar sesión. Revisa tus credenciales y conexión con PocketBase.")
    } finally {
      setCargando(false)
    }
  }

  const formularioValido = formulario.email.includes("@") && formulario.contraseña.length >= 1

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Botón volver */}
        <button
          onClick={() => router.push("/bienvenida")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-8"
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        {/* Título */}
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-8">Iniciar Sesión</h1>

        {/* Formulario */}
        <form onSubmit={manejarEnvio} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={formulario.email}
              onChange={(e) => manejarCambio("email", e.target.value)}
              className="py-6 text-lg border-slate-300 rounded-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contraseña" className="text-slate-700">
              Contraseña
            </Label>
            <Input
              id="contraseña"
              type="password"
              placeholder="Tu contraseña"
              value={formulario.contraseña}
              onChange={(e) => manejarCambio("contraseña", e.target.value)}
              className="py-6 text-lg border-slate-300 rounded-lg"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Botón de envío */}
          <Button
            type="submit"
            disabled={!formularioValido || cargando}
            className="w-full py-6 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cargando ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>

        {/* Enlace olvidé contraseña */}
        <p className="text-center mt-4 text-slate-500 text-sm">Olvidé mi contraseña</p>

        {/* Enlace a registro */}
        <p className="text-center mt-6 text-slate-600">
          ¿No tienes cuenta?
          <button onClick={() => router.push("/registro")} className="text-purple-600 hover:underline ml-1">
            Crear cuenta
          </button>
        </p>

      </div>
    </main>
  )
}
