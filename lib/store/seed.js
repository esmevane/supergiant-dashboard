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
    registries: [
      {
        name: `docker-hub`,
        uri: `https://hub.docker.com`,
        metadata: {
          tags: [{ name: `name`, value: `Docker Hub` }]
        },
        repos: [
          {
            name: "organization",
            key: "arglebargle",
            metadata: {
              tags: [{ name: `name`, value: `Organization` }]
            }
          }
        ]
      }
    ],
    apps: []
  }
])
