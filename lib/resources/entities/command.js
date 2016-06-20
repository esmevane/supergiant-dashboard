import uuid from 'uuid'
import { fromJS, Record } from 'immutable'
import kebabCase from 'lodash/kebabCase'
import App from './app'
import Deploys from '../deploys'
import Releases from '../releases'

const commandSchema = {
  appName: ``,
  appKey: ``,
  name: ``,
  entries: [],
  _id: ``
}

export default class Command extends Record(commandSchema) {
  constructor(params) {
    const {
      appName,
      name,
      entries = [],
      id = uuid.v4()
    } = params

    super({
      name: name,
      entries: fromJS(entries),
      appName: appName,
      appKey: kebabCase(appName),
      _id: id
    })

    this.app = new App({ name: this.appName })
    this.uri = `/api/v0/apps/${this.app.key()}`
  }

  displayName() { return this.name }

  id() { return this._id }
  key() { return this._id }

  toPayload() {
    const { _id, appName, appKey, name, entries } = this

    return { id: _id, appName, appKey, name, entries: entries.toJS() }
  }
}
