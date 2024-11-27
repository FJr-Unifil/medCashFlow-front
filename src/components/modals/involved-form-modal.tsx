import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../form'
import { Icon } from '../icon'
import { User, IdCard, Phone, Mail } from 'lucide-react'
import Input from '../input'
import { textMask } from '../../utils/textMask'
import { documentMask } from '../../utils/documentMask'
import { phoneMask } from '../../utils/phoneMask'
import { emailMask } from '../../utils/emailMask'
import { Button } from '../button'

const involvedForm = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(60, 'Máximo de 60 caracteres'),
  document: z
    .string()
    .min(1, 'Documento é obrigatório')
    .transform(val => val.replace(/\D/g, ''))
    .refine(
      val => val.length === 11 || val.length === 14,
      'Documento incompleto'
    ),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length === 11, 'Telefone incompleto'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
})

export type InvolvedForm = z.infer<typeof involvedForm>

export interface InvolvedResponse {
  id: number
  name: string
  document: string
  phone: string
  email: string
  isActive: boolean
}

interface InvolvedFormModal {
  title: string
  toggleModal: () => void
  onConfirm: (data: InvolvedForm) => void
  initialData?: InvolvedResponse | null
}

export function InvolvedFormModal({
  title,
  toggleModal,
  initialData,
  onConfirm,
}: InvolvedFormModal) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvolvedForm>({
    resolver: zodResolver(involvedForm),
    mode: 'onTouched',
    defaultValues: initialData
      ? {
          name: initialData.name,
          document: initialData.document,
          phone: initialData.phone,
          email: initialData.email,
        }
      : undefined,
  })

  const handleFormSubmit = async (data: InvolvedForm) => {
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
          <Form.Item
            label="Nome"
            inputName="name"
            error={errors.name?.message}
            state={errors.name ? 'error' : undefined}
          >
            <Icon icon={User} state={errors.name ? 'error' : undefined} />
            <Input
              type="text"
              placeholder="Nome completo"
              state={errors.name ? 'error' : undefined}
              {...register('name')}
              maskFn={textMask}
            />
          </Form.Item>

          <Form.Item
            label="Documento"
            inputName="document"
            error={errors.document?.message}
            state={errors.document ? 'error' : undefined}
          >
            <Icon icon={IdCard} state={errors.document ? 'error' : undefined} />
            <Input
              type="text"
              placeholder="000.000.000-00"
              state={errors.document ? 'error' : undefined}
              {...register('document')}
              maskFn={documentMask}
              maxLength={18}
            />
          </Form.Item>

          <Form.Item
            label="Telefone"
            inputName="phone"
            error={errors.phone?.message}
            state={errors.phone ? 'error' : undefined}
          >
            <Icon icon={Phone} state={errors.phone ? 'error' : undefined} />
            <Input
              type="text"
              placeholder="(00) 00000-0000"
              state={errors.phone ? 'error' : undefined}
              {...register('phone')}
              maskFn={phoneMask}
              maxLength={16}
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
