import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as NodeEntity from './nodes.entity'
import * as NodeActions from './nodes.actions'
import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

function* fetchNodes() {
  let { response, body } = yield call(NodeEntity.getNodes)
  let nodes = NodeEntity.Nodes.from(body)

  for (let node of nodes) {
    yield put(NodeActions.insert(node.get('id'), node))
  }
}

function* createNode({ params }) {
  let node = NodeEntity.Node.create(params).toMap()
  let {
    response,
    body
  } = yield call(NodeEntity.saveNode, node)

  if (response.status === 201) {
    yield put(NodeActions.insert(node.get('id'), node))

    yield fork(infoMessages, `Created node for '${node.get('id')}'`)
    yield put(push(`/nodes`))
  } else {
    if (body.error) {
      yield fork(errorMessages, body.error)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* deleteNode({ id }) {
  let { response, body } = yield call(NodeEntity.deleteNode, id)

  if (response.status === 200) {
    yield put(NodeActions.remove(id))
    yield fork(infoMessages, `Deleted node ${id}`)
    yield put(push(`/nodes`))
  } else {
    if (body.error) {
      yield fork(errorMessages, body.error)
    } else {
      yield fork(errorMessages, body)
    }
  }
}

function* fetch() { yield takeEvery(NodeActions.Fetch, fetchNodes) }

function* create() {
  yield takeEvery(NodeActions.Create, createNode)
}

function* destroy() {
  yield takeEvery(NodeActions.Destroy, deleteNode)
}

export function* all() {
  yield fork(fetch)
  yield fork(create)
  yield fork(destroy)
}
