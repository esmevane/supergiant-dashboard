import { call, fork, put, take } from 'redux-saga'
import * as NotificationActions from '../notifications/notifications.actions'

const notify = level => message => NotificationActions.add(level, message)

export function* infoMessages(...messages) {
  let info = notify('info')
  for (let message of messages) { yield put(info(message)) }
}

export function* errorMessages(...messages) {
  let error = notify('error')
  for (let message of messages) { yield put(error(message)) }
}

function* removeNotifications() {
  while(true) {
    let { id } = yield take(NotificationActions.Add)
    yield call(() => new Promise(resolve => setTimeout(resolve, 3000)))
    yield put(NotificationActions.remove(id))
  }
}

export function* all() {
  yield fork(removeNotifications)
}
