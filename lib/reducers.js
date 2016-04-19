import { fromJS } from 'immutable'
import { reducer as formReducer } from 'redux-form'
import { combine } from './shared/combine.reducer'

import * as AppBehavior from './apps/apps.behavior'
import * as AppActions from './apps/apps.actions'

import * as ComponentActions from './components/components.actions'
import * as LayoutActions from './layouts/layouts.actions'
import * as NotificationsActions from './notifications/notifications.actions'

import containers from './containers/containers.reducers'
import instances from './instances/instances.reducers'
import entrypoints from './entrypoints/entrypoints.reducers'
import registries from './registries/registries.reducers'
import releases from './releases/releases.reducers'
import volumes from './volumes/volumes.reducers'

function apps(state = fromJS({}), action) {
  let app = state.get(action.id) || state.get(action.appName)
  let componentIds = fromJS([])

  if (app) { componentIds = app.get('components') || fromJS([]) }

  switch (action.type) {
    case AppActions.AddComponent:
      return AppBehavior.addComponent(state, action.id, action.componentId)

    case AppActions.Insert:
      return AppBehavior.addApp(state, action.app)

    case AppActions.Remove:
      return state.delete(action.id)

    case AppActions.SortComponents:
      return AppBehavior.sortComponents(
        state,
        app.get('name'),
        action.index,
        action.componentId
      )

    case ComponentActions.Destroy:
      return AppBehavior.removeComponent(state, app.get('name'), action.id)

    default:
      return state
  }
}

function clouds(state = fromJS({}), action) {
  let cloud = state.toList().first()
  switch (action.type) {
    case AppActions.Insert:
      return state.set(
        cloud.get('name'),
        cloud.update(
          'apps',
          list => {
            let name = action.app.get('name')

            if (!list) { return fromJS([name]) }

            return list.indexOf(name) >= 0 ? list : list.push(name)
          }
        )
      )

    case AppActions.Remove:
      return state.set(
        cloud.get('name'),
        cloud.update(
          'apps',
          list => {
            let index = list.indexOf(action.id)
            return index >= 0 ? list.remove(index) : list
          }
        )
      )

    default:
      return state
  }
}

function components(state = fromJS({}), action) {
  switch (action.type) {
    case ComponentActions.Insert:
      return state.set(action.component.get('id'), action.component)

    case ComponentActions.Destroy:
      return state.delete(action.id)

    case ComponentActions.Update:
      return state.set(
        action.id,
        state.get(action.id).merge(fromJS(action.params))
      )

    default:
      return state
  }
}

function layouts(state = fromJS({}), action) {
  switch (action.type) {
    case LayoutActions.Fade:
      return state.set('faded', true)

    case LayoutActions.Unfade:
      return state.set('faded', false)

    default:
      return state
  }
}

function meta(state = fromJS({}), action) { return state }

function notifications(state = fromJS({}), action) {
  const { id, level, message } = action
  switch (action.type) {
    case NotificationsActions.Add:
      return state.set(id, fromJS({ level, message, id }))

    case NotificationsActions.Remove:
      return state.delete(id)

    default:
      return state
  }
}

function nodes(state = fromJS({}), action) { return state }

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
    }
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
  clouds,
  components,
  containers,
  entrypoints,
  form,
  instances,
  layouts,
  notifications,
  meta,
  nodes,
  releases,
  registries,
  routing,
  volumes
}

export const Supergiant = combine(manifest, fromJS({}))
