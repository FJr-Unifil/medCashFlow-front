import { forwardRef, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const input = tv({
  base: 'py-2 transition rounded-lg w-full focus-visible:outline-none bg-transparent',
  variants: {
    state: {
      default: 'placeholder-gray-500',
      error: 'placeholder-red-500',
    },
  },
  defaultVariants: {
    state: 'default',
  },
})

type InputProps = ComponentProps<'input'> &
  VariantProps<typeof input> & {
    maskFn?: (v: string) => string
  }

const handleMaskedChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  maskFn?: (v: string) => string
) => {
  if (maskFn) {
    const maskedValue = maskFn(e.target.value)
    e.target.value = maskedValue
    const event = new Event('input', { bubbles: true })
    e.target.dispatchEvent(event)
  }
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, state, maskFn, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleMaskedChange(e, maskFn)
      if (onChange) {
        onChange(e)
      }
    }

    return (
      <input
        type={type}
        className={input({ state })}
        ref={ref}
        {...props}
        id={props.name}
        onChange={handleChange}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
