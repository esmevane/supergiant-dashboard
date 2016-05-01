import App from './entities/app'
import Apps from './apps'

describe("Apps client", () => {
  const client = new Apps(mockClient(App))

  describe("get", () => {
    it("returns an app", () => {
      expect(client.get('ci')).to.eventually.be.an.instanceof(App)
    })
  })

  describe("fetch", () => {
    it("returns a list", () => {
      expect(client.fetch()).to.eventually.be.an.instanceof(Array)
    })
  })

  describe("create", () => {
    it("returns an app", () => {
      expect(client.create({ name: 'key' })).to.eventually.be.an.instanceof(App)
    })
  })

  describe("delete", () => {
    it("returns an empty object", () => {
      expect(client.delete('key')).to.eventually.be.an.instanceof(Object)
    })
  })

  describe("update", () => {
    it("returns an app", () => {
      let app = new App({ name: "CI" })
      expect(client.update(app)).to.eventually.be.an.instanceof(App)
    })
  })
})
