import { fromJS, Map } from 'immutable'
import { createApp, getApp } from './apps.behavior'

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
