import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const getActiveCloud = state => state.get('clouds').toList().first()
export const getApps = state => state.get('apps')
export const getComponents = state => state.get('components')
export const getNodes = state => state.get('nodes')
export const isFaded = state => state.getIn(['layouts', 'faded'])
export const getNotifications = state => state.get('notifications').toList()

export const getApp = (state, props) =>
  state.get('apps').get(props.appId || props.id)

export function createAppComponentsSelector(app) {
  return createSelector(
    getComponents,
    (components) => {
      let ids = app.get('components') || fromJS([])

      return ids.map(id => components.get(id))
    }
  )
}

export function createOrderedAppsSelector() {
  return createSelector(
    getActiveCloud,
    getApps,
    (cloud, apps) => (cloud.get('apps') || fromJS([])).map(id => apps.get(id))
  )
}

export function createOrderedComponentsSelector() {
  return createSelector(
    getActiveCloud,
    getApp,
    getComponents,
    (cloud, app, components) => {
      if (cloud && app && cloud.get('apps').includes(app.get('name'))) {
        let ids = app.get('components') || fromJS([])
        return ids.map(id => components.get(id))
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
