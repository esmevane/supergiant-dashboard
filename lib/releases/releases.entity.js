import { releaseRoute, ResourceClient } from '../client'
import { fromJS } from 'immutable'

export const getReleases = (...pathElements) =>
  new ResourceClient(releaseRoute(...pathElements)).fetch()

export const getRelease = (appName, componentName, releaseId) =>
  new ResourceClient(releaseRoute(appName, componentName)).get(releaseId)

export const createRelease = (appName, componentName, release) => {
  let client = new ResourceClient(releaseRoute(appName, componentName))

  return client.create(release.toJS())
}

export const updateRelease = (appName, componentName, release) => {
  let client = new ResourceClient(releaseRoute(appName, componentName))

  return client.update(release.get('timestamp'), release.toJS())
}

export const deleteRelease = (appName, componentName, releaseId) => {
  let client = new ResourceClient(releaseRoute(appName, componentName))

  return client.delete(releaseId)
}

export class Release {
  static from(params) { return new Release(params) }
  static create(params) { return new Release(params) }

  constructor(params) {
    this.timestamp = params.timestamp
    this.detail = params
  }

  id() { return this.timestamp }
  toJS() { return this.toMap().toJS() }
  toMap() { return fromJS({ ...(this.detail) }) }
}

export class Releases {
  static from({ items }) {
    return new Releases(items.map(item => Release.from(item)))
  }

  constructor(releases) { this.contents = releases }
  count() { return this.contents.length }
  first() { return this.contents[0] }
  toJS() { return this.contents }

  *[Symbol.iterator]() {
    for (let release of this.toJS()) { yield release.toMap() }
  }
}
