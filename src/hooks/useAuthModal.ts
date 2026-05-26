import { useState } from 'react'
import type { AuthView } from '../components/ui/AuthModal'

/**
 * useAuthModal
 *
 * Hook para abrir y cerrar el AuthModal desde cualquier componente.
 *
 * Uso:
 *   const { isOpen, view, open, close } = useAuthModal()
 *
 *   // En el JSX:
 *   <button onClick={() => open('login')}>Iniciar sesión</button>
 *   <AuthModal isOpen={isOpen} onClose={close} initialView={view} />
 */
export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [view,   setView]   = useState<AuthView>('login')

  const open  = (v: AuthView = 'login') => { setView(v); setIsOpen(true) }
  const close = () => setIsOpen(false)

  return { isOpen, view, open, close }
}
