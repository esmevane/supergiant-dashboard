import uuid from 'uuid'

const id = () => uuid.v4()

export const Add = "notifications:add"
export const Remove = "notifications:remove"

export const add = (level, message) => ({ type: Add, level, message, id: id() })
export const remove = (id) => ({ type: Remove, id })
