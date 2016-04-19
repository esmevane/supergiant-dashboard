import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as DeployEntity from './deploys.entity'
import * as DeployActions from './deploys.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

export function* createDeploy({ appName, componentName }) {
  let { response, body } = yield call(
    DeployEntity.createDeploy,
    appName,
    componentName
  )

  if (response.status === 202) {
    yield fork(infoMessages, `Deploying ${appName}/${componentName}`)
  } else {
    if (body.error) {
      yield fork(errorMessages, body.error)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* create() { yield takeEvery(DeployActions.Create, createDeploy) }

export function* all() {
  yield fork(create)
}
