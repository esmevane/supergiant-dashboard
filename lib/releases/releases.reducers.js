import { fromJS } from 'immutable'
import * as ReleaseActions from './releases.actions'

export default function releases(state = fromJS({}), action) {
  const releaseKey = [
    action.appName,
    action.componentName,
    action.id
  ].join('-')

  switch (action.type) {
    case ReleaseActions.Clear:
      return fromJS({})
    case ReleaseActions.Insert:
      return state.set(releaseKey, action.release)
    case ReleaseActions.Remove:
      return state.delete(releaseKey)
    default:
      return state
  }
}
