import { entrypointRoute, ResourceClient } from '../client'
import { fromJS } from 'immutable'

export const deleteEntrypoint = domain =>
  new ResourceClient(entrypointRoute()).delete(domain)

export const getEntrypoints = () =>
  new ResourceClient(entrypointRoute()).fetch()

export const saveEntrypoint = entrypoint =>
  new ResourceClient(entrypointRoute()).create(entrypoint.toJS())

export class Entrypoint {
  static from({ address, tags, domain }) {
    return new Entrypoint({ address, tags, domain })
  }

  static create({ address, tags, domain }) {
    return new Entrypoint({ address, tags, domain })
  }

  constructor({ domain, address, tags }) {
    this.address = address
    this.domain = domain
    this.tags = fromJS(tags)
  }

  id() { return this.domain }
  tags() { return this.tags.toJS() }
  toJS() { return this.toMap().toJS() }

  toMap() {
    let { address, domain, tags } = this
    return fromJS({ address, domain, tags })
  }
}

export class Entrypoints {
  static from({ items }) {
    return new Entrypoints(items.map(item => Entrypoint.from(item)))
  }

  constructor(entrypoints) { this.contents = entrypoints }
  count() { return this.contents.length }
  first() { return this.contents[0] }
  toJS() { return this.contents }

  *[Symbol.iterator]() {
    for (let entrypoint of this.toJS()) { yield entrypoint.toMap() }
  }
}
