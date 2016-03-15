import { fork } from 'redux-saga'
import { hide, show } from './modals/modals.saga'

export default function* root(getState) {
  yield fork(hide)
  yield fork(show)
}
