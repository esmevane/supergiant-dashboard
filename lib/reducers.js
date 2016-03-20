import { fromJS } from 'immutable'
import { reducer as formReducer } from 'redux-form'
import { combine } from './shared/combine.reducer'
import { reorder } from './shared/entities.behavior'
import * as AppActions from './apps/apps.actions'
import * as ComponentActions from './components/components.actions'
import * as LayoutActions from './layouts/layouts.actions'
import * as ModalActions from './modals/modals.actions'

function clouds(state = fromJS({}), action) {
  let cloud = state.toList().first()
  switch (action.type) {
    case AppActions.Insert:
      let apps = cloud.get('apps') || fromJS([])

      return state.set(
        cloud.get('id'),
        cloud.set('apps', apps.push(action.app.get('id')))
      )
    case AppActions.Reorder:
      let ids = (cloud.get('apps') || fromJS([]))
      return state.set(
        cloud.get('id'),
        cloud.set('apps', reorder(action.id, action.index, ids))
      )
    default:
      return state
  }
}

function apps(state = fromJS({}), action) {
  let app = state.get(action.id)
  let componentIds = fromJS([])

  if (app) { componentIds = app.get('components') || fromJS([]) }

  switch (action.type) {
    case AppActions.AddComponent:
      return state.set(
        action.id,
        app.set('components', componentIds.push(action.componentId))
      )
    case AppActions.Insert:
      return state.set(action.app.get('id'), action.app)
    case AppActions.SortComponents:
      return state.set(
        app.get('id'),
        app.set('components', reorder(
          action.componentId,
          action.index,
          componentIds
        ))
      )
    default:
      return state
  }
}

function components(state = fromJS({}), action) {
  switch (action.type) {
    case ComponentActions.Insert:
      return state.set(action.component.get('id'), action.component)
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

function modals(state = fromJS({ content: [], hidden: true }), action) {
  switch (action.type) {
    case ModalActions.Open:
      return state.set('content', fromJS([action.component]))
    case ModalActions.Close:
      return state.set('content', fromJS([]))
    case ModalActions.Show:
      return state.set('hidden', false)
    case ModalActions.Hide:
      return state.set('hidden', true)
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
  return fromJS(formReducer(fromJS(state).toJS(), action))
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
  form,
  layouts,
  meta,
  modals,
  nodes,
  routing
}

export const Supergiant = combine(manifest, fromJS({}))
