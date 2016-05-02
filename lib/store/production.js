import { fromJS } from 'immutable'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { hashHistory } from 'react-router'
import { rehydrate } from './local-storage'

import sagas from '../sagas'
import { Supergiant } from '../reducers'

let initializer = rehydrate(fromJS({}), {})

const middleware = applyMiddleware(
  createSagaMiddleware(sagas),
  routerMiddleware(hashHistory)
)

const store = createStore(Supergiant, initializer, middleware)

export default store
