const getComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('components/Dashboard').default)
  })
}

const getIndexRoute = (location, callback) => {
  require.ensure([], require => {
    const components = {
      header: require('components/Navigation').default,
      content: require('containers/NewApp').default,
      footer: require('components/Footer').default,
      constellation: require('components/Blackstar').default
    }

    callback(null, { components })
  })
}

export default () => (
  { path: '/apps/new', name: 'Create a New App', getComponent, getIndexRoute }
)
