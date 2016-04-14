import { fromJS } from 'immutable'
import * as ContainerActions from './containers.actions'

export default function containers(state = fromJS({}), action) {
  switch (action.type) {
    case ContainerActions.Insert:
      return state.set(action.id, action.container)
    case ContainerActions.Remove:
      return state.delete(action.id)
    default:
      return state
  }
}
