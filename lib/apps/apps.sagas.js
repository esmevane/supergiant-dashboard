import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { getCache } from './apps.selectors'
import * as Resources from '../resources'
import * as Actions from './apps.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

const Client = new Resources.Apps

function* fetchApps(getState) {
  try {
    let apps = yield call(Client.fetch)

    for (let app of apps) { yield put(Actions.insert(app.key(), app)) }
  } catch (error) {
    yield fork(errorMessages, error)
  }
}

function* invalidateCache(getState, { id }) {
  if (id) {
    yield fork(getApp, getState, { id })
  } else {
    yield fork(fetchApps, getState)
  }
}

function* getApp(getState, { id }) {
  try {
    let app = yield call(Client.get, id)

    yield put(Actions.insert(app.key(), app))
  } catch (error) {
    yield fork(errorMessages, error)
  }
}

function* createApp(getState, { params }) {
  try {
    let app = yield Client.create(params)

    yield fork(infoMessages, `Created '/${app.name}'`)
    yield put(push(`/`))
  } catch (error) {
    yield fork(errorMessages, error)
  }
}

function* deleteApp(getState, { id }) {
  try {
    yield call(Client.delete, id)
    yield put(Actions.remove(id))
    yield fork(infoMessages, `Deleted app ${id}`)
    yield put(push(`/`))
  } catch (error) {
    yield fork(errorMessages, error)
  }
}

function* fetch(getState) {
  yield takeEvery(Actions.Fetch, fetchApps, getState)
}

function* get(getState) {
  yield takeEvery(Actions.Get, getApp, getState)
}

function* create(getState) {
  yield takeEvery(Actions.Create, createApp, getState)
}

function* destroy(getState) {
  yield takeEvery(Actions.Destroy, deleteApp, getState)
}

function* invalidate(getState) {
  yield takeEvery(Actions.Invalidate, invalidateCache, getState)
}

export function* all(getState) {
  yield fork(fetch, getState)
  yield fork(get, getState)
  yield fork(create, getState)
  yield fork(destroy, getState)
  yield fork(invalidate, getState)
}
