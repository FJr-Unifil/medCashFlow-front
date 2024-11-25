import type { HtmlHTMLAttributes, ReactNode } from 'react'

interface TableRootProps extends HtmlHTMLAttributes<HTMLTableElement> {
  title: string
  children: ReactNode
}

export function TableRoot({ title, children }: TableRootProps) {
  return (
    <div className="pt-[120px] mx-auto text-center bg-gray-200 min-h-screen">
      <h1 className="font-bold text-[32px] mb-8">{title}</h1>
      <table className="border-t border-gray-100 w-[90%] mx-auto">{children}</table>
    </div>
  )
}
