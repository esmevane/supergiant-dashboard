import Immutable from 'immutable'
import uuid from 'uuid'
import { kebabCase } from 'lodash'

const { fromJS } = Immutable

export const create = (params) => {
  let { name, ...rest } = params
  let nameId = kebabCase(name)

  return Immutable.fromJS(rest).merge(fromJS({
    name: nameId,
    metadata: { tags: [{ name: `name`, value: name }] }
  }))
}

export const displayName = (entity) => {
  let base = entity.get('name')
  let tags = entity.getIn(['metadata', 'tags'])
  let name = tags && tags.filter(tag => tag.get('name') === 'name').first()

  return name ? name.get('value') : base
}

export const reorder = (id, index, ids) => {
  let oldIndex = ids.indexOf(id)

  return ids.delete(oldIndex).insert(index, id)
}
