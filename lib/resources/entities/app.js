import uuid from 'uuid'
import { fromJS, Record } from 'immutable'
import { kebabCase } from 'lodash'
import Components from '../components'

const appSchema = { name: ``, tags: {}, created: ``, updated: `` }

export default class App extends Record(appSchema) {
  constructor({ name, created, updated, tags = {} }) {
    super({
      name: kebabCase(name),
      created,
      updated,
      tags: fromJS(tags)
        .update('id', id => id || uuid.v4())
        .update('name', currentName => currentName || name)
    })

    this.uri = `/api/v0/apps/${this.name}`
    this.components = new Components({ scope: this.uri })
  }

  displayName() { return this.tags.get('name') }
  id() { return this.tags.get('id') }
  key() { return this.name }

  toPayload() {
    const { name, tags } = this
    return { name, tags: tags.toJS() }
  }
}
