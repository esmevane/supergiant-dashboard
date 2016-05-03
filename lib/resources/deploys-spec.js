import Deploy from './entities/deploy'
import Deploys from './deploys'

describe("Deploys client", () => {
  const client = new Deploys({ client: mockClient(Deploy) })

  describe("create", () => {
    it("returns a deploy", () => {
      const promise = client.create({ name: 'key' })
      expect(promise).to.eventually.be.an.instanceof(Deploy)
    })
  })
})
