import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { registerClinic } from '../http/register'
import { Form } from '../components/form'
import { Icon } from '../components/icon'
import { Hospital, IdCard, Lock, Mail, Phone } from 'lucide-react'
import Input from '../components/input'
import { cpfMask } from '../utils/cpfMask'
import { cnpjMask } from '../utils/cnpjMask'
import { phoneMask } from '../utils/phoneMask'
import { textMask } from '../utils/textMask'
import { emailMask } from '../utils/emailMask'
import { Button } from '../components/button'
import { BlobsDecoration } from '../components/blobsDecoration'
import { useState } from 'react'

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
    last_name: z
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
      .min(8, 'A senha deve ter ao menos 8 caracteres')
      .max(100, 'A senha deve ter no máximo 100 caracteres'),
  }),
})

type RegisterForm = z.infer<typeof registerForm>

export function Register() {
  const methods = useForm<RegisterForm>({
    resolver: zodResolver(registerForm),
    mode: 'onSubmit',
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const [step, setStep] = useState(1)
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

  const FirstStep = () => {
    const { register } = useFormContext()
    return (
      <Form.Group title="Detalhes da Clínica:">
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
            maskFn={textMask}
            maxLength={60}
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
            maskFn={cnpjMask}
            maxLength={18}
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
            maskFn={phoneMask}
            maxLength={14}
          />
        </Form.Item>
      </Form.Group>
    )
  }

  const SecondStep = () => {
    const { register } = useFormContext()
    return (
      <Form.Group title="Detalhes do Gestor:">
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
            maskFn={textMask}
          />
        </Form.Item>
        <Form.Item
          label="Sobrenome"
          inputName="manager.last_name"
          error={errors.manager?.last_name?.message}
          state={errors.manager?.last_name ? 'error' : undefined}
        >
          <Icon
            icon={IdCard}
            state={errors.manager?.last_name ? 'error' : undefined}
          />
          <Input
            type="text"
            placeholder="John Doe"
            state={errors.manager?.last_name ? 'error' : undefined}
            {...register('manager.name')}
            maskFn={textMask}
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
            type="text"
            placeholder="999.999.999-99"
            state={errors.manager?.cpf ? 'error' : undefined}
            {...register('manager.cpf')}
            maskFn={cpfMask}
            maxLength={14}
          />
        </Form.Item>
      </Form.Group>
    )
  }

  const ThirdStep = () => {
    const { register } = useFormContext()
    return (
      <Form.Group title="Detalhes do Acesso">
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
            type="text"
            placeholder="email@email.com"
            state={errors.manager?.email ? 'error' : undefined}
            {...register('manager.email')}
            maskFn={emailMask}
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
            maskFn={textMask}
            maxLength={100}
          />
        </Form.Item>
      </Form.Group>
    )
  }

  const onNext = () => {
    setStep(currentStep => currentStep + 1)
  }
  const onBack = () => setStep(currentStep => currentStep - 1)

  return (
    <div className="min-h-screen grid place-content-center bg-gray-200 py-5">
      <BlobsDecoration />
      <FormProvider {...methods}>
        <Form.Root onSubmit={handleSubmit(handleRegister)}>
          <Form.Title
            title="Seja bem-vindo 👋"
            subtitle="faça seu cadastro e aproveite"
          />
          <Form.Steps numberOfSteps={3} currentStep={step} />
          {step === 1 && <FirstStep />}
          {step === 2 && <SecondStep />}
          {step === 3 && <ThirdStep />}
          <Form.Actions>
            {step < 3 ? (
              <Button type="button" onClick={onNext}>
                Ir para próxima etapa
              </Button>
            ) : (
              <Button type="submit">Finalizar Cadastro</Button>
            )}
            {step > 1 && (
              <Button type="button" styling="outline" onClick={onBack}>
                Voltar para etapa anterior
              </Button>
            )}
          </Form.Actions>
          <p className="text-sm -mt-2 text-center">
            Já possui uma conta?{' '}
            <Link to="/" className="underline text-green-700 font-bold">
              Faça o login
            </Link>
          </p>
        </Form.Root>
      </FormProvider>
    </div>
  )
}
