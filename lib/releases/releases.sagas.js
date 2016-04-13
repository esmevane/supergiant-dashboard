import { call, fork, put, take } from 'redux-saga'
import { push } from 'react-router-redux'
import * as ReleaseEntity from './releases.entity'
import * as ReleaseActions from './releases.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

export function* fetch() {
  while(true) {
    let { appName, componentName } = yield take(ReleaseActions.Fetch)
    let { response, body } = yield call(
      ReleaseEntity.getReleases,
      appName,
      componentName
    )

    let releases = ReleaseEntity.Releases.from(body)

    for (let release of releases) {
      yield put(
        ReleaseActions.insert(
          release.id(),
          release.toMap(),
          appName,
          componentName
        )
      )
    }
  }
}

export function* get() {
  while(true) {
    let { id, appName, componentName } = yield take(ReleaseActions.Get)
    let { response, body } = yield call(
      ReleaseEntity.getRelease,
      appName,
      componentName,
      id
    )

    let release = ReleaseEntity.Release.from(body)

    yield put(
      ReleaseActions.insert(
        release.id(),
        release.toMap(),
        appName,
        componentName
      )
    )
  }
}

export function* create() {
  while(true) {
    let { params, appName, componentName } = yield take(ReleaseActions.Create)
    let release = ReleaseEntity.Release.create(params).toMap()
    let { response, body } = yield call(
      ReleaseEntity.createRelease,
      appName,
      componentName,
      release
    )

    if (response.status === 201) {
      let identifiedRelease = release.set('timestamp', body.timestamp)
      yield put(
        ReleaseActions.insert(
          identifiedRelease.get('timestamp'),
          identifiedRelease,
          appName,
          componentName
        )
      )

      yield fork(
        infoMessages,
        `Created release '${identifiedRelease.get('timestamp')}'`
      )

      yield put(push(`/`))
    } else {
      if (body.errors) {
        yield fork(errorMessages, ...body.errors)
      } else {
        yield fork(errorMessages, body)
      }
    }
  }
}

export function* destroy() {
  while(true) {
    let { id, appName, componentName } = yield take(ReleaseActions.Destroy)
    let { response, body } = yield call(
      ReleaseEntity.deleteRelease,
      appName,
      componentName,
      id
    )

    if (response.status === 200) {
      yield put(ReleaseActions.remove(id, appName, componentName))
      yield fork(infoMessages, `Deleted release ${id}`)
      yield put(push(`/`))
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
  yield fork(fetch)
  yield fork(get)
  yield fork(create)
  yield fork(destroy)
}
