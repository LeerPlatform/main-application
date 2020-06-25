import Http from '../helpers/http'

function getAll(params = {}, init = {}) {
  return Http.get('courses', params, init)
}

export const courseService = {
  getAll,
}
