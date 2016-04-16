import { fromJS } from 'immutable'
import * as RegistryActions from './registries.actions'

function registries(state = fromJS({}), action) {
  switch (action.type) {
    case RegistryActions.Insert:
      return state.set(action.id, action.registry)
    case RegistryActions.Remove:
      return state.delete(action.id)
    default:
      return state
  }
}

export default registries
