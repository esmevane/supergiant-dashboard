import { InitialState } from '../schema'
import * as Actions from '../actions'
import { combine } from './combine'

const appState = InitialState.get('app')

function faded(state = appState.get('faded'), action) {
  switch (action.type) {
    case Actions.AppFade:
      return true
    case Actions.AppUnfade:
      return false
    default:
      return state
  }
}

function meta(state = appState.get('meta'), action) { return state }

export default combine({ faded, meta }, appState)
