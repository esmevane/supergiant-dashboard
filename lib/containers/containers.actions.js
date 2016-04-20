export const Insert = "containers:insert"
export const Remove = "containers:remove"

export const insert = (id, container) => ({ type: Insert, id, container })
export const remove = (id, container) => ({ type: Remove, id, container })
