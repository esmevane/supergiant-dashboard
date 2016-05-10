import Instance from './entities/instance'
import Log from './log'

describe("Log instance client", () => {
  const client = new Log({ client: mockClient(Instance) })

  describe("fetch", () => {
    it("returns an Array", () => {
      const promise = client.fetch()
      expect(promise).to.eventually.be.an.instanceof(Array)
    })
  })
})
