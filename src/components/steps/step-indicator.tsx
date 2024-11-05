import type { ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const stepIndicator = tv({
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

type StepProps = VariantProps<typeof stepIndicator> & {
  children: string | ReactNode
}

export function StepIndicator({ children, style }: StepProps) {
  return <div className={stepIndicator({ style })}>{children}</div>
}
