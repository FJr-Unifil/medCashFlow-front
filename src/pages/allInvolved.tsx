import { RotateCcw, SquarePen, Trash } from 'lucide-react'
import { Badge } from '../components/badge'
import { Navbar } from '../components/navbar'
import { Table } from '../components/table'
import { useInvolvedQueries } from '../hooks/useInvolvedQueries'
import { documentMask } from '../utils/documentMask'
import { phoneMask } from '../utils/phoneMask'
import { useState } from 'react'
import { ConfirmationModal } from '../components/modals/confirmation-modal'
import {
  type InvolvedForm,
  InvolvedFormModal,
} from '../components/modals/involved-form-modal'

export interface InvolvedResponse {
  id: number
  name: string
  document: string
  phone: string
  email: string
  isActive: boolean
}

const columnDictionary: { [key: string]: string } = {
  name: 'Nome',
  document: 'Documento',
  phone: 'Telefone',
  email: 'E-mail',
  isActive: 'Status',
}

export function AllInvolved() {
  const {
    involveds,
    createInvolved,
    updateInvolvedById,
    deleteInvolvedById,
    activateInvolvedById,
  } = useInvolvedQueries()

  const [selectedInvolved, setSelectedInvolved] = useState<InvolvedResponse | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInvolvedId, setSelectedInvolvedId] = useState<number | null>(null)
  const [isInvolvedActive, setIsInvolvedActive] = useState<boolean | null>(null)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)

  const handleCreateOrUpdateInvolved = async (data: InvolvedForm) => {
    if (selectedInvolved) {
      await updateInvolvedById({
        id: selectedInvolved.id,
        data
      })
    } else {
      await createInvolved(data)
    }
  }

  function handleEditClick(involved: InvolvedResponse) {
    setSelectedInvolved(involved)
    setIsFormModalOpen(true)
  }

  function toggleModal(id: number, status: boolean) {
    setSelectedInvolvedId(id)
    setIsInvolvedActive(status)
    setIsModalOpen(!isModalOpen)
  }

  const renderInvolvedRow = (data: InvolvedResponse) => (
    <tr key={data.document} className="border-b border-gray-100">
      <td className="py-4">
        <p className="text-base text-center">{data.name}</p>
      </td>
      <td className="py-4">
        <p className="text-base text-center">{documentMask(data.document)}</p>
      </td>
      <td className="py-4">
        <p className="text-base text-center">{phoneMask(data.phone)}</p>
      </td>
      <td className="py-4">
        <p className="text-base text-center">{data.email}</p>
      </td>
      <td className="py-4">
        <Badge state={data.isActive} />
      </td>
      <td className="py-4">
        <div className="flex gap-4 justify-center">
          <button 
            type="button" 
            className="text-blue-600"
            onClick={() => handleEditClick(data)}
          >
            <SquarePen size={20} />
          </button>
          <button
            type="button"
            className={data.isActive ? 'text-red-700' : 'text-blue-600'}
            onClick={() => toggleModal(data.id, data.isActive)}
          >
            {data.isActive ? <Trash /> : <RotateCcw />}
          </button>
        </div>
      </td>
    </tr>
  )

  return (
    <div className="w-full bg-gray-200">
      <div className="min-h-screen flex flex-col gap-10 max-w-7xl mx-auto py-5">
        <Navbar />
        <Table.Root
          title="Envolvidos"
          action
          onAction={() => {
            setSelectedInvolved(null)
            setIsFormModalOpen(true)
          }}
        >
          <Table.Head columns={columnDictionary} />
          <Table.Body dataList={involveds} renderRow={renderInvolvedRow} />
        </Table.Root>
        {isFormModalOpen && (
          <InvolvedFormModal
            title={selectedInvolved ? "Editar Envolvido" : "Criar Envolvido"}
            toggleModal={() => {
              setIsFormModalOpen(false)
              setSelectedInvolved(null)
            }}
            onConfirm={handleCreateOrUpdateInvolved}
            initialData={selectedInvolved}
          />
        )}
        {isModalOpen &&
          selectedInvolvedId !== null &&
          isInvolvedActive !== null && (
            <ConfirmationModal
              title={
                isInvolvedActive
                  ? 'Deseja mesmo desativar o envolvido?'
                  : 'Deseja mesmo reativar o envolvido?'
              }
              description={
                isInvolvedActive
                  ? 'O envolvido não será excluído, porém ficará inativo no sistema até ser ativado novamente'
                  : 'O envolvido será restaurado e voltará a ficar ativo no sistema'
              }
              toggleModal={() => setIsModalOpen(false)}
              onConfirm={() => {
                if (isInvolvedActive) {
                  deleteInvolvedById(selectedInvolvedId)
                } else {
                  activateInvolvedById(selectedInvolvedId)
                }
                setIsModalOpen(false)
              }}
            />
          )}
      </div>
    </div>
  )
}
