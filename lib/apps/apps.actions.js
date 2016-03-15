// Apps Actions
//
export const Request = "apps:request:start"
export const RequestSuccess = "apps:request:success"
export const RequestFailure = "apps:request:failure"
export const RequestComplete = "apps:request:complete"

export const Fetch = "apps:create"
export const Get = "apps:get"
export const Create = "apps:create"
export const Update = "apps:update"
export const Destroy = "apps:destroy"

export const Reorder = "apps:reorder"

export const reorder = (id, index) => ({ type: Reorder, id, index })
export const request = () => ({ type: Request })
export const requestSuccess = () => ({ type: RequestSuccess })
export const requestFailure = () => ({ type: RequestFailure })
export const requestComplete = () => ({ type: RequestComplete })
export const fetch = () => ({ type: Fetch })
export const get = (id) => ({ type: Get, id })
export const create = (params) => ({ type: Create, params })
export const update = (params, id) => ({ type: Update, id, params })
export const destroy = (id) => ({ type: Destroy, id })
