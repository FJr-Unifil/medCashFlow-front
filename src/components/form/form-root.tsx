import type { HtmlHTMLAttributes, ReactNode } from 'react'

interface FormRootProps extends HtmlHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export function FormRoot({ children, onSubmit }: FormRootProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-8 px-10 py-5 bg-gray-100 rounded-xl z-[1]"
      noValidate
    >
      {children}
    </form>
  )
}
