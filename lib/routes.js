import React from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'

import Main from './layouts/Main.layout'
import Dashboard from './layouts/Dashboard.page'
import CreateApp from './apps/CreateApp.container'
import CreateComponent from './components/CreateComponent.container'
import CreateContainer from './containers/CreateContainer.container'
import CreateEntrypoint from './entrypoints/CreateEntrypoint.container'
import CreateRegistry from './registries/CreateRegistry.container'
import CreateVolume from './volumes/CreateVolume.container'

import ShowComponent from './components/Show.container'

import Instance from './instances/Instance.component'
import Releases from './releases/Releases.container'

import Settings from './shared/Settings.component'
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

      <Route path='components/:componentName'>
        <IndexRoute component={ ShowComponent } />

        <Route path='releases' name='Releases' component={ Releases } />

        <Route path='containers/new'
               name='Create a new container'
               component={ CreateContainer } />

        <Route path='volumes/new'
               name='Create a new volume'
               component={ CreateVolume } />

        <Route path='instances/:instanceName'
               name='Instance'
               component={ Instance } />
      </Route>
    </Route>

    <Route path='settings' name="Settings">
      <IndexRoute component={ Settings } />

      <Route path='registries/dockerhub/repos/new'
             name='Make a Docker hub key'
             component={ CreateRegistry } />

      <Route path='entrypoints/new'
             name='Add an entrypoint'
             component={ CreateEntrypoint } />
    </Route>

    <Route name='Styleguide' path='styleguide' component={ Styleguide } />
    <Route name='Not found' path="*" component={ NotFound } />
  </Route>
)
