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

export const getComponent = (state, props) => {
  if (props.params) {
    let { appName, componentName } = props.params
    let key = [appName, componentName].join('-')

    return state.get('components').get(key)
  }
}

export function createAppComponentsSelector(app) {
  return createSelector(
    getComponents,
    components => {
      let names = app.get('components') || fromJS([])

      return names.map(name => components.get(name))
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
    (app, component) => {
      return { app, component }
    }
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
