export const createCrudActions = name => {
  const Clear = `${name}:request:clear`
  const Create = `${name}:create`
  const Destroy = `${name}:destroy`
  const Failure = `${name}:request:failure`
  const Fetch = `${name}:fetch`
  const Get = `${name}:get`
  const Insert = `${name}:insert`
  const Remove = `${name}:remove`
  const Request = `${name}:request:start`
  const Success = `${name}:request:success`
  const Update = `${name}:update`

  return {
    Clear,
    Create,
    Destroy,
    Failure,
    Fetch,
    Get,
    Insert,
    Remove,
    Request,
    Success,
    Update,
    clear: () => ({ type: Clear }),
    create: params => ({ type: Create, params }),
    destroy: id => ({ type: Destroy, id }),
    failure: error => ({ type: Failure, error }),
    fetch: () => ({ type: Fetch }),
    get: id => ({ type: Get, id }),
    insert: (id, record) => ({ type: Insert, id, record }),
    remove: id => ({ type: Remove, id }),
    request: () => ({ type: Request }),
    success: () => ({ type: Success }),
    update: (id, params) => ({ type: Update, id, params }),
  }
}
