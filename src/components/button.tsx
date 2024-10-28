import type { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex justify-center gap-2 uppercase font-bold px-4 py-2 rounded-lg transition',
  variants: {
    style: {
      filled: 'bg-green-600 text-gray-100 hover:bg-green-700',
      outline:
        'bg-transparent text-gray-900 border border-gray-900 hover:bg-gray-100',
      link: 'bg-transparent text-gray-900 hover:bg-gray-100',
    },
  },
  defaultVariants: {
    style: 'filled',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button> & {
    children: ReactNode
  }

export function Button({ type, children, style, ...props }: ButtonProps) {
  return (
    <button className={button({ style })} type={type} {...props}>
      {children}
    </button>
  )
}
