import { InitialState } from '../schema'
import * as Actions from './dashboards.actions'
import { combine } from '../shared/combine.reducer'

const initializer = InitialState.get('dashboards')

function content(state = initializer.get('content'), action) {
  return state
}

function meta(state = initializer.get('meta'), action) { return state }

export default combine({ content, meta }, initializer)
