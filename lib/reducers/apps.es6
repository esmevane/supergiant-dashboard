import { createApp } from '../schema/apps'
import { InitialState } from '../schema'
import * as Actions from '../actions'
import { combine } from './combine'

const initializer = InitialState.get('apps')
const metaState = initializer.get('meta')
const requestState = metaState.get('requesting')

function contents(state = initializer.get('contents'), action) {
  switch (action.type) {
    case Actions.AppsCreate:
      return contents.push(createApp(action.params))
    default:
      return state
  }
}

function requesting(state = requestState, action) {
  switch (action.type) {
    case Actions.AppsRequest:
      return true
    case Actions.AppsRequestComplete:
      return false
    default:
      return state
  }

}

const meta = combine({ requesting }, metaState)
export default combine({ contents, meta }, initializer)
