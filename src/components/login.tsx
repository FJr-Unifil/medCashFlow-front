import { Lock, Mail } from 'lucide-react'
import blobTop from '../assets/Vector-2.svg'
import blobBottom from '../assets/Vector.svg'
import Input from './input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { authenticate } from '../http/authenticate'
import { string, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const loginForm = z.object({
  email: string().email('Insira um email válido'),
  password: string().min(1, 'Insira sua senha'),
})

type LoginForm = z.infer<typeof loginForm>

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginForm),
    mode: 'onBlur',
  })

  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (data: LoginForm) => {
    setIsPending(true)

    try {
      const responseData = await authenticate(data)
      console.log(responseData)
      navigate('/success')
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        console.log(err)
        if (err.message.includes('404')) {
          setError('email', {
            type: 'manual',
            message: 'Usuário não encontrado',
          })
        } else {
          setError('email', {
            type: 'manual',
            message: 'Email/Senha inválidos',
          })
          setError('password', {
            type: 'manual',
            message: 'Email/senha inválidos',
          })
        }
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="h-screen grid place-content-center bg-gray-200">
      <img
        src={blobTop}
        alt="Just a decorative blob at the top right"
        className="fixed top-0 right-0"
      />
      <form
        className="flex flex-col gap-4 px-20 py-10 bg-gray-100 rounded-xl"
        onSubmit={handleSubmit(handleLogin)}
        noValidate
      >
        <Input
          label="Email"
          id="email"
          type="email"
          icon={
            <Mail
              className={`text-gray-500 w-4 absolute left-2 top-1/2 bottom-1/2 -translate-y-1/2 ${
                errors.email && 'text-red-600'
              }`}
            />
          }
          placeholder="email@exemplo.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Senha"
          id="password"
          type="password"
          icon={
            <Lock
              className={`text-gray-500 w-4 absolute left-2 top-1/2 bottom-1/2 -translate-y-1/2 ${
                errors.password && 'text-red-600'
              }`}
            />
          }
          placeholder="********"
          error={errors.password?.message}
          {...register('password')}
        />
        {!isPending ? (
          <button
            type="submit"
            className="uppercase font-bold text-neutral-200 bg-green-600 mt-8 px-4 py-2 rounded-lg hover:scale-110 hover:bg-green-700 transition"
          >
            Fazer login
          </button>
        ) : (
          <button
            disabled
            type="submit"
            className="uppercase font-bold text-neutral-700 bg-gray-300 mt-8 px-4 py-2 rounded-lg"
          >
            Enviando dados...
          </button>
        )}
        <p className="text-sm -mt-2 text-center">
          Não possui conta?{' '}
          <Link to="/register" className="underline text-green-700 font-bold">
            Faça o cadastro
          </Link>
        </p>
      </form>
      <img
        src={blobBottom}
        alt="Just a decorative blob at the bottom left"
        className="absolute bottom-0 left-0"
      />
    </div>
  )
}

export default Login
