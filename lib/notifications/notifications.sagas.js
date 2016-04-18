import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
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

function* removeNotifications({ id }) {
  yield call(() => new Promise(resolve => setTimeout(resolve, 3000)))
  yield put(NotificationActions.remove(id))
}

function* clear() {
  yield takeEvery(NotificationActions.Add, removeNotifications)
}

export function* all() {
  yield fork(clear)
}
