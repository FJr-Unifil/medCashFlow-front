import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

export function RootRedirect() {
  const { isAuthenticated, hasRole } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  if (hasRole('ROLE_ADMIN')) {
    return <Navigate to="/clinics" replace />
  }

  if (hasRole('ROLE_MANAGER')) {
    return <Navigate to="/employees" replace />
  }

  if (hasRole('ROLE_FINANCIAL_ANALYST')) {
    return <Navigate to="/involveds" replace />
  }

  return <Navigate to="/auth" replace />
}
