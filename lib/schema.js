import { fromJS } from 'immutable'
import { createApp } from './apps/apps.behavior'

const cloudContents = fromJS([{ name: 'First cloud', region: 'us-east-1a' }])
const clouds = {
  active: [cloudContents.first().get('id')],
  contents: cloudContents,
  meta: { requesting: false }
}

const appContents = [
  createApp({ name: "Example app 1" }),
  createApp({ name: "Example app 2" }),
  createApp({ name: "Example app 3" }),
  createApp({ name: "Example app 4" }),
  createApp({ name: "Example app 5" }),
  createApp({ name: "Example app 6" })
]

const apps = {
  contents: appContents,
  order: appContents.map(app => app.get('id')),
  meta: { requesting: false }
}

const nodes = {
  contents: [ fromJS({ name: "AWS Resource", size: "m4.large" }) ],
  meta: { requesting: false }
}

export const InitialState = fromJS({
  apps,
  clouds,
  dashboards: { content: {}, meta: {} },
  layouts: { faded: false, meta: {} },
  form: {},
  modals: { content: [], hidden: true, meta: {} },
  nodes,
  routing: {}
})
