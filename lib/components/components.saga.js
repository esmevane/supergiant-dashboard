import { call, put, take } from 'redux-saga'
import { push } from 'react-router-redux'
import { create as createComponent } from '../shared/entities.behavior'
import * as Actions from './components.actions'

export function* create() {
  while(true) {
    let { params } = yield take(Actions.Create)
    let component = createComponent(params)
    let { appId, id } = component.toJS()
    yield put(Actions.insert(id, component))
    yield put(push(`/apps/${appId}/components/${id}`))
  }
}
