import { fromJS } from 'immutable'
import * as VolumeActions from './volumes.actions'

export default function volumes(state = fromJS({}), action) {
  switch (action.type) {
    case VolumeActions.Insert:
      return state.set(action.id, action.volume)
    case VolumeActions.Remove:
      return state.delete(action.id)
    default:
      return state
  }
}
