import ResourceClient from './resource-client'
import Component from './entities/component'

const composeApi = ({ client, scope }) => {
  const api = new ResourceClient({ client })

  api.route = `${scope}/components`
  api.resource = Component

  return api
}

export default class Components {
  constructor({ client, scope }) {
    const api = composeApi({ client, scope })

    for (let property of Reflect.ownKeys(api)) {
      let method = Reflect.get(api, property)

      Reflect.set(this, property, method)
    }
  }
}
