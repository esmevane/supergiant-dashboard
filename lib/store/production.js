import { fromJS } from 'immutable'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'react-router'
import { rehydrate } from './local-storage'
import configureReducers from './configure-reducers'

export default reducerRegistry => {
  const initializer = rehydrate(fromJS({}), {})
  const sagaMiddleware = createSagaMiddleware()

  const middleware = applyMiddleware(
    sagaMiddleware,
    routerMiddleware(browserHistory)
  )

  const reducers = configureReducers(reducerRegistry.reducers())
  const store = createStore(reducers, initializer, middleware)
  const registry = new ReducerRegistry(reducers)

  return {
    ...store,
    configureReducers,
    runSaga: sagaMiddleware.run
  }
}
