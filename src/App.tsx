import { Login } from './pages/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from './pages/register'

function App() {
  return (
    <BrowserRouter basename="/auth">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
