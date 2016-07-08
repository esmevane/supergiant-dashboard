const getComponents = (location, callback) => {
  require.ensure([], require => {
    const components = {
      header: require('components/Navigation').default,
      content: require('containers/NewImage').default,
      footer: require('components/Footer').default,
      constellation: require('components/Blackstar').default
    }

    callback(null, components)
  })
}

export default (location) => {
  return {
    path: 'new',
    name: 'Create a New Image',
    getComponents
  }
}
