const getComponents = (location, callback) => {
  require.ensure([], require => {
    const components = {
      header: require('components/Navigation').default,
      content: require('containers/NewEntrypoint').default,
      footer: require('components/Footer').default,
      constellation: require('components/Background').default
    }

    callback(null, components)
  })
}

export default () => (
  { path: 'entrypoints/new', name: 'Create a New Entrypoint', getComponents }
)
