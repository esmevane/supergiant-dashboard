import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as ComponentActions from '../components/components.actions'
import * as ContainerActions from './containers.actions'
import { infoMessages } from '../notifications/notifications.sagas'

function* commitContainer({ id, container }) {
  let { appName, componentName } = container

  yield fork(infoMessages, `Created container for ${container.image}`)
  yield put(push(`/apps/${appName}/components/${componentName}`))
  yield put(ContainerActions.insert(id, container))
  yield put(ComponentActions.commit(componentName, appName))
}

function* dropContainer({ id, container }) {
  let { appName, componentName } = container

  yield fork(infoMessages, `Destroying container ${container.image}`)
  yield put(ContainerActions.remove(id, container))
  yield put(ComponentActions.commit(componentName, appName))
}

function* create() { yield takeEvery(ContainerActions.Create, commitContainer) }

function* destroy() {
  yield takeEvery(ContainerActions.Destroy, dropContainer)
}

export function* all() {
  yield fork(create)
  yield fork(destroy)
}
