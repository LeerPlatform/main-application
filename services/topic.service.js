import Http from '../helpers/http'

async function getAll({ params }) {
  return await Http.get('topics', params)

  const { data } = await Http.get('topics', params)

  return data
}

export const topicService = {
  getAll,
}
