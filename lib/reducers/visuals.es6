import { InitialState } from '../schema'
import * as Actions from '../actions'
import { combine } from './combine'

function faded(state = InitialState.getIn(['visuals', 'faded']), action) {
  switch (action.type) {
    case Actions.AppFade:
      return true
    case Actions.AppUnfade:
      return false
    default:
      return state
  }
}

function meta(state = InitialState.getIn(['visuals', 'meta']), action) {
  return state
}

const manifest = { faded, meta }
export const visuals = combine(manifest, InitialState.get('visuals'))
