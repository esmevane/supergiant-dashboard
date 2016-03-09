import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from '../sagas'
import DevTools from '../components/DevTools'
import { Supergiant } from '../reducers'
import { InitialState } from '../schema'

let instrument
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

const middleware = applyMiddleware(createSagaMiddleware(sagas))
const enhancer   = compose(middleware, instrument)
const store      = createStore(Supergiant, InitialState, enhancer)

export default store
