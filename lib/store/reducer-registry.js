export default class ReducerRegistry {
  constructor(reducers = {}) {
    this.contents = reducers
    this.listener = null
  }

  register(newReducers) {
    this.contents = { ...(this.contents), ...newReducers }

    if (this.isListening()) { this.listener(this.contents) }
  }

  reducers() { return this.contents }

  isListening() {
    return this.listener && typeof this.listener === 'function'
  }

  subscribe(listener) {
    if (this.listener) {
      throw new Error(`Only one listener per ReducerRegistry is allowed.`)
    }

    this.listener = listener
  }
}
