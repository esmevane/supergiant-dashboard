import { call, put, take } from 'redux-saga'
import { push } from 'react-router-redux'
import { createApp } from './apps.behavior'
import * as Actions from './apps.actions'

export function* create() {
  while(true) {
    let { params } = yield take(Actions.Create)
    let app = createApp(params)
    yield put(Actions.insert(app.get('id'), app))
    yield put(push(`/apps/${app.get('id')}`))
  }
}
