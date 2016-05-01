import Entrypoint from './entities/entrypoint'
import Entrypoints from './entrypoints'

describe("Entrypoints client", () => {
  const client = new Entrypoints(mockClient(Entrypoint))

  describe("get", () => {
    it("returns an entrypoint", () => {
      expect(client.get('ci')).to.eventually.be.an.instanceof(Entrypoint)
    })
  })

  describe("fetch", () => {
    it("returns a list", () => {
      expect(client.fetch()).to.eventually.be.an.instanceof(Array)
    })
  })

  describe("create", () => {
    it("returns an entrypoint", () => {
      let promise = client.create({ name: 'key' })
      expect(promise).to.eventually.be.an.instanceof(Entrypoint)
    })
  })

  describe("delete", () => {
    it("returns an empty object", () => {
      expect(client.delete('key')).to.eventually.be.an.instanceof(Object)
    })
  })

  describe("update", () => {
    it("returns an entrypoint", () => {
      let entrypoint = new Entrypoint({ name: "CI" })
      let promise = client.update(entrypoint)

      expect(promise).to.eventually.be.an.instanceof(Entrypoint)
    })
  })
})
