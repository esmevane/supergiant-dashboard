import { fromJS, Record } from 'immutable'

const taskSchema = {
  id: ``,
  action_data: `{}`,
  status: ``,
  attempts: 0,
  max_attempts: 0,
  error: ``,
  name: ``,
  tags: {},
  created: ``,
  updated: ``
}

export default class Task extends Record(taskSchema) {
  constructor(raw) {
    const {
      action_data = "{}",
      attempts,
      error,
      id,
      max_attempts,
      status,
      created,
      name,
      tags = {},
      updated
    } = raw

    super({
      action_data: fromJS(JSON.parse(action_data)),
      attempts,
      error,
      id,
      max_attempts,
      status,
      created,
      name,
      tags: fromJS(tags),
      updated
    })

    this._id = id
  }

  id() { return this._id }
  key() { return this._id }

	updateWith(params) {
		return this.update('tags', currentTags => currentTags.merge(params))
	}

  toPayload() {
    const { name, _key, tags } = this
    return { name, key: _key, tags: tags.toJS() }
  }
}
