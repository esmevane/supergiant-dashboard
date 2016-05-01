import uuid from 'uuid'
import { fromJS, Record } from 'immutable'

const entrypointSchema = {
  domain: ``,
  address: ``,
  tags: {},
  created: ``,
  updated: ``
}

export default class Entrypoint extends Record(entrypointSchema) {
  constructor({ address, domain, created, updated, tags = {} }) {
    super({
      domain,
      address,
      created,
      updated,
      tags: fromJS(tags).update('id', id => id || uuid.v4())
    })
  }

  id() { return this.tags.get('id') }
  key() { return this.domain }

  toPayload() {
    const { domain, tags } = this
    return { domain, tags: tags.toJS() }
  }
}
