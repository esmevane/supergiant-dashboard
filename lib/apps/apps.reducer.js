import { createApp, reorderIds } from './apps.behavior'
import { InitialState } from '../schema'
import * as Actions from './apps.actions'
import { combine } from '../shared/combine.reducer'

const initializer = InitialState.get('apps')
const metaState = initializer.get('meta')
const requestState = metaState.get('requesting')

function order(state = initializer.get('order'), action) {
  switch (action.type) {
    case Actions.Reorder:
      let { id, index } = action
      return reorderIds(id, index, state)
    default:
      return state
  }
}

function contents(state = initializer.get('contents'), action) {
  switch (action.type) {
    case Actions.Create:
      return state.push(createApp(action.params))
    default:
      return state
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
