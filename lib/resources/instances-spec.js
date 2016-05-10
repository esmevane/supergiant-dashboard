import Instance from './entities/instance'
import Instances from './instances'

describe("Instances client", () => {
  const client = new Instances({ client: mockClient(Instance) })

  describe("get", () => {
    it("returns an instance", () => {
      expect(client.get(0)).to.eventually.be.an.instanceof(Instance)
    })
  })

  describe("fetch", () => {
    it("returns a list", () => {
      expect(client.fetch()).to.eventually.be.an.instanceof(Array)
    })
  })
})
