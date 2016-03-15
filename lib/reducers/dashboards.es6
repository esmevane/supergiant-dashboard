import { InitialState } from '../schema'
import * as Actions from '../actions'
import { combine } from './combine'

const initializer = InitialState.get('dashboards')

function content(state = initializer.get('content'), action) {
  return state
}

function faded(state = initializer.get('faded'), action) {
  switch (action.type) {
    case Actions.DashboardFade:
      return true
    case Actions.DashboardUnfade:
      return false
    default:
      return state
  }
}

function meta(state = initializer.get('meta'), action) { return state }

export default combine({ content, faded, meta }, initializer)
