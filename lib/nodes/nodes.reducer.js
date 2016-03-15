import { InitialState } from '../schema'
import * as Actions from './nodes.actions'
import { combine } from '../shared/combine.reducer'

const initializer = InitialState.get('nodes')
const metaState = initializer.get('meta')
const requestState = metaState.get('requesting')

function contents(state = initializer.get('contents'), action) {
  switch (action.type) {
    default:
      return state
  }
}

function requesting(state = requestState, action) {
  switch (action.type) {
    case Actions.NodesRequest:
      return true
    case Actions.NodesRequestComplete:
      return false
    default:
      return state
  }

}

const meta = combine({ requesting }, metaState)
export default combine({ contents, meta }, initializer)
