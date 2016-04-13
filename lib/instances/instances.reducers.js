import { fromJS } from 'immutable'
import * as InstanceActions from './instances.actions'

export default function instances(state = fromJS({}), action) {
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
