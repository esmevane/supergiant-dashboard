import uuid from 'uuid'
import { fromJS, Record } from 'immutable'
import kebabCase from 'lodash/kebabCase'
import App from './app'
import Component from './component'
import Release from './release'
import Meter from './meter'
import Log from '../log'
import Start from '../start'
import Stop from '../stop'

const instanceSchema = {
  id: ``,
  base_name: ``,
  name: ``,
  status: `STOPPED`,
  cpu: new Meter({}),
  ram: new Meter({})
}

export default class Instance extends Record(instanceSchema) {
  constructor(params) {
    const { id, base_name, name, status, cpu = {}, ram = {} } = params
    const { appName, componentName, timestamp } = params

    super({
      id,
      base_name,
      name,
      status,
      cpu: new Meter(cpu),
      ram: new Meter(ram)
    })

    this._id = id
    this.app = new App({ name: appName })
    this.component = new Component({ name: componentName, appName })
    this.release = new Release({ componentName, appName, timestamp })
    this.uri = `${this.release.uri}/instances/${id}`
    this.log = new Log({ scope: this.uri })
    this.start = new Start({ scope: this.uri })
    this.stop = new Stop({ scope: this.uri })
  }

  id() { return this._id }
  key() { return this._id }

	updateWith(params) {
		return this.update('tags', currentTags => currentTags.merge(params))
	}

  toPayload() {
    const { id, base_name, name, status, cpu, ram } = this
    return { id, base_name, name, status, cpu: cpu.toJS(), ram: ram.toJS() }
  }
}
