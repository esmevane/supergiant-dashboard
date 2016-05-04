import { fromJS } from 'immutable'
import { reducer as formReducer } from 'redux-form'
import { combine } from './shared/combine.reducer'

import * as NotificationsActions from './notifications/notifications.actions'

import apps from './apps/apps.reducers'
import tasks from './tasks/tasks.reducers'
import components from './components/components.reducers'
import containers from './containers/containers.reducers'
import { instancesMeta, instances } from './instances/instances.reducers'
import entrypoints from './entrypoints/entrypoints.reducers'
import layouts from './layouts/layouts.reducers'
import notifications from './notifications/notifications.reducers'
import registries from './registries/registries.reducers'
import releases from './releases/releases.reducers'
import volumes from './volumes/volumes.reducers'
import nodes from './nodes/nodes.reducers'

// Redux Form doesn't natively understand immutable things, so we do some
// contortions around that here.  Basically what you're looking at is a snippet
// that does the following:
//
// * Ensure initial state is immutable regardless of where it comes from.
// * If we have a default initial state, that is also immutable.
// * Turn it into a plain object before handing it to Redux Form.
// * Finally, ensure that the output of Redux Form is immutable.
//
function form(state = fromJS({}), action) {
  const isNumber = value => value && Number(value)
  const reducer = formReducer.normalize({
    containers: {
      'cpu.min': isNumber,
      'cpu.max': isNumber,
      'ram.min': isNumber,
      'ram.max': isNumber,
      'ports[].number': isNumber,
      'ports[].external_number': isNumber,
      'ports[].public': value => value && !!value
    },
    volumes: { size: isNumber }
  })

  return fromJS(reducer(fromJS(state).toJS(), action))
}

// The following Routing reducer is an integration that allows Redux to connect
// react router to the Immutable local state.
//
// In this case it's important that the contents of the routing maintain an
// interface which is mappable to a vanilla js object, but we want the output
// to be immutable.
//
function routing(state = fromJS({}), { type, payload }) {
  const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
  if (type === LOCATION_CHANGE) {
    return fromJS({ locationBeforeTransitions: payload })
  }

  return state
}

const manifest = {
  apps,
  components,
  containers,
  entrypoints,
  form,
  instances,
  instancesMeta,
  layouts,
  notifications,
  nodes,
  releases,
  registries,
  routing,
  tasks,
  volumes
}

export const Supergiant = combine(manifest, fromJS({}))
