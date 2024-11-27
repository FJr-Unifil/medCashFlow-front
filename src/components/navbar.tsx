import logo from '../assets/medCashFlow-logo.png'

import { Link, useLocation } from 'react-router-dom'

export function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'text-blue-600'
      : 'text-gray-900 hover:text-blue-600'
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="O logo do sistema" />
        <p className="text-[32px] font-bold">Med CashFlow</p>
      </div>
      <div className="flex gap-5">
        <Link
          to="/employees"
          className={`uppercase font-medium text-xl transition-colors ${isActive('/employees')}`}
        >
          funcionários
        </Link>
        <Link
          to="/involveds"
          className={`uppercase font-medium text-xl transition-colors ${isActive('/involved')}`}
        >
          envolvidos
        </Link>
      </div>
    </div>
  )
}
