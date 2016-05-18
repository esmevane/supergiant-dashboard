import { fromJS } from 'immutable'
import fetch from 'isomorphic-fetch'

const throwErrorUnless = successCode =>
  ({ response, body }) => {
    if (response.status !== successCode) {
      let { status, url } = response
      let errors = body.errors ? body.errors.join(', ') : body.error
      throw `[${status}] '${url}': ${errors}`
    }

    return { response, body }
  }

const renderResponse = (response, content) => {
  try {
    let json = JSON.parse(content)

    return { response, body: json }
  } catch(error) {
    return { response, body: { errors: [content] } }
  }
}

const getResources = resource => {
  return async () => {
    let response = await fetch(`${resource}`)
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

const getResource = resource => {
  return async (id) => {
    let response = await fetch(`${resource}/${id}`)
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

const createResource = resource => {
  return async (params) => {
    let method   = `POST`
    let request  = { method, body: JSON.stringify(params) }
    let response = await fetch(`${resource}`, request)
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

const deleteResource = resource => {
  return async (id) => {
    let method   = `DELETE`
    let response = await fetch(`${resource}/${id}`, { method })
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

const updateResource = resource => {
  return async (id, params) => {
    let method   = `PUT`
    let body     = JSON.stringify(params)
    let request  = { method, body }
    let response = await fetch(`${resource}/${id}`, request)
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

const marshalResource = resource =>
  ({ body }) => new resource(body)

const marshalCollection = resource =>
  ({ body }) =>
    body.items && body.items.map(item => new resource(item))

export default class ResourceClient {
  constructor({ client, route, resource }) {
    this.client = client
    this.route = route
    this.resource = resource
  }

  *[Symbol.iterator]() {
    let publicInterfaces = [
      `client`,
      `create`,
      `delete`,
      `fetch`,
      `get`,
      `resource`,
      `route`,
      `update`
    ]

    for (let publicInterface of publicInterfaces) { yield publicInterface }
  }

  get(key) {
    let handler = this.client ? this.client.getResource : getResource
    let get = handler(this.route)

    return get(key)
      .then(throwErrorUnless(200))
      .then(marshalResource(this.resource))
  }

  fetch() {
    let handler = this.client ? this.client.getResources : getResources
    let fetch = handler(this.route)

    return fetch()
      .then(throwErrorUnless(200))
      .then(marshalCollection(this.resource))
  }

  delete(key) {
    let handler = this.client ? this.client.deleteResource : deleteResource
    let destroy = handler(this.route)

    return destroy(key).then(throwErrorUnless(202))
  }

  create(params) {
    let resource = new this.resource(params)
    let handler = this.client ? this.client.createResource : createResource
    let create = handler(this.route)

    return create(resource.toPayload())
      .then(throwErrorUnless(201))
      .then(marshalResource(this.resource))
  }

  update(resource) {
    let handler = this.client ? this.client.updateResource : updateResource
    let update = handler(this.route)

    return update(resource.key(), resource.toPayload())
      .then(throwErrorUnless(202))
      .then(marshalResource(this.resource))
  }
}
