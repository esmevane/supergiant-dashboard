import { denormalize } from './schema/support'
import { normalize, Schema, arrayOf } from 'normalizr'

export const clouds = new Schema('clouds')
export const apps = new Schema('apps')
export const nodes = new Schema('nodes')
export const components = new Schema('components')
export const schema = {
  name: 'clouds',
  has: [
    { name: 'nodes' },
    {
      name: 'apps',
      has: [ { name: 'components' } ]
    }
  ]
}

clouds.define({
  apps: arrayOf(apps),
  nodes: arrayOf(nodes)
})

apps.define({ components: arrayOf(components) })

export const parseClouds = json => normalize(json, arrayOf(clouds))
export const serializeClouds = state => denormalize(state, schema)
