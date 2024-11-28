import { SquarePen, Trash } from 'lucide-react'
import { Navbar } from '../components/navbar'
import { Table } from '../components/table'
import { useAccountPlanningQueries } from '../hooks/useAccountPlanningQueries'
import { useState } from 'react'
import { ConfirmationModal } from '../components/modals/confirmation-modal'
import {
  type AccountPlanningForm,
  AccountPlanningFormModal,
} from '../components/modals/account-planning-form-modal'
import { Badge } from '../components/badge'

export interface AccountPlanningResponse {
  id: number
  name: string
  description: string
  emoji: string
  color: string
}

const columnDictionary: { [key: string]: string } = {
  name: 'Nome',
  description: 'Descrição',
  emoji: 'Emoji',
  color: 'Cor',
  preview: 'Preview',
}

const colorDictionary: { [key: string]: string } = {
  red: 'Vermelho',
  yellow: 'Amarelo',
  green: 'Verde',
  blue: 'Azul',
  indigo: 'Índigo',
  purple: 'Roxo',
  pink: 'Rosa',
  gray: 'Cinza',
  slate: 'Lousa',
  zinc: 'Zinco',
  neutral: 'Neutro',
  stone: 'Pedra',
  orange: 'Laranja',
  amber: 'Âmbar',
  lime: 'Lima',
  emerald: 'Esmeralda',
  teal: 'Verde-água',
  cyan: 'Ciano',
  sky: 'Céu',
  rose: 'Rosa',
  violet: 'Violeta',
  fuchsia: 'Fúcsia',
}

export function AllAccountPlannings() {
  const {
    accountPlannings,
    createAccountPlanning,
    updateAccountPlanningById,
    deleteAccountPlanningById,
  } = useAccountPlanningQueries()

  const [selectedAccountPlanning, setSelectedAccountPlanning] =
    useState<AccountPlanningResponse | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAccountPlanningId, setSelectedAccountPlanningId] = useState<
    number | null
  >(null)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)

  const handleCreateOrUpdateAccountPlanning = async (
    data: AccountPlanningForm
  ) => {
    if (selectedAccountPlanning) {
      await updateAccountPlanningById({
        id: selectedAccountPlanning.id,
        data,
      })
    } else {
      await createAccountPlanning(data)
    }
  }

  function handleEditClick(accountPlanning: AccountPlanningResponse) {
    setSelectedAccountPlanning(accountPlanning)
    setIsFormModalOpen(true)
  }

  function toggleModal(id: number) {
    setSelectedAccountPlanningId(id)
    setIsModalOpen(!isModalOpen)
  }

  const renderAccountPlanningRow = ({
    id,
    name,
    description,
    emoji,
    color,
  }: AccountPlanningResponse) => {
    return (
      <tr key={id} className="border-b border-gray-100">
        <td className="py-4">
          <p className="text-base text-center">{name}</p>
        </td>
        <td className="py-4">
          <p className="text-base text-center">{description}</p>
        </td>
        <td className="py-4">
          <p className="text-base text-center">{emoji}</p>
        </td>
        <td className="py-4">
          <p className="text-base text-center capitalize">
            {colorDictionary[color] || color}
          </p>
        </td>
        <td className="py-4">
          <Badge label={emoji ? `${emoji} ${name}` : name} color={color} />
        </td>
        <td className="py-4">
          <div className="flex gap-4 justify-center items-center">
            <button
              type="button"
              className="text-blue-600"
              onClick={() =>
                handleEditClick({ id, name, description, color, emoji })
              }
            >
              <SquarePen size={20} />
            </button>
            <button
              type="button"
              className="text-red-700"
              onClick={() => toggleModal(id)}
            >
              <Trash size={20} />
            </button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <div className="w-full bg-gray-200">
      <div className="min-h-screen flex flex-col gap-10 max-w-7xl mx-auto py-5">
        <Navbar />
        <Table.Root
          title="Planos de Contas"
          action
          onAction={() => {
            setSelectedAccountPlanning(null)
            setIsFormModalOpen(true)
          }}
        >
          <Table.Head columns={columnDictionary} />
          <Table.Body
            dataList={accountPlannings}
            renderRow={renderAccountPlanningRow}
          />
        </Table.Root>
        {isFormModalOpen && (
          <AccountPlanningFormModal
            title={
              selectedAccountPlanning
                ? 'Editar Plano de Contas'
                : 'Criar Plano de Contas'
            }
            toggleModal={() => {
              setIsFormModalOpen(false)
              setSelectedAccountPlanning(null)
            }}
            onConfirm={handleCreateOrUpdateAccountPlanning}
            initialData={selectedAccountPlanning}
          />
        )}
        {isModalOpen && selectedAccountPlanningId !== null && (
          <ConfirmationModal
            title="Deseja mesmo excluir o plano de contas?"
            description="O plano de contas será apagado. A ação não poderá ser desfeita, caso queira ter o plano de contas novamente terá que cria-lo novamente"
            toggleModal={() => setIsModalOpen(false)}
            onConfirm={() => {
              deleteAccountPlanningById(selectedAccountPlanningId)
              setIsModalOpen(false)
            }}
          />
        )}
      </div>
    </div>
  )
}
