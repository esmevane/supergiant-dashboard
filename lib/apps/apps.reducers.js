import { fromJS } from 'immutable'
import * as AppActions from './apps.actions'

function apps(state = fromJS({}), action) {
  switch (action.type) {
    case AppActions.Insert:
      return state.set(action.id, action.app)
    case AppActions.Remove:
      return state.delete(action.id)
    default:
      return state
  }
}

export default apps
