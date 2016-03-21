import { help, hide } from './modals/modals.actions'

export default {
  27: { name: `Escape`, code: `esc`, action: hide, desc: `Close a modal` },
  191: {
    name: `Help`,
    code: `?`,
    desc: `This dialog`,
    action: help,
    modifiers: [`shiftKey`]
  }
}
