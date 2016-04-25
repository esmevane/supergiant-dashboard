import { fromJS } from 'immutable'
import * as InstanceActions from './instances.actions'

export function instancesMeta(state = fromJS({}), action) {
  const keyPath = [
    `counter`,
    action.appName,
    action.componentName
  ]

  switch (action.type) {
    case InstanceActions.Increment:
      return state.updateIn(keyPath, counter => {
        return counter ? counter + 1 : 2
      })
    case InstanceActions.Decrement:
      return state.updateIn(keyPath, counter => {
        return counter ? counter - 1 : 0
      })
    default:
      return state
  }
}

export function instances(state = fromJS({}), action) {
  const instanceKey = [
    action.appName,
    action.componentName,
    action.releaseId,
    action.id
  ].join('-')

  switch (action.type) {
    case InstanceActions.Insert:
      return state.set(instanceKey, action.instance)
    case InstanceActions.Remove:
      return state.delete(instanceKey)
    default:
      return state
  }
}
