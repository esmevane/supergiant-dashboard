import { call, fork, put, take } from 'redux-saga'
import { push } from 'react-router-redux'
import * as RegistryEntity from './registries.entity'
import * as RegistryActions from './registries.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

function* fetch() {
  while(true) {
    let { params } = yield take(RegistryActions.Fetch)
    let { response, body } = yield call(RegistryEntity.getRegistries)
    let registries = RegistryEntity.Registries.from(body)

    for (let registry of registries) {
      yield put(RegistryActions.insert(registry.get('name'), registry))
    }
  }
}

function* create() {
  while(true) {
    let { params } = yield take(RegistryActions.Create)
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
      if (body.errors) {
        yield fork(errorMessages, ...body.errors)
      } else {
        yield fork(errorMessages, body)
      }
    }
  }
}

function* destroy() {
  while(true) {
    let { id } = yield take(RegistryActions.Destroy)
    let { response, body } = yield call(RegistryEntity.deleteRegistry, id)

    if (response.status === 200) {
      yield put(RegistryActions.remove(id))
      yield fork(infoMessages, `Deleted registry ${id}`)
      yield put(push(`/settings`))
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
  yield fork(create)
  yield fork(destroy)
}
