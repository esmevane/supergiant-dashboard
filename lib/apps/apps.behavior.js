import Immutable from 'immutable'
import uuid from 'uuid'

const { fromJS } = Immutable
const newId = () => Immutable.fromJS({ id: uuid.v4() })

export const create = (params) => Immutable.fromJS(params).merge(newId())

export const get = (id, contents) => {
  return contents.filter(app => app.get('id') === id).first()
}

export const order = (ids, apps) => {
  let reducer = (map, app) => map.merge(fromJS({ [app.get('id')]: app }))
  let appsById = apps.reduce(reducer, new Immutable.Map)

  return ids.map(id => appsById.get(id))
}

export const reorder = (id, index, ids) => {
  let oldIndex = ids.indexOf(id)

  return ids.delete(oldIndex).insert(index, id)
}
