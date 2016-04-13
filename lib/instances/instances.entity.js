import { instanceRoute, ResourceClient } from '../client'
import { fromJS } from 'immutable'

export const getInstances = (...pathElements) =>
  new ResourceClient(instanceRoute(...pathElements)).fetch()

export const getInstance = (app, component, release, id) => {
  let route = instanceRoute(app, component, release)
  let client = new ResourceClient(route)

  return client.get(id)
}

export const getInstanceLogs = (app, component, release, id) => {
  let route = instanceRoute(app, component, release)
  let client = new ResourceClient(route)

  return client.get(`${id}/log`)
}

export const startInstance = (app, component, release, id) => {
  let route = `${instanceRoute(app, component, release)}/${id}/start`
  let client = new ResourceClient(route)

  return client.create({})
}

export const stopInstance = (app, component, release, id) => {
  let route = `${instanceRoute(app, component, release)}/${id}/start`
  let client = new ResourceClient(route)

  return client.create({})
}

export class Instance {
  static from(params) { return new Instance(params) }
  static create(params) { return new Instance(params) }

  constructor(params) {
    this.id = params.id
    this.detail = params
  }

  id() { return this.timestamp }
  toJS() { return this.toMap().toJS() }
  toMap() { return fromJS({ ...(this.detail) }) }
}

export class Instances {
  static from({ items }) {
    return new Instances(items.map(item => Instance.from(item)))
  }

  constructor(instances) { this.contents = instances }
  count() { return this.contents.length }
  first() { return this.contents[0] }
  toJS() { return this.contents }

  *[Symbol.iterator]() {
    for (let release of this.toJS()) { yield release.toMap() }
  }
}
