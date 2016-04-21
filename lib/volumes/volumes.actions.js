export const Create = "volumes:create"
export const Destroy = "volumes:destroy"

export const create = (id, volume) => ({ type: Create, id, volume })
export const destroy = (id, volume) => ({ type: Destroy, id, volume })

export const Insert = "volumes:insert"
export const Remove = "volumes:remove"

export const insert = (id, volume) => ({ type: Insert, id, volume })
export const remove = (id, volume) => ({ type: Remove, id, volume })
