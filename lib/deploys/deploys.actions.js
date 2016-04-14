export const Request = "deploys:request:start"
export const RequestSuccess = "deploys:request:success"
export const RequestFailure = "deploys:request:failure"
export const RequestComplete = "deploys:request:complete"

export const request = () => ({ type: Request })
export const requestSuccess = () => ({ type: RequestSuccess })
export const requestFailure = () => ({ type: RequestFailure })
export const requestComplete = () => ({ type: RequestComplete })

export const Create = "deploys:create"
export const create = (appName, componentName) => (
  { type: Create, appName, componentName }
)
