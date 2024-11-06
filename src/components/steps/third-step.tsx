import { Mail, Lock } from 'lucide-react'
import { Form } from '../form'
import { Icon } from '../icon'
import Input from '../input'
import { useFormContext } from 'react-hook-form'
import type { RegisterForm } from '../../pages/register'
import { emailMask } from '../../utils/emailMask'
import { textMask } from '../../utils/textMask'

export const ThirdStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterForm>()

  return (
    <Form.Group title="Credenciais do Gestor:">
      <Form.Item
        label="Email"
        inputName="manager.email"
        error={errors.manager?.email?.message}
        state={errors.manager?.email ? 'error' : undefined}
      >
        <Icon icon={Mail} state={errors.manager?.email ? 'error' : undefined} />
        <Input
          type="email"
          placeholder="joao.silva@example.com"
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
