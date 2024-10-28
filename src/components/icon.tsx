import type { ElementType } from 'react'
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
}

export function Icon({ icon: Icon, size, state, ...props }: IconProps) {
  return <Icon className={icon({ size, state })} {...props} />
}
