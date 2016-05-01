import { fromJS } from 'immutable'
import * as Actions from './apps.actions'
import { combine } from '../shared/combine.reducer'

const validateCache = (state, action) => {
  const keypath = action.id
    ? ['cache', action.id, 'valid']
    : ['cache', '__index', 'valid']

  return state.setIn(keypath, true)
}

const invalidateCache = (state, action) => {
  const keypath = action.id
    ? ['cache', action.id, 'valid']
    : ['cache', '__index', 'valid']

  return state.setIn(keypath, false)
}

export function meta(state = fromJS({}), action) {
  switch (action.type) {
    case Actions.Invalidate:
    case Actions.Remove:
      return invalidateCache(state, action)
    case Actions.Validate:
    case Actions.Insert:
      return validateCache(state, action)
    default:
      return state
  }
}

export function contents(state = fromJS({}), action) {
  switch (action.type) {
    case Actions.Insert:
      return state.set(action.id, action.app)
    case Actions.Remove:
      return state.delete(action.id)
    default:
      return state
  }
}

export default combine({ contents, meta }, fromJS({}))
