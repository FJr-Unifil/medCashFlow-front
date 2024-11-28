import logo from '../assets/medCashFlow-logo.png'

import { Link, useLocation } from 'react-router-dom'

export function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'text-blue-600'
      : 'font-bold hover:text-blue-600'
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="O logo do sistema" />
        <p className="text-[32px] font-bold">Med CashFlow</p>
      </div>
      <div className="flex gap-5">
        <Link
          to="/funcionarios"
          className={`uppercase font-medium text-xl transition-colors ${isActive('/funcionarios')}`}
        >
          funcionários
        </Link>
        <Link
          to="/envolvidos"
          className={`uppercase font-medium text-xl transition-colors ${isActive('/envolvidos')}`}
        >
          envolvidos
        </Link>
        <Link to="/plano-de-contas" className={`uppercase font-medium text-xl transition-colors ${isActive('/plano-de-contas')}`}>
          plano de contas
        </Link>
      </div>
    </div>
  )
}
