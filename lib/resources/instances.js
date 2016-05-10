import ResourceClient from './resource-client'
import Instance from './entities/instance'

const composeApi = ({ client, scope }) => {
  const api = new ResourceClient({ client })

  api.route = `${scope}/instances`
  api.resource = Instance

  return api
}

export default class Instances {
  constructor({ client, scope }) {
    const api = composeApi({ client, scope })

    this.fetch = api.fetch
    this.get = api.get
    this.route = api.route
  }
}
