import { Table } from '../components/table'
import { useClinicQueries } from '../hooks/useClinicQueries'

export interface ClinicResponse {
  id: string
  name: string
  cnpj: string
  phone: string
  createdAt: string
  isActive: boolean
}

export function AllClinicsAdmin() {
  const { clinics } = useClinicQueries()

  const columnDictionary: { [key: string]: string } = {
    name: 'Razão Social',
    cnpj: 'CNPJ',
    phone: 'Telefone',
    createdAt: 'Data do Cadastro',
    isActive: 'Status',
  }

  return (
    <Table.Root title="Clínicas">
      <Table.Head columns={columnDictionary} />
      <Table.Body clinics={clinics} />
    </Table.Root>
  )
}
