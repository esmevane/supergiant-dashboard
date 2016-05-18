import ResourceClient from './resource-client'
import Release from './entities/release'

const composeApi = ({ client, scope }) => {
  const api = new ResourceClient({ client })

  api.route = `${scope}/releases`
  api.resource = Release

  return api
}

export default class Releases {
  constructor({ client, scope }) {
    const api = composeApi({ client, scope })

    for (let property of api) {
      let method = Reflect.get(api, property)

      Reflect.set(this, property, method)
    }
  }
}
