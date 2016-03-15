// Nodes Actions
//
export const NodesRequest = "nodes:request:start"
export const NodesRequestSuccess = "nodes:request:success"
export const NodesRequestFailure = "nodes:request:failure"
export const NodesRequestComplete = "nodes:request:complete"

export const NodesFetch = "nodes:create"
export const NodesGet = "nodes:get"
export const NodesCreate = "nodes:create"
export const NodesUpdate = "nodes:update"
export const NodesDestroy = "nodes:destroy"

export const nodesRequest = () => ({ type: NodesRequest })
export const nodesRequestSuccess = () => ({ type: NodesRequestSuccess })
export const nodesRequestFailure = () => ({ type: NodesRequestFailure })
export const nodesRequestComplete = () => ({ type: NodesRequestComplete })

export const nodesFetch = () => ({ type: NodesFetch })
export const nodesGet = (id) => ({ type: NodesGet, id })
export const nodesCreate = (params) => ({ type: NodesCreate, params })
export const nodesUpdate = (params, id) => ({ type: NodesUpdate, id, params })
export const nodesDestroy = (id) => ({ type: NodesDestroy, id })
