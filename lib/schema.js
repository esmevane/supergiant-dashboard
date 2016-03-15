import { fromJS } from 'immutable'
import { createApp } from './apps/apps.behavior'

const cloudContents = fromJS([{ name: 'First cloud', region: 'us-east-1a' }])
const clouds = {
  active: [cloudContents.first().get('id')],
  contents: cloudContents,
  meta: { requesting: false }
}

const apps = {
  contents: [ createApp({ name: "Example app" }) ],
  meta: { requesting: false }
}

const nodes = {
  contents: [ fromJS({ name: "AWS Resource", size: "m4.large" }) ],
  meta: { requesting: false }
}

export const InitialState = fromJS({
  apps,
  clouds,
  dashboards: { faded: false, meta: {} },
  form: {},
  modals: { content: [], hidden: true, meta: {} },
  nodes,
  routing: {}
})
