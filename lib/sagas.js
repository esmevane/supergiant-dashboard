import React from 'react'
import { call, fork, put, take } from 'redux-saga'
import { push } from 'react-router-redux'
import { create } from './shared/entities.behavior'
import * as AppActions from './apps/apps.actions'
import * as ComponentActions from './components/components.actions'
import * as NotificationsActions from './notifications/notifications.actions'

// Sometimes local scripts won't simulate latency between actions or maybe
// an async workflow will cause a bit of jank because of abruptness in how
// it operates.  In those cases, drop an `yield call(simulateLatency)`
// invocation into the mix and smooth out the rough edges.
//
function simulateLatency(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function* createApp() {
  while(true) {
    let { params } = yield take(AppActions.Create)
    let app = create(params)
    yield put(AppActions.insert(app.get('name'), app))
    yield put(push(`/`))
  }
}

export function* removeNotifications() {
  while(true) {
    let { id } = yield take(NotificationsActions.Add)
    yield simulateLatency(3000)
    yield put(NotificationsActions.remove(id))
  }
}

export function* createComponent() {
  while(true) {
    let { params } = yield take(ComponentActions.Create)
    let component = create(params)
    let { appId, name } = component.toJS()

    yield put(ComponentActions.insert(name, component))
    yield put(AppActions.addComponent(appId, name))
    yield put(push(`/`))
  }
}

export default function* root(getState) {
  yield fork(createApp)
  yield fork(createComponent)
  yield fork(removeNotifications)
}
