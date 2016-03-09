import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from '../sagas'
import { browserHistory } from 'react-router'
import { Supergiant } from '../reducers'
import { InitialState } from '../schema'

const middleware = applyMiddleware(createSagaMiddleware(sagas))

const store = createStore(Supergiant, InitialState, middleware)

export default store
