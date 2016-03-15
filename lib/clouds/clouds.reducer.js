import { InitialState } from '../schema'
import * as Actions from './clouds.actions'
import { combine } from '../shared/combine.reducer'

const initializer = InitialState.get('clouds')

function active(state = initializer.get('active'), action) {
  return state
}

function contents(state = initializer.get('contents'), action) {
  return state
}

function meta(state = initializer.get('meta'), action) { return state }

export default combine({ active, contents, meta }, initializer)
