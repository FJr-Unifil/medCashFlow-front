import type { HtmlHTMLAttributes, ReactNode } from 'react'
import { Button } from '../button'
import { Icon } from '../icon'
import { Plus } from 'lucide-react'

interface TableRootProps extends HtmlHTMLAttributes<HTMLTableElement> {
  title: string
  children: ReactNode
  action?: boolean
}

export function TableRoot({ title, children, action }: TableRootProps) {
  return (
    <>
      <h1 className="font-bold text-[32px] mb-8">{title}</h1>
      {action && (
        <Button type="button">
          Criar <Icon icon={Plus} className="text-gray-900" />
        </Button>
      )}
      <table className="border-t border-gray-100 w-[90%] mx-auto">
        {children}
      </table>
    </>
  )
}
