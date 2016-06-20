import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import Apps from 'resources/apps'
import * as crud from 'lib/crud-utilities'

export const { all } = crud.createCrudSagas('apps', new Apps)
