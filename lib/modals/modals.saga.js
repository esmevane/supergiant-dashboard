import { call, put, take } from 'redux-saga'
import { simulateLatency } from '../shared/helpers.saga'
import * as ModalActions from './modals.actions'
import * as LayoutActions from '../layouts/layouts.actions'

export function* hide() {
  while(true) {
    yield take(ModalActions.Hide)
    yield call(simulateLatency)
    yield put(ModalActions.close())
    yield put(LayoutActions.unfade())
  }
}

export function* show() {
  while(true) {
    yield take(ModalActions.Open)
    yield put(LayoutActions.fade())
    yield put(ModalActions.show())
  }
}
