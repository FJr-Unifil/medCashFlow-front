import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { registerClinic } from '../http/register'
import { Form } from '../components/form'
import { Icon } from '../components/icon'
import { Hospital, IdCard, Lock, Mail, Phone } from 'lucide-react'
import Input from '../components/input'

const registerForm = z.object({
  clinic: z.object({
    name: z
      .string()
      .min(1, 'Razão Social é obrigatório')
      .min(2, 'Mínimo de 2 caracteres')
      .max(60, 'A razão social não pode ter mais que 60 caracteres'),
    cnpj: z.preprocess(
      value => (typeof value === 'string' ? value : ''),
      z
        .string()
        .min(1, 'CNPJ é obrigatório')
        .transform(val => val.replace(/\D/g, ''))
        .refine(val => val.length === 14, 'CNPJ incompleto')
    ),
    phone: z.preprocess(
      value => (typeof value === 'string' ? value : ''),
      z
        .string()
        .min(1, 'Telefone é obrigatório')
        .transform(val => val.replace(/\D/g, ''))
        .refine(val => val.length === 10, 'Telefone incompleto')
    ),
  }),
  manager: z.object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .min(5, 'Mínimo de 5 caracteres'),
    cpf: z.preprocess(
      value => (typeof value === 'string' ? value : ''),
      z
        .string()
        .min(1, 'CPF é obrigatório')
        .transform(val => val.replace(/\D/g, ''))
        .refine(val => val.length === 11, 'CPF incompleto')
    ),
    email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
    password: z
      .string()
      .min(1, 'Senha é obrigatório')
      .min(8, 'A senha deve ter mais que 8 caracteres'),
  }),
})

type RegisterForm = z.infer<typeof registerForm>

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerForm),
    mode: 'onBlur',
  })

  const navigate = useNavigate()

  const handleRegister = async (data: RegisterForm) => {
    try {
      const responseData = await registerClinic(data)
      console.log(responseData)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form.Root onSubmit={handleSubmit(handleRegister)}>
      <Form.Group title="Clínica">
        <Form.Item
          label="Razão Social"
          inputName="clinic.name"
          error={errors.clinic?.name?.message}
          state={errors.clinic?.name ? 'error' : undefined}
        >
          <Icon
            icon={Hospital}
            state={errors.clinic?.name ? 'error' : undefined}
          />
          <Input
            type="text"
            placeholder="Clínica Pontello LTDA"
            state={errors.clinic?.name ? 'error' : undefined}
            {...register('clinic.name')}
          />
        </Form.Item>
        <Form.Item
          label="CNPJ"
          inputName="clinic.cnpj"
          error={errors.clinic?.cnpj?.message}
          state={errors.clinic?.cnpj ? 'error' : undefined}
        >
          <Icon
            icon={Hospital}
            state={errors.clinic?.cnpj ? 'error' : undefined}
          />
          <Input
            placeholder="99.999.999/9999-99"
            type="text"
            state={errors.clinic?.cnpj ? 'error' : undefined}
            {...register('clinic.cnpj')}
          />
        </Form.Item>
        <Form.Item
          label="Telefone"
          inputName="clinic.phone"
          error={errors.clinic?.phone?.message}
          state={errors.clinic?.phone ? 'error' : undefined}
        >
          <Icon
            icon={Phone}
            state={errors.clinic?.phone ? 'error' : undefined}
          />
          <Input
            type="text"
            placeholder="(43) 4002-8922"
            state={errors.clinic?.phone ? 'error' : undefined}
            {...register('clinic.phone')}
          />
        </Form.Item>
      </Form.Group>
      <Form.Group title="Gestor">
        <Form.Item
          label="Nome"
          inputName="manager.name"
          error={errors.manager?.name?.message}
          state={errors.manager?.name ? 'error' : undefined}
        >
          <Icon
            icon={IdCard}
            state={errors.manager?.name ? 'error' : undefined}
          />
          <Input
            type="text"
            placeholder="John Doe"
            state={errors.manager?.name ? 'error' : undefined}
            {...register('manager.name')}
          />
        </Form.Item>
        <Form.Item
          label="CPF"
          inputName="manager.cpf"
          error={errors.manager?.cpf?.message}
          state={errors.manager?.cpf ? 'error' : undefined}
        >
          <Icon
            icon={IdCard}
            state={errors.manager?.cpf ? 'error' : undefined}
          />
          <Input
            type="number"
            placeholder="999.999.999-99"
            state={errors.manager?.cpf ? 'error' : undefined}
            {...register('manager.cpf')}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          inputName="manager.email"
          error={errors.manager?.email?.message}
          state={errors.manager?.email ? 'error' : undefined}
        >
          <Icon
            icon={Mail}
            state={errors.manager?.email ? 'error' : undefined}
          />
          <Input
            type="email"
            placeholder="email@email.com"
            state={errors.manager?.email ? 'error' : undefined}
            {...register('manager.email')}
          />
        </Form.Item>
        <Form.Item
          label="Senha"
          inputName="manager.password"
          error={errors.manager?.password?.message}
          state={errors.manager?.password ? 'error' : undefined}
        >
          <Icon
            icon={Lock}
            state={errors.manager?.password ? 'error' : undefined}
          />
          <Input
            type="password"
            placeholder="********"
            state={errors.manager?.password ? 'error' : undefined}
            {...register('manager.password')}
          />
        </Form.Item>
      </Form.Group>
      <button
        type="submit"
        className="uppercase font-bold text-neutral-200 bg-green-600 mt-8 px-4 py-2 rounded-lg hover:scale-110 hover:bg-green-700 transition"
      >
        Registrar
      </button>
      <p className="text-sm -mt-2 text-center">
        Já possui uma conta?{' '}
        <Link to="/2" className="underline text-green-700 font-bold">
          Faça o login
        </Link>
      </p>
    </Form.Root>
  )
}
