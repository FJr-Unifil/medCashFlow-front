import { jwtDecode } from 'jwt-decode'
import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

export interface JwtPayload {
  sub: string
  roles: string[]
  exp: number
  iss: string
}

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  userRoles: string[]
  login: (token: string) => void
  logout: () => void
  hasRole: (requiredRole: string) => boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [userRoles, setUserRoles] = useState<string[]>([])

  const decodeToken = useCallback((token: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(token)
      setUserRoles(decoded.roles)
    } catch (error) {
      setUserRoles([])
    }
  }, [])

  const login = useCallback(
    (newToken: string) => {
      setToken(newToken)
      localStorage.setItem('token', newToken)
      decodeToken(newToken)
    },
    [decodeToken]
  )

  const logout = useCallback(() => {
    setToken(null)
    setUserRoles([])
    localStorage.removeItem('token')
  }, [])

  const hasRole = useCallback(
    (requiredRole: string): boolean => {
      return userRoles.includes(requiredRole)
    },
    [userRoles]
  )

  useEffect(() => {
    if (token) {
      decodeToken(token)
    }
  }, [token, decodeToken])

  const value = {
    isAuthenticated: !!token,
    token,
    userRoles,
    login,
    logout,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
