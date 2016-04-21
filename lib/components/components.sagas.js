import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { createAssetsSelector } from '../selectors'
import * as ComponentEntity from './components.entity'
import * as AppActions from '../apps/apps.actions'
import * as ComponentActions from './components.actions'
import * as ContainerActions from '../containers/containers.actions'
import * as VolumeActions from '../volumes/volumes.actions'

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

  for (let containerId in component.get('containers').toJS()) {
    let container = component.getIn(['containers', containerId])
    yield put(ContainerActions.insert(containerId, container))
  }

  for (let volumeId in component.get('volumes').toJS()) {
    let volume = component.getIn(['volumes', volumeId])
    yield put(VolumeActions.insert(volumeId, volume))
  }

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

function* updateComponent({ id, appName, params }) {
  let { response, body } = yield call(
    ComponentEntity.updateComponent,
    appName,
    id,
    params
  )

  if (response.status === 202) {
    yield put(ComponentActions.get(id, appName))
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
function* update() { yield takeEvery(ComponentActions.Update, updateComponent) }

function* destroy() {
  yield takeEvery(ComponentActions.Remove, deleteComponent)
}

function* commit(getState) {
  yield takeEvery(ComponentActions.Commit, commitAssets, getState)
}

function* commitAssets(getState, { id, appName }) {
  const selector = createAssetsSelector(appName, id)
  const { containers, volumes } = selector(getState())
  const params = {
    tags: {
      containers: JSON.stringify(containers.toJS()),
      volumes: JSON.stringify(volumes.toJS())
    }
  }

  yield put(ComponentActions.update(id, appName, params))
}

export function* all(getState) {
  yield fork(fetch, getState)
  yield fork(get, getState)
  yield fork(create, getState)
  yield fork(destroy, getState)
  yield fork(update, getState)
  yield fork(commit, getState)
}
