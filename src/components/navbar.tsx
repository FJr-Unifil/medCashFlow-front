import logo from '../assets/medCashFlow-logo.png'

export function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="O logo do sistema" />
        <p className="text-[32px] font-bold">Med CashFlow</p>
      </div>
      <div className='flex gap-5'>
        <span className='uppercase font-medium text-gray-900 text-xl'>configurações</span>
        <span className='uppercase font-bold text-gray-900 text-xl'>funcionários</span>
        <span className='uppercase font-medium text-gray-900 text-xl'>envolvidos</span>
        <span className='uppercase font-medium text-gray-900 text-xl'>contas</span>
        <span className='uppercase font-medium text-gray-900 text-xl'>relatórios</span>
      </div>
    </div>
  )
}
