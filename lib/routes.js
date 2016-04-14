import React from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'

import Main from './layouts/Main.layout'
import Dashboard from './layouts/Dashboard.page'
import CreateApp from './apps/CreateApp.container'
import CreateComponent from './components/CreateComponent.container'
import CreateContainer from './containers/ExpandedContainerForm.container'
import CreateEntrypoint from './entrypoints/CreateEntrypoint.container'
import CreateRegistry from './registries/CreateRegistry.container'
import VolumeForm from './components/VolumeForm.component'
import ShowComponent from './components/Show.container'
import ShowReleases from './components/ShowReleases.component'
import ShowInstance from './instances/ShowInstance.component'

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

      <Route path='components/:componentName/containers/new'
             name='Create a new container'
             component={ CreateContainer } />

      <Route path='components/:componentName/volumes/new'
             name='Create a new volume'
             component={ VolumeForm } />

      <Route path='components/:componentName/releases'
             name='Releases'
             component={ ShowReleases } />

      <Route path='components/:componentName/instances/:instanceName'
             name='Instance'
             component={ ShowInstance } />
    </Route>

    <Route path='registries/dockerhub/repos/new'
           name='Make a Docker hub key'
           component={ CreateRegistry } />

<<<<<<< 8c27be19f51c45e7e8c96111a90d05a3a46c4bd4
    <Route path='entrypoints/new'
           name='Add an entrypoint'
           component={ CreateEntrypoint } />

=======
>>>>>>> Create registry repo access keys.
    <Route name='Styleguide' path='styleguide' component={ Styleguide } />
    <Route name='Not found' path="*" component={ NotFound } />
  </Route>
)
