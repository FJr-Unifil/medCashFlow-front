import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

export function RootRedirect() {
  const { isAuthenticated, hasRole } = useAuth()

  if (!isAuthenticated) {
    console.log('Não Autneticado')
    return <Navigate to="/auth" replace />
  }

  if (hasRole('ROLE_ADMIN')) {
    console.log('ADMIN')
    return <Navigate to="/clinics" replace />
  }

  if (hasRole('ROLE_MANAGER')) {
    console.log('Manager')
    return <Navigate to="/employees" replace />
  }

  if (hasRole('ROLE_FINANCIAL_ANALYST')) {
    console.log('Financial Analyst')
    return <Navigate to="/involveds" replace />
  }

  console.log('Não caiu em nenhum if')

  return <Navigate to="/auth" replace />
}
