import { fork, call, put, take } from 'redux-saga'
import { createResource } from '../client'
import * as Actions from '../actions'

function* hideModal() {
  while(true) {
    yield take(Actions.HideModal)
    yield call(simulateLatency)
    yield put(Actions.closeModal())
    yield put(Actions.appUnfade())
  }
}

function* showModal() {
  while(true) {
    yield take(Actions.OpenModal)
    yield put(Actions.appFade())
    yield put(Actions.showModal())
  }
}

// Sometimes local scripts won't simulate latency between actions or maybe
// an async workflow will cause a bit of jank because of abruptness in how
// it operates.  In those cases, drop an `yield call(simulateLatency)`
// invocation into the mix and smooth out the rough edges.
//
function simulateLatency(ms = 300) {
  return new Promise((resolve) => { setTimeout(resolve, ms) })
}

export default function* root(getState) {
  yield fork(hideModal)
  yield fork(showModal)
}
