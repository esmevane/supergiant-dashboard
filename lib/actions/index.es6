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

// Dashboard Actions
//
export const DashboardFade = "dashboards:fade"
export const DashboardUnfade = "dashboards:unfade"
export const DashboardInvalidate = "dashboards:invalidate"

export const dashboardFade = () => ({ type: DashboardFade })
export const dashboardUnfade = () => ({ type: DashboardUnfade })
export const dashboardInvalidate = () => ({ type: DashboardInvalidate })

// Modal Actions
//
export const ShowModal = "modals:show"
export const HideModal = "modals:hide"
export const CloseModal = "modals:close"
export const OpenModal = "modals:open"

export function openModal(component) {
  let type = OpenModal
  return { type, component }
}

export const closeModal = () => ({ type: CloseModal })
export const showModal = () => ({ type: ShowModal })
export const hideModal = () => ({ type: HideModal })

// Resources Actions
//
export const ResourcesRequest = "resources:request:start"
export const ResourcesRequestSuccess = "resources:request:success"
export const ResourcesRequestFailure = "resources:request:failure"
export const ResourcesRequestComplete = "resources:request:complete"

export const ResourcesFetch = "resources:create"
export const ResourcesGet = "resources:get"
export const ResourcesCreate = "resources:create"
export const ResourcesUpdate = "resources:update"
export const ResourcesDestroy = "resources:destroy"

export const resourcesRequest = () => ({ type: ResourcesRequest })
export const resourcesRequestSuccess = () => ({ type: ResourcesRequestSuccess })
export const resourcesRequestFailure = () => ({ type: ResourcesRequestFailure })
export const resourcesRequestComplete = () => (
  { type: ResourcesRequestComplete }
)

export const resourcesFetch = () => ({ type: ResourcesFetch })
export const resourcesGet = (id) => ({ type: ResourcesGet, id })
export const resourcesCreate = (params) => ({ type: ResourcesCreate, params })
export const resourcesUpdate = (params, id) => (
  { type: ResourcesUpdate, id, params }
)

export const resourcesDestroy = (id) => ({ type: ResourcesDestroy, id })
