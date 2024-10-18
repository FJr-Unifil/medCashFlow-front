import { Hospital, IdCard, Lock, Mail, Phone, User } from 'lucide-react'
import blobTop from '../assets/Vector-2.svg'
import blobBottom from '../assets/Vector.svg'
import Input from './input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { registerClinic } from '../http/register'
import { object, string, z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const registerForm = z.object({
  clinic: object({
    name: string().min(5, 'Digite a razão social da sua clínica'),
    cnpj: string().length(14, 'CNPJ incompleto'),
    phone: string().length(10, 'Telefone incompleto'),
  }),
  manager: object({
    name: string().min(5, 'Digite seu nome'),
    cpf: string().length(11, 'CPF incompleto'),
    email: string().email('Email inválido'),
    password: string().min(8, 'A senha deve ter mais que 8 caracteres'),
  }),
})

type RegisterForm = z.infer<typeof registerForm>

function Register() {
  const { register, handleSubmit, formState, control } = useForm<RegisterForm>({
    resolver: zodResolver(registerForm),
  })

  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (data: RegisterForm) => {
    setIsPending(true)

    const responseData = await registerClinic(data)

    if (responseData) {
      setIsPending(false)
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen grid place-content-center bg-gray-200 py-10">
      <img
        src={blobTop}
        alt="Just a decorative blob at the top right"
        className="fixed top-0 right-0"
      />
      <form
        className="flex flex-col gap-4 px-20 py-10 bg-gray-100 rounded-xl z-10"
        onSubmit={handleSubmit(handleRegister)}
        noValidate
      >
        <h2 className="form-subtitle text-2xl text-green-700 font-bold">
          Clínica
        </h2>
        <div className="divider w-8 border-2 border-green-700 rounded-full -mt-2" />
        <Input
          label="Razão Social"
          id="clinicName"
          type="text"
          icon={
            <Hospital
              className={`text-gray-500 w-4 absolute left-2 top-1/2 bottom-1/2 -translate-y-1/2 ${
                formState.errors.clinic?.name && 'text-red-600'
              }`}
            />
          }
          placeholder="Clínica X"
          error={formState.errors.clinic?.name?.message}
          {...register('clinic.name')}
        />
        <Controller
          name="clinic.cnpj"
          control={control}
          render={({ field }) => (
            <Input
              label="CNPJ"
              id="cnpj"
              type="text"
              icon={
                <Hospital
                  className={`text-gray-500 w-4 absolute left-2 top-1/2 bottom-1/2 -translate-y-1/2 ${
                    formState.errors.clinic?.cnpj ? 'text-red-600' : ''
                  }`}
                />
              }
              placeholder="99.999.999/9999-99"
              mask="99.999.999/9999-99"
              error={formState.errors.clinic?.cnpj?.message}
              {...field}
              onChange={event => {
                const numericValue = event.target.value.replace(/\D/g, '')
                field.onChange(numericValue)
              }}
            />
          )}
        />
        <Controller
          name="clinic.phone"
          control={control}
          render={({ field }) => (
            <Input
              label="Telefone"
              id="clinicPhone"
              type="tel"
              icon={
                <Phone
                  className={`text-gray-500 w-4 absolute left-2 top-1/2 bottom-1/2 -translate-y-1/2 ${
                    formState.errors.clinic?.phone && 'text-red-600'
                  }`}
                />
              }
              placeholder="(99) 9999-9999"
              mask="(99) 9999-9999"
              error={formState.errors.clinic?.phone?.message}
              {...field}
              onChange={event => {
                const numericValue = event.target.value.replace(/\D/g, '')
                field.onChange(numericValue)
              }}
            />
          )}
        />
        <h2 className="form-subtitle text-2xl text-green-700 font-bold mt-8">
          Gerente
        </h2>
        <div className="divider w-8 border-2 border-green-700 rounded-full -mt-2" />
        <Input
          label="Nome"
          id="managerName"
          type="text"
          icon={
            <User
              className={`text-gray-500 w-4 absolute left-2 top-1/2 bottom-1/2 -translate-y-1/2 ${
                formState.errors.manager?.name && 'text-red-600'
              }`}
            />
          }
          placeholder="John Doe"
          error={formState.errors.manager?.name?.message}
          {...register('manager.name')}
        />
        <Controller
          name="manager.cpf"
          control={control}
          render={({ field }) => (
            <Input
              label="CPF"
              id="cpf"
              type="number"
              icon={
                <IdCard
                  className={`text-gray-500 w-4 absolute left-2 top-1/2 bottom-1/2 -translate-y-1/2 ${
                    formState.errors.manager?.cpf && 'text-red-600'
                  }`}
                />
              }
              placeholder="999.999.999-99"
              mask="999.999.999-99"
              error={formState.errors.manager?.cpf?.message}
              {...field}
              onChange={event => {
                const numericValue = event.target.value.replace(/\D/g, '')
                field.onChange(numericValue)
              }}
            />
          )}
        />
        <Input
          label="Email"
          id="managerEmail"
          type="email"
          icon={
            <Mail
              className={`text-gray-500 w-4 absolute left-2 top-1/2 bottom-1/2 -translate-y-1/2 ${
                formState.errors.manager?.email && 'text-red-600'
              }`}
            />
          }
          placeholder="email@exemplo.com"
          error={formState.errors.manager?.email?.message}
          {...register('manager.email')}
        />
        <Input
          label="Senha"
          id="managerPassword"
          type="password"
          icon={
            <Lock
              className={`text-gray-500 w-4 absolute left-2 top-1/2 bottom-1/2 -translate-y-1/2 ${
                formState.errors.manager?.password && 'text-red-600'
              }`}
            />
          }
          placeholder="********"
          error={formState.errors.manager?.password?.message}
          {...register('manager.password')}
        />
        {!isPending ? (
          <button
            type="submit"
            className="uppercase font-bold text-neutral-200 bg-green-600 mt-8 px-4 py-2 rounded-lg hover:scale-110 hover:bg-green-700 transition"
          >
            Registrar
          </button>
        ) : (
          <button
            disabled
            type="submit"
            className="uppercase font-bold text-neutral-700 bg-gray-300 mt-8 px-4 py-2 rounded-lg"
          >
            Enviando os dados...
          </button>
        )}
        <p className="text-sm -mt-2 text-center">
          Já possui uma conta?{' '}
          <Link to="/" className="underline text-green-700 font-bold">
            Faça o login
          </Link>
        </p>
      </form>
      <img
        src={blobBottom}
        alt="Just a decorative blob at the bottom left"
        className="fixed bottom-0 left-0"
      />
    </div>
  )
}

export default Register
