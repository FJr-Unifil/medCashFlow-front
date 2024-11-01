import { tv, type VariantProps } from 'tailwind-variants'

const progressIndicator = tv({
  base: 'w-[50px] h-[10px] rounded-full',
  variants: {
    style: {
      default: 'bg-green-600',
      current: 'bg-gradient-to-r from-green-600 from-0% to-green-200 to-60%',
      future: 'bg-green-200',
    },
  },
  defaultVariants: {
    style: 'default',
  },
})

type ProgressIndicatorProps = VariantProps<typeof progressIndicator>

export function ProgressIndicator({ style }: ProgressIndicatorProps) {
  return <div className={progressIndicator({ style })} />
}
