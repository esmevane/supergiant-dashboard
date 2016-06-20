import { fromJS } from 'immutable'
import kebabCase from 'lodash/kebabCase'
import { dirname } from 'path'
import { combine } from 'lib/combine-reducers'

const context = require.context('./containers', true, /reducers\.js/)
const get = () =>
  context
    .keys()
    .map(key => ({ [kebabCase(dirname(key))]: context(key).default }))
    .reduce((manifest, object) => ({ ...manifest, ...object }))

const manifest = { ...get() }

export { get, context }
export default manifest
