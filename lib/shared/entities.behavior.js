import Immutable from 'immutable'
import uuid from 'uuid'

const { fromJS } = Immutable
const newId = () => Immutable.fromJS({ id: uuid.v4() })

export const create = (params) => (
  Immutable.fromJS(params).merge(newId())
)

export const get = (id, contents) => {
  return contents.filter(entity => entity.get('id') === id).first()
}

export const order = (ids, entities) => {
  let reducer = (map, entity) => (
    map.merge(fromJS({ [entity.get('id')]: entity }))
  )

  let entitiesById = entities.reduce(reducer, new Immutable.Map)

  return ids.map(id => entitiesById.get(id))
}

export const reorder = (id, index, ids) => {
  let oldIndex = ids.indexOf(id)

  return ids.delete(oldIndex).insert(index, id)
}
