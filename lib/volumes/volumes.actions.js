export const Insert = "volumes:insert"
export const Remove = "volumes:remove"

export const insert = (id, volume) => ({ type: Insert, id, volume })
export const remove = (id) => ({ type: Remove, id })
