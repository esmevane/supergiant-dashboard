import { fromJS } from 'immutable'
import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { getInstanceCount } from '../selectors'
import * as ReleaseEntity from './releases.entity'
import * as ReleaseActions from './releases.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

function* fetchReleases({ appName, componentName }) {
  let { response, body } = yield call(
    ReleaseEntity.getReleases,
    appName,
    componentName
  )

  if (response.status === 200) {
    let releases = ReleaseEntity.Releases.from(body)

    for (let release of releases) {
      yield put(
        ReleaseActions.insert(
          release.get('timestamp'),
          release,
          appName,
          componentName
        )
      )
    }
  } else {
    if (body.error) {
      yield fork(errorMessages, body.error)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* getCurrent({ appName, componentName }) {
  let { response, body } = yield call(
    ReleaseEntity.getRelease,
    appName,
    componentName,
    `current`
  )

  if (response.status === 200) {
    let release = ReleaseEntity.Release.from(body).toMap()

    yield put(
      ReleaseActions.insert(`current`, release, appName, componentName)
    )
  } else {
    yield put(
      ReleaseActions.insert(`current`, fromJS({}), appName, componentName)
    )
  }
}

function* getTarget({ appName, componentName }) {
  let { response, body } = yield call(
    ReleaseEntity.getRelease,
    appName,
    componentName,
    `target`
  )

  if (response.status === 200) {
    let release = ReleaseEntity.Release.from(body).toMap()

    yield put(
      ReleaseActions.insert(`target`, release, appName, componentName)
    )
  } else {
    yield put(
      ReleaseActions.insert(`target`, fromJS({}), appName, componentName)
    )
  }
}

function* getRelease({ id, appName, componentName }) {
  let { response, body } = yield call(
    ReleaseEntity.getRelease,
    appName,
    componentName,
    id
  )

  if (response.status === 200) {
    let release = ReleaseEntity.Release.from(body).toMap()

    yield put(
      ReleaseActions.insert(
        release.get('timestamp'),
        release,
        appName,
        componentName
      )
    )
  } else {
    if (body.error) {
      yield fork(errorMessages, body.error)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

export function* createRelease(getState, { params, appName, componentName }) {
  let release = ReleaseEntity.Release.create(params).toMap()
  let instance_count = getInstanceCount(getState())

  let { response, body } = yield call(
    ReleaseEntity.createRelease,
    appName,
    componentName,
    release.merge({ instance_count })
  )

  if (response.status === 201) {
    let id = body.timestamp

    yield fork(infoMessages, `Created release '${id}'`)
    yield getRelease({ id, appName, componentName })
    yield put(push(`/apps/${appName}/components/${componentName}/releases`))
  } else {
    if (body.error) {
      yield fork(errorMessages, body.error)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* deleteRelease({ id, appName, componentName }) {
  let { response, body } = yield call(
    ReleaseEntity.deleteRelease,
    appName,
    componentName,
    id
  )

  if (response.status === 200) {
    yield put(ReleaseActions.remove(id, appName, componentName))
    yield fork(infoMessages, `Deleted release ${id}`)
  } else {
    if (body.error) {
      yield fork(errorMessages, body.error)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* fetch(getState) {
  yield takeEvery(ReleaseActions.Fetch, fetchReleases)
}

function* get(getState) {
  yield takeEvery(ReleaseActions.Get, getRelease)
}

function* current(getState) {
  yield takeEvery(ReleaseActions.GetCurrent, getCurrent)
}

function* target(getState) {
  yield takeEvery(ReleaseActions.GetTarget, getTarget)
}

function* create(getState) {
  yield takeEvery(ReleaseActions.Create, createRelease, getState)
}

function* destroy(getState) {
  yield takeEvery(ReleaseActions.Destroy, deleteRelease)
}

export function* all(getState) {
  yield fork(fetch, getState)
  yield fork(get, getState)
  yield fork(create, getState)
  yield fork(current, getState)
  yield fork(target, getState)
  yield fork(destroy, getState)
}
