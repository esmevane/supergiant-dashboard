const getComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('components/Dashboard').default)
  })
}

const getIndexRoute = (location, callback) => {
  require.ensure([], require => {
    const components = {
      header: require('components/Navigation').default,
      content: require('containers/Apps').default,
      footer: require('components/Footer').default,
      constellation: require('components/Background').default
    }

    callback(null, { components })
  })
}

const getChildRoutes = (location, callback) => {
  require.ensure([], require => {
    const context = require.context('./dashboard', false, /\.js$/)
    const routes = context.keys().map(route => context(route).default())

    callback(null, routes)
  })
}

export default () => (
  { path: '/', name: 'Dashboard', getComponent, getIndexRoute, getChildRoutes }
)
