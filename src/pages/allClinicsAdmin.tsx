import { useState } from 'react'
import { Table } from '../components/table'
import { useClinicQueries } from '../hooks/useClinicQueries'
import { ConfirmationModal } from '../components/confirmation-modal'
import { cnpjMask } from '../utils/cnpjMask'
import { phoneMask } from '../utils/phoneMask'
import { dateMask } from '../utils/dateMask'
import { Badge } from '../components/badge'
import { RotateCcw, Trash } from 'lucide-react'

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

  const renderClinicRow = (data: ClinicResponse) => (
    <tr key={data.id} className="border-b border-gray-100">
      <td className="py-4">
        <div>
          <p className="text-base mb-1">{data.name}</p>
          <span className="text-[14px] italic">{data.id}</span>
        </div>
      </td>
      <td className="py-4">
        <p className="text-base">{cnpjMask(data.cnpj)}</p>
      </td>
      <td className="py-4">
        <p className="text-base">{phoneMask(data.phone)}</p>
      </td>
      <td className="py-4">
        <p className="text-base">{dateMask(data.createdAt)}</p>
      </td>
      <td className="py-4">
        <Badge state={data.isActive} />
      </td>
      <td>
        <button
          type="button"
          className={data.isActive ? 'text-red-700' : 'text-blue-600'}
          onClick={() => toggleModal(data.id, data.isActive)}
        >
          {data.isActive ? <Trash /> : <RotateCcw />}
        </button>
      </td>
    </tr>
  )

  return (
    <div className="pt-[120px] pb-10 mx-auto text-center bg-gray-200 min-h-screen relative">
      <Table.Root title="Clínicas">
        <Table.Head columns={columnDictionary} />
        <Table.Body dataList={clinics} renderRow={renderClinicRow} />
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
