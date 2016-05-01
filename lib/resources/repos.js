import ResourceClient from './resource-client'
import Repo from './entities/repo'

const route = `/api/v0/registries/dockerhub/repos`

export default class Repos extends ResourceClient {
  constructor(client) {
    super({ client, route, resource: Repo })
  }
}
