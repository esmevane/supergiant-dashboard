import uuid from 'uuid'
import { clouds, parseClouds } from '../schema'

export const seed = parseClouds([
  {
    id: uuid.v4(),
    title: `Local cloud`,
    nodes: [{ id: uuid.v4(), name: `Master`, size: `m4.large` }]
  }
])
