import uuid from 'uuid'
import { fromJS, Record } from 'immutable'
import { kebabCase } from 'lodash'
import App from './app'
import Component from './component'

const deploySchema = { }

export default class Deploy extends Record(deploySchema) {
  constructor(params) {
    const { appName, componentName } = params

    super(params)

    this.app = new App({ name: appName })
    this.component = new Component({ name: appName, appName })
    this.uri = `${this.component.uri}/deploy`
  }

  toPayload() { return { } }
}
