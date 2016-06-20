const getComponents = (location, callback) => {
  require.ensure([], require => {
    const components = {
      header: require('components/Navigation').default,
      content: require('containers/EditComponent').default,
      footer: require('components/Footer').default,
      constellation: require('components/Background').default
    }

    callback(null, components)
  })
}

export default () => (
  {
    path: 'apps/:appId/components/:id/edit',
    name: 'Edit Component',
    getComponents
  }
)
