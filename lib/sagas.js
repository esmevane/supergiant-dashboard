import { fork } from 'redux-saga'
import { hide, show } from './modals/modals.saga'
import { create } from './apps/apps.saga'

export default function* root(getState) {
  yield fork(create)
  yield fork(hide)
  yield fork(show)
}
