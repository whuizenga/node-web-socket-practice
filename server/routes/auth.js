const jwt = require('express-jwt')

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req

  if (authorization?.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1]
  }

  return null
}

const secret = process.env.JWT_SECRET || 'secret'
const algorithms = ['HS256']

const auth = {
  required: jwt({
    secret,
    algorithms,
    userProperty: 'currentApiUser',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret,
    algorithms,
    userProperty: 'currentApiUser',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  })
}

module.exports = auth
