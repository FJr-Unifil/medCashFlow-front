import type { ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const formItem = tv({
  base: 'relative rounded-lg bg-gray-200 hover:scale-110 focus-within:ring-2 transition',
  variants: {
    state: {
      default: 'focus-within:ring-gray-400',
      error: 'focus-within:ring-red-400 bg-red-200',
    },
  },
  defaultVariants: {
    state: 'default',
  },
})

interface FormItemProps extends VariantProps<typeof formItem> {
  label: string
  inputName: string
  children?: ReactNode
  error?: string
}

export function FormItem({
  label,
  inputName,
  children,
  state,
  error,
}: FormItemProps) {
  return (
    <div className="flex flex-col gap-2 min-w-80">
      <label htmlFor={inputName} className="uppercase font-bold">
        {label}
      </label>
      <div className={formItem({ state })}>{children}</div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
}
