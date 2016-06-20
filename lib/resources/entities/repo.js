import uuid from 'uuid'
import kebabCase from 'lodash/kebabCase'
import { fromJS, Record } from 'immutable'

const defaultRegistry = `https://index.docker.io/v1/`
const repoSchema = { name: ``, tags: {}, created: ``, updated: `` }

const _template = ({ auth, email, registry = defaultRegistry }) =>
`{
	"auths": {
		"${registry}": {
			"auth": "${auth}",
			"email": "${email}"
		}
	}
}`

const _generateKey = ({ username, password, email }) => {
  const auth = new Buffer(`${username}:${password}`).toString(`base64`)
  const config = _template({ auth, email })

  return new Buffer(config).toString(`base64`)
}

export default class Repo extends Record(repoSchema) {
  constructor(raw) {
    const {
      name,
      email,
      password,
      username,
      key,
      created,
      updated,
      tags = {}
    } = raw

    super({
      name: kebabCase(name),
      created,
      updated,
      tags: fromJS(tags)
        .update('id', id => id || uuid.v4())
        .update('email', cachedEmail => cachedEmail || email)
        .update('username', cachedUsername => cachedUsername || username)
				.update('name', cachedName => cachedName || name)
    })

    this._key = key || _generateKey({ username, email, password })
  }

  id() { return this.tags.get('id') }
  key() { return this.name }
	username() { return this.tags.get('username') }
	displayName() { return this.tags.get('name') }
	email() { return this.tags.get('email') }

  updateWith(params) {
    const {
      email,
      password,
      username,
    } = params

    const key = _generateKey({ username, email, password })
		const update = this.update('tags', currentTags => currentTags.merge(params))

		update._key = key

    return update
  }

  registryKey() {
    const emptyKey = _generateKey({})

    return emptyKey === this._key ? undefined : this._key
  }

  toPayload() {
    const { name, _key, tags } = this

    return { name, key: _key, tags: tags.toJS() }
  }
}
