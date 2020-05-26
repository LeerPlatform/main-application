import Request from '../helpers/request'

async function getAll({ params }) {
  const defaultParams = {
    method: 'GET',
  }

  return await Request.get('courses')
}

export const courseService = {
  getAll,
}
