import ResourceClient from './resource-client'
import App from './entities/app'

const route = `/api/v0/apps`

export default class Apps extends ResourceClient {
  constructor(client) {
    super({ client, route, resource: App })
  }
}
