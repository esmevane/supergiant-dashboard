import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Routes from './routes'
import store from './store'
import { starfield } from './visuals/starfield'

let element = document.getElementById('app')
let router  = state => state.get('routing').toJS()
let options = { selectLocationState: router }
let history = syncHistoryWithStore(hashHistory, store, options)
let content = (
  <Provider store={ store }>
    <Router history={ history } routes={ Routes } />
  </Provider>
)

window.dispatch = store.dispatch

starfield()
render(content, element)
