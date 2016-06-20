const context = require.context('./routes', false, /\.js$/)
const notLast = key => /not-found/.test(key)
const isLast = key => !notLast(key)
const routes = context
  .keys()
  .filter(isLast)
  .concat(context.keys().filter(notLast))

export const makeRoutes = () => routes.map(route => context(route).default())
