import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const allApps = state => state.getIn(['apps', 'contents'])
export const getApps = state => allApps(state).toList()

export const getActiveCloud = state => state.get('clouds').toList().first()
export const getComponents = state => state.get('components')
export const getNodes = state => state.get('nodes').toList()
export const isFaded = state => state.getIn(['layouts', 'faded'])
export const getNotifications = state => state.get('notifications').toList()
export const getEntrypoints = state => state.get('entrypoints').toList()
export const getRegistries = state => state.get('registries').toList()

export const allContainers = state => state.get('containers')
export const allVolumes = state => state.get('volumes')
export const allInstances = state => state.get('instances')

export const getContainers = state => allContainers(state).toList()
export const getVolumes = state => allVolumes(state).toList()

export const selectInstanceCount = (appName, componentName) =>
  (state, props) =>
    state.getIn([`instancesMeta`, `counter`, appName, componentName]) || 1

export const getInstanceCount = (app, component) =>
  (state, props) =>
    selectInstanceCount(app.get('name'), component.get('name'))(state, props)

export const getAppInstances = (app) =>
  (state, props) =>
    allInstances(state, props)
      .filter((instance, key) => key.includes(app.get('name')))
      .toList()

export const getComponentInstances = (app, component) =>
  (state, props) =>
    allInstances(state, props)
      .filter((instance, key) => (
        key.includes(app.get('name')) && key.includes(component.get('name'))
      ))
      .toList()

export const allReleases = state => state.get('releases')
export const getReleases = state =>
  allReleases(state)
    .filter((release, id) => !(
      id.includes(`current`) || id.includes(`target`)
    ))
    .toList()

export const getApp = (state, props) =>
  state.getIn(
    [
      'apps',
      'contents',
      (props.appName || props.params && props.params.appName)
    ]
  )

export const getComponent = (state, props) => {
  if (props.params) {
    let { appName, componentName } = props.params
    let key = [appName, componentName].join('-')

    return state.get('components').get(key)
  }
}

export function createAssetsSelector(appName, componentName) {
  const isApp = resource => resource.get('appName') === appName
  const isComponent = resource =>
    resource.get('componentName') === componentName

  return createSelector(
    allContainers,
    allVolumes,
    (containers, volumes) => {
      const matchedContainers = containers.filter(isApp).filter(isComponent)
      const matchedVolumes = volumes.filter(isApp).filter(isComponent)
      return { containers: matchedContainers, volumes: matchedVolumes }
    }
  )
}

export function createContainerSelector(component) {
  return createSelector(
    getContainers,
    containers => {
      if (!component) { return fromJS([]) }

      return containers.filter(container => {
        return container.get('componentName') === component.get('name')
      })
    }
  )
}

export function createVolumeSelector(component) {
  return createSelector(
    getVolumes,
    volumes => {
      if (!component) { return fromJS([]) }
      return volumes.filter(volume => {
        return volume.get('componentName') === component.get('name')
      })
    }
  )
}

export function createAppComponentsSelector(app) {
  return createSelector(
    getComponents,
    components => {
      return components.filter(component => {
        const id = component.get('id')
        const name = component.get('name')

        return id.replace(`-${name}`, '') === app.name
      }).toList()
    }
  )
}

export function createAppAndComponentSelector() {
  return createSelector(
    getApp,
    getComponent,
    (app, component) => ({ app, component })
  )
}

export const createCurrentSelector = (app, component) => {
  const appName = (app.get && app.get('name')) || app
  const componentName = (component.get && component.get('name')) || component

  return createSelector(
    allReleases,
    releases => releases.get(`${appName}-${componentName}-current`)
  )
}

export const createTargetSelector = (app, component) => {
  const appName = (app.get && app.get('name')) || app
  const componentName = (component.get && component.get('name')) || component

  return createSelector(
    allReleases,
    releases => releases.get(`${appName}-${componentName}-target`)
  )
}
