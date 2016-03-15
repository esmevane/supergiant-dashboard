import { fromJS } from 'immutable'
import { InitialState } from '../schema'
import * as Actions from './modals.actions'
import { combine } from '../shared/combine.reducer'

const modalState = InitialState.get('modals')

function content(state = modalState.get('content'), action) {
  switch (action.type) {
    case Actions.OpenModal:
      return fromJS([action.component])
    case Actions.CloseModal:
      return fromJS([])
    default:
      return state
  }
}

function hidden(state = modalState.get('hidden'), action) {
  switch (action.type) {
    case Actions.ShowModal:
      return false
    case Actions.HideModal:
      return true
    default:
      return state
  }
}

function meta(state = modalState.get('meta'), action) { return state }

export default combine({ content, hidden, meta }, modalState)
