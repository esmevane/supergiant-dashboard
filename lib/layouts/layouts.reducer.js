import { InitialState } from '../schema'
import * as Actions from './layouts.actions'
import { combine } from '../shared/combine.reducer'

const initializer = InitialState.get('layouts')

function faded(state = initializer.get('faded'), action) {
  switch (action.type) {
    case Actions.Fade:
      return true
    case Actions.Unfade:
      return false
    default:
      return state
  }
}

function meta(state = initializer.get('meta'), action) { return state }

export default combine({ faded, meta }, initializer)
