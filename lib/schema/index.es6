import { fromJS } from 'immutable'

export const InitialState = fromJS({
  app: { faded: false, meta: {} },
  form: {},
  modals: { content: [], hidden: true, meta: {} },
  routing: {}
})
