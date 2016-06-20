const getComponents = (location, callback) => {
  require.ensure([], require => {
    const components = {
      header: require('components/Navigation').default,
      content: require('containers/NewRepo').default,
      footer: require('components/Footer').default,
      constellation: require('components/Background').default
    }

    callback(null, components)
  })
}

export default () => (
  {
    path: 'repos/new',
    name: 'Set up Docker Hub credentials',
    getComponents
  }
)
