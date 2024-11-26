import { Button } from './../button'

interface ConfirmationModalProps {
  title: string
  description: string
  toggleModal: () => void
  onConfirm: () => void
}

export function ConfirmationModal({
  title,
  description,
  toggleModal,
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <div className="p-10 bg-gray-100 shadow-xl rounded-xl fixed max-w-[620px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 className="uppercase text-[32px] font-bold mb-5">{title}</h2>
      <p className="text-xl font-medium mb-8">⚠️ {description}</p>
      <div className="flex gap-4 items-center justify-center">
        <Button styling="outline" type="button" onClick={toggleModal}>
          Cancelar
        </Button>
        <Button type="button" onClick={onConfirm}>
          Confirmar
        </Button>
      </div>
    </div>
  )
}
