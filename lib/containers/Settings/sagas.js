import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import uuid from 'uuid'
import * as crud from 'lib/crud-utilities'

const Actions = crud.createCrudActions('settings')
const EntrypointActions = crud.createCrudActions('entrypoints')
const RepoActions = crud.createCrudActions('repos')

export function* fetchResources(getState) {
  yield put(EntrypointActions.fetch())
  yield put(RepoActions.fetch())
}

export function* fetch(getState) {
  yield takeEvery(Actions.Fetch, fetchResources, getState)
}

export function* all(getState) {
  yield fork(fetch, getState)
}

all.id = `settings-${uuid.v4()}`
