import { fromJS } from 'immutable'
import * as ComponentActions from './components.actions'

function components(state = fromJS({}), action) {
  switch (action.type) {
    case ComponentActions.Insert:
      return state.set(action.component.get('id'), action.component)
    case ComponentActions.Destroy:
      return state.delete(action.id)
    default:
      return state
  }
}

export default components
