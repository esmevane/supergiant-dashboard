import { fromJS } from 'immutable'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'react-router'

import sagas from '../sagas'
import { Supergiant } from '../reducers'
import { InitialState } from '../schema'

let initializer = InitialState

if (window) {
  let storage = window.localStorage
  let persistedState = storage.getItem('sg-memory')

  if (persistedState) {
    initializer = initializer.mergeDeep(fromJS(JSON.parse(persistedState)))
  }
}

const middleware = applyMiddleware(
  createSagaMiddleware(sagas),
  routerMiddleware(browserHistory)
)

const store = createStore(Supergiant, initializer, middleware)

export default store
