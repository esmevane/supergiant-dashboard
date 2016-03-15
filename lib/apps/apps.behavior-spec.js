import { fromJS, Map } from 'immutable'
import { createApp, getApp, orderedApps, reorderIds } from './apps.behavior'

describe("createApp", () => {
  let app = createApp({ name: "Your super duper app name" })

  it("is an immutable map", () => { expect(app).to.be.instanceof(Map) })
  it("has an ID", () => { expect(app.get('id')).to.be.ok })
})

describe("getApp", () => {
  let firstApp = createApp({ name: 'First app' })
  let secondApp = createApp({ name: 'Second app' })
  let apps = fromJS([firstApp, secondApp])
  let app = getApp(firstApp.get('id'), apps)

  it("retrieves the correct app", () => { expect(app).to.equal(firstApp) })
})

describe("orderedApps", () => {
  let firstApp = createApp({ name: 'First app' })
  let secondApp = createApp({ name: 'Second app' })
  let thirdApp = createApp({ name: 'Third app' })
  let apps = fromJS([firstApp, secondApp, thirdApp])
  let ids = apps.map(app => app.get('id'))
  let index = 0
  let newOrder = reorderIds(thirdApp.get('id'), index, ids)
  let ordered = orderedApps(newOrder, apps)

  it("is the same length", () => {
    expect(ordered.count()).to.equal(apps.count())
  })

  it("puts the app at the given spot", () => {
    expect(ordered.get(index)).to.equal(thirdApp)
  })
})

describe("reorderIds", () => {
  let firstApp = createApp({ name: 'First app' })
  let secondApp = createApp({ name: 'Second app' })
  let thirdApp = createApp({ name: 'Third app' })
  let apps = fromJS([firstApp, secondApp, thirdApp])
  let ids = apps.map(app => app.get('id'))
  let index = 0
  let newOrder = reorderIds(thirdApp.get('id'), index, ids)

  it("is the same length", () => {
    expect(newOrder.count()).to.equal(ids.count())
  })

  it("puts the app at the given spot", () => {
    expect(newOrder.get(index)).to.equal(thirdApp.get('id'))
  })
})
