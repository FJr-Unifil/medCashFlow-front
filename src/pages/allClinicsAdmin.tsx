import { useEffect, useState } from 'react'
import { getAllClinics } from '../http/get-all-clinics'
import { Table } from '../components/table'

export interface ClinicResponse {
  id: string
  name: string
  cnpj: string
  phone: string
  createdAt: string
  isActive: boolean
}

export function AllClinicsAdmin() {
  const [clinics, setClinics] = useState<ClinicResponse[]>([])

  const columnDictionary: { [key: string]: string } = {
    name: "Razão Social",
    cnpj: "CNPJ",
    phone: "Telefone",
    createdAt: "Data do Cadastro",
    isActive: "Status"
  };

  useEffect(() => {
    const getClinics = async () => {
      try {
        const response = await getAllClinics()
        setClinics(response)
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }

    getClinics()
  }, [])

  return (
    <Table.Root title='Clínicas'>
      <Table.Head columns={columnDictionary}/>
      <Table.Body clinics={clinics} />
    </Table.Root>
  )
}
