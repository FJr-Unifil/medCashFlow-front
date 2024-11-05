import { useFormContext } from 'react-hook-form'
import { Form } from '../form'
import { Mail, Lock } from 'lucide-react'
import { Icon } from '../icon'
import Input from '../input'
import { emailMask } from '../../utils/emailMask'
import { textMask } from '../../utils/textMask'

export const ThirdStep = () => {
  const { register, getFieldState } = useFormContext()
  return (
    <Form.Group title="Detalhes do Acesso">
      <Form.Item
        label="Email"
        inputName="manager.email"
        error={getFieldState('manager.email').error?.message}
        state={getFieldState('manager.email').error ? 'error' : undefined}
      >
        <Icon
          icon={Mail}
          state={getFieldState('manager.email').error ? 'error' : undefined}
        />
        <Input
          type="text"
          placeholder="email@email.com"
          state={getFieldState('manager.email').error ? 'error' : undefined}
          {...register('manager.email')}
          maskFn={emailMask}
        />
      </Form.Item>
      <Form.Item
        label="Senha"
        inputName="manager.password"
        error={getFieldState('manager.passsword').error?.message}
        state={getFieldState('manager.password').error ? 'error' : undefined}
      >
        <Icon
          icon={Lock}
          state={getFieldState('manager.password').error ? 'error' : undefined}
        />
        <Input
          type="password"
          placeholder="********"
          state={getFieldState('manager.password').error ? 'error' : undefined}
          {...register('manager.password')}
          maskFn={textMask}
          maxLength={100}
        />
      </Form.Item>
    </Form.Group>
  )
}
