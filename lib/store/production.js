import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'react-router'

import sagas from '../sagas'
import { Supergiant } from '../reducers'
import { InitialState } from '../schema'

const middleware = applyMiddleware(
  createSagaMiddleware(sagas),
  routerMiddleware(browserHistory)
)

const store = createStore(Supergiant, InitialState, middleware)

export default store
