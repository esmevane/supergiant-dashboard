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
      tags: fromJS(tags)
        .update('id', id => id || uuid.v4())
        .update('domain', cached => cached || domain)
    })
  }

  id() { return this.tags.get('id') }
  key() { return this.domain }
  displayName() { return this.tags.get('domain') }

  updateWith(params) {
    return this.update('tags', currentTags => currentTags.merge(params))
  }

  toPayload() {
    const { domain, tags } = this
    return { domain, tags: tags.toJS() }
  }
}
