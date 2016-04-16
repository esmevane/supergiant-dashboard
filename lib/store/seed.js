import uuid from 'uuid'
import { clouds, parseClouds } from '../schema'

export const seed = parseClouds([
  {
    name: `local-cloud`,
    metadata: {
      tags: [{ name: `name`, value: `Local cloud` }]
    },
    nodes: [
      {
        name: `master`,
        size: `m4.large`,
        metadata: {
          tags: [{ name: `name`, value: `Master node` }]
        }
      }
    ],
    entrypoints: [],
    registries: [],
    apps: []
  }
])
