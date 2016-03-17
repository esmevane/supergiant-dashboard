import { fork } from 'redux-saga'
import { hide, show } from './modals/modals.saga'
import { create as createApp } from './apps/apps.saga'
import { create as createComponent } from './components/components.saga'

export default function* root(getState) {
  yield fork(createApp)
  yield fork(createComponent)
  yield fork(hide)
  yield fork(show)
}
