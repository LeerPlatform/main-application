import Request from '../helpers/http'

async function getAll({ params }) {
  const defaultParams = {
    method: 'GET',
  }

  return await Request.get('courses')
}

export const courseService = {
  getAll,
}
