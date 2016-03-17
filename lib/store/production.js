import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'react-router'
import { rehydrate } from './local-storage'

import sagas from '../sagas'
import { Supergiant } from '../reducers'
import { InitialState } from '../schema'

let initializer = rehydrate(InitialState)

const middleware = applyMiddleware(
  createSagaMiddleware(sagas),
  routerMiddleware(browserHistory)
)

const store = createStore(Supergiant, initializer, middleware)

export default store
