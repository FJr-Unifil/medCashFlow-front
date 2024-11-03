import type { ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const step = tv({
  base: 'flex justify-center items-center text-xl size-[50px] rounded-lg',
  variants: {
    style: {
      default: 'bg-green-600 text-gray-100 ',
      future: 'bg-green-200 text-grary-900',
    },
  },
  defaultVariants: {
    style: 'default',
  },
})

type StepProps = VariantProps<typeof step> & {
  children: string | ReactNode
}

export function Step({ children, style }: StepProps) {
  return <div className={step({ style })}>{children}</div>
}
