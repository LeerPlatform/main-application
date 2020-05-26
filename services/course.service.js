import Http from '../helpers/http'

async function getAll({ params }) {
  const defaultParams = {
    method: 'GET',
  }

  return await Http.get('courses')
}

export const courseService = {
  getAll,
}
