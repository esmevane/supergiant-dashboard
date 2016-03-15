// Modal Actions
//
export const Show = "modals:show"
export const Hide = "modals:hide"
export const Close = "modals:close"
export const Open = "modals:open"

export function open(component) {
  let type = Open
  return { type, component }
}

export const close = () => ({ type: Close })
export const show = () => ({ type: Show })
export const hide = () => ({ type: Hide })
