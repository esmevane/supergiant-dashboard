const getComponents = (location, callback) => {
  require.ensure([], require => {
    const components = {
      header: require('components/Navigation').default,
      content: require('containers/EditEntrypoint').default,
      footer: require('components/Footer').default,
      constellation: require('components/Background').default
    }

    callback(null, components)
  })
}

export default () => (
  { path: 'entrypoints/:id/edit', name: 'Edit Entrypoint', getComponents }
)
