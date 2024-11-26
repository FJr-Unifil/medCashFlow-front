import type { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const icon = tv({
  variants: {
    size: {
      l: 'w-6',
      default: 'w-4',
      sm: 'w-2',
    },
    state: {
      default: 'text-gray-500',
      light: 'text-gray-100',
      success: 'text-emerald-500',
      error: 'text-red-500',
    },
  },
  defaultVariants: {
    size: 'default',
    state: 'default',
  },
})

interface IconProps extends VariantProps<typeof icon> {
  icon: ElementType
  className?: string
}

export function Icon({ icon: Icon, size, state, className, ...props }: IconProps) {
  return <Icon className={twMerge(icon({ size, state }), className)} {...props} />
}
