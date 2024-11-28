import type { AccountPlanningForm } from "../../components/modals/account-planning-form-modal";

export async function updateAccountPlanningById({ id, data }: { id: number; data: AccountPlanningForm }) {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:8080/account-plannings/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Request failed', error)
    throw error
  }
}