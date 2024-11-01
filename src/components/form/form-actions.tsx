import type { ReactNode } from 'react'

type FormActionProps = {
  children: ReactNode
}

export function FormActions({ children }: FormActionProps) {
  return <div className="flex flex-col gap-4">{children}</div>
}
