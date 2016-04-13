import { call, fork, put, take } from 'redux-saga'
import { push } from 'react-router-redux'
import * as ComponentEntity from './components.entity'
import * as AppActions from '../apps/apps.actions'
import * as ComponentActions from './components.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

function* fetch() {
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

function* create() {
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

      yield fork(
        infoMessages,
        `Created component '${appName}/components/${component.get('name')}'`
      )

      yield put(AppActions.get(appName))
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

function* destroy() {
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
      yield call(() => new Promise(resolve => setTimeout(resolve, 300)))
      yield put(ComponentActions.destroy(key, appName))
      yield fork(infoMessages, `Deleted component '${appName}/${id}'`)

      yield put(AppActions.get(appName))
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
