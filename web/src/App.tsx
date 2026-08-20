import { AuthGate } from './auth/AuthGate'
import { useAuth } from './auth/useAuth'

function LoggedInPlaceholder() {
  const { session, signOut } = useAuth()

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <p>Logged in as {session?.user.email}</p>
        <p style={{ color: '#5F5647', fontSize: 14 }}>
          Login is wired up. The real app screens come next.
        </p>
        <button
          type="button"
          onClick={() => signOut()}
          style={{ marginTop: 12, padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(33,28,22,0.2)', background: 'none', cursor: 'pointer' }}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthGate>
      <LoggedInPlaceholder />
    </AuthGate>
  )
}

export default App
