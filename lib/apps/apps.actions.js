export const Fetch = "apps:fetch"
export const Get = "apps:get"
export const Create = "apps:create"
export const Destroy = "apps:destroy"

export const fetch = () => ({ type: Fetch })
export const get = id => ({ type: Get, id })
export const create = params => ({ type: Create, params })
export const destroy = id => ({ type: Destroy, id })

export const Validate = "apps:cache:validate"
export const Invalidate = "apps:cache:invalidate"

export const validate = id => ({ type: Validate, id })
export const invalidate = id => ({ type: Invalidate, id })

export const Insert = "apps:insert"
export const Remove = "apps:remove"

export const insert = (id, app) => ({ type: Insert, id, app })
export const remove = id => ({ type: Remove, id })
