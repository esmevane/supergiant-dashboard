import Instance from './entities/instance'
import Stop from './stop'

describe("Stop instance client", () => {
  const client = new Stop({ client: mockClient(Instance) })

  describe("create", () => {
    it("returns a instance", () => {
      const promise = client.create({ })
      expect(promise).to.eventually.be.an.instanceof(Instance)
    })
  })
})
