export const Fetch = "tasks:fetch"
export const Get = "tasks:get"
export const Destroy = "tasks:destroy"

export const fetch = () => ({ type: Fetch })
export const get = id => ({ type: Get, id })
export const destroy = id => ({ type: Destroy, id })

export const Validate = "tasks:cache:validate"
export const Invalidate = "tasks:cache:invalidate"

export const validate = id => ({ type: Validate, id })
export const invalidate = id => ({ type: Invalidate, id })

export const Remove = "tasks:remove"
export const Insert = "tasks:insert"

export const remove = id => ({ type: Remove, id })
export const insert = (id, task) => ({ type: Insert, id, task })
