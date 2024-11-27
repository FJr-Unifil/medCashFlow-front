import { Hospital, Phone } from 'lucide-react'
import { Form } from '../form'
import { Icon } from '../icon'
import Input from '../input'
import { textMask } from '../../utils/textMask'
import { phoneMask } from '../../utils/phoneMask'
import { useFormContext } from 'react-hook-form'
import { cnpjMask } from '../../utils/cnpjMask'
import type { RegisterForm } from '../../pages/register'

export const FirstStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterForm>()

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
        <Icon icon={Phone} state={errors.clinic?.phone ? 'error' : undefined} />
        <Input
          type="text"
          placeholder="(43) 4002-8922"
          state={errors.clinic?.phone ? 'error' : undefined}
          {...register('clinic.phone')}
          maskFn={phoneMask}
          maxLength={16}
        />
      </Form.Item>
    </Form.Group>
  )
}
