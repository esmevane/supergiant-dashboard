import Node from './entities/node'
import Nodes from './nodes'

describe("Nodes client", () => {
  const client = new Nodes(mockClient(Node))

  describe("get", () => {
    it("returns a node", () => {
      expect(client.get('ci')).to.eventually.be.an.instanceof(Node)
    })
  })

  describe("fetch", () => {
    it("returns a list", () => {
      expect(client.fetch()).to.eventually.be.an.instanceof(Array)
    })
  })

  describe("create", () => {
    it("returns a node", () => {
      let promise = client.create({ name: 'key' })

      expect(promise).to.eventually.be.an.instanceof(Node)
    })
  })

  describe("delete", () => {
    it("returns an empty object", () => {
      expect(client.delete('key')).to.eventually.be.an.instanceof(Object)
    })
  })

  describe("update", () => {
    it("returns a node", () => {
      let node = new Node({ name: "CI" })
      let promise = client.update(node)

      expect(promise).to.eventually.be.an.instanceof(Node)
    })
  })
})
