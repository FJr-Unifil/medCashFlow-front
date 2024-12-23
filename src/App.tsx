import { Login } from './pages/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from './pages/register'
import { AllClinicsAdmin } from './pages/allClinicsAdmin'
import { ProtectedRoute } from './routes/protected-route'
import { AuthProvider } from './context/auth-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Forbidden } from './pages/forbidden'
import { NotFound } from './pages/not-found'
import { AllEmployees } from './pages/allEmployees'
import { AllInvolved } from './pages/allInvolved'
import { RootRedirect } from './components/root-redirect'
import { AllAccountPlannings } from './pages/allAccountPlannings'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="auth">
              <Route index element={<Login />} />
              <Route path="registro" element={<Register />} />
            </Route>
            <Route
              path="clinicas"
              element={<ProtectedRoute requiredRole="ROLE_ADMIN" />}
            >
              <Route index element={<AllClinicsAdmin />} />
            </Route>
            <Route
              path="funcionarios"
              element={<ProtectedRoute requiredRole="ROLE_MANAGER" />}
            >
              <Route index element={<AllEmployees />} />
            </Route>
            <Route
              path="envolvidos"
              element={
                <ProtectedRoute requiredRole={'ROLE_FINANCIAL_ANALYST'} />
              }
            >
              <Route index element={<AllInvolved />} />
            </Route>
            <Route
              path="plano-de-contas"
              element={
                <ProtectedRoute requiredRole={'ROLE_FINANCIAL_ANALYST'} />
              }
            >
              <Route index element={<AllAccountPlannings />} />
            </Route>
            <Route path="forbidden" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
