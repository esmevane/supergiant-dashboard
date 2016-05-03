import Component from './entities/component'
import Components from './components'

describe("Components client", () => {
  const client = new Components({ client: mockClient(Component) })

  describe("get", () => {
    it("returns a component", () => {
      expect(client.get('ci')).to.eventually.be.an.instanceof(Component)
    })
  })

  describe("fetch", () => {
    it("returns a list", () => {
      expect(client.fetch()).to.eventually.be.an.instanceof(Array)
    })
  })

  describe("create", () => {
    it("returns a component", () => {
      const promise = client.create({ name: 'key' })
      expect(promise).to.eventually.be.an.instanceof(Component)
    })
  })

  describe("delete", () => {
    it("returns an empty object", () => {
      expect(client.delete('key')).to.eventually.be.an.instanceof(Object)
    })
  })

  describe("update", () => {
    it("returns a component", () => {
      let component = new Component({ name: "CI" })
      expect(client.update(component)).to.eventually.be.an.instanceof(Component)
    })
  })
})
