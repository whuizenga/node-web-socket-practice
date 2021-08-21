import qs from 'qs'

const baseHeaders = {
  accept: '*/*',
  'Content-Type': 'application/json',
}

const API_BASE = process.env.REACT_APP_API_BASE

function log(...args) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args)
  }
}

function logError(...args) {
  if (process.env.NODE_ENV === 'development') {
    console.error(...args)
  }
}

class FetchError extends Error {
  constructor(type, response) {
    const message = `${type} failed with status ${response.status}: ${response.statusText}`
    super(message)
    this.message = message
    this.response = response
  }
}

function get(url = '', params = {}, config = {}) {
  const parameters = qs.stringify(params)
  return new Promise((resolve, reject) => {
    const paramString = parameters ? `?${parameters}` : ''
    fetch(`${API_BASE}${url}${paramString}`, {
      method: 'GET',
      ...config,
      headers: {
        ...baseHeaders,
        ...config?.headers,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new FetchError('GET', response)
        }
        return response.json()
      })
      .then((data) => {
        log(`GET ${url}${paramString}\nReceived Data:`, data)
        resolve(data)
      })
      .catch((error) => {
        logError(`GET ${url}${paramString}`, error)
        reject(error)
      })
  })
}

function post(url = '', params = {}, config = {}) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE}${url}`, {
      method: 'POST',
      body: JSON.stringify(params),
      ...config,
      headers: {
        ...baseHeaders,
        ...config?.headers,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new FetchError('POST', response)
        }
        return Promise.resolve(response.json())
      })
      .then((data) => {
        log(`POST ${url}\nReceived Data:`, data)
        resolve(data)
      })
      .catch((error) => {
        logError(`POST ${url}`, error)
        reject(error)
      })
  })
}

function update(method = 'PATCH', url = '', params = {}, config = {}) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE}${url}`, {
      method,
      body: JSON.stringify(params),
      ...config,
      headers: {
        ...baseHeaders,
        ...config?.headers,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new FetchError(method, response)
        }
        return response.json()
      })
      .then((data) => {
        log(`${method} ${url}\nReceived Data:`, data)
        resolve(data)
      })
      .catch((error) => {
        logError(`${method} ${url}`, error)
        reject(error)
      })
  })
}

function put(...args) {
  return update.apply(null, ['PUT', ...args])
}

function patch(...args) {
  return update.apply(null, ['PATCH', ...args])
}

function del(url = '', params = {}, config = {}) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE}${url}`, {
      method: 'DELETE',
      body: JSON.stringify(params),
      ...config,
      headers: {
        ...baseHeaders,
        ...config?.headers,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new FetchError('DELETE', response)
        }
        return response.json()
      })
      .then((data) => {
        log(`DELETE ${url}\nReceived Data:`, data)
        resolve(data)
      })
      .catch((error) => {
        logError(`DELETE ${url}`, error)
        reject(error)
      })
  })
}

export {
  get,
  post,
  put,
  patch,
  del,
}
