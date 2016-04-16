import { fromJS } from 'immutable'
import * as EntrypointActions from './entrypoints.actions'

function entrypoints(state = fromJS({}), action) {
  switch (action.type) {
    case EntrypointActions.Insert:
      return state.set(action.id, action.entrypoint)
    case EntrypointActions.Remove:
      return state.delete(action.id)
    default:
      return state
  }
}

export default entrypoints
