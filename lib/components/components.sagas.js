import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as ComponentEntity from './components.entity'
import * as AppActions from '../apps/apps.actions'
import * as ComponentActions from './components.actions'
import * as DeploySagas from '../deploys/deploys.sagas'
import * as ReleaseSagas from '../releases/releases.sagas'

import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

function* fetchComponents({ appName }) {
  let { response, body } = yield call(ComponentEntity.getComponents, appName)
  let components = ComponentEntity.Components.from(body, appName)

  for (let component of components) {
    yield put(ComponentActions.insert(component.get('id'), component))
  }
}

function* getComponent({ id, appName }) {
  let { response, body } = yield call(
    ComponentEntity.getComponent,
    appName,
    id
  )

  let component = ComponentEntity.Component.from(body, appName).toMap()

  yield put(ComponentActions.insert(component.get('id'), component))
}

function* createComponent({ params }) {
  let { appName, ...rest } = params
  let component = ComponentEntity.Component.create(rest, appName).toMap()
  let { response, body } = yield call(
    ComponentEntity.saveComponent,
    appName,
    component
  )

  if (response.status === 201) {
    yield put(ComponentActions.insert(component.get('id'), component))

    yield fork(
      infoMessages,
      `Created component '${appName}/components/${component.get('name')}'`
    )

    yield put(AppActions.get(appName))
    yield put(push(`/apps/${appName}/components/${component.get('name')}`))
  } else {
    if (body.error) {
      yield fork(errorMessages, body.error)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* deleteComponent({ id, appName }) {
  let key = [appName, id].join('-')
  let { response, body } = yield call(
    ComponentEntity.deleteComponent,
    appName,
    id
  )

  if (response.status === 202) {
    yield put(push(`/`))
    yield call(() => new Promise(resolve => setTimeout(resolve, 300)))
    yield put(ComponentActions.destroy(key, appName))
    yield fork(infoMessages, `Deleted component '${appName}/${id}'`)

    yield put(AppActions.get(appName))
  } else {
    if (body.error) {
      yield fork(errorMessages, body.error)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* fetch() { yield takeEvery(ComponentActions.Fetch, fetchComponents) }
function* get() { yield takeEvery(ComponentActions.Get, getComponent) }
function* create() { yield takeEvery(ComponentActions.Create, createComponent) }

function* destroy() {
  yield takeEvery(ComponentActions.Remove, deleteComponent)
}

export function* all() {
  yield fork(fetch)
  yield fork(get)
  yield fork(create)
  yield fork(destroy)
}
