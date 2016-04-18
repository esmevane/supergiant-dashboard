import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as ContainerActions from './containers.actions'
import { infoMessages } from '../notifications/notifications.sagas'

function* addContainer({ container }) {
  let app = container.get('appName')
  let component = container.get('componentName')

  yield fork(infoMessages, `Created container for ${container.image}`)
  yield put(put(`/apps/${app}/components/${component}`))
}

function* dropContainer() {
  yield fork(infoMessages, `Destroyed container`)
  yield put(push(`/`))
}

function* insert() { yield takeEvery(ContainerActions.Insert, addContainer) }
function* remove() {
  yield yield takeEvery(ContainerActions.Remove, dropContainer)
}

export function* all() {
  yield fork(insert)
  yield fork(remove)
}
