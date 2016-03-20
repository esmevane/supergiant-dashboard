import { fromJS } from 'immutable'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'react-router'
import { rehydrate } from './local-storage'
import { seed } from './seed'

import sagas from '../sagas'
import { Supergiant } from '../reducers'

let initializer = rehydrate(fromJS({}), seed.entities)

const middleware = applyMiddleware(
  createSagaMiddleware(sagas),
  routerMiddleware(browserHistory)
)

const store = createStore(Supergiant, initializer, middleware)

export default store
