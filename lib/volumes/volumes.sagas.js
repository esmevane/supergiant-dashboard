import { call, fork, put, take } from 'redux-saga'
import { push } from 'react-router-redux'
import * as VolumeActions from './volumes.actions'
import { infoMessages } from '../notifications/notifications.sagas'

function* insert() {
  while(true) {
    let { volume } = yield take(VolumeActions.Insert)
    yield fork(infoMessages, `Created volume for ${volume.name}`)
    yield put(push(`/`))
  }
}

function* remove() {
  while(true) {
    yield take(VolumeActions.Remove)
    yield fork(infoMessages, `Destroyed container`)
    yield put(push(`/`))
  }
}

export function* all() {
  yield fork(insert)
  yield fork(remove)
}
