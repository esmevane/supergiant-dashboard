import ResourceClient from './resource-client'
import Node from './entities/node'

const route = `/api/v0/nodes`

export default class Nodes extends ResourceClient {
  constructor(client) {
    super({ client, route, resource: Node })
  }
}
