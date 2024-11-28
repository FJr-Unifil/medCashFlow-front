export async function getAllEmployees() {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:8080/employees/list', {
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