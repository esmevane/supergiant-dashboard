import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as VolumeActions from './volumes.actions'
import { infoMessages } from '../notifications/notifications.sagas'

function* addVolume({ volume }) {
  let { appName, componentName } = volume

  yield fork(infoMessages, `Created volume for ${volume.name}`)
  yield put(push(`/apps/${appName}/components/${componentName}`))
}

function* dropVolume() {
  yield fork(infoMessages, `Destroyed volume`)
  yield put(push(`/`))
}

function* insert() { yield takeEvery(VolumeActions.Insert, addVolume) }
function* remove() { yield takeEvery(VolumeActions.Remove, dropVolume) }

export function* all() {
  yield fork(insert)
  yield fork(remove)
}
