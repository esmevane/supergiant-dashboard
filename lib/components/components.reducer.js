import { reorder } from './components.behavior'
import { InitialState } from '../schema'
import * as Actions from './components.actions'
import { combine } from '../shared/combine.reducer'

const initializer = InitialState.get('components')
const metaState = initializer.get('meta')
const requestState = metaState.get('requesting')

function order(state = initializer.get('order'), action) {
  switch (action.type) {
    case Actions.Reorder:
      let { id, index } = action
      return reorder(id, index, state)
    case Actions.Insert:
      return state.push(action.id)
    default:
      return state
  }
}

function contents(state = initializer.get('contents'), action) {
  switch (action.type) {
    case Actions.Insert:
      return state.push(action.component)
    default:
      return state.filter(component => !!component)
  }
}

function requesting(state = requestState, action) {
  switch (action.type) {
    case Actions.Request:
      return true
    case Actions.RequestComplete:
      return false
    default:
      return state
  }
}

const meta = combine({ requesting }, metaState)
export default combine({ contents, meta, order }, initializer)
