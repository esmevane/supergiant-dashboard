import { fromJS } from 'immutable'
import { combine } from 'lib/combine-reducers'
import { createCrudActions } from './actions'

export const createCrudReducers = name => {
  const Actions = createCrudActions(name)

  const byId = (state = fromJS({}), action) => {
    switch (action.type) {
      case Actions.Insert:
        return state.set(action.id, action.record)
      case Actions.Remove:
        return state.delete(action.id)
      default:
        return state
    }
  }

  const meta = (state = fromJS({}), action) => {
    switch (action.type) {
      case Actions.Request:
        return state.set('requesting', true)
      case Actions.Failure:
        return state
          .set('requesting', false)
          .set('errorMessage', String(action.error))
      case Actions.Success:
        return state
          .set('requesting', false)
          .set('errorMessage', undefined)
      case Actions.Clear:
        return state.set('errorMessage', undefined)
      default:
        return state
    }
  }

  return combine({ byId, meta }, fromJS({}))
}
