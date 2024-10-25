import { forwardRef, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const input = tv({
  base: 'px-8 py-2 transition rounded-lg w-full focus-visible:outline-none bg-transparent',
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

type InputProps = ComponentProps<'input'> & VariantProps<typeof input>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, state, ...props }, ref) => {
    return (
      <input
        type={type}
        name={name}
        className={input({ state })}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
