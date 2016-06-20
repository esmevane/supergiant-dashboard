import { fromJS } from 'immutable'
import { combine } from 'lib/combine-reducers'

const Actions = {
  Insert: 'assets:insert',
  Remove: 'assets:remove'
}

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

export default combine({ byId }, fromJS({}))
