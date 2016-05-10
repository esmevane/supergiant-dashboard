import uuid from 'uuid'
import { Record } from 'immutable'

const entrySchema = { usage: 0, limit: 0 }
export default class Meter extends Record(entrySchema) {
  constructor(body) { super({ body }) }
  toPayload() { return {} }
}
