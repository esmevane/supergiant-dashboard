import { fromJS } from 'immutable'

const whitelist = [ `instancesMeta`, `layouts`, `meta` ]
const whitelisted = (key, val) => whitelist.includes(val)

export function persist(store) {
  return () => {
    if (window) {
      let storage = window.localStorage
      let timestamp = storage.getItem('sg-timestamp')
      let now = Number(new Date)
      let state = store.getState().filter(whitelisted)

      if (!timestamp) {
        storage.setItem('sg-timestamp', now)
        storage.setItem('sg-memory', JSON.stringify(state.toJS()))
      } else {
        let seconds = 5 * 1000

        if ((now - Number(timestamp)) > seconds) {
          storage.setItem('sg-memory', JSON.stringify(state.toJS()))
        }
      }
    }
  }
}

export function rehydrate(initializer, seedState) {
  if (window) {
    let storage = window.localStorage
    let persistedState = storage.getItem('sg-memory')

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
