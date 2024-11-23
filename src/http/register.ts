export interface RegisterRequest {
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

export interface ErrorResponse {
  status: number
  title: string
  description: string
  timestamp: string
}

export async function registerClinic(registerRequest: RegisterRequest) {
  try {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerRequest),
    })

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json()
      throw {
        status: errorData.status,
        title: errorData.title,
        description: errorData.description,
        timestamp: errorData.timestamp
      } as ErrorResponse
    }

    const data = response.text()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw {
        status: 500,
        title: 'Network Error',
        description: 'root',
        timestamp: new Date().toISOString()
      } as ErrorResponse
    }
    throw error
  }
}
