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
export const get = (id, appName) => ({ type: Get, id, appName })
export const create = (params, appName) => ({ type: Create, params, appName })
export const destroy = (id, appName) => ({ type: Destroy, id, appName })
export const update = (id, appName, params) => (
  { type: Update, appName, id, params }
)

export const Remove = "components:remove"
export const Insert = "components:insert"
export const Deploy = "components:deploy"

export const remove = (id, appName) => ({ type: Remove, appName, id })
export const insert = (id, component) => ({ type: Insert, id, component })
export const deploy = (id, appName, containers, volumes) => (
  { type: Deploy, id, appName, containers, volumes }
)

export const Commit = "components:commit"
export const commit = (id, appName) => ({ type: Commit, id, appName })
