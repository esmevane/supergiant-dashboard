import { call, put, take } from 'redux-saga'
import * as Actions from './modals.actions'

export function* hideModal() {
  while(true) {
    yield take(Actions.HideModal)
    yield call(simulateLatency)
    yield put(Actions.closeModal())
    yield put(Actions.dashboardUnfade())
  }
}

export function* showModal() {
  while(true) {
    yield take(Actions.OpenModal)
    yield put(Actions.dashboardFade())
    yield put(Actions.showModal())
  }
}
