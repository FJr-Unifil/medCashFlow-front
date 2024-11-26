import { RotateCcw, SquarePen, Trash } from 'lucide-react'
import { Badge } from '../components/badge'
import { Navbar } from '../components/navbar'
import { Table } from '../components/table'
import { useEmployeeQueries } from '../hooks/useEmployeeQueries'
import { cpfMask } from '../utils/cpfMask'
import { useState } from 'react'
import { ConfirmationModal } from '../components/modals/confirmation-modal'
import {
  type EmployeeForm,
  EmployeeFormModal,
} from '../components/modals/employee-form-modal'

export interface EmployeeResponse {
  id: number
  firstName: string
  lastName: string
  cpf: string
  email: string
  role: string
  isActive: boolean
}

const columnDictionary: { [key: string]: string } = {
  firstName: 'Nome',
  lastName: 'Sobrenome',
  cpf: 'CPF',
  email: 'E-mail',
  cargo: 'Cargo',
  isActive: 'Status',
}

const roleDictionary: { [key: string]: string } = {
  MANAGER: 'Gerente',
  FINANCIAL_ANALYST: 'Analista Financeiro',
  DOCTOR: 'Médico',
}

export function AllEmployees() {
  const {
    employees,
    createEmployee,
    updateEmployeeById,
    deleteEmployeeById,
    activateEmployeeById,
  } = useEmployeeQueries()

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeResponse | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  )
  const [isEmployeeActive, setIsEmployeeActive] = useState<boolean | null>(null)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)

  const handleCreateOrUpdateEmployee = async (data: EmployeeForm) => {
    if (selectedEmployee) {
      await updateEmployeeById({
        id: selectedEmployee.id,
        data
      })
    } else {
      await createEmployee(data)
    }
  }
  

  function handleEditClick(employee: EmployeeResponse) {
    setSelectedEmployee(employee)
    setIsFormModalOpen(true)
  }

  function toggleModal(id: number, status: boolean) {
    setSelectedEmployeeId(id)
    setIsEmployeeActive(status)
    setIsModalOpen(!isModalOpen)
  }

  const renderEmployeeRow = (data: EmployeeResponse) => (
    <tr key={data.cpf} className="border-b border-gray-100">
      <td className="py-4">
        <p className="text-base text-center">{data.firstName}</p>
      </td>
      <td className="py-4">
        <p className="text-base text-center">{data.lastName}</p>
      </td>
      <td className="py-4">
        <p className="text-base text-center">{cpfMask(data.cpf)}</p>
      </td>
      <td className="py-4">
        <p className="text-base text-center">{data.email}</p>
      </td>
      <td className="py-4">
        <p className="text-base text-center">
          {roleDictionary[data.role] || data.role}
        </p>
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
          title="Funcionários"
          action
          onAction={() => {
            setSelectedEmployee(null)
            setIsFormModalOpen(true)
          }}
        >
          <Table.Head columns={columnDictionary} />
          <Table.Body dataList={employees} renderRow={renderEmployeeRow} />
        </Table.Root>
        {isFormModalOpen && (
          <EmployeeFormModal
            title={selectedEmployee ? "Editar Funcionário" : "Criar Funcionário"}
            toggleModal={() => {
              setIsFormModalOpen(false)
              setSelectedEmployee(null)
            }}
            onConfirm={handleCreateOrUpdateEmployee}
            initialData={selectedEmployee}
          />
        )}
        {isModalOpen &&
          selectedEmployeeId !== null &&
          isEmployeeActive !== null && (
            <ConfirmationModal
              title={
                isEmployeeActive
                  ? 'Deseja mesmo desativar o funcionário?'
                  : 'Deseja mesmo reativar o funcionário?'
              }
              description={
                isEmployeeActive
                  ? 'O funcionário não será excluído , porém não terá mais acesso ao sistema até ser ativado novamente'
                  : 'O funcionário será restaurado e poderá fazer login e utilizar o sistema normalmente'
              }
              toggleModal={() => setIsModalOpen(false)}
              onConfirm={() => {
                if (isEmployeeActive) {
                  deleteEmployeeById(selectedEmployeeId)
                } else {
                  activateEmployeeById(selectedEmployeeId)
                }
                setIsModalOpen(false)
              }}
            />
          )}
      </div>
    </div>
  )
}
