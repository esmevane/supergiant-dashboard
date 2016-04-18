import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as InstanceEntity from './instances.entity'
import * as InstanceActions from './instances.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

function* fetchInstances({ appName, componentName, releaseId }) {
  let { response, body } = yield call(
    InstanceEntity.getInstances,
    appName,
    componentName,
    releaseId
  )

  let instances = InstanceEntity.Instances.from(body)

  for (let instance of instances) {
    yield put(
      InstanceActions.insert(
        instance.get('id'),
        instance,
        appName,
        componentName,
        releaseId
      )
    )
  }
}

function* getInstance({ id, appName, componentName, releaseId }) {
  let { response, body } = yield call(
    InstanceEntity.getInstance,
    appName,
    componentName,
    releaseId,
    id
  )

  let instance = InstanceEntity.Instance.from(body)

  yield put(
    InstanceActions.insert(
      instance.get('id'),
      instance,
      appName,
      componentName
    )
  )
}

function* startInstance({ id, appName, componentName, releaseId }) {
  let { response, body } = yield call(
    InstanceEntity.startInstance,
    appName,
    componentName,
    releaseId,
    id
  )

  console.log({ response, body })
}

function* stopInstance({ id, appName, componentName, releaseId }) {
  let { response, body } = yield call(
    InstanceEntity.stopInstance,
    appName,
    componentName,
    releaseId,
    id
  )

  console.log({ response, body })
}

function* fetchLogs({ id, appName, componentName, releaseId }) {
  let { response, body } = yield call(
    InstanceEntity.getInstanceLogs,
    appName,
    componentName,
    releaseId,
    id
  )

  console.log({ response, body })
}

function* fetch() {
  yield takeEvery(InstanceActions.Fetch, fetchInstances)
}

function* start() {
  yield takeEvery(InstanceActions.Start, startInstance)
}

function* get() { yield takeEvery(InstanceActions.Get, getInstance) }
function* stop() { yield takeEvery(InstanceActions.Stop, stopInstance) }
function* logs() { yield takeEvery(InstanceActions.GetLogs, fetchLogs) }

export function* all() {
  yield fork(fetch)
  yield fork(get)
  yield fork(logs)
  yield fork(start)
  yield fork(stop)
}
