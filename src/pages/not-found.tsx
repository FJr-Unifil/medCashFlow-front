import { useNavigate } from 'react-router-dom'
import undrawNotFound from '../assets/undraw_not_found.svg'
import { Button } from '../components/button'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center gap-10 min-h-screen bg-gray-100 px-5">
      <img
        src={undrawNotFound}
        alt="An illustration representing the forbidden page"
        className="block max-w-xl"
      />
      <div>
        <h1 className="uppercase text-5xl font-bold mb-12 text-center">
          404, NÃO ENCONTRADO ❌
        </h1>
        <p className="text-2xl font-medium mb-12">
          Essa rota que você tentou acessar não existe. Tente novamente
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button type="button" onClick={() => navigate(-1)} className='bg-[#6B63FF] hover:bg-purple-700'>
            Voltar Para A Página Anterior
          </Button>
        </div>
      </div>
    </div>
  )
}
