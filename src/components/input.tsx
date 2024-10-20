import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import InputMask from 'react-input-mask'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  type: string
  id: string
  icon: ReactNode
  mask?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, id, icon, mask, error, ...props }, ref) => {
    return (
      <div className="input-wrapper flex flex-col gap-2 min-w-80">
        <label htmlFor={id} className="uppercase font-bold">
          {label}
        </label>
        <div
          className={`input relative rounded-lg bg-gray-200 hover:scale-110 focus-within:ring-2 ${
            error ? 'focus-within:ring-red-400' : 'focus-within:ring-gray-400'
          } transition`}
        >
          {icon}
          {mask ? (
            <InputMask
              id={id}
              name={id}
              className={`placeholder-gray-500 px-8 py-2 focus-visible:outline-none ${
                error ? 'bg-red-200 placeholder-red-600' : 'bg-transparent'
              } transition rounded-lg w-full`}
              maskChar={''}
              mask={mask}
              {...props}
            />
          ) : (
            <input
              type={type}
              id={id}
              name={id}
              className={`placeholder-gray-500 px-8 py-2 focus-visible:outline-none ${
                error ? 'bg-red-200 placeholder-red-600' : 'bg-transparent'
              } transition rounded-lg w-full`}
              ref={ref}
              {...props}
            />
          )}
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
