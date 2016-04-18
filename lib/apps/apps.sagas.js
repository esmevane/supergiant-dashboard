import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as AppEntity from './apps.entity'
import * as AppActions from './apps.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

function* fetchApps() {
  let { response, body } = yield call(AppEntity.getApps)
  let apps = AppEntity.Apps.from(body)

  for (let app of apps) {
    yield put(AppActions.insert(app.get('name'), app))
  }
}

function* getApp({ id }) {
  let { response, body } = yield call(AppEntity.getApp, id)

  if (response.status === 200) {
    let app = AppEntity.App.from(body).toMap()

    yield put(AppActions.insert(app.get('name'), app))
  } else {
    if (body.errors) {
      yield fork(errorMessages, ...body.errors)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* createApp({ params }) {
  let app = AppEntity.App.create(params).toMap()
  let { response, body } = yield call(AppEntity.saveApp, app)

  if (response.status === 201) {
    yield put(AppActions.insert(app.get('name'), app))
    yield fork(infoMessages, `Created app for '${app.get('name')}'`)

    yield put(push(`/`))
  } else {
    if (body.errors) {
      yield fork(errorMessages, ...body.errors)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* deleteApp({ id }) {
  let { response, body } = yield call(AppEntity.deleteApp, id)

  if (response.status === 202) {
    yield put(AppActions.remove(id))
    yield fork(infoMessages, `Deleted app ${id}`)
    yield put(push(`/`))
  } else {
    if (body.errors) {
      yield fork(errorMessages, ...body.errors)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* fetch() { yield takeEvery(AppActions.Fetch, fetchApps) }
function* get() { yield takeEvery(AppActions.Get, getApp) }
function* create() { yield takeEvery(AppActions.Create, createApp) }
function* destroy() { yield takeEvery(AppActions.Destroy, deleteApp) }

export function* all() {
  yield fork(fetch)
  yield fork(get)
  yield fork(create)
  yield fork(destroy)
}
