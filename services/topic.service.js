import Http from '../helpers/http'

async function getAll({ params }) {
  const { data } = await Http.get('topics', params)

  return data
}

export const topicService = {
  getAll,
}
