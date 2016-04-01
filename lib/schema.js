import { denormalize } from './schema/support'
import { normalize, Schema, arrayOf } from 'normalizr'

const idAttribute = 'name'

export const apps = new Schema('apps', { idAttribute })
export const clouds = new Schema('clouds', { idAttribute })
export const components = new Schema('components', { idAttribute })
export const nodes = new Schema('nodes', { idAttribute })
export const registries = new Schema('registries', { idAttribute })
export const repos = new Schema('repos', { idAttribute })

apps.define({ components: arrayOf(components) })

clouds.define({
  registries: arrayOf(registries),
  apps: arrayOf(apps),
  nodes: arrayOf(nodes),
})

registries.define({ repos: arrayOf(repos) })

export const schema = {
  name: 'clouds',
  has: [
    {
      name: 'registries',
      has: [ { name: 'repos' } ]
    },
    { name: 'nodes' },
    {
      name: 'apps',
      has: [ { name: 'components' } ]
    }
  ]
}

export const parseClouds = json => normalize(json, arrayOf(clouds))
export const serializeClouds = state => denormalize(state, schema)
