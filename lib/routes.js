import React from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'

import Main from './layouts/Main.layout'

import Apps from './apps/Apps.container'
import AppDetail from './apps/AppDetail.container'
import CreateApp from './apps/CreateApp.container'

import ComponentDetail from './components/ComponentDetail.container'
import CreateComponent from './components/CreateComponent.container'

import CreateContainer from './containers/CreateContainer.container'
import CreateVolume from './volumes/CreateVolume.container'

import InstanceDetail from './instances/InstanceDetail.component'
import Releases from './releases/Releases.container'

import Settings from './shared/Settings.component'
import CreateEntrypoint from './entrypoints/CreateEntrypoint.container'
import CreateRegistry from './registries/CreateRegistry.container'

import Nodes from './nodes/Nodes.container'

import Styleguide from './shared/Styleguide.component'
import NotFound from './shared/NotFound.component'

export default (
  <Route path='/' name='Dashboard' component={ Main }>
    <IndexRoute component={ Apps } />

    <Route path='apps/new' name='Create an app' component={ CreateApp } />
    <Route path='apps/:appName'>
      <IndexRoute component={ AppDetail } />

      <Route path='components/new'
             name="Create a component"
             component={ CreateComponent } />

      <Route path='components/:componentName'>
        <IndexRoute component={ ComponentDetail } />

        <Route path='releases' name='Releases' component={ Releases } />

        <Route path='containers/new'
               name='Create a new container'
               component={ CreateContainer } />

        <Route path='volumes/new'
               name='Create a new volume'
               component={ CreateVolume } />

        <Route path='instances/:instanceName'
               component={ InstanceDetail } />
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

    <Route path='nodes' name='Nodes' component={ Nodes } />

    <Route name='Styleguide' path='styleguide' component={ Styleguide } />
    <Route name='Not found' path="*" component={ NotFound } />
  </Route>
)
