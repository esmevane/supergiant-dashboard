import { fork, put, call } from 'redux-saga/effects'
import Tasks from 'resources/tasks'
import * as crud from 'lib/crud-utilities'

const Actions = crud.createCrudActions('tasks')
const sagas = crud.createCrudSagas('tasks', new Tasks)

export function* poll(getState) {
  // while(true) {
  //   yield put(Actions.fetch())
  //   yield call(() => new Promise(resolve => setTimeout(resolve, 5000)))
  // }
}

export function* all(getState) {
  yield fork(poll, getState)
  yield fork(sagas.all, getState)
}

all.id = sagas.all.id
