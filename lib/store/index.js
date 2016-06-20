import { fork } from 'redux-saga/effects'
import * as reduxSagaEffects from 'redux-saga/effects'
import development from './development'
import production from './production'
import { persist } from './local-storage'
import ReducerRegistry from './reducer-registry'
import SagaRegistry from './saga-registry'
import rootReducers, * as reducerTools from 'lib/reducers'
import rootSagas, * as sagaTools from 'lib/sagas'

const reducerRegistry = new ReducerRegistry(rootReducers)
const isDev = process.env.NODE_ENV !== 'production'
const createStore = isDev ? development : production
const store = createStore(reducerRegistry)
const sagaRegistry = new SagaRegistry(store, rootSagas)

reducerRegistry.subscribe(reducers => {
  store.replaceReducer(store.configureReducers(reducers))
})

store.subscribe(persist(store))
store.subscribe(() => window.state = store.getState())

// If you want to peer into the inner workings of the dynamic saga system,
// uncomment the following lines.
//
// sagaRegistry.on('run', id => console.log(`Starting ${id}`))
// sagaRegistry.on('cancel', id => console.log(`Cancelled ${id}`))
//
sagaRegistry.start()

if (isDev && module.hot) {
  module.hot.accept(reducerTools.context, () => {
    reducerRegistry.register(reducerTools.get())
  })
}

export { reducerRegistry, sagaRegistry }
export default store
