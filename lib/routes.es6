import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Styleguide from './pages/Styleguide'
import NotFound from './pages/NotFound'
import Welcome from './pages/Welcome'
import App from './App.es6'

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Welcome } />
    <Route path='styleguide' component={ Styleguide } />
    <Route path="*" component={ NotFound } />
  </Route>
)
