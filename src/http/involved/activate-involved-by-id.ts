export async function activateInvolvedById(id: number) {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:8080/involveds/activate/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error('Request failed', error)
    throw error
  }
}
