import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute({ requiredRole }: { requiredRole: string }) {
  const auth = useContext(AuthContext)

  if (!auth?.isAuthenticated) {
    return <Navigate to="/auth/" />
  }

  if (!auth.hasRole(requiredRole)) {
    return <Navigate to="/forbidden" />
  }

  return <Outlet />
}
