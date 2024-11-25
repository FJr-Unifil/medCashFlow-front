import { useState } from 'react'
import { Table } from '../components/table'
import { useClinicQueries } from '../hooks/useClinicQueries'
import { ConfirmationModal } from '../components/confirmation-modal'

export interface ClinicResponse {
  id: string
  name: string
  cnpj: string
  phone: string
  createdAt: string
  isActive: boolean
}

export function AllClinicsAdmin() {
  const { clinics, deleteClinicById, activateClinicById } = useClinicQueries()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null)
  const [isClinicActive, setIsClinicActive] = useState<boolean | null>(null)

  function toggleModal(id: string, isActive: boolean) {
    setSelectedClinicId(id)
    setIsClinicActive(isActive)
    setIsModalOpen(!isModalOpen)
  }

  const columnDictionary: { [key: string]: string } = {
    name: 'Razão Social',
    cnpj: 'CNPJ',
    phone: 'Telefone',
    createdAt: 'Data do Cadastro',
    isActive: 'Status',
  }

  return (
    <div className="pt-[120px] mx-auto text-center bg-gray-200 min-h-screen relative">
      <Table.Root title="Clínicas">
        <Table.Head columns={columnDictionary} />
        <Table.Body clinics={clinics} toggleModal={toggleModal} />
      </Table.Root>
      {isModalOpen && selectedClinicId !== null && isClinicActive !== null && (
        <ConfirmationModal
          title={
            isClinicActive
              ? 'Deseja mesmo desativar a clínica?'
              : 'Deseja mesmo reativar a clínica?'
          }
          description={
            isClinicActive
              ? 'A clínica não será excluída, porém todos os membros dela não terão mais acesso ao sistema até ela ser ativada novamente'
              : 'A clínica será restaurada e poderá ser feito login e utilizada normalmente'
          }
          toggleModal={() => setIsModalOpen(false)}
          onConfirm={() => {
            if (isClinicActive) {
              deleteClinicById(selectedClinicId)
            } else {
              activateClinicById(selectedClinicId)
            }
            setIsModalOpen(false)
          }}
        />
      )}
    </div>
  )
}
