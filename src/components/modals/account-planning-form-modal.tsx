import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../form'
import { Icon } from '../icon'
import { AlignLeft, Palette, Smile, User } from 'lucide-react'
import Input from '../input'
import { Button } from '../button'

const accountPlanningForm = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(50, 'Máximo de 50 caracteres'),
  description: z.string().max(255, 'Máximo de 255 caracteres').optional(),
  emoji: z
    .string()
    .refine(val => {
      const emojiRegex = /^\p{Emoji}$/u
      return !val || emojiRegex.test(val)
    }, 'Deve ser um emoji válido')
    .optional(),
  color: z.string().min(1, 'Cor é obrigatório'),
})

export type AccountPlanningForm = z.infer<typeof accountPlanningForm>

export interface AccountPlanningResponse {
  id: number
  name: string
  description: string
  emoji: string
  color: string
}

interface AccountPlanningFormModal {
  title: string
  toggleModal: () => void
  onConfirm: (data: AccountPlanningForm) => void
  initialData?: AccountPlanningResponse | null
}

export function AccountPlanningFormModal({
  title,
  toggleModal,
  initialData,
  onConfirm,
}: AccountPlanningFormModal) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountPlanningForm>({
    resolver: zodResolver(accountPlanningForm),
    mode: 'onTouched',
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          emoji: initialData.emoji,
          color: initialData.color,
        }
      : undefined,
  })

  const handleFormSubmit = async (data: AccountPlanningForm) => {
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
              placeholder="Nome do plano de contas"
              state={errors.name ? 'error' : undefined}
              {...register('name')}
            />
          </Form.Item>

          <Form.Item
            label="Descrição"
            inputName="description"
            error={errors.description?.message}
            state={errors.description ? 'error' : undefined}
          >
            <Icon
              icon={AlignLeft}
              state={errors.description ? 'error' : undefined}
            />
            <Input
              type="text"
              placeholder="Descrição do plano de contas"
              state={errors.description ? 'error' : undefined}
              {...register('description')}
            />
          </Form.Item>

          <Form.Item
            label="Emoji"
            inputName="emoji"
            error={errors.emoji?.message}
            state={errors.emoji ? 'error' : undefined}
          >
            <Icon icon={Smile} state={errors.emoji ? 'error' : undefined} />
            <Input
              type="text"
              placeholder="Digite um emoji"
              state={errors.emoji ? 'error' : undefined}
              maxLength={2}
              {...register('emoji')}
            />
          </Form.Item>

          <Form.Item
            label="Cor"
            inputName="color"
            error={errors.color?.message}
            state={errors.color ? 'error' : undefined}
          >
            <Icon icon={Palette} state={errors.color ? 'error' : undefined} />
            <select
              className="py-2 transition rounded-lg w-full focus-visible:outline-none bg-transparent"
              {...register('color')}
            >
              <option value="" disabled selected>
                Selecione uma cor
              </option>
              <option value="slate">Ardois</option>
              <option value="gray">Cinza</option>
              <option value="zinc">Zinco</option>
              <option value="neutral">Neutro</option>
              <option value="stone">Pedra</option>
              <option value="red">Vermelho</option>
              <option value="orange">Laranja</option>
              <option value="amber">Âmbar</option>
              <option value="yellow">Amarelo</option>
              <option value="lime">Limão</option>
              <option value="green">Verde</option>
              <option value="emerald">Esmeralda</option>
              <option value="teal">Azul Petróleo</option>
              <option value="cyan">Ciano</option>
              <option value="sky">Céu</option>
              <option value="blue">Azul</option>
              <option value="indigo">Índigo</option>
              <option value="violet">Violeta</option>
              <option value="purple">Roxo</option>
              <option value="fuchsia">Fúcsia</option>
              <option value="pink">Rosa</option>
              <option value="rose">Rosa Antigo</option>
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
