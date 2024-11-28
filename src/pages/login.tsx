import { Mail, Lock, LogIn } from 'lucide-react'
import { Form } from '../components/form'
import { Icon } from '../components/icon'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authenticate } from '../http/authenticate'
import { textMask } from '../utils/textMask'
import Input from '../components/input'
import { emailMask } from '../utils/emailMask'
import { BlobsDecoration } from '../components/blobs-decoration'
import { Button } from '../components/button'
import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'

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
    mode: 'onTouched',
  })

  const navigate = useNavigate()

  const auth = useContext(AuthContext)

  const handleLogin = async (credentials: LoginForm) => {
    try {
      const response = await authenticate(credentials)
      auth?.login(response.token)
      navigate('/')
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
    <div className="min-h-screen grid place-content-center bg-gray-200 py-10">
      <BlobsDecoration />
      <Form.Root onSubmit={handleSubmit(handleLogin)}>
        <Form.Group>
          <Form.Item
            label="email"
            inputName="email"
            error={errors.email?.message}
            state={errors.email ? 'error' : undefined}
          >
            <Icon icon={Mail} state={errors.email ? 'error' : undefined} />
            <Input
              type="text"
              placeholder="email@email.com"
              state={errors.email ? 'error' : undefined}
              {...register('email')}
              maskFn={emailMask}
            />
          </Form.Item>
          <Form.Item
            label="Senha"
            inputName="password"
            error={errors.password?.message}
            state={errors.password ? 'error' : undefined}
          >
            <Icon icon={Lock} state={errors.password ? 'error' : undefined} />
            <Input
              type="password"
              placeholder="********"
              state={errors.password ? 'error' : undefined}
              {...register('password')}
              maskFn={textMask}
            />
          </Form.Item>
        </Form.Group>
        <Button type="submit">
          Fazer Login
          <LogIn />
        </Button>
        <p className="text-sm -mt-6 text-center">
          Não possui conta?{' '}
          <Link
            to="/auth/registro"
            className="underline text-green-700 font-bold"
          >
            Faça o cadastro
          </Link>
        </p>
      </Form.Root>
    </div>
  )
}
