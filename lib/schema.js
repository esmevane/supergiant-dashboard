import { fromJS } from 'immutable'
import { create } from './shared/entities.behavior'

const cloudContents = fromJS([{ name: 'First cloud', region: 'us-east-1a' }])
const clouds = {
  active: [cloudContents.first().get('id')],
  contents: cloudContents,
  meta: { requesting: false }
}

const entities = {
  contents: [],
  order: [],
  meta: { requesting: false }
}

const nodes = {
  contents: [ fromJS({ name: "AWS Resource", size: "m4.large" }) ],
  meta: { requesting: false }
}

export const InitialState = fromJS({
  apps: entities,
  clouds,
  components: entities,
  dashboards: { content: {}, meta: {} },
  layouts: { faded: false, meta: {} },
  form: {},
  modals: { content: [], hidden: true, meta: {} },
  nodes,
  routing: {}
})
