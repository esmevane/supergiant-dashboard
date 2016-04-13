import { call, fork, put, take } from 'redux-saga'
import { push } from 'react-router-redux'
import * as InstanceEntity from './instances.entity'
import * as InstanceActions from './instances.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

export function* fetch() {
  while(true) {
    let {
      appName,
      componentName,
      releaseId
    } = yield take(InstanceActions.Fetch)

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
}

export function* get() {
  while(true) {
    let {
      id,
      appName,
      componentName,
      releaseId
    } = yield take(InstanceActions.Get)

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
}

export function* start() {
  while(true) {
    let {
      id,
      appName,
      componentName,
      releaseId
    } = yield take(InstanceActions.Start)

    let { response, body } = yield call(
      InstanceEntity.startInstance,
      appName,
      componentName,
      releaseId,
      id
    )

    console.log({ response, body })
  }
}

export function* stop() {
  while(true) {
    let {
      id,
      appName,
      componentName,
      releaseId
    } = yield take(InstanceActions.Stop)

    let { response, body } = yield call(
      InstanceEntity.stopInstance,
      appName,
      componentName,
      releaseId,
      id
    )

    console.log({ response, body })
  }
}

export function* logs() {
  while(true) {
    let {
      id,
      appName,
      componentName,
      releaseId
    } = yield take(InstanceActions.GetLogs)

    let { response, body } = yield call(
      InstanceEntity.getInstanceLogs,
      appName,
      componentName,
      releaseId,
      id
    )

    console.log({ response, body })
  }
}

export function* all() {
  yield fork(fetch)
  yield fork(get)
  yield fork(logs)
  yield fork(start)
  yield fork(stop)
}
