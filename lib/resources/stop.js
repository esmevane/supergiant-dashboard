import ResourceClient from './resource-client'
import Instance from './entities/instance'

const composeApi = ({ client, scope }) => {
  const api = new ResourceClient({ client })

  api.route = `${scope}/stop`
  api.resource = Instance

  return api
}

export default class Stop {
  constructor({ client, scope }) {
    const api = composeApi({ client, scope })

    this.create = api.create
    this.route = api.route
  }
}
