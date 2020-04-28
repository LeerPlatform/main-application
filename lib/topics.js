import fetch from 'isomorphic-unfetch'

export async function getPopularTopics() {
  const res = await fetch('http://api.leer-platform.test/v1/popular-topics')
  const { data } = await res.json()

  return data
}
