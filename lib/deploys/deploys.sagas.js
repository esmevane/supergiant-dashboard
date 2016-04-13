import { call, fork, put, take } from 'redux-saga'
import { push } from 'react-router-redux'
import * as DeployEntity from './deploys.entity'
import * as DeployActions from './deploys.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

function* create() {
  while(true) {
    let { appName, componentName } = yield take(DeployActions.Create)
    let { response, body } = yield call(
      DeployEntity.createDeploy,
      appName,
      componentName
    )

    if (response.status === 201) {
      yield fork(infoMessages, `Deploying ${appName}/${componentName}`)
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
  yield fork(create)
}
