import Http from '../helpers/http'

async function getAll({ params }) {
  const { data } = await Http.get('courses', params)

  return data
}

export const courseService = {
  getAll,
}
