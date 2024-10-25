import { Mail, Lock } from 'lucide-react'
import { Form } from '../components/form'
import { Icon } from '../components/icon'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authenticate } from '../http/authenticate'
import Input2 from '../components/input'

const loginForm = z.object({
  email: z.string().min(1, 'Insira seu email').email('Insira um email válido'),
  password: z.string().min(1, 'Insira sua senha'),
})

type LoginForm = z.infer<typeof loginForm>

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginForm),
    mode: 'onBlur',
  })
  const navigate = useNavigate()

  console.log(errors)

  const handleLogin = async (data: LoginForm) => {
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
    }
  }

  return (
    <Form.Root onSubmit={handleSubmit(handleLogin)}>
      <Form.Group>
        <Form.Item
          label="email"
          inputName="email"
          error={errors.email?.message}
          state={errors.email ? 'error' : undefined}
        >
          <Icon icon={Mail} state={errors.email ? 'error' : undefined} />
          <Input2
            type="email"
            placeholder="email@email.com"
            state={errors.email ? 'error' : undefined}
            {...register('email')}
          />
        </Form.Item>
        <Form.Item
          label="Senha"
          inputName="password"
          error={errors.password?.message}
          state={errors.password ? 'error' : undefined}
        >
          <Icon icon={Lock} state={errors.password ? 'error' : undefined} />
          <Input2
            type="password"
            placeholder="********"
            state={errors.password ? 'error' : undefined}
            {...register('password')}
          />
        </Form.Item>
      </Form.Group>
      <button
        type="submit"
        className="uppercase font-bold text-neutral-200 bg-green-600 mt-8 px-4 py-2 rounded-lg hover:scale-110 hover:bg-green-700 transition"
      >
        Fazer Login
      </button>
      <p className="text-sm -mt-6 text-center">
        Não possui conta?{' '}
        <Link to="/register" className="underline text-green-700 font-bold">
          Faça o cadastro
        </Link>
      </p>
    </Form.Root>
  )
}