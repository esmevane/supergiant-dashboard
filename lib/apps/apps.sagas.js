import { call, fork, put, take } from 'redux-saga'
import { push } from 'react-router-redux'
import * as AppEntity from './apps.entity'
import * as AppActions from './apps.actions'
import * as ComponentActions from '../components/components.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

function* fetch() {
  while(true) {
    yield take(AppActions.Fetch)
    let { response, body } = yield call(AppEntity.getApps)
    let apps = AppEntity.Apps.from(body)

    for (let app of apps) {
      yield put(AppActions.insert(app.get('name'), app))
      yield put(AppActions.get(app.get('name')))
      yield call(() => new Promise(resolve => setTimeout(resolve, 100)))
    }
  }
}

function* get() {
  while(true) {
    let { id } = yield take(AppActions.Get)
    let { response, body } = yield call(AppEntity.getApp, id)

    if (response.status === 200) {
      let app = AppEntity.App.from(body).toMap()

      yield put(AppActions.insert(app.get('name'), app))
      yield put(ComponentActions.fetch(app.get('name')))
    } else {
      if (body.errors) {
        yield fork(errorMessages, ...body.errors)
      } else {
        yield fork(errorMessages, body)
      }
    }
  }
}

function* create() {
  while(true) {
    let { params } = yield take(AppActions.Create)
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
}

function* destroy() {
  while(true) {
    let { id } = yield take(AppActions.Destroy)
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
}

export function* all() {
  yield fork(fetch)
  yield fork(get)
  yield fork(create)
  yield fork(destroy)
}
