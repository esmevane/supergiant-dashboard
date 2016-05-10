import Instance from './entities/instance'
import Start from './start'

describe("Start client", () => {
  const client = new Start({ client: mockClient(Instance) })

  describe("create", () => {
    it("returns a instance", () => {
      const promise = client.create({})
      expect(promise).to.eventually.be.an.instanceof(Instance)
    })
  })
})
