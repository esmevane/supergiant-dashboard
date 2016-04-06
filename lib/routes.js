import React from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'

import Main from './layouts/Main.layout'
import Dashboard from './layouts/Dashboard.page'
import CreateApp from './apps/CreateApp.container'
import CreateComponent from './components/CreateComponent.container'
import ShowComponent from './components/Show.container'

import Styleguide from './shared/Styleguide.page'
import NotFound from './shared/NotFound.page'

export default (
  <Route path='/' name='Dashboard' component={ Main }>
    <IndexRoute component={ Dashboard } />

    <Route path='apps/new' name='Create an app' component={ CreateApp } />
    <Route path='apps/:appName'>
      <Route path='components/new'
             name="Create a component"
             component={ CreateComponent } />

      <Route path='components/:componentName' component={ ShowComponent } />
    </Route>

    <Route name='Styleguide' path='styleguide' component={ Styleguide } />
    <Route name='Not found' path="*" component={ NotFound } />
  </Route>
)
