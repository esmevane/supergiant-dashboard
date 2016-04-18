import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as EntrypointEntity from './entrypoints.entity'
import * as EntrypointActions from './entrypoints.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

function* fetchEntrypoints() {
  let { response, body } = yield call(EntrypointEntity.getEntrypoints)
  let entrypoints = EntrypointEntity.Entrypoints.from(body)

  for (let entrypoint of entrypoints) {
    yield put(
      EntrypointActions.insert(entrypoint.get('domain'), entrypoint)
    )
  }
}

function* createEntrypoint({ params }) {
  let entrypoint = EntrypointEntity.Entrypoint.create(params).toMap()
  let {
    response,
    body
  } = yield call(EntrypointEntity.saveEntrypoint, entrypoint)

  if (response.status === 201) {
    yield put(
      EntrypointActions.insert(entrypoint.get('domain'), entrypoint)
    )

    yield fork(
      infoMessages,
      `Created entrypoint for '${entrypoint.get('domain')}'`
    )

    yield put(push(`/settings`))
  } else {
    if (body.errors) {
      yield fork(errorMessages, ...body.errors)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* deleteEntrypoint({ id }) {
  let { response, body } = yield call(EntrypointEntity.deleteEntrypoint, id)

  if (response.status === 200) {
    yield put(EntrypointActions.remove(id))
    yield fork(infoMessages, `Deleted entrypoint ${id}`)
    yield put(push(`/settings`))
  } else {
    if (body.errors) {
      yield fork(errorMessages, ...body.errors)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* fetch() { yield takeEvery(EntrypointActions.Fetch, fetchEntrypoints) }

function* create() {
  yield takeEvery(EntrypointActions.Create, createEntrypoint)
}

function* destroy() {
  yield takeEvery(EntrypointActions.Destroy, deleteEntrypoint)
}

export function* all() {
  yield fork(fetch)
  yield fork(create)
  yield fork(destroy)
}
