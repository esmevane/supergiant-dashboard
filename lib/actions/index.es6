// App Actions
//
export const AppFade = "app:fade"
export const AppUnfade = "app:unfade"

export const appFade = () => ({ type: AppFade })
export const appUnfade = () => ({ type: AppUnfade })

// Dashboard Actions
//
export const InvalidateDashboards = "dashboards:invalidate"
export const invalidateDashboards = () => ({ type: InvalidateDashboards })

// Modal Actions
//
export const ShowModal = "modal:show"
export const HideModal = "modal:hide"
export const CloseModal = "modal:close"
export const OpenModal = "modal:open"

export function openModal(component) {
  let type = OpenModal
  return { type, component }
}

export const closeModal = () => ({ type: CloseModal })
export const showModal = () => ({ type: ShowModal })
export const hideModal = () => ({ type: HideModal })
