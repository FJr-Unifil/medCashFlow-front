import { Login } from './pages/login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Register } from './pages/register'
import { AllClinicsAdmin } from './pages/allClinicsAdmin'
import { ProtectedRoute } from './routes/protected-route'
import { AuthProvider } from './context/auth-context'

function App() {
  return (
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
  )
}

export default App
