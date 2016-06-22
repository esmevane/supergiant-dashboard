const getComponents = (location, callback) => {
  require.ensure([], require => {
    const components = {
      content: require('containers/ComponentDetail').default,
      header: require('components/Navigation').default,
      footer: require('components/Footer').default,
      constellation: require('components/Background').default
    }

    callback(null, components)
  })
}

export default () => (
  {
    path: ':id',
    name: 'Component Detail',
    getComponents
  }
)
