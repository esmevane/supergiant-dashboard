import { appRoute, ResourceClient } from '../client'
import { fromJS } from 'immutable'
import { kebabCase } from 'lodash'

export const deleteApp = (id) => new ResourceClient(appRoute()).delete(id)
export const getApps = () => new ResourceClient(appRoute()).fetch()
export const saveApp = (app) =>
  new ResourceClient(appRoute()).create(app.toJS())

export class App {
  static from({ tags, name }) { return new App({ tags, name }) }
  static create(params) {
    let tags = { name: params.name }
    let name = kebabCase(params.name)
    return new App({ name, tags })
  }

  constructor({ name, tags }) {
    this.name = name
    this.tags = fromJS(tags)
  }

  id() { return this.name }
  tags() { return this.tags.toJS() }
  toJS() { return this.toMap().toJS() }
  toMap() { return fromJS({ name: this.name, tags: this.tags }) }
}

export class Apps {
  static from({ items }) { return new Apps(items.map(item => App.from(item))) }

  constructor(apps) { this.contents = apps }
  count() { return this.contents.length }
  first() { return this.contents[0] }
  toJS() { return this.contents }

  *[Symbol.iterator]() {
    for (let app of this.toJS()) {
      yield app.toMap()
    }
  }
}
