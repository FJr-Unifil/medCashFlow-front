import { useNavigate } from 'react-router-dom'
import undrawForbidden from '../assets/undraw_forbidden.svg'
import { Button } from '../components/button'

export function Forbidden() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center gap-10 min-h-screen bg-gray-100">
      <img
        src={undrawForbidden}
        alt="An illustration representing the forbidden page"
        className="block max-w-full"
      />
      <div>
        <h1 className="uppercase text-5xl font-bold mb-12 text-center">
          403, PROIBIDO 🚫
        </h1>
        <p className="text-2xl font-medium mb-12">
          Você não tem permissão para acessar esse recurso do site
        </p>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            styling="link"
            onClick={() => navigate('/auth')}
          >
            Fazer Login em Outra Conta
          </Button>
          <Button type="button" onClick={() => navigate(-3)}>
            Voltar Para A Página Anterior
          </Button>
        </div>
      </div>
    </div>
  )
}
