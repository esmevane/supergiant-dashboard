import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as Resources from '../resources'
import * as Actions from './apps.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

const Client = new Resources.Apps

export function* fetchApps(getState) {
  try {
    let apps = yield call([ Client, Client.fetch ])

    for (let app of apps) { yield put(Actions.insert(app.key(), app)) }
  } catch (error) {
    yield fork(errorMessages, error)
  }
}

export function* invalidateCache(getState, { id }) {
  if (id) {
    yield fork(getApp, getState, { id })
  } else {
    yield fork(fetchApps, getState)
  }
}

export function* getApp(getState, { id }) {
  try {
    let app = yield call([ Client, Client.get ], id)

    yield put(Actions.insert(app.key(), app))
  } catch (error) {
    yield fork(errorMessages, error)
  }
}

export function* createApp(getState, { params }) {
  try {
    let app = yield call([ Client, Client.create ], params)

    yield fork(infoMessages, `Created '/${app.name}'`)
    yield put(push(`/`))
  } catch (error) {
    yield fork(errorMessages, String(error))
  }
}

export function* deleteApp(getState, { id }) {
  try {
    yield call([ Client, Client.delete ], id)
    yield put(Actions.remove(id))
    yield fork(infoMessages, `Deleted app ${id}`)
    yield put(push(`/`))
  } catch (error) {
    yield fork(errorMessages, error)
  }
}

export function* fetch(getState) {
  yield takeEvery(Actions.Fetch, fetchApps, getState)
}

export function* get(getState) {
  yield takeEvery(Actions.Get, getApp, getState)
}

export function* create(getState) {
  yield takeEvery(Actions.Create, createApp, getState)
}

export function* destroy(getState) {
  yield takeEvery(Actions.Destroy, deleteApp, getState)
}

export function* invalidate(getState) {
  yield takeEvery(Actions.Invalidate, invalidateCache, getState)
}

export function* all(getState) {
  yield fork(fetch, getState)
  yield fork(get, getState)
  yield fork(create, getState)
  yield fork(destroy, getState)
  yield fork(invalidate, getState)
}
