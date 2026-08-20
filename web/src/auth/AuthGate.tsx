import type { ReactNode } from 'react'
import { useAuth } from './useAuth'
import { LoginScreen } from './LoginScreen'
import './LoginScreen.css'

export function AuthGate({ children }: { children: ReactNode }) {
  const { status } = useAuth()

  if (status === 'loading') {
    return <div className="login-loading">Loading…</div>
  }

  if (status === 'out') {
    return <LoginScreen />
  }

  return <>{children}</>
}
