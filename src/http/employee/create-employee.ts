import type { EmployeeForm } from "../../components/modals/employee-form-modal";

export async function createEmployee(employeeRequest: EmployeeForm) {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:8080/employees/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(employeeRequest),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status} ${response.statusText}`)
    }

    const data = response.json()
    return data
  } catch (error) {
    console.error('Request failed', error)
    throw error
  }
}