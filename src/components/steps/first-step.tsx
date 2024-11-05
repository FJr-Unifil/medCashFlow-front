import { Hospital, Phone } from 'lucide-react'
import { Form } from '../form'
import { Icon } from '../icon'
import Input from '../input'
import { textMask } from '../../utils/textMask'
import { phoneMask } from '../../utils/phoneMask'
import { useFormContext } from 'react-hook-form'
import { cnpjMask } from '../../utils/cnpjMask'

export const FirstStep = () => {
  const {
    register,
    control: { getFieldState },
  } = useFormContext()

  return (
    <Form.Group title="Detalhes da Clínica:">
      <Form.Item
        label="Razão Social"
        inputName="clinic.name"
        error={getFieldState('clinic.name').error?.message}
        state={getFieldState('clinic.name').error ? 'error' : undefined}
      >
        <Icon
          icon={Hospital}
          state={getFieldState('clinic.name').error ? 'error' : undefined}
        />
        <Input
          type="text"
          placeholder="Clínica Pontello LTDA"
          state={getFieldState('clinic.name').error ? 'error' : undefined}
          {...register('clinic.name')}
          maskFn={textMask}
          maxLength={60}
        />
      </Form.Item>
      <Form.Item
        label="CNPJ"
        inputName="clinic.cnpj"
        error={getFieldState('clinic.cnpj').error?.message}
        state={getFieldState('clinic.cnpj').error ? 'error' : undefined}
      >
        <Icon
          icon={Hospital}
          state={getFieldState('clinic.cnpj').error ? 'error' : undefined}
        />
        <Input
          placeholder="99.999.999/9999-99"
          type="text"
          state={getFieldState('clinic.cnpj').error ? 'error' : undefined}
          {...register('clinic.cnpj')}
          maskFn={cnpjMask}
          maxLength={18}
        />
      </Form.Item>
      <Form.Item
        label="Telefone"
        inputName="clinic.phone"
        error={getFieldState('clinic.phone').error?.message}
        state={getFieldState('clinic.phone').error ? 'error' : undefined}
      >
        <Icon
          icon={Phone}
          state={getFieldState('clinic.phone').error ? 'error' : undefined}
        />
        <Input
          type="text"
          placeholder="(43) 4002-8922"
          state={getFieldState('clinic.phone').error ? 'error' : undefined}
          {...register('clinic.phone')}
          maskFn={phoneMask}
          maxLength={14}
        />
      </Form.Item>
    </Form.Group>
  )
}
