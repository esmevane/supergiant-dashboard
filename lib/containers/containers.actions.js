export const Create = "containers:create"
export const Destroy = "containers:destroy"

export const create = (id, container) => ({ type: Create, id, container })
export const destroy = (id, container) => ({ type: Destroy, id, container })

export const Insert = "containers:insert"
export const Remove = "containers:remove"

export const insert = (id, container) => ({ type: Insert, id, container })
export const remove = (id, container) => ({ type: Remove, id, container })
