import { fromJS } from 'immutable'
import Image from './entities/image'

class MemoryStorage {
  constructor() { this.contents = fromJS({}) }
  setItem(key, json) { this.contents = this.contents.set(key, json) }
  getItem(key) { return this.contents.get(key) }
}

const storageKey = `sg-images`
const storage = typeof window === 'object'
  ? window.localStorage
  : new MemoryStorage

const persist = imageContents => {
  let candidate = imageContents
    .filter(image => image)
    .map(image => image.toPayload())
    .toJS()

  storage.setItem(storageKey, JSON.stringify(candidate))
}

const rehydrate = () => {
  let raw = storage.getItem(storageKey) || "{}"
  let parsed = JSON.parse(raw)

  return fromJS(parsed).map(image => {
    return new Image(image.toJS())
  })
}

export default class Images {
  get = key => Promise.resolve(rehydrate().get(key))
  fetch = () => Promise.resolve(rehydrate().toList())

  delete = key => {
    persist(rehydrate().set(key, undefined))

    return Promise.resolve({})
  }

  create = params => {
    const image = new Image(params)

    persist(rehydrate().set(image.key(), image))

    return Promise.resolve(image)
  }

  update = resource => {
    const contents = rehydrate()
    const image = contents.get(resource.key())

    if (image) {
      const update = image.updateWith(resource.toPayload())

      persist(contents.set(image.key(), update))

      return Promise.resolve(update)
    } else {
      throw new Error(`Unable to locate resource with ${resource.key()}`)
    }
  }
}
