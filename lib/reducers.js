import { fromJS } from 'immutable'
import { reducer as formReducer } from 'redux-form'
import { combine } from './shared/combine.reducer'
import { InitialState } from './schema'

import apps from './apps/apps.reducer'
import clouds from './clouds/clouds.reducer'
import components from './components/components.reducer'
import dashboards from './dashboards/dashboards.reducer'
import layouts from './layouts/layouts.reducer'
import modals from './modals/modals.reducer'
import nodes from './nodes/nodes.reducer'

// Redux Form doesn't natively understand immutable things, so we do some
// contortions around that here.  Basically what you're looking at is a snippet
// that does the following:
//
// * Ensure initial state is immutable regardless of where it comes from.
// * If we have a default initial state, that is also immutable.
// * Turn it into a plain object before handing it to Redux Form.
// * Finally, ensure that the output of Redux Form is immutable.
//
function form(state = InitialState.get('form'), action) {
  return fromJS(formReducer(fromJS(state).toJS(), action))
}

// The following Routing reducer is an integration that allows Redux to connect
// react router to the Immutable local state.
//
// In this case it's important that the contents of the routing maintain an
// interface which is mappable to a vanilla js object, but we want the output
// to be immutable.
//
const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

function routing(state = InitialState.get('routing'), { type, payload }) {
  if (type === LOCATION_CHANGE) {
    return fromJS({ locationBeforeTransitions: payload })
  }

  return state
}

const manifest = {
  apps,
  clouds,
  components,
  dashboards,
  form,
  layouts,
  modals,
  nodes,
  routing
}

export const Supergiant = combine(manifest, InitialState)
