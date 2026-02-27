// =============================================================================
// PANTALLA DE BIENVENIDA - Matemáticas en Verso
// =============================================================================
// Pantalla principal de inicio con opciones para iniciar sesión o registrarse.
// =============================================================================

"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function PantallaBienvenida() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-200 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        {/* Título principal */}
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2 font-serif italic">
          ¡Bienvenido a Matemáticas en Verso!
        </h1>

        {/* Subtítulo */}
        <p className="text-amber-700 mb-10 text-lg">Tu viaje hacia la maestría lógica y la belleza poética.</p>

        {/* Botones de acción */}
        <div className="space-y-4">
          <Button
            onClick={() => router.push("/iniciar-sesion")}
            className="w-full py-6 text-lg font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
          >
            Iniciar Sesión
          </Button>

          <Button
            onClick={() => router.push("/registro")}
            variant="outline"
            className="w-full py-6 text-lg font-semibold border-2 border-amber-600 text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
          >
            Crear Nueva Cuenta
          </Button>
        </div>

        {/* Enlace adicional */}
        <button
          onClick={() => router.push("/registro")}
          className="mt-6 text-amber-600 hover:text-amber-800 underline text-sm"
        >
          Crear nueva cuenta
        </button>
      </div>
    </main>
  )
}
