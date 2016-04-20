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

function* insert() { yield takeEvery(VolumeActions.Insert, addVolume) }

export function* all() {
  yield fork(insert)
}
