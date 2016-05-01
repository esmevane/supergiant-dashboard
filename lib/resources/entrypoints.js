import ResourceClient from './resource-client'
import Entrypoint from './entities/entrypoint'

const route = `/api/v0/entrypoints`

export default class Entrypoints extends ResourceClient {
  constructor(client) {
    super({ client, route, resource: Entrypoint })
  }
}
