import { takeEvery } from 'redux-saga'
import { take, call, fork, put } from 'redux-saga/effects'
import { go } from 'react-router-redux'
import { createCrudActions } from './actions'
import { getRecord } from './selectors'
import uuid from 'uuid'

export const createCrudSagas = (name, Client, id = uuid.v4()) => {
  const Actions = createCrudActions(name)

  const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

  const createRecord = function* (getState, { params }) {
    try {
      yield put(Actions.request())
      yield call(delay)

      let record = yield call([ Client, Client.create ], params)

      yield put(Actions.success())
      yield put(go(-1))
    } catch (error) {
      yield put(Actions.failure(error))
      yield fork(clearMessages)
    }
  }

  // Going to have to build some sort of system for "backTo" routes, so that
  // different sagas can route to different areas.
  //
  const updateRecord = function* (getState, { id, params }) {
    try {
      yield put(Actions.request())
      yield call(delay)

      let record = getRecord(getState().get(name), id).updateWith(params)

      yield call([ Client, Client.update ], record)
      yield put(Actions.success())
      yield put(go(-1))
    } catch (error) {
      yield put(Actions.failure(error))
      yield fork(clearMessages)
    }
  }

  const fetchRecords = function* (getState) {
    try {
      yield put(Actions.request())
      yield call(delay)

      let records = yield call([ Client, Client.fetch ])

      for (let record of records) {
        yield put(Actions.insert(record.key(), record))
      }

      yield put(Actions.success())
    } catch (error) {
      yield put(Actions.failure(error))
      yield fork(clearMessages)
    }
  }

  const retrieveRecord = function* (getState, { id }) {
    try {
      yield put(Actions.request())
      yield call(delay)

      let record = yield call([ Client, Client.get ], id)

      yield put(Actions.insert(record.key(), record))
      yield put(Actions.success())
    } catch (error) {
      yield put(Actions.failure(error))
      yield fork(clearMessages)
    }
  }

  const removeRecord = function* (getState, { id }) {
    try {
      yield put(Actions.request())
      yield call(delay)
      yield call([ Client, Client.delete ], id)
      yield put(Actions.remove(id))
      yield put(Actions.success())
    } catch (error) {
      yield put(Actions.failure(error))
      yield fork(clearMessages)
    }
  }

  const clearMessages = function* () {
    yield call(delay, 3000)
    yield put(Actions.clear())
  }

  const create = function* (getState) {
    yield takeEvery(Actions.Create, createRecord, getState)
  }

  const get = function* (getState) {
    yield takeEvery(Actions.Get, retrieveRecord, getState)
  }

  const destroy = function* (getState) {
    yield takeEvery(Actions.Destroy, removeRecord, getState)
  }

  const fetch = function* (getState) {
    yield takeEvery(Actions.Fetch, fetchRecords, getState)
  }

  const update = function* (getState) {
    yield takeEvery(Actions.Update, updateRecord, getState)
  }

  const all = function* (getState) {
    yield fork(create, getState)
    yield fork(get, getState)
    yield fork(destroy, getState)
    yield fork(fetch, getState)
    yield fork(update, getState)
  }

  all.id = `${name}-${id}`

  return {
    all,
    clearMessages,
    create,
    createRecord,
    delay,
    destroy,
    fetch,
    fetchRecords,
    get,
    removeRecord,
    retrieveRecord,
    update,
    updateRecord,
  }
}
