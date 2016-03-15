import development from './development'
import production from './production'

const Environment = process.env.NODE_ENV
const store = Environment === 'production' ? production : development

store.subscribe(() => {
  if (window) {
    let storage = window.localStorage
    let timestamp = storage.getItem('sg-timestamp')
    let now = Number(new Date)

    if (!timestamp) {
      storage.setItem('sg-timestamp', now)
      storage.setItem('sg-memory', JSON.stringify(store.getState().toJS()))
    } else {
      let seconds = 5 * 1000

      if ((now - Number(timestamp)) > seconds) {
        storage.setItem('sg-memory', JSON.stringify(store.getState().toJS()))
      }
    }
  }
})

export default store
