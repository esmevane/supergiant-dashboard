import { registryRoute, ResourceClient } from '../client'
import { fromJS } from 'immutable'

export const getRegistries = () =>
  new ResourceClient(registryRoute()).fetch()

export const deleteRegistry = name =>
  new ResourceClient(registryRoute()).delete(name)

export const saveRegistry = registry =>
  new ResourceClient(registryRoute()).create(registry.toJS())

export class Registry {
  static from({ name, key, secret_type }) {
    return new Registry({ name, key, secret_type })
  }

  static create({ name, key, secret_type }) {
    return new Registry({ name, key, secret_type })
  }

  constructor({ name, key, secret_type }) {
    this.name = name
    this.key = key
    this.secret_type = secret_type
  }

  id() { return this.name }
  toJS() { return this.toMap().toJS() }

  toMap() {
    let { name, key, secret_type } = this
    return fromJS({ name, key, secret_type })
  }
}

export class Registries {
  static from({ items }) {
    return new Registries(items.map(item => Registry.from(item)))
  }

  constructor(registries) { this.contents = registries }
  count() { return this.contents.length }
  first() { return this.contents[0] }
  toJS() { return this.contents }

  *[Symbol.iterator]() {
    for (let registry of this.toJS()) { yield registry.toMap() }
  }
}
