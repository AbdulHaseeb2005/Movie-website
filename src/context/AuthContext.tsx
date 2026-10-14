// Global authentication context.

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { subscribeToAuthChanges, logoutUser } from '../services/authService'
import type { User } from 'firebase/auth'

interface AuthContextValue {
  user: User | null
  authLoading: boolean
  logout: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser)
      setAuthLoading(false)
    })

    return unsubscribe
  }, [])

  async function logout() {
    await logoutUser()
  }

  if (authLoading) {
    return <div className="auth-loading">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}
