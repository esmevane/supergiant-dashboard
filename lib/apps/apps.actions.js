// Apps Actions
//
export const AppsRequest = "apps:request:start"
export const AppsRequestSuccess = "apps:request:success"
export const AppsRequestFailure = "apps:request:failure"
export const AppsRequestComplete = "apps:request:complete"

export const AppsFetch = "apps:create"
export const AppsGet = "apps:get"
export const AppsCreate = "apps:create"
export const AppsUpdate = "apps:update"
export const AppsDestroy = "apps:destroy"

export const appsRequest = () => ({ type: AppsRequest })
export const appsRequestSuccess = () => ({ type: AppsRequestSuccess })
export const appsRequestFailure = () => ({ type: AppsRequestFailure })
export const appsRequestComplete = () => ({ type: AppsRequestComplete })
export const appsFetch = () => ({ type: AppsFetch })
export const appsGet = (id) => ({ type: AppsGet, id })
export const appsCreate = (params) => ({ type: AppsCreate, params })
export const appsUpdate = (params, id) => ({ type: AppsUpdate, id, params })
export const appsDestroy = (id) => ({ type: AppsDestroy, id })
