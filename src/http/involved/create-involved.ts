import type { InvolvedForm } from "../components/modals/involved-form-modal"

export async function createInvolved(data: InvolvedForm) {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:8080/involveds/create', {
      method: 'POST',
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