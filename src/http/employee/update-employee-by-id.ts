import type { EmployeeForm } from "../components/modals/employee-form-modal"

interface UpdateEmployeeParams {
  id: number
  data: EmployeeForm
}

export async function updateEmployeeById({ id, data }: UpdateEmployeeParams) {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:8080/employees/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status} ${response.statusText}`)
    }

    return response
  } catch (error) {
    console.error('Request failed', error)
    throw error
  }
}
