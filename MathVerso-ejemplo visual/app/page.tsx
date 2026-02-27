// =============================================================================
// PANTALLA DE CARGA - Matemáticas en Verso
// =============================================================================
// Esta es la pantalla inicial que se muestra al cargar la aplicación.
// Muestra una animación de carga y redirige a la pantalla de bienvenida.
// =============================================================================

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function PantallaCarga() {
  const router = useRouter()
  const [progreso, setProgreso] = useState(0)

  useEffect(() => {
    // Simular carga progresiva
    const intervalo = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) {
          clearInterval(intervalo)
          // Redirigir a bienvenida cuando termine
          setTimeout(() => {
            router.push("/bienvenida")
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(intervalo)
  }, [router])

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center justify-center p-4">
      {/* Contenedor principal */}
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Imagen de la mascota */}
        <div className="relative w-64 h-80 mb-6 rounded-2xl overflow-hidden shadow-lg border-4 border-amber-200">
          <Image
            src="/cute-kawaii-fox-mascot-with-math-symbols-japanese-.jpg"
            alt="Mascota de Matemáticas en Verso"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-white/50 rounded-full h-4 overflow-hidden shadow-inner border border-amber-200">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progreso}%` }}
          />
        </div>

        {/* Texto de carga */}
        <p className="mt-4 text-amber-800 font-medium text-center">Cargando tu aventura matemática...</p>
      </div>
    </main>
  )
}
