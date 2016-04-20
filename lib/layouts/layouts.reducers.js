import { fromJS } from 'immutable'
import * as LayoutActions from './layouts.actions'

function layouts(state = fromJS({}), action) {
  switch (action.type) {
    case LayoutActions.Fade:
      return state.set('faded', true)

    case LayoutActions.Unfade:
      return state.set('faded', false)

    default:
      return state
  }
}

export default layouts
