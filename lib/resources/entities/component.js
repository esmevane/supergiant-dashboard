import uuid from 'uuid'
import { fromJS, Record } from 'immutable'
import kebabCase from 'lodash/kebabCase'
import App from './app'
import Deploys from '../deploys'
import Releases from '../releases'

const componentSchema = {
  appName: ``,
  color: ``,
  created: ``,
  name: ``,
  current_release_id: null,
  target_release_id: null,
  custom_deploy_script: {},
  addresses: {},
  tags: {},
  updated: ``
}

export default class Component extends Record(componentSchema) {
  constructor(params) {
    const {
      addresses = {},
      appName,
      color,
      created,
      current_release_id,
      custom_deploy_script = {},
      name,
      tags = {},
      target_release_id,
      updated
    } = params

    super({
      name: kebabCase(name),
      custom_deploy_script: fromJS(custom_deploy_script),
      addresses: fromJS(addresses),
      current_release_id,
      target_release_id,
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
  displayColor() { return this.tags.get('color') }
  id() { return this.tags.get('id') }
  key() { return this.name }

  internalAddresses() {
    const internals = this.addresses.get('internal')

    return internals
      ? internals.map(entry => entry.get('address'))
      : []
  }

  externalAddresses() {
    const externals = this.addresses.get('external')

    return externals
      ? externals.map(entry => entry.get('address'))
      : []
  }

  updateWith(params = {}) {
    return this.update('tags', currentTags => currentTags.merge(params))
  }

  toPayload() {
    const { name, custom_deploy_script, tags } = this

    return {
      name,
      custom_deploy_script: custom_deploy_script.toJS(),
      tags: tags.toJS()
    }
  }
}
