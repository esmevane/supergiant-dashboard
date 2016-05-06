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
import * as NodeSagas from './nodes/nodes.sagas'
import * as NotificationSagas from './notifications/notifications.sagas'
import * as RegistrySagas from './registries/registries.sagas'
import * as ReleaseSagas from './releases/releases.sagas'
import * as TaskSagas from './tasks/tasks.sagas'
import * as VolumeSagas from './volumes/volumes.sagas'

export default function* root(getState) {
  yield fork(AppSagas.all, getState)
  yield fork(ComponentSagas.all, getState)
  yield fork(ContainerSagas.all, getState)
  yield fork(DeploySagas.all, getState)
  yield fork(EntrypointSagas.all, getState)
  yield fork(InstanceSagas.all, getState)
  yield fork(NodeSagas.all, getState)
  yield fork(NotificationSagas.all, getState)
  yield fork(RegistrySagas.all, getState)
  yield fork(ReleaseSagas.all, getState)
  yield fork(TaskSagas.all, getState)
  yield fork(VolumeSagas.all, getState)
}
