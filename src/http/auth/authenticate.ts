interface AuthenticateRequest {
  email: string
  password: string
}

export async function authenticate({ email, password }: AuthenticateRequest) {
  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
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
