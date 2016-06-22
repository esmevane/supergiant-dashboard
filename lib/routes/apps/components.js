const getChildRoutes = (location, callback) => {
  require.ensure([], require => {
    const context = require.context('./components', false, /\.js$/)
    const isNew = key => /new/.test(key)
    const routes = context
      .keys()
      .filter(isNew)
      .concat(context.keys().filter(key => !isNew(key)))
      .map(route => context(route).default())

    callback(null, routes)
  })
}

export default () => (
  {
    path: '/apps/:appId/components',
    name: '',
    getChildRoutes
  }
)
