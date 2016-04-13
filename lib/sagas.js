import React from 'react'
import { call, fork, put, take } from 'redux-saga'
import { push } from 'react-router-redux'
import { fetch } from './apps/apps.actions'

import * as AppSagas from './apps/apps.sagas'
import * as ComponentSagas from './components/components.sagas'
import * as DeploySagas from './deploys/deploys.sagas'
import * as EntrypointSagas from './entrypoints/entrypoints.sagas'
import * as InstanceSagas from './instances/instances.sagas'
import * as NotificationSagas from './notifications/notifications.sagas'
import * as RegistrySagas from './registries/registries.sagas'
import * as ReleaseSagas from './releases/releases.sagas'

export default function* root(getState) {
  yield fork(AppSagas.all)
  yield fork(ComponentSagas.all)
  yield fork(DeploySagas.all)
  yield fork(EntrypointSagas.all)
  yield fork(InstanceSagas.all)
  yield fork(NotificationSagas.all)
  yield fork(RegistrySagas.all)
  yield fork(RegistrySagas.all)
  yield fork(ReleaseSagas.all)

  yield put(fetch())
}
