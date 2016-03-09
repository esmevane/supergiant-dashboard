import { fromJS } from 'immutable'

export const InitialState = fromJS({
  routing: {},
  form: {},
  modal: { content: [], hidden: true, meta: {} },
  visuals: { faded: false, meta: {} }
})
