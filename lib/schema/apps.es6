import Immutable from 'immutable'
import uuid from 'uuid'

const newId = () => Immutable.fromJS({ id: uuid.v4() })
export const createApp = (params) => Immutable.fromJS(params).merge(newId())

export const getApp = (id, contents) => {
  return contents.filter(app => app.get('id') === id).first()
}
