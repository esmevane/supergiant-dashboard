import { fromJS, Record } from 'immutable'

const nodeSchema = {
  id: ``,
  name: ``,
  class: ``,
  provider_creation_timestamp: ``,
  out_of_disk: false,
  status: `NOT_READY`,
  cpu: { usage: 0, limit: 0 },
  ram: { usage: 0, limit: 0 },
  tags: {},
  created: ``,
  updated: ``
}

export default class Node extends Record(nodeSchema) {
  constructor({ tags = {}, id, ...rest }) {
    super({ tags: fromJS(tags), ...rest })
    this._id = id
  }

  id() { return this._id }
  key() { return this._id }

  toPayload() {
    const {
      _id,
      name,
      provider_creation_timestamp,
      out_of_disk,
      cpu,
      ram,
      created,
      updated,
      tags
    } = this

    return {
      id: _id,
      name,
      class: this.class,
      provider_creation_timestamp,
      out_of_disk,
      cpu,
      ram,
      created,
      updated,
      tags: tags.toJS()
    }
  }
}
