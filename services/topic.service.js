import Http from '../helpers/http'

async function getAll({ params }) {
  const defaultParams = {
    method: 'GET',
  }

  return await Http.get('topics')
}

export const topicService = {
  getAll,
}
