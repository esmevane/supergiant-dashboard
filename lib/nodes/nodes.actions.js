export const Request = "nodes:request:start"
export const RequestSuccess = "nodes:request:success"
export const RequestFailure = "nodes:request:failure"
export const RequestComplete = "nodes:request:complete"

export const request = () => ({ type: Request })
export const requestSuccess = () => ({ type: RequestSuccess })
export const requestFailure = () => ({ type: RequestFailure })
export const requestComplete = () => ({ type: RequestComplete })

export const Fetch = "nodes:fetch"
export const Get = "nodes:get"
export const Create = "nodes:create"
export const Update = "nodes:update"
export const Destroy = "nodes:destroy"

export const fetch = () => ({ type: Fetch })
export const get = (id) => ({ type: Get, id })
export const create = (params) => ({ type: Create, params })
export const update = (params, id) => ({ type: Update, id, params })
export const destroy = (id) => ({ type: Destroy, id })

export const Insert = "nodes:insert"
export const Remove = "nodes:remove"

export const insert = (id, node) => ({ type: Insert, id, node })
export const remove = (id) => ({ type: Remove, id })
