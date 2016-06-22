import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, applyRouterMiddleware, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { makeRoutes } from './routes'
import DynamicRegistries from 'components/DynamicRegistries'
import { dispatcherContext } from './dispatcher-context'
import store, * as registries from './store'

import 'font-awesome/css/font-awesome.css'
import 'styles/doppio-one.css'
import 'styles/lato.css'
import 'styles/global.css'

const Routes = makeRoutes()
const element = document.getElementById('root')
const router = state => state.get('routing').toJS()
const options = { selectLocationState: router }
const history = syncHistoryWithStore(browserHistory, store, options)
const content =
  <Provider store={ store }>
    <DynamicRegistries { ...registries }>
      <Router history={ history }
              routes={ Routes }
              render={ applyRouterMiddleware(dispatcherContext(store)) } />
    </DynamicRegistries>
  </Provider>

console.log(Routes)

render(content, element)
