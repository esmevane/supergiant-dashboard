import React from 'react'
import { IndexRoute, Route } from 'react-router'

import Main from './layouts/Main.page'
import DashboardIndex from './dashboards/Index.page'
import AppIndex from './apps/Index.page'
import AppNew from './apps/New.page'
import AppShow from './apps/Show.page'

import Styleguide from './shared/Styleguide.page'
import NotFound from './shared/NotFound.page'

export default (
  <Route path='/' component={ Main }>
    <IndexRoute component={ DashboardIndex } />
    <Route path='apps' component={ AppIndex }>
      <Route path='new' component={ AppNew } />
      <Route path=':id' component={ AppShow } />
    </Route>
    <Route path='styleguide' component={ Styleguide } />
    <Route path="*" component={ NotFound } />
  </Route>
)
