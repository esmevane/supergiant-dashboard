export const Request = "instances:request:start"
export const RequestSuccess = "instances:request:success"
export const RequestFailure = "instances:request:failure"
export const RequestComplete = "instances:request:complete"

export const request = () => ({ type: Request })
export const requestSuccess = () => ({ type: RequestSuccess })
export const requestFailure = () => ({ type: RequestFailure })
export const requestComplete = () => ({ type: RequestComplete })

export const Fetch = "instances:fetch"
export const Get = "instances:get"
export const GetLogs = "instances:get-logs"
export const Start = "instances:start"
export const Stop = "instances:stop"

export const fetch = (appName, componentName, releaseId) => (
  { type: Fetch, appName, componentName, releaseId }
)

export const get = (id, appName, componentName, releaseId) => (
  { type: Get, id, appName, componentName, releaseId }
)

export const getLogs = (id, appName, componentName, releaseId) => (
  { type: GetLogs, id, appName, componentName, releaseId }
)

export const start = (id, appName, componentName, releaseId) => (
  { type: Start, id, appName, componentName, releaseId }
)

export const stop = (id, appName, componentName, releaseId) => (
  { type: Stop, id, appName, componentName, releaseId }
)

export const Remove = "instances:remove"
export const Insert = "instances:insert"

export const remove = (id, appName, componentName, releaseId) => (
  { type: Remove, id, appName, componentName, releaseId }
)

export const insert = (id, instance, appName, componentName, releaseId) => (
  { type: Insert, id, instance, appName, componentName, releaseId }
)
