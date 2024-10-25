import type { ElementType } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const icon = tv({
  base: 'absolute top-1/2 bottom-1/2 -translate-y-1/2',
  variants: {
    size: {
      l: 'w-6',
      default: 'w-4',
      sm: 'w-2',
    },
    state: {
      default: 'text-gray-500',
      success: 'text-emerald-500',
      error: 'text-red-500',
    },
    position: {
      left: 'left-2',
      right: 'right-2',
    },
  },
  defaultVariants: {
    size: 'default',
    state: 'default',
    position: 'left',
  },
})

interface IconProps extends VariantProps<typeof icon> {
  icon: ElementType
}

export function Icon({
  icon: Icon,
  size,
  state,
  position,
  ...props
}: IconProps) {
  return <Icon className={icon({ size, state, position })} {...props} />
}
