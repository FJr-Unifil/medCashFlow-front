import { useFormContext } from 'react-hook-form'
import { Form } from '../form'
import { IdCard } from 'lucide-react'
import { textMask } from '../../utils/textMask'
import Input from '../input'
import { Icon } from '../icon'
import { cpfMask } from '../../utils/cpfMask'

export const SecondStep = () => {
  const { register, getFieldState } = useFormContext()

  return (
    <Form.Group title="Detalhes do Gestor:">
      <Form.Item
        label="Nome"
        inputName="manager.name"
        error={getFieldState('manager.name').error?.message}
        state={getFieldState('manager.name').error ? 'error' : undefined}
      >
        <Icon
          icon={IdCard}
          state={getFieldState('manager.name').error ? 'error' : undefined}
        />
        <Input
          type="text"
          placeholder="John Doe"
          state={getFieldState('manager.name').error ? 'error' : undefined}
          {...register('manager.name')}
          maskFn={textMask}
        />
      </Form.Item>
      <Form.Item
        label="Sobrenome"
        inputName="manager.last_name"
        error={getFieldState('manager.last_name').error?.message}
        state={getFieldState('manager.last_name').error ? 'error' : undefined}
      >
        <Icon
          icon={IdCard}
          state={getFieldState('manager.last_name').error ? 'error' : undefined}
        />
        <Input
          type="text"
          placeholder="John Doe"
          state={getFieldState('manager.last_name').error ? 'error' : undefined}
          {...register('manager.last_name')}
          maskFn={textMask}
        />
      </Form.Item>
      <Form.Item
        label="CPF"
        inputName="manager.cpf"
        error={getFieldState('manager.cpf').error?.message}
        state={getFieldState('manager.cpf').error ? 'error' : undefined}
      >
        <Icon
          icon={IdCard}
          state={getFieldState('manager.cpf').error ? 'error' : undefined}
        />
        <Input
          type="text"
          placeholder="999.999.999-99"
          state={getFieldState('manager.cpf').error ? 'error' : undefined}
          {...register('manager.cpf')}
          maskFn={cpfMask}
          maxLength={14}
        />
      </Form.Item>
    </Form.Group>
  )
}
