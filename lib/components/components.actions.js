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

export const Fetch = "components:fetch"
export const Get = "components:get"
export const Create = "components:create"
export const Update = "components:update"
export const Destroy = "components:destroy"

export const fetch = (appName) => ({ type: Fetch, appName })
export const get = (id) => ({ type: Get, id })
export const create = (params) => ({ type: Create, params })
export const destroy = (id, appName) => ({ type: Destroy, id, appName })
export const update = (id, params) => ({ type: Update, id, params })

export const Remove = "components:remove"
export const Insert = "components:insert"

export const remove = (id, appName) => ({ type: Remove, appName, id })
export const insert = (id, component) => ({ type: Insert, id, component })

export const AddContainer = "components:containers:add"
export const addContainer = (name, container) => (
  { type: AddContainer, container }
)
