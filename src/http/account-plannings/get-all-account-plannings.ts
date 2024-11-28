export async function getAllAccountPlannings() {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:8080/account-plannings/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Request failed', error)
    throw error
  }
}