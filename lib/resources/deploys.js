import ResourceClient from './resource-client'
import Deploy from './entities/deploy'

const composeApi = ({ client, scope }) => {
  const api = new ResourceClient({ client })

  api.route = `${scope}/deploy`
  api.resource = Deploy

  return api
}

export default class Deploys {
  constructor({ client, scope }) {
    const api = composeApi({ client, scope })

    this.create = api.create
    this.route = api.route
  }
}
