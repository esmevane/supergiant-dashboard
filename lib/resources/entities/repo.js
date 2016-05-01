import uuid from 'uuid'
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
      name,
      created,
      updated,
      tags: fromJS(tags)
        .update('id', id => id || uuid.v4())
        .update('email', cachedEmail => cachedEmail || email)
        .update('username', cachedUsername => cachedUsername || username)
    })

    this._key = key || _generateKey({ username, email, password })
  }

  id() { return this.tags.get('id') }
  key() { return this.tags.get('id') }

  registryKey() {
    const emptyKey = _generateKey({})

    return emptyKey === this._key ? undefined : this._key
  }

  toPayload() {
    const { name, _key, tags } = this

    return { name, key: _key, tags: tags.toJS() }
  }
}
