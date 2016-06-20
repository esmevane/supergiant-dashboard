import Immutable from 'immutable'
import kebabCase from 'lodash/kebabCase'
import Node from './node'

describe("Node", () => {
  describe("initializing", () => {
    const id = 123456
    const name = `Node Name`
    const tags = { }
    const node = new Node({ id, name, tags })

    it("responds to tags", () => {
      expect(node.tags).to.be.an.instanceof(Immutable.Map)
    })
  })

  describe("toPayload", () => {
    const node = new Node({ id: 12345 })
    const payload = node.toPayload()

    it("is an object", () => expect(payload).to.be.an.instanceof(Object))
    it("has an ID key", () => expect(payload.id).to.be.ok )
  })

  describe("marshaling from an API", () => {
    const payload = {
      id: 152015810,
      name: "ci",
      created: (new Date).toString(),
      updated: null
    }

    const node = new Node(payload)

    it("exposes a name", () => expect(node.name).to.equal(payload.name))
    it("creates an ID", () => expect(node.id()).to.equal(payload.id))
  })
})
