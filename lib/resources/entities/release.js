import uuid from 'uuid'
import { fromJS, Record } from 'immutable'
import kebabCase from 'lodash/kebabCase'
import App from './app'
import Component from './component'
import Instances from '../instances'

const releaseSchema = {
  containers: [],
  created: ``,
  instance_number: ``,
  tags: {},
  termination_grace_period: ``,
  timestamp: ``,
  updated: ``,
  volumes: []
}

export default class Release extends Record(releaseSchema) {
  constructor(params) {
    const {
      appName,
      componentName,
      containers = [],
      created,
      instance_number = 1,
      tags = {},
      termination_grace_period = 10,
      timestamp,
      updated,
      volumes = []
    } = params

    super({
      created,
      instance_number,
      updated,
      termination_grace_period,
      timestamp,
      containers: fromJS(containers),
      volumes: fromJS(volumes),
      tags: fromJS(tags)
        .update('appKey', cached => cached || kebabCase(appName))
        .update('appName', cached => cached || appName)
        .update('componentKey', cached => cached || kebabCase(componentName))
        .update('componentName', cached => cached || componentName)
        .update('id', cached => cached || uuid.v4())
    })

    this.app = new App({ name: appName })
    this.component = new Component({ name: componentName, appName })
    this.uri = `${this.component.uri}/releases/${this.timestamp}`
    this.instances = new Instances({ scope: this.uri })
  }

  id() { return this.tags.get('id') }
  key() { return this.timestamp }

	updateWith(params) {
		return this.update('tags', currentTags => currentTags.merge(params))
	}

  toPayload() {
    const { name, tags } = this
    return { name, tags: tags.toJS() }
  }
}
