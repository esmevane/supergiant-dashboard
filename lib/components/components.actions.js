// Components Actions
//
export const Request = "components:request:start"
export const RequestSuccess = "components:request:success"
export const RequestFailure = "components:request:failure"
export const RequestComplete = "components:request:complete"

export const request = () => ({ type: Request })
export const requestSuccess = () => ({ type: RequestSuccess })
export const requestFailure = () => ({ type: RequestFailure })
export const requestComplete = () => ({ type: RequestComplete })

export const Fetch = "components:create"
export const Get = "components:get"
export const Create = "components:create"
export const Update = "components:update"
export const Destroy = "components:destroy"

export const fetch = (appId) => ({ type: Fetch })
export const get = (appId, id) => ({ type: Get, id, appId })
export const create = (params) => ({ type: Create, params })
export const destroy = (id) => ({ type: Destroy, id })
export const update = (appId, params, id) => (
  { type: Update, id, params, appId }
)

export const Reorder = "components:reorder"
export const Insert = "components:insert"

export const reorder = (id, index) => ({ type: Reorder, id, index })
export const insert = (id, component) => ({ type: Insert, id, component })
