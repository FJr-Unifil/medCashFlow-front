import type { HtmlHTMLAttributes, ReactNode } from 'react'
import { Button } from '../button'
import { Icon } from '../icon'
import { Plus } from 'lucide-react'

interface TableRootProps extends HtmlHTMLAttributes<HTMLTableElement> {
  title: string
  children: ReactNode
  action?: boolean
  onAction?: () => void
}

export function TableRoot({ title, children, action, onAction }: TableRootProps) {
  return (
    <>
      <h1 className={`font-bold text-[32px] text-center ${!action && 'mb-8'}`}>{title}</h1>
      {action && (
        <div className="w-[90%] mx-auto flex justify-end">
          <Button type="button" className='bg-green-700 w-fit' onClick={onAction}>
            Criar <Icon icon={Plus} className="text-gray-200" />
          </Button>
        </div>
      )}
      <table className="border-t border-gray-100 w-[90%] mx-auto">
        {children}
      </table>
    </>
  )
}
