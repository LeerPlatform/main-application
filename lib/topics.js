import fetch from 'isomorphic-unfetch'

export async function getPopularTopics() {
  const res = await fetch('http://api.leer-platform.test/v1/topics?page[size]=6&sort=-popular')
  const { data } = await res.json()

  return data
}
