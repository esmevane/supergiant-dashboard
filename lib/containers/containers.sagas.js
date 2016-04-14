import { call, fork, put, take } from 'redux-saga'
import { push } from 'react-router-redux'
import * as ContainerActions from './containers.actions'
import { infoMessages } from '../notifications/notifications.sagas'

function* insert() {
  while(true) {
    let { container } = yield take(ContainerActions.Insert)
    yield fork(infoMessages, `Created container for ${container.image}`)
    yield put(push(`/`))
  }
}

function* remove() {
  while(true) {
    yield take(ContainerActions.Remove)
    yield fork(infoMessages, `Destroyed container`)
    yield put(push(`/`))
  }
}

export function* all() {
  yield fork(insert)
  yield fork(remove)
}
