import { fromJS } from 'immutable'
import { InitialState } from '../schema'
import * as Actions from './modals.actions'
import { combine } from '../shared/combine.reducer'

const initializer = InitialState.get('modals')

function content(state = initializer.get('content'), action) {
  switch (action.type) {
    case Actions.Open:
      return fromJS([action.component])
    case Actions.Close:
      return fromJS([])
    default:
      return state
  }
}

function hidden(state = initializer.get('hidden'), action) {
  switch (action.type) {
    case Actions.Show:
      return false
    case Actions.Hide:
      return true
    default:
      return state
  }
}

function meta(state = initializer.get('meta'), action) { return state }

export default combine({ content, hidden, meta }, initializer)
