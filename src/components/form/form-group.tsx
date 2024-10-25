import type { ReactNode } from 'react'

interface FormGroupProps {
  title?: string
  children: ReactNode
}

export function FormGroup({ title, children }: FormGroupProps) {
  return (
    <fieldset className="flex flex-col gap-4">
      {title && (
        <>
          <legend className="form-subtitle text-2xl text-green-700 font-bold mb-2">
            {title}
          </legend>
          <div className="divider w-8 border-2 border-green-700 rounded-full" />
        </>
      )}
      {children}
    </fieldset>
  )
}
