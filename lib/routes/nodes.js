const getComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('components/Dashboard').default)
  })
}

const getIndexRoute = (location, callback) => {
  require.ensure([], require => {
    const components = {
      header: require('components/Navigation').default,
      content: require('containers/Nodes').default,
      footer: require('components/Footer').default,
      constellation: require('components/Background').default
    }

    callback(null, { components })
  })
}

export default () => (
  { path: '/nodes', name: 'Active Nodes', getComponent, getIndexRoute }
)
