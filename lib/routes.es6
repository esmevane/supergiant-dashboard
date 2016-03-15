import React from 'react'
import { IndexRoute, Route } from 'react-router'
import AppForm from './components/AppForm'
import AppsIndex from './pages/AppsIndex'
import ShowApp from './pages/ShowApp'
import Styleguide from './pages/Styleguide'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import App from './App.es6'

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Dashboard } />
    <Route path='apps' component={ AppsIndex }>
      <Route path='new' component={ AppForm } />
      <Route path=':id' component={ ShowApp } />
    </Route>
    <Route path='styleguide' component={ Styleguide } />
    <Route path="*" component={ NotFound } />
  </Route>
)
