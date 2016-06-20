import Immutable from 'immutable'
import Entrypoint from './entrypoint'

describe("Entrypoint", () => {
  describe("initializing", () => {
    const domain = `supergiant.io`
    const tags = { }
    const entrypoint = new Entrypoint({ domain, tags })

    it("creates a slug domain", () => {
      expect(entrypoint.domain).to.equal(domain)
    })

    it("responds to tags", () => {
      expect(entrypoint.tags).to.be.an.instanceof(Immutable.Map)
    })

    it('responds to displayName', () => {
      expect(entrypoint.displayName()).to.equal(domain)
    })

    it("it creates an id tag", () => {
      expect(entrypoint.tags.get('id')).to.be.ok
    })
  })

  describe("id", () => {
    const entrypoint = new Entrypoint({ })

    it("returns the id tag", () => {
      expect(entrypoint.id()).to.equal(entrypoint.tags.get('id'))
    })
  })

  describe("key", () => {
    const domain = `supergiant.io`
    const entrypoint = new Entrypoint({ domain })

    it("returns the kebab domain", () => {
      expect(entrypoint.key()).to.equal(entrypoint.domain)
    })
  })

  describe("toPayload", () => {
    const domain = "Super Fancy New Entrypoint"
    const entrypoint = new Entrypoint({ domain })
    const payload = entrypoint.toPayload()

    it("marshals the right tags for the API", () => {
      for (let tag of [`id`]) {
        let tagValue = Reflect.get(payload.tags, tag)

        expect(tagValue).to.be.ok
      }
    })
  })

  describe("updateWith", () => {
    const payload = {
      domain: `supergiant.io`,
      address: `supergiant-supergiant.io`,
      created: (new Date).toString(),
      updated: null,
      tags: { }
    }

    const params = { domain: 'New Name' }
    const entrypoint = new Entrypoint(payload)
    const updated = entrypoint.updateWith(params)

    it("changes the displayName", () => {
      expect(updated.displayName()).to.eql(params.domain)
    })

    it('does not change the domain', () => {
      expect(updated.domain).to.eql(entrypoint.domain)
    })
  })

  describe("marshaling from an API", () => {
    const payload = {
      domain: `supergiant.io`,
      address: `supergiant-supergiant.io`,
      created: (new Date).toString(),
      updated: null,
      tags: { }
    }

    const entrypoint = new Entrypoint(payload)

    it("exposes a domain", () => {
      expect(entrypoint.domain).to.equal(payload.domain)
    })

    it("exposes an address", () => {
      expect(entrypoint.address).to.equal(payload.address)
    })

    it("creates an ID", () => expect(entrypoint.tags.get('id')).to.be.ok )

  })
})
