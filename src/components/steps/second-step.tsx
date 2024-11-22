import { IdCard } from 'lucide-react'
import { Form } from '../form'
import { Icon } from '../icon'
import Input from '../input'
import { textMask } from '../../utils/textMask'
import { cpfMask } from '../../utils/cpfMask'
import { useFormContext } from 'react-hook-form'
import type { RegisterForm } from '../../pages/register'

export const SecondStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterForm>()

  return (
    <Form.Group title="Detalhes do Gestor:">
      <Form.Item
        label="Nome"
        inputName="manager.first_name"
        error={errors.manager?.first_name?.message}
        state={errors.manager?.first_name ? 'error' : undefined}
      >
        <Icon
          icon={IdCard}
          state={errors.manager?.first_name ? 'error' : undefined}
        />
        <Input
          type="text"
          placeholder="John"
          state={errors.manager?.first_name ? 'error' : undefined}
          {...register('manager.first_name')}
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
          placeholder="Doe"
          state={errors.manager?.last_name ? 'error' : undefined}
          {...register('manager.last_name')}
          maskFn={textMask}
        />
      </Form.Item>

      <Form.Item
        label="CPF"
        inputName="manager.cpf"
        error={errors.manager?.cpf?.message}
        state={errors.manager?.cpf ? 'error' : undefined}
      >
        <Icon icon={IdCard} state={errors.manager?.cpf ? 'error' : undefined} />
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
