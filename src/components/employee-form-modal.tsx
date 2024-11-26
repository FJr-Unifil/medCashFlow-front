import { z } from 'zod'
import { Button } from './button'
import { Form } from './form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Briefcase, IdCard, Lock, Mail, User } from 'lucide-react'
import { Icon } from './icon'
import Input from './input'
import { textMask } from '../utils/textMask'
import { cpfMask } from '../utils/cpfMask'
import { emailMask } from '../utils/emailMask'
import type { EmployeeResponse } from '../pages/allEmployees'

const employeeForm = z.object({
  firstName: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(50, 'Máximo de 50 caracteres'),
  lastName: z
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
  roleId: z.number().min(1, 'Cargo Inválido').max(3, 'Cargo Inválido'),
})

export type EmployeeForm = z.infer<typeof employeeForm>

interface EmployeeFormModal {
  title: string
  toggleModal: () => void
  onConfirm: (data: EmployeeForm) => void
  initialData?: EmployeeResponse | null
}

export function EmployeeFormModal({
  title,
  toggleModal,
  onConfirm,
  initialData,
}: EmployeeFormModal) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeForm>({
    resolver: zodResolver(employeeForm),
    mode: 'onTouched',
    defaultValues: initialData
      ? {
          firstName: initialData.firstName,
          lastName: initialData.lastName,
          cpf: initialData.cpf,
          email: initialData.email,
          roleId: getRoleId(initialData.role),
          password: '',
        }
      : undefined,
  })

  const handleFormSubmit = async (data: EmployeeForm) => {
    try {
      await onConfirm(data)
      toggleModal()
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="pt-5 pb-10 px-5 bg-gray-100 shadow-xl rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 className="uppercase text-[32px] font-bold mb-5 text-center">
        {title}
      </h2>
      <Form.Root onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group>
          <div className="flex gap-4">
            <Form.Item
              label="Nome"
              inputName="firstName"
              error={errors.firstName?.message}
              state={errors.firstName ? 'error' : undefined}
            >
              <Icon
                icon={User}
                state={errors.firstName ? 'error' : undefined}
              />
              <Input
                type="text"
                placeholder="João"
                state={errors.firstName ? 'error' : undefined}
                {...register('firstName')}
                maskFn={textMask}
              />
            </Form.Item>

            <Form.Item
              label="Sobrenome"
              inputName="lastName"
              error={errors.lastName?.message}
              state={errors.lastName ? 'error' : undefined}
            >
              <Icon icon={User} state={errors.lastName ? 'error' : undefined} />
              <Input
                type="text"
                placeholder="Silva"
                state={errors.lastName ? 'error' : undefined}
                {...register('lastName')}
                maskFn={textMask}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="CPF"
            inputName="cpf"
            error={errors.cpf?.message}
            state={errors.cpf ? 'error' : undefined}
          >
            <Icon icon={IdCard} state={errors.cpf ? 'error' : undefined} />
            <Input
              type="text"
              placeholder="000.000.000-00"
              state={errors.cpf ? 'error' : undefined}
              {...register('cpf')}
              maskFn={cpfMask}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            inputName="email"
            error={errors.email?.message}
            state={errors.email ? 'error' : undefined}
          >
            <Icon icon={Mail} state={errors.email ? 'error' : undefined} />
            <Input
              type="email"
              placeholder="email@exemplo.com"
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
            />
          </Form.Item>

          <Form.Item
            label="Cargo"
            inputName="roleId"
            error={errors.roleId?.message}
            state={errors.roleId ? 'error' : undefined}
          >
            <Icon
              icon={Briefcase}
              state={errors.roleId ? 'error' : undefined}
            />
            <select
              className="py-2 transition rounded-lg w-full focus-visible:outline-none bg-transparent"
              {...register('roleId', { valueAsNumber: true })}
            >
              <option value="0" disabled selected>
                Selecione um cargo
              </option>
              <option value="2">Analista Financeiro</option>
              <option value="3">Médico</option>
            </select>
          </Form.Item>
        </Form.Group>

        <div className="flex gap-4 items-center justify-center mt-6">
          <Button styling="outline" type="button" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button type="submit">Confirmar</Button>
        </div>
      </Form.Root>
    </div>
  )
}

function getRoleId(role: string): number {
  const roleMap = {
    MANAGER: 1,
    FINANCIAL_ANALYST: 2,
    DOCTOR: 3,
  }
  return roleMap[role as keyof typeof roleMap] || 0
}
