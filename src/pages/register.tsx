import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import {
  type ErrorResponse,
  registerClinic,
  type RegisterRequest,
} from '../http/register'
import { Form } from '../components/form'
import { Button } from '../components/button'
import { BlobsDecoration } from '../components/blobs-decoration'
import { useState } from 'react'
import { FirstStep } from '../components/steps/first-step'
import { SecondStep } from '../components/steps/second-step'
import { ThirdStep } from '../components/steps/third-step'

const registerForm = z.object({
  clinic: z.object({
    name: z
      .string()
      .min(1, 'Razão Social é obrigatório')
      .min(2, 'Mínimo de 2 caracteres')
      .max(60, 'A razão social não pode ter mais que 60 caracteres'),
    cnpj: z
      .string()
      .min(1, 'CNPJ é obrigatório')
      .transform(val => val.replace(/\D/g, ''))
      .refine(val => val.length === 14, 'CNPJ incompleto'),
    phone: z
      .string()
      .min(1, 'Telefone é obrigatório')
      .transform(val => val.replace(/\D/g, ''))
      .refine(val => val.length === 10, 'Telefone Incorreto. Exemplo de telefone correto: (43) 4002-8922'),
  }),
  manager: z.object({
    first_name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .max(50, 'Máximo de 50 caracteres'),
    last_name: z
      .string()
      .min(1, 'Sobrenome é obrigatório')
      .max(50, 'Máximo de 50 caracteres'),
    cpf: z
      .string()
      .min(1, 'CPF é obrigatório')
      .transform(val => val.replace(/\D/g, ''))
      .refine(val => val.length === 11, 'CPF incompleto'),
    email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
    password: z
      .string()
      .min(1, 'Senha é obrigatório')
      .min(8, 'A senha deve ter ao menos 8 caracteres')
      .max(100, 'A senha deve ter no máximo 100 caracteres'),
  }),
})

export type RegisterForm = z.infer<typeof registerForm>

export function Register() {
  const methods = useForm<RegisterForm>({
    resolver: zodResolver(registerForm),
    mode: 'onTouched',
  })

  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const isApiError = (error: unknown): error is ErrorResponse => {
    return (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'title' in error &&
      'description' in error &&
      'timestamp' in error
    )
  }

  const fieldLabels: { [key: string]: string } = {
    'clinic.name': 'RAZÃO SOCIAL',
    'clinic.cnpj': 'CNPJ',
    'clinic.phone': 'TELEFONE',
    'manager.first_name': 'NOME',
    'manager.last_name': 'SOBRENOME',
    'manager.cpf': 'CPF',
    'manager.email': 'EMAIL',
    'manager.password': 'SENHA',
  }

  const handleRegister = async (data: RegisterForm) => {
    try {
      await registerClinic(data)
      navigate('/')
    } catch (err) {
      if (isApiError(err)) {
        const fieldPath = err.description as keyof RegisterRequest
        const label =
          fieldLabels[fieldPath] || fieldPath.split('.')[1].toUpperCase()

        const stepWithError = sourceSteps.findIndex(step =>
          step.fields.some(field => field.includes(fieldPath))
        )

        setStep(stepWithError)

        methods.setError(
          fieldPath,
          {
            type: 'manual',
            message: `Um cadastro com esse ${label} já existe`,
          },
          { shouldFocus: true }
        )
      } else {
        console.error('Unexpected error:', err)
        methods.setError('root', {
          type: 'manual',
          message: 'Um erro inesperado ocorreu',
        })
      }
    }
  }

  const sourceSteps = [
    {
      component: <FirstStep />,
      fields: ['clinic.name', 'clinic.cnpj', 'clinic.phone'] as const,
    },
    {
      component: <SecondStep />,
      fields: [
        'manager.first_name',
        'manager.last_name',
        'manager.cpf',
      ] as const,
    },
    {
      component: <ThirdStep />,
      fields: ['manager.email', 'manager.password'] as const,
    },
  ]

  const onNext = async (e: React.MouseEvent) => {
    e.preventDefault()
    const { fields } = sourceSteps[step]
    const isValid = await methods.trigger(fields)

    if (!isValid) return
    setStep(currentStep => currentStep + 1)
  }

  const onBack = () => setStep(currentStep => currentStep - 1)

  const isLastStep = step + 1 === sourceSteps.length
  const isFirstStep = step === 0

  return (
    <div className="min-h-screen grid place-content-center bg-gray-200 py-5">
      <BlobsDecoration />
      <FormProvider {...methods}>
        <Form.Root onSubmit={methods.handleSubmit(handleRegister)}>
          <Form.Title
            title="Seja bem-vindo 👋"
            subtitle="faça seu cadastro e aproveite"
          />
          <Form.Steps numberOfSteps={3} currentStep={step} />
          {sourceSteps[step].component}
          <Form.Actions>
            {!isLastStep ? (
              <Button type="button" onClick={onNext}>
                Ir para próxima etapa
              </Button>
            ) : (
              <Button type="submit">Finalizar Cadastro</Button>
            )}
            {!isFirstStep && (
              <Button type="button" styling="outline" onClick={onBack}>
                Voltar para etapa anterior
              </Button>
            )}
          </Form.Actions>
          <p className="text-sm -mt-2 text-center">
            Já possui uma conta?{' '}
            <Link to="/auth/" className="underline text-green-700 font-bold">
              Faça o login
            </Link>
          </p>
        </Form.Root>
      </FormProvider>
    </div>
  )
}
