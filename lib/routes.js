import React from 'react'
import { IndexRoute, Route } from 'react-router'

import Main from './layouts/Main.layout'
import Dashboard from './layouts/Dashboard.page'
import CreateApp from './apps/CreateApp.container'
import CreateComponent from './apps/CreateComponent.container'

import Styleguide from './shared/Styleguide.page'
import NotFound from './shared/NotFound.page'

export default (
  <Route path='/' component={ Main }>
    <IndexRoute component={ Dashboard } />

    <Route path='apps/new' component={ CreateApp } />
    <Route path='apps/:id/components/new' component={ CreateComponent } />
    <Route path='styleguide' component={ Styleguide } />
    <Route path="*" component={ NotFound } />
  </Route>
)
