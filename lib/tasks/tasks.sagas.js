import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as Resources from '../resources'
import * as Actions from './tasks.actions'

import {
  infoMessages,
  errorMessages
} from '../notifications/notifications.sagas'

const Client = new Resources.Tasks

function* fetchTasks(getState) {
  try {
    let tasks = yield call([ Client, Client.fetch ])

    for (let task of tasks) {
      yield put(Actions.insert(task.key(), task))
    }
  } catch (error) {
    yield fork(errorMessages, error)
  }
}

function* invalidateCache(getState, { id }) {
  if (id) {
    yield fork(getTask, getState, { id })
  } else {
    yield fork(fetchTasks, getState)
  }
}

function* getTask(getState, { id }) {
  try {
    let task = yield call([ Client, Client.get ], id)

    yield put(Actions.insert(task.key(), task))
  } catch (error) {
    yield fork(errorMessages, error)
  }
}

function* deleteTask(getState, { id }) {
  try {
    yield call([ Client, Client.delete ], id)
    yield put(Actions.remove(id))
    yield put(Actions.invalidate(id))
    yield fork(infoMessages, `Deleted task ${id}`)
  } catch (error) {
    yield fork(errorMessages, error)
  }
}

function* fetch(getState) {
  yield takeEvery(Actions.Fetch, fetchTasks, getState)
}

function* get(getState) {
  yield takeEvery(Actions.Get, getTask, getState)
}

function* destroy(getState) {
  yield takeEvery(Actions.Destroy, deleteTask, getState)
}

function* invalidate(getState) {
  yield takeEvery(Actions.Invalidate, invalidateCache, getState)
}

function* poll(getState) {
  while(true) {
    yield put(Actions.invalidate())
    yield call(() => new Promise(resolve => setTimeout(resolve, 5000)))
  }
}

export function* all(getState) {
  yield fork(fetch, getState)
  yield fork(get, getState)
  yield fork(destroy, getState)
  yield fork(invalidate, getState)
  yield fork(poll, getState)
}
