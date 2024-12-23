import type { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const button = tv({
  base: 'flex justify-center items-center gap-2 uppercase font-bold px-4 py-2 rounded-lg transition',
  variants: {
    styling: {
      filled: 'bg-green-600 text-gray-100 hover:bg-green-700',
      outline:
        'bg-transparent text-gray-900 border border-gray-900 hover:bg-gray-100',
      link: 'bg-transparent text-gray-900 hover:underline',
    },
  },
  defaultVariants: {
    styling: 'filled',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button> & {
    children: ReactNode
    className?: string
  }

export function Button({
  type,
  children,
  styling,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(button({ styling }), className)}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
