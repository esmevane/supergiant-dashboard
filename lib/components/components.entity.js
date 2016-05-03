import { componentRoute, ResourceClient } from '../client'
import { fromJS } from 'immutable'
import { kebabCase } from 'lodash'

export const deleteComponent = (appName, id) =>
  new ResourceClient(componentRoute(appName)).delete(id)

export const getComponent = (appName, id) =>
  new ResourceClient(componentRoute(appName)).get(id)

export const updateComponent = (appName, id, params) =>
  new ResourceClient(componentRoute(appName)).update(id, params)

export const getComponents = (appName) =>
  new ResourceClient(componentRoute(appName)).fetch()

export const saveComponent = (appName, component) =>
  new ResourceClient(componentRoute(appName)).create(component.toJS())

export class Component {
  static from({ tags, name, addresses }, appName) {
    let key = [appName, name].join('-')

    return new Component({ addresses, tags, name: key })
  }

  static create(params, appName) {
    let { color, icon, name } = params
    let tags = { name, color, icon }
    let key = kebabCase([appName, name].join('-'))

    return new Component({ name: key, tags })
  }

  constructor({ name, addresses, tags }, appName) {
    this.name = name
    this.addresses = fromJS(addresses)
    this.tags = fromJS(tags)
  }

  containers() {
    const raw = this.tags.get('containers') || "{}"
    try {
      return JSON.parse(raw)
    } catch(error) {
      return {}
    }
  }

  volumes() {
    const raw = this.tags.get('volumes') || "{}"
    try {
      return JSON.parse(raw)
    } catch(error) {
      return {}
    }
  }

  id() { return this.name }

  toJS() { return this.toMap().toJS() }

  toMap() {
    return fromJS({
      name: kebabCase(this.tags.get('name')),
      tags: this.tags,
      id: this.name,
      addresses: this.addresses,
      containers: this.containers(),
      volumes: this.volumes(),
      instance_number: this.tags.get('instance_number'),
      color: this.tags.get('color'),
      icon: this.tags.get('icon')
    })
  }
}

export class Components {
  static from({ items }, appName) {
    return new Components(items.map(item => Component.from(item, appName)))
  }

  constructor(components) { this.contents = components }
  count() { return this.contents.length }
  first() { return this.contents[0] }
  toJS() { return this.contents }

  *[Symbol.iterator]() {
    for (let component of this.toJS()) { yield component.toMap() }
  }
}
