import { fromJS, Record } from 'immutable'
import uuid from 'uuid'

const schema = { name: ``, _id: `` }

export default class Image extends Record(schema) {
  constructor({ name, id = uuid.v4() }) {
    super({ name, _id: id })
  }

  id() { return this._id }
  key() { return this._id }

  toPayload() {
    const { name, _id: id } = this

    return { name, id }
  }

  updateWith({ id: _id, ...rest }) {
    return this.mergeDeep({ ...rest })
  }
}
