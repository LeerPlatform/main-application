import Http from '../helpers/http'

async function getAll({ params }) {
  return await Http.get('courses', params)
  const { data } = await Http.get('courses', params)

  return data
}

export const courseService = {
  getAll,
}
