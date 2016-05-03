import uuid from 'uuid'
import { fromJS, Record } from 'immutable'
import { kebabCase } from 'lodash'
import App from './app'
import Deploys from '../deploys'
import Releases from '../releases'

const componentSchema = {
  appName: ``,
  color: ``,
  created: ``,
  name: ``,
  tags: {},
  updated: ``
}

export default class Component extends Record(componentSchema) {
  constructor(params) {
    const {
      appName,
      color,
      created,
      name,
      tags = {},
      updated
    } = params

    super({
      name: kebabCase(name),
      created,
      updated,
      tags: fromJS(tags)
        .update('appKey', cached => cached || kebabCase(appName))
        .update('appName', cached => cached || appName)
        .update('color', cached => cached || color)
        .update('id', cached => cached || uuid.v4())
        .update('name', cached => cached || name)
    })

    this.app = new App({ name: this.tags.get('appName') })
    this.uri = `/api/v0/apps/${this.app.key()}/components/${this.name}`
    this.releases = new Releases({ scope: this.uri })
    this.deploys = new Deploys({ scope: this.uri })
  }

  displayName() { return this.tags.get('name') }
  id() { return this.tags.get('id') }
  key() { return this.name }

  toPayload() {
    const { name, tags } = this
    return { name, tags: tags.toJS() }
  }
}
