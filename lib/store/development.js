import { fromJS } from 'immutable'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'

import { rehydrate } from './local-storage'
import sagas from '../sagas'
import DevTools from '../shared/DevTools.component'
import { Supergiant } from '../reducers'

let instrument
let initializer     = rehydrate(fromJS({}), {})
let windowPresent   = typeof window === 'object'
let devToolsPresent = false

if (windowPresent) {
  devToolsPresent = typeof window.devToolsExtension !== 'undefined'
}

if (windowPresent && devToolsPresent) {
  instrument = window.devToolsExtension()
} else {
  instrument = DevTools.instrument()
}

const middleware = applyMiddleware(
  createSagaMiddleware(sagas),
  routerMiddleware(hashHistory)
)

const enhancer = compose(middleware, instrument)
const store    = createStore(Supergiant, initializer, enhancer)

export default store
