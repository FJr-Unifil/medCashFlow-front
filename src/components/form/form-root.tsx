import type { HtmlHTMLAttributes, ReactNode } from 'react'
import blobTop from '../../assets/Vector-2.svg'
import blobBottom from '../../assets/Vector.svg'

interface FormRootProps extends HtmlHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export function FormRoot({ children, onSubmit }: FormRootProps) {
  return (
    <div className="min-h-screen grid place-content-center bg-gray-200 py-10">
      <img
        src={blobTop}
        alt="Just a decorative blob at the top right"
        className="fixed top-0 right-0"
      />
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-8 px-20 py-10 bg-gray-100 rounded-xl z-10"
        noValidate
      >
        {children}
      </form>
      <img
        src={blobBottom}
        alt="Just a decorative blob at the bottom left"
        className="fixed bottom-0 left-0"
      />
    </div>
  )
}
