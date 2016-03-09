import { fromJS } from 'immutable'
import { InitialState } from '../schema'
import * as Actions from '../actions'
import { combine } from './combine'

const initializer = InitialState.get('modal')

function content(state = initializer.get('content'), action) {
  switch (action.type) {
    case Actions.OpenModal:
      return fromJS([action.component])
    case Actions.CloseModal:
      return fromJS([])
    default:
      return state
  }
}

function hidden(state = initializer.get('hidden'), action) {
  switch (action.type) {
    case Actions.ShowModal:
      return false
    case Actions.HideModal:
      return true
    default:
      return state
  }
}

function meta(state = initializer.get('meta'), action) {
  return state
}

const manifest = { content, hidden, meta }

export const modal = combine(manifest, initializer)
