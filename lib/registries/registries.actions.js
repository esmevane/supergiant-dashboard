export const Request = "registries:request:start"
export const RequestSuccess = "registries:request:success"
export const RequestFailure = "registries:request:failure"
export const RequestComplete = "registries:request:complete"

export const request = () => ({ type: Request })
export const requestSuccess = () => ({ type: RequestSuccess })
export const requestFailure = () => ({ type: RequestFailure })
export const requestComplete = () => ({ type: RequestComplete })

export const Fetch = "registries:fetch"
export const Get = "registries:get"
export const Create = "registries:create"
export const Update = "registries:update"
export const Destroy = "registries:destroy"

export const fetch = () => ({ type: Fetch })
export const get = (id) => ({ type: Get, id })
export const create = (params) => ({ type: Create, params })
export const destroy = (id) => ({ type: Destroy, id })
export const update = (id, params) => ({ type: Update, id, params })

export const Remove = "registries:remove"
export const Insert = "registries:insert"

export const remove = (id) => ({ type: Remove, id })
export const insert = (id, registry) => ({ type: Insert, id, registry })
