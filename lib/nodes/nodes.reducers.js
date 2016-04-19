import { fromJS } from 'immutable'
import * as NodeActions from './nodes.actions'

function nodes(state = fromJS({}), action) {
  switch (action.type) {
    case NodeActions.Insert:
      return state.set(action.id, action.node)
    case NodeActions.Remove:
      return state.delete(action.id)
    default:
      return state
  }
}

export default nodes
