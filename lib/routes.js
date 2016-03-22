import React from 'react'
import { IndexRoute, Route } from 'react-router'

import Main from './layouts/Main.layout'
import Dashboard from './layouts/Dashboard.page'

import AppLayout from './apps/App.layout'
import AppIndex from './apps/Index.page'
import AppShow from './apps/Show.page'
import AppNew from './apps/New.page'

import ComponentLayout from './components/Component.layout'
import ComponentIndex from './components/Index.page'
import ComponentShow from './components/Show.page'
import ComponentNew from './components/New.page'

import Styleguide from './shared/Styleguide.page'
import NotFound from './shared/NotFound.page'

export default (
  <Route path='/' component={ Main }>
    <IndexRoute component={ Dashboard } />

    <Route path='apps' component={ AppLayout }>
      <IndexRoute component={ AppIndex } />

      <Route path='new' component={ AppNew } />
      <Route path=':id' component={ AppShow } />

      <Route path=':appId/components' component={ ComponentLayout }>
        <IndexRoute component={ ComponentIndex } />

        <Route path='new' component={ ComponentNew } />
        <Route path=':id' component={ ComponentShow } />
      </Route>

    </Route>

    <Route path='styleguide' component={ Styleguide } />
    <Route path="*" component={ NotFound } />
  </Route>
)
