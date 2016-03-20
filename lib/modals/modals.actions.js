// Modal Actions
//
export const Close = "modals:close"
export const Help = "modals:help"
export const Hide = "modals:hide"
export const Open = "modals:open"
export const Show = "modals:show"

export const close = () => ({ type: Close })
export const help = () => ({ type: Help })
export const hide = () => ({ type: Hide })
export const open = component => ({ type: Open, component })
export const show = () => ({ type: Show })
