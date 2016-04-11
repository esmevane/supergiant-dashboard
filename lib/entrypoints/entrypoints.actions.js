export const Request = "entrypoints:request:start"
export const RequestSuccess = "entrypoints:request:success"
export const RequestFailure = "entrypoints:request:failure"
export const RequestComplete = "entrypoints:request:complete"

export const request = () => ({ type: Request })
export const requestSuccess = () => ({ type: RequestSuccess })
export const requestFailure = () => ({ type: RequestFailure })
export const requestComplete = () => ({ type: RequestComplete })

export const Fetch = "entrypoints:fetch"
export const Get = "entrypoints:get"
export const Create = "entrypoints:create"
export const Update = "entrypoints:update"
export const Destroy = "entrypoints:destroy"

export const fetch = () => ({ type: Fetch })
export const get = (id) => ({ type: Get, id })
export const create = (params) => ({ type: Create, params })
export const destroy = (id) => ({ type: Destroy, id })
export const update = (id, params) => ({ type: Update, id, params })

export const Remove = "entrypoints:remove"
export const Insert = "entrypoints:insert"

export const remove = (id) => ({ type: Remove, id })
export const insert = (id, entrypoint) => ({ type: Insert, id, entrypoint })
