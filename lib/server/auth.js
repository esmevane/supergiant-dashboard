import basicAuth from 'basic-auth'

const unauthorized = (response) => {
  response.set('WWW-Authenticate', 'Basic realm=Authorization Required')
  response.status(401).send({ message: "Not authorized "})
}

export default function authorize(request, response, next) {
  let user = basicAuth(request)
  let username = request.app.get('username')
  let password = request.app.get('password')

  if (!user || !user.name || !user.pass) { return unauthorized(response) }

  if (user.name === username && user.pass === password) {
    return next()
  } else {
    return unauthorized(response)
  }
}
