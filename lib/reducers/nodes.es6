import { InitialState } from '../schema'
import * as Actions from '../actions'
import { combine } from './combine'

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
    case Actions.ResourcesRequest:
      return true
    case Actions.ResourcesRequestComplete:
      return false
    default:
      return state
  }

}

const meta = combine({ requesting }, metaState)
export default combine({ contents, meta }, initializer)
