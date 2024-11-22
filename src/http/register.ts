interface RegisterRequest {
  clinic: {
    name: string
    cnpj: string
    phone: string
  }
  manager: {
    first_name: string
    last_name: string
    cpf: string
    email: string
    password: string
  }
}

export async function registerClinic(registerRequest: RegisterRequest) {
  try {
    console.log(registerRequest)
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerRequest),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status} ${response.statusText}`)
    }

    const data = response.text()
    return data
  } catch (error) {
    console.error('Register failed', error)
    throw error
  }
}
