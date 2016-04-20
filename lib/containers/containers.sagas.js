import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as ContainerActions from './containers.actions'
import { infoMessages } from '../notifications/notifications.sagas'

function* addContainer({ container }) {
  let { appName, componentName } = container

  yield fork(infoMessages, `Created container for ${container.image}`)
  yield put(push(`/apps/${appName}/components/${componentName}`))
}

function* insert() { yield takeEvery(ContainerActions.Insert, addContainer) }

export function* all() {
  yield fork(insert)
}
