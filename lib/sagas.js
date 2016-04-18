import React from 'react'
import { fork } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { fetch } from './apps/apps.actions'

import * as AppSagas from './apps/apps.sagas'
import * as ComponentSagas from './components/components.sagas'
import * as ContainerSagas from './containers/containers.sagas'
import * as DeploySagas from './deploys/deploys.sagas'
import * as EntrypointSagas from './entrypoints/entrypoints.sagas'
import * as InstanceSagas from './instances/instances.sagas'
import * as NotificationSagas from './notifications/notifications.sagas'
import * as RegistrySagas from './registries/registries.sagas'
import * as ReleaseSagas from './releases/releases.sagas'
import * as VolumeSagas from './volumes/volumes.sagas'

export default function* root(getState) {
  yield fork(AppSagas.all)
  yield fork(ComponentSagas.all)
  yield fork(ContainerSagas.all)
  yield fork(DeploySagas.all)
  yield fork(EntrypointSagas.all)
  yield fork(InstanceSagas.all)
  yield fork(NotificationSagas.all)
  yield fork(RegistrySagas.all)
  yield fork(ReleaseSagas.all)
  yield fork(VolumeSagas.all)
}
