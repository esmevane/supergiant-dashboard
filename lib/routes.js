import React from 'react'
import { IndexRoute, Route } from 'react-router'

import Main from './layouts/Main.layout'
import Dashboard from './layouts/Dashboard.page'

import App from './apps/App.layout'
import Apps from './apps/Apps.layout'
import AppsIndex from './apps/AppsIndex.page'
import ShowApp from './apps/ShowApp.page'
import CreateApp from './apps/CreateApp.container'
import CreateComponent from './components/CreateComponent.container'

import Styleguide from './shared/Styleguide.page'
import NotFound from './shared/NotFound.page'

export default (
  <Route path='/' name='Dashboard' component={ Main }>
    <IndexRoute component={ Dashboard } />

    <Route path='apps' name="Apps" component={ Apps }>
      <IndexRoute component={ AppsIndex } />
      <Route path='new' name='Create an app' component={ CreateApp } />
      <Route path=':id' name="App" component={ App }>
        <IndexRoute name="App" component={ ShowApp } />
        <Route path='components/new'
               name="Create a component"
               component={ CreateComponent } />
      </Route>
    </Route>

    <Route name='Styleguide' path='styleguide' component={ Styleguide } />
    <Route name='Not found' path="*" component={ NotFound } />
  </Route>
)
