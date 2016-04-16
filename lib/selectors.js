import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const getActiveCloud = state => state.get('clouds').toList().first()
export const getApps = state => state.get('apps')
export const getComponents = state => state.get('components')
export const getNodes = state => state.get('nodes')
export const isFaded = state => state.getIn(['layouts', 'faded'])
export const getNotifications = state => state.get('notifications').toList()
export const getContainers = state => state.get('containers').toList()
export const getVolumes = state => state.get('volumes').toList()
export const getEntrypoints = state => state.get('entrypoints').toList()
export const getRegistries = state => state.get('registries').toList()

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

export function getComponentContainers(component) {
  return createSelector(
    getContainers,
    containers => {
      return containers.filter(container => {
        return container.get('componentName') === component.get('name')
      })
    }
  )
}

export function getComponentVolumes(component) {
  return createSelector(
    getVolumes,
    volumes => {
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

export function createOrderedAppsSelector() {
  return createSelector(
    getActiveCloud,
    getApps,
    (cloud, apps) => {
      let appNames = cloud.get('apps') || fromJS([])

      return appNames.map(name => apps.get(name)).filter(app => !!app)
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

export function createOrderedComponentsSelector() {
  return createSelector(
    getActiveCloud,
    getApp,
    getComponents,
    (cloud, app, components) => {
      if (cloud && app && cloud.get('apps').includes(app.get('name'))) {
        let names = app.get('components') || fromJS([])

        return names.map(name => components.get(name))
      } else {
        return components.clear()
      }
    }
  )
}

export function createComponentSelector() {
  return createSelector(getComponents, components => components)
}
