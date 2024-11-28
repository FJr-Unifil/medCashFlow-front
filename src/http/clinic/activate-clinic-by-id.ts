export const activateClinicById = async (id: string) => {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:8080/clinics/activate/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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