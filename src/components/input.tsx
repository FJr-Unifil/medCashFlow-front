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

type InputProps = ComponentProps<'input'> &
  VariantProps<typeof input> & {
    maskFn: (v: string) => string
  }

const handleMaskedChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  maskFn: (v: string) => string
) => {
  e.target.value = maskFn(e.target.value)
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, state, maskFn, ...props }, ref) => {
    return (
      <input
        type={type}
        className={input({ state })}
        ref={ref}
        {...props}
        onChange={e => handleMaskedChange(e, maskFn)}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
