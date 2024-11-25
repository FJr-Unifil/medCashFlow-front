import { Login } from './pages/login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Register } from './pages/register'
import { AllClinicsAdmin } from './pages/allClinicsAdmin'
import { ProtectedRoute } from './routes/protected-route'
import { AuthProvider } from './context/auth-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="auth">
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route
              path="clinics"
              element={
                <ProtectedRoute>
                  <AllClinicsAdmin />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/clinics" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
