import React from 'react'
import { call, fork, put, take } from 'redux-saga'
import { push } from 'react-router-redux'

import * as AppEntity from './apps/apps.entity'
import * as AppActions from './apps/apps.actions'

import * as ComponentEntity from './components/components.entity'
import * as ComponentActions from './components/components.actions'

import * as EntrypointEntity from './entrypoints/entrypoints.entity'
import * as EntrypointActions from './entrypoints/entrypoints.actions'

import * as NotificationsActions from './notifications/notifications.actions'

// Sometimes local scripts won't simulate latency between actions or maybe
// an async workflow will cause a bit of jank because of abruptness in how
// it operates.  In those cases, drop an `yield call(simulateLatency)`
// invocation into the mix and smooth out the rough edges.
//
function simulateLatency(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function* fetchApps() {
  while(true) {
    yield take(AppActions.Fetch)
    let { response, body } = yield call(AppEntity.getApps)
    let apps = AppEntity.Apps.from(body)

    for (let app of apps) {
      yield fork(collectApp, app)
      yield call(simulateLatency, 100)
    }
  }
}

function* collectApp(app) {
  yield put(AppActions.insert(app.get('name'), app))
  yield put(AppActions.get(app.get('name')))
}

function* getApp() {
  while(true) {
    let { id } = yield take(AppActions.Get)
    let { response, body } = yield call(AppEntity.getApp, id)

    if (response.status === 200) {
      let app = AppEntity.App.from(body).toMap()

      yield put(AppActions.insert(app.get('name'), app))
      yield put(ComponentActions.fetch(app.get('name')))
    } else {
      for (let error of body.errors) {
        yield put(NotificationsActions.add('error', error))
      }
    }
  }
}

function* createApp() {
  while(true) {
    let { params } = yield take(AppActions.Create)
    let app = AppEntity.App.create(params).toMap()
    let { response, body } = yield call(AppEntity.saveApp, app)

    if (response.status === 201) {
      yield put(AppActions.insert(app.get('name'), app))
      yield put(NotificationsActions.add(
        'info',
        `Created app for '${app.get('name')}'`
      ))

      yield put(push(`/`))
    } else {
      for (let error of body.errors) {
        yield put(NotificationsActions.add('error', error))
      }
    }
  }
}

function* destroyApp() {
  while(true) {
    let { id } = yield take(AppActions.Destroy)
    let { response, body } = yield call(AppEntity.deleteApp, id)

    if (response.status === 202) {
      yield put(AppActions.remove(id))
      yield put(NotificationsActions.add('info', `Deleted app ${id}`))
      yield put(push(`/`))
    } else {
      for (let error of body.errors) {
        yield put(NotificationsActions.add('error', error))
      }
    }
  }
}

function* fetchComponents() {
  while(true) {
    let { appName } = yield take(ComponentActions.Fetch)
    let { response, body } = yield call(ComponentEntity.getComponents, appName)
    let components = ComponentEntity.Components.from(body, appName)

    for (let component of components) {
      yield put(ComponentActions.insert(component.get('id'), component))
      yield put(AppActions.addComponent(appName, component.get('id')))
    }
  }
}

export function* createComponent() {
  while(true) {
    let { params } = yield take(ComponentActions.Create)
    let { appName, ...rest } = params
    let component = ComponentEntity.Component.create(rest, appName).toMap()
    let { response, body } = yield call(
      ComponentEntity.saveComponent,
      appName,
      component
    )

    if (response.status === 201) {
      yield put(ComponentActions.insert(component.get('id'), component))
      yield put(AppActions.addComponent(appName, component.get('id')))

      yield put(NotificationsActions.add(
        'info',
        `Created component '${appName}/components/${component.get('name')}'`
      ))

      yield put(AppActions.get(appName))
      yield put(push(`/`))
    } else {
      for (let error of body.errors) {
        yield put(NotificationsActions.add('error', error))
      }
    }
  }
}

export function* destroyComponent() {
  while(true) {
    let { id, appName } = yield take(ComponentActions.Remove)
    let key = [appName, id].join('-')
    let { response, body } = yield call(
      ComponentEntity.deleteComponent,
      appName,
      id
    )

    if (response.status === 202) {
      yield put(push(`/`))
      yield call(simulateLatency)
      yield put(ComponentActions.destroy(key, appName))
      yield put(NotificationsActions.add(
        'info',
        `Deleted component '${appName}/${id}'`
      ))

      yield put(AppActions.get(appName))
    } else {
      for (let error of body.errors) {
        yield put(NotificationsActions.add('error', error))
      }
    }
  }
}

function* fetchEntrypoints() {
  while(true) {
    yield take(EntrypointActions.Fetch)
    let { response, body } = yield call(EntrypointEntity.getEntrypoints)
    let entrypoints = EntrypointEntity.Entrypoints.from(body)

    for (let entrypoint of entrypoints) {
      yield put(
        EntrypointActions.insert(entrypoint.get('domain'), entrypoint)
      )
    }
  }
}

function* createEntrypoint() {
  while(true) {
    let { params } = yield take(EntrypointActions.Create)
    let entrypoint = EntrypointEntity.Entrypoint.create(params).toMap()
    let {
      response,
      body
    } = yield call(EntrypointEntity.saveEntrypoint, entrypoint)

    if (response.status === 201) {
      yield put(
        EntrypointActions.insert(entrypoint.get('domain'), entrypoint)
      )

      yield put(NotificationsActions.add(
        'info',
        `Created entrypoint for '${entrypoint.get('domain')}'`
      ))

      yield put(push(`/`))
    } else {
      for (let error of body.errors) {
        yield put(NotificationsActions.add('error', error))
      }
    }
  }
}

function* destroyEntrypoint() {
  while(true) {
    let { id } = yield take(EntrypointActions.Destroy)
    let { response, body } = yield call(EntrypointEntity.deleteEntrypoint, id)

    if (response.status === 200) {
      yield put(EntrypointActions.remove(id))
      yield put(NotificationsActions.add('info', `Deleted entrypoint ${id}`))
      yield put(push(`/`))
    } else {
      for (let error of body.errors) {
        yield put(NotificationsActions.add('error', error))
      }
    }
  }
}

export function* removeNotifications() {
  while(true) {
    let { id } = yield take(NotificationsActions.Add)
    yield call(simulateLatency, 3000)
    yield put(NotificationsActions.remove(id))
  }
}

export default function* root(getState) {
  yield fork(fetchApps)
  yield fork(getApp)
  yield fork(createApp)
  yield fork(destroyApp)

  yield fork(fetchComponents)
  yield fork(createComponent)
  yield fork(destroyComponent)

  yield fork(fetchEntrypoints)
  yield fork(createEntrypoint)
  yield fork(destroyEntrypoint)

  yield fork(removeNotifications)
  yield put(AppActions.fetch())
}
