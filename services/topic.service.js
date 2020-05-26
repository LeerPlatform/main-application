import Request from '../helpers/request'

async function getAll({ params }) {
  const defaultParams = {
    method: 'GET',
  }

  return await Request.get('topics')
}

export const topicService = {
  getAll,
}
