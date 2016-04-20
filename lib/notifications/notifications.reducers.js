import { fromJS } from 'immutable'
import * as NotificationsActions from './notifications.actions'

function notifications(state = fromJS({}), action) {
  const { id, level, message } = action
  switch (action.type) {
    case NotificationsActions.Add:
      return state.set(id, fromJS({ level, message, id }))

    case NotificationsActions.Remove:
      return state.delete(id)

    default:
      return state
  }
}

export default notifications
