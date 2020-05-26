import { authHeader } from '../helpers/auth-header'

async function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...authHeader(),
    },
  }

  const response = await fetch('http://api.leer-platform.test/v1/users', requestOptions)
  const { data } = await response.json()

  return data
}

export const userService = {
  getAll,
}
