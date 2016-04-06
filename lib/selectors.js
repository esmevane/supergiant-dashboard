import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const getActiveCloud = state => state.get('clouds').toList().first()
export const getApps = state => state.get('apps')
export const getComponents = state => state.get('components')
export const getNodes = state => state.get('nodes')
export const isFaded = state => state.getIn(['layouts', 'faded'])
export const getNotifications = state => state.get('notifications').toList()

export const getApp = (state, props) =>
  state.get('apps').get(
    props.appName ||
    props.params && props.params.appName
  )

export const getComponent = (state, props) =>
  state.get('components').get(
    props.params && props.params.componentName
  )

export function createAppComponentsSelector(app) {
  return createSelector(
    getComponents,
    (components) => {
      let names = app.get('components') || fromJS([])

      return names.map(name => components.get(name))
    }
  )
}

export function createOrderedAppsSelector() {
  return createSelector(
    getActiveCloud,
    getApps,
    (cloud, apps) => (
      cloud.get('apps') || fromJS([])).map(name => apps.get(name)
    )
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
  return createSelector(
    getComponents,
    components => components
  )
}
