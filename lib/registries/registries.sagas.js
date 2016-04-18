import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as RegistryEntity from './registries.entity'
import * as RegistryActions from './registries.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

function* fetchRegistries() {
  let { response, body } = yield call(RegistryEntity.getRegistries)
  let registries = RegistryEntity.Registries.from(body)

  for (let registry of registries) {
    yield put(RegistryActions.insert(registry.get('name'), registry))
  }
}

function* createRegistry({ params }) {
  let registry = RegistryEntity.Registry.create(params).toMap()
  let { response, body } = yield call(RegistryEntity.saveRegistry, registry)

  if (response.status === 201) {
    yield put(RegistryActions.insert(registry.get('name'), registry))
    yield fork(
      infoMessages,
      `Created registry for '${registry.get('name')}'`
    )

    yield put(push(`/settings`))
  } else {
    if (body.error) {
      yield fork(errorMessages, body.error)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* deleteRegistry({ id }) {
  let { response, body } = yield call(RegistryEntity.deleteRegistry, id)

  if (response.status === 200) {
    yield put(RegistryActions.remove(id))
    yield fork(infoMessages, `Deleted registry ${id}`)
    yield put(push(`/settings`))
  } else {
    if (body.error) {
      yield fork(errorMessages, body.error)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* fetch() { yield takeEvery(RegistryActions.Fetch, fetchRegistries) }
function* create() { yield takeEvery(RegistryActions.Create, createRegistry) }
function* destroy() { yield takeEvery(RegistryActions.Destroy, deleteRegistry) }

export function* all() {
  yield fork(fetch)
  yield fork(create)
  yield fork(destroy)
}
