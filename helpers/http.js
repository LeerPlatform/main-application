import fetch from 'isomorphic-fetch'

const _apiHost = 'http://api.leerplatform.test'
const _apiVersion = 'v1'

async function request(url, {params = {}, method = 'GET', init = {}}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    ...init,
  }

  if (params) {
    if (method === 'GET') {
      url += '?' + objectToQueryString(params)
    } else {
      options.body = JSON.stringify(params)
    }
  }

  const response = await fetch(`${_apiHost}/${_apiVersion}/${url}`, options)

  if (response.status !== 200) {
    return generateErrorResponse('The server responded with an unexpected status.')
  }

  return await response.json()
}

function objectToQueryString(obj) {
  return Object.keys(obj).map(key => key + '=' + obj[key]).join('&')
}

function generateErrorResponse(message) {
  return {
    status: 'error',
    message
  }
}

function get(url, params, init = {}) {
  return request(url, { params, init })
}

function create(url, params, init = {}) {
  return request(url, { params, method: 'POST', init })
}

function update(url, params, init = {}) {
  return request(url, { params, method: 'PUT', init })
}

function remove(url, params, init = {}) {
  return request(url, { params, method: 'DELETE', init })
}

export default {
  get,
  create,
  update,
  remove,
}
