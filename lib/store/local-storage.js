import { fromJS } from 'immutable'
import throttle from 'lodash/throttle'

const storageKey = `sg-memory`
const whitelist = [`meta`]
const blacklist = []

const whitelisted = (key, val) => {
  if (whitelist.length === 0) { return true }

  return whitelist.includes(val)
}

const notBlacklisted = (key, val) => {
  if (blacklist.length === 0) { return true }

  return !blacklist.includes(val)
}

export function persist(store) {
  return () => {
    if (window) {
      let storage = window.localStorage
      let state = store.getState().filter(whitelisted).filter(notBlacklisted)
      let serialized = JSON.stringify(state.toJS())

      throttle(() => storage.setItem(storageKey, serialized), 5000)
    }
  }
}

export function rehydrate(initializer, seedState) {
  if (window) {
    let storage = window.localStorage
    let persistedState = storage.getItem(storageKey)

    if (persistedState) {
      return initializer.mergeDeep(fromJS(JSON.parse(persistedState)))
    } else if (seedState) {
      return initializer.mergeDeep(fromJS(seedState))
    } else {
      return initializer
    }
  } else {
    return initializer
  }
}
