import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const getActiveCloud = state => state.get('clouds').toList().first()
export const getApps = state => state.get('apps').toList()
export const getComponents = state => state.get('components')
export const getNodes = state => state.get('nodes').toList()
export const isFaded = state => state.getIn(['layouts', 'faded'])
export const getNotifications = state => state.get('notifications').toList()
export const getContainers = state => state.get('containers').toList()
export const getVolumes = state => state.get('volumes').toList()
export const getEntrypoints = state => state.get('entrypoints').toList()
export const getRegistries = state => state.get('registries').toList()

export const allInstances = state => state.get('instances')

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
  state.get('apps').get(
    props.appName ||
    props.params && props.params.appName
  )

export const getComponent = (state, props) => {
  if (props.params) {
    let { appName, componentName } = props.params
    let key = [appName, componentName].join('-')

    return state.get('components').get(key)
  }
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
      let names = app.get('components') || fromJS([])
      let referenced = names.map(name => components.get(name))

      return referenced.filter(component => !!component)
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
  return createSelector(
    allReleases,
    releases => releases.get(
      `${app.get('name')}-${component.get('name')}-current`
    )
  )
}

export const createTargetSelector = (app, component) => {
  return createSelector(
    allReleases,
    releases => releases.get(
      `${app.get('name')}-${component.get('name')}-target`
    )
  )
}
