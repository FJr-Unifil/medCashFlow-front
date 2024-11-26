import { tv, type VariantProps } from 'tailwind-variants'

const badge = tv({
  base: 'py-2 px-3 font-semibold text-xs lowercase rounded-full block w-fit mx-auto',
  variants: {
    state: {
      true: 'bg-green-900 text-green-400',
      false: 'bg-red-950 text-red-400',
    },
  },
  defaultVariants: {
    state: false,
  },
})

interface BadgeProps extends VariantProps<typeof badge> {}

export function Badge({ state }: BadgeProps) {
  return (
      <span className={badge({ state })}>{state ? 'Ativo' : 'Inativo'}</span>
  )
}
