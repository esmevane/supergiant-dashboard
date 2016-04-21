import { fromJS } from 'immutable'

const blacklist = [
  `apps`,
  `components`,
  `containers`,
  `entrypoints`,
  `form`,
  `instances`,
  `layouts`,
  `nodes`,
  `releases`,
  `routing`,
  `volumes`
]

const notBlacklisted = (key, val) => !blacklist.includes(val)

export function persist(store) {
  return () => {
    if (window) {
      let storage = window.localStorage
      let timestamp = storage.getItem('sg-timestamp')
      let now = Number(new Date)
      let state = store.getState().filter(notBlacklisted)

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
