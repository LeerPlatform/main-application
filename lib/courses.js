import fetch from 'isomorphic-unfetch'

export async function getPopularCourses() {
  const res = await fetch('http://api.leer-platform.test/v1/courses?page[size]=6&include=tags&sort=-popular')
  const { data } = await res.json()

  return data
}
