import { fromJS } from 'immutable'

// This is a manifest of all of the reducer limbs of the state tree which the
// Supergiant function will compose into a single reducer.  This is used in
// place of the proscribed Redux function `composeReducers`, which does the
// same thing functionally, but doesn't inherently obey immutable state.
//
function* limbs(manifest) {
  for (var limb in manifest) {
    yield { name: limb, reducer: Reflect.get(manifest, limb) }
  }
}

// Here we have a version of the Redux function `composeReducers`, which obeys
// an immutable state tree.  Normally the state would be converted in and out
// of an immutable state in other spots, but for the sake of internally only
// recognizing an immutable interface, we defer the serialization to this
// final output.
//
export function combine(manifest, startState = fromJS({}), startAction = {}) {
  const combiner = (state = startState, action = startAction) => {
    let merge = (state, { name, reducer }) => {
      var output = Reflect.apply(reducer, null, [state.get(name), action])

      return state.merge({ [name]: output })
    }

    return [...limbs(manifest)].reduce(merge, state)
  }

  return combiner
}
