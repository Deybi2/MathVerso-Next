// =============================================================================
// PANTALLA DE REGISTRO - Matemáticas en Verso
// =============================================================================
// Formulario para crear una nueva cuenta de usuario.
// Usa localStorage para guardar usuarios y su estado inicial.
// =============================================================================

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import {
  useAplicacion,
  guardarUsuario,
  buscarUsuarioPorEmail,
  guardarEstadoUsuario,
} from "@/contextos/contexto-aplicacion"
import { ESTADO_INICIAL, type UsuarioGuardado } from "@/tipos/estado-global"

export default function PantallaRegistro() {
  const router = useRouter()
  const { dispatch } = useAplicacion()

  const [formulario, setFormulario] = useState({
    nombreUsuario: "",
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

    const usuarioExistente = buscarUsuarioPorEmail(formulario.email)
    if (usuarioExistente) {
      setError("Ya existe una cuenta con este email")
      setCargando(false)
      return
    }

    const nuevoUsuario: UsuarioGuardado = {
      id: `usuario-${Date.now()}`,
      email: formulario.email,
      nombreUsuario: formulario.nombreUsuario,
      nombre: formulario.nombreUsuario,
      contraseña: formulario.contraseña,
      esAdmin: false,
      fechaRegistro: new Date().toISOString(),
    }

    const guardado = guardarUsuario(nuevoUsuario)
    if (!guardado) {
      setError("Error al crear la cuenta")
      setCargando(false)
      return
    }

    const estadoInicial = {
      ...ESTADO_INICIAL,
      usuarioActual: nuevoUsuario,
    }
    guardarEstadoUsuario(nuevoUsuario.id, estadoInicial)

    dispatch({ type: "INICIAR_SESION", payload: nuevoUsuario })

    // Guardar el estado en localStorage general
    localStorage.setItem("mathverso_estado", JSON.stringify(estadoInicial))

    setCargando(false)
    router.push("/mapa")
  }

  const formularioValido =
    formulario.nombreUsuario.length >= 3 && formulario.email.includes("@") && formulario.contraseña.length >= 6

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
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-8">Crear Cuenta</h1>

        {/* Formulario */}
        <form onSubmit={manejarEnvio} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="nombreUsuario" className="text-slate-700">
              Nombre de Usuario
            </Label>
            <Input
              id="nombreUsuario"
              type="text"
              placeholder="Tu nombre de usuario"
              value={formulario.nombreUsuario}
              onChange={(e) => manejarCambio("nombreUsuario", e.target.value)}
              className="py-6 text-lg border-slate-300 rounded-lg"
              required
              minLength={3}
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              value={formulario.contraseña}
              onChange={(e) => manejarCambio("contraseña", e.target.value)}
              className="py-6 text-lg border-slate-300 rounded-lg"
              required
              minLength={6}
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
                Creando cuenta...
              </>
            ) : (
              "Registrarse"
            )}
          </Button>
        </form>

        {/* Enlace a login */}
        <p className="text-center mt-6 text-slate-600">
          Ya tengo una cuenta
          <button onClick={() => router.push("/iniciar-sesion")} className="text-purple-600 hover:underline ml-1">
            Iniciar Sesión
          </button>
        </p>

        {/* Info cuenta admin */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm font-medium mb-1">Cuenta Admin disponible:</p>
          <p className="text-amber-700 text-xs">Email: admin@mathverso.com</p>
          <p className="text-amber-700 text-xs">Contraseña: admin123</p>
        </div>
      </div>
    </main>
  )
}
