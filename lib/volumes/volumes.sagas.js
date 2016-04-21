import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as ComponentActions from '../components/components.actions'
import * as VolumeActions from './volumes.actions'
import { infoMessages } from '../notifications/notifications.sagas'

function* commitVolume({ id, volume }) {
  let { appName, componentName } = volume

  yield fork(infoMessages, `Created volume for ${volume.name}`)
  yield put(push(`/apps/${appName}/components/${componentName}`))
  yield put(VolumeActions.insert(id, volume))
  yield put(ComponentActions.commit(componentName, appName))
}

function* dropVolume({ id, volume }) {
  let { appName, componentName } = volume

  yield fork(infoMessages, `Destroying volume ${volume.name}`)
  yield put(VolumeActions.remove(id, volume))
  yield put(ComponentActions.commit(componentName, appName))
}

function* create() { yield takeEvery(VolumeActions.Create, commitVolume) }
function* destroy() { yield takeEvery(VolumeActions.Destroy, dropVolume) }

export function* all() {
  yield fork(create)
  yield fork(destroy)
}
