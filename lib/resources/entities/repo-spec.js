import Immutable from 'immutable'
import Repo from './repo'

describe("Repo", () => {
  describe("initializing", () => {
    const name = `Repo Name`
    const tags = { }
    const repo = new Repo({ name, tags })

    it("responds to tags", () => {
      expect(repo.tags).to.be.an.instanceof(Immutable.Map)
    })

    it("it creates an id tag", () => expect(repo.tags.get('id')).to.be.ok)
  })

  describe("id", () => {
    const repo = new Repo({ })

    it("returns the id tag", () => {
      expect(repo.id()).to.equal(repo.tags.get('id'))
    })
  })

  describe("key", () => {
    const repo = new Repo({ })

    it("returns the id tag", () => {
      expect(repo.id()).to.equal(repo.tags.get('id'))
    })
  })

  describe("registryKey", () => {
    describe("when given input", () => {
      const email = 'dev@supergiant.io'
      const username = 'supergiant-dev'
      const password = 'supersecretpassword'
      const repo = new Repo({ username, email, password })
      const key = "ewoJImF1dGhzIjogewoJCSJodHRwczovL2luZGV4LmRvY" +
                  "2tlci5pby92MS8iOiB7CgkJCSJhdXRoIjogImMzVndaWE" +
                  "puYVdGdWRDMWtaWFk2YzNWd1pYSnpaV055WlhSd1lYTnp" +
                  "kMjl5WkE9PSIsCgkJCSJlbWFpbCI6ICJkZXZAc3VwZXJn" +
                  "aWFudC5pbyIKCQl9Cgl9Cn0="

      it("exposes the key", () => expect(repo.registryKey()).to.equal(key))
    })

    describe("otherwise", () => {
      const repo = new Repo({ })

      it("is undefined", () => expect(repo.registryKey()).not.to.be.ok)
    })
  })

  describe("toPayload", () => {
    const name = "Super Fancy New Repo"
    const repo = new Repo({ name })
    const payload = repo.toPayload()

    it("marshals an id key", () => expect(payload.tags.id).to.be.ok)
  })

  describe("marshaling from an API", () => {
    const payload = {
      name: "ci",
      created: (new Date).toString(),
      updated: null,
      tags: { }
    }

    const repo = new Repo(payload)

    it("exposes a name", () => expect(repo.name).to.equal(payload.name))
    it("creates an ID", () => expect(repo.tags.get('id')).to.be.ok )

  })

  describe("updateWith", () => {
    const payload = {
      name: "ci",
      created: (new Date).toString(),
      updated: null,
      tags: { }
    }

    const params = {
      name: 'New Name',
      email: 'new-email@email.com',
      username: 'ausername',
      key: 'key-gobbledigook'
    }

    const repo = new Repo(payload)
    const updated = repo.updateWith(params)

    it("changes the email", () => {
      expect(updated.email()).to.eql(params.email)
    })

    it("changes the username", () => {
      expect(updated.username()).to.eql(params.username)
    })

    it("changes the displayName", () => {
      expect(updated.displayName()).to.eql(params.name)
    })

    it('changes the key', () => {
      expect(updated.toPayload().key).not.to.eql(repo.toPayload().key)
    })

    it('does not change the name', () => {
      expect(updated.name).to.eql(repo.name)
    })
  })

})
