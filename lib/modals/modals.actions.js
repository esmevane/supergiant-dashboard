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
