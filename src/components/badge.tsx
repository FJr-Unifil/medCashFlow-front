import { twMerge } from 'tailwind-merge'
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

interface BadgeProps extends VariantProps<typeof badge> {
  color?: string
  label?: string
}

const colorClassMap = {
  red: 'bg-red-900 text-red-400',
  yellow: 'bg-yellow-900 text-yellow-400',
  green: 'bg-green-900 text-green-400',
  blue: 'bg-blue-900 text-blue-400',
  indigo: 'bg-indigo-900 text-indigo-400',
  purple: 'bg-purple-900 text-purple-400',
  pink: 'bg-pink-900 text-pink-400',
  gray: 'bg-gray-900 text-gray-400',
  slate: 'bg-slate-900 text-slate-400',
  zinc: 'bg-zinc-900 text-zinc-400',
  neutral: 'bg-neutral-900 text-neutral-400',
  stone: 'bg-stone-900 text-stone-400',
  orange: 'bg-orange-900 text-orange-400',
  amber: 'bg-amber-900 text-amber-400',
  lime: 'bg-lime-900 text-lime-400',
  emerald: 'bg-emerald-900 text-emerald-400',
  teal: 'bg-teal-900 text-teal-400',
  cyan: 'bg-cyan-900 text-cyan-400',
  sky: 'bg-sky-900 text-sky-400',
  rose: 'bg-rose-900 text-rose-400',
  violet: 'bg-violet-900 text-violet-400',
  fuchsia: 'bg-fuchsia-900 text-fuchsia-400',
}

export function Badge({ state, color, label }: BadgeProps) {
  const colorClass =
    colorClassMap[color as keyof typeof colorClassMap] ??
    'bg-gray-900 text-gray-400'

  return (
    <span className={twMerge(badge({ state }), colorClass)}>
      {state ? 'Ativo' : label ? label : 'inativo'}
    </span>
  )
}
