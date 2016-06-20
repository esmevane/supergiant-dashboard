import { fromJS } from 'immutable'
import { reducer as formReducer } from 'redux-form'
import { combine } from 'lib/combine-reducers'

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

const configureReducers = reducers => {
  return combine({ form, routing, ...reducers }, fromJS({}))
}

export default configureReducers
