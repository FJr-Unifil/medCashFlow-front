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
    formState: { errors, touchedFields },
  } = useFormContext<RegisterForm>()

  return (
    <Form.Group title="Credenciais do Gestor:">
      <Form.Item
        label="Email"
        inputName="manager.email"
        error={
          touchedFields.manager?.email && errors.manager?.email
            ? errors.manager?.email?.message
            : undefined
        }
        state={
          touchedFields.manager?.email && errors.manager?.email
            ? 'error'
            : undefined
        }
      >
        <Icon
          icon={Mail}
          state={
            touchedFields.manager?.email && errors.manager?.email
              ? 'error'
              : undefined
          }
        />
        <Input
          type="email"
          placeholder="joao.silva@example.com"
          state={
            touchedFields.manager?.email && errors.manager?.email
              ? 'error'
              : undefined
          }
          {...register('manager.email')}
          maskFn={emailMask}
        />
      </Form.Item>

      <Form.Item
        label="Senha"
        inputName="manager.password"
        error={
          touchedFields.manager?.password && errors.manager?.password
            ? errors.manager?.password?.message
            : undefined
        }
        state={
          touchedFields.manager?.password && errors.manager?.password
            ? 'error'
            : undefined
        }
      >
        <Icon
          icon={Lock}
          state={
            touchedFields.manager?.password && errors.manager?.password
              ? 'error'
              : undefined
          }
        />
        <Input
          type="password"
          placeholder="********"
          state={
            touchedFields.manager?.password && errors.manager?.password
              ? 'error'
              : undefined
          }
          {...register('manager.password')}
          maskFn={textMask}
          maxLength={100}
        />
      </Form.Item>
    </Form.Group>
  )
}
