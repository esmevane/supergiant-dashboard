import { fromJS } from 'immutable'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import DevTools from 'components/DevTools'
import { rehydrate } from './local-storage'
import configureReducers from './configure-reducers'

export default (reducerRegistry) => {
  let initializer = rehydrate(fromJS({}), {})
  let windowPresent = typeof window === 'object'
  let devToolsPresent = false
  let sagaMiddleware = createSagaMiddleware()

  if (windowPresent) {
    devToolsPresent = typeof window.devToolsExtension !== 'undefined'
  }

  let instrument = devToolsPresent
    ? window.devToolsExtension
    : DevTools.instrument

  const middleware = applyMiddleware(
    sagaMiddleware,
    routerMiddleware(browserHistory)
  )

  const enhancer = compose(middleware, instrument())
  const reducers = configureReducers(reducerRegistry.reducers())
  const store = createStore(reducers, initializer, enhancer)

  return {
    ...store,
    configureReducers,
    runSaga: sagaMiddleware.run
  }
}
