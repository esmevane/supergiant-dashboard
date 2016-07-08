const getComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('components/Dashboard').default)
  })
}

const getIndexRoute = (location, callback) => {
  require.ensure([], require => {
    const components = {
      header: require('components/Navigation').default,
      content: require('containers/Images').default,
      footer: require('components/Footer').default,
      constellation: require('components/Background').default
    }

    callback(null, { components })
  })
}

const getChildRoutes = (location, callback) => {
  require.ensure([], require => {
    const context = require.context('./images', false, /\.js$/)
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
    path: '/images',
    name: 'Manage Images',
    getComponent,
    getIndexRoute,
    getChildRoutes
  }
)
