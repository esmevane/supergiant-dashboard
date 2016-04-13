export const Request = "releases:request:start"
export const RequestSuccess = "releases:request:success"
export const RequestFailure = "releases:request:failure"
export const RequestComplete = "releases:request:complete"

export const request = () => ({ type: Request })
export const requestSuccess = () => ({ type: RequestSuccess })
export const requestFailure = () => ({ type: RequestFailure })
export const requestComplete = () => ({ type: RequestComplete })

export const Fetch = "releases:fetch"
export const Get = "releases:get"
export const Create = "releases:create"
export const Update = "releases:update"
export const Destroy = "releases:destroy"

export const fetch = (appName, componentName) => (
  { type: Fetch, appName, componentName }
)

export const get = (id, appName, componentName) => (
  { type: Get, id, appName, componentName }
)

export const create = (params, appName, componentName) => (
  { type: Create, params, appName, componentName }
)

export const update = (id, params, appName, componentName) => (
  { type: Update, id, params, appName, componentName }
)

export const destroy = (id, appName, componentName) => (
  { type: Destroy, id, appName, componentName }
)

export const Remove = "releases:remove"
export const Insert = "releases:insert"

export const remove = (id, appName, componentName) => (
  { type: Remove, id, appName, componentName }
)

export const insert = (id, release, appName, componentName) => (
  { type: Insert, id, release, appName, componentName }
)
