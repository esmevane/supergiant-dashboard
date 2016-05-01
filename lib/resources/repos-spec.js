import Repo from './entities/repo'
import Repos from './repos'

describe("Repos client", () => {
  const client = new Repos(mockClient(Repo))

  describe("get", () => {
    it("returns a repo", () => {
      expect(client.get('ci')).to.eventually.be.an.instanceof(Repo)
    })
  })

  describe("fetch", () => {
    it("returns a list", () => {
      expect(client.fetch()).to.eventually.be.an.instanceof(Array)
    })
  })

  describe("create", () => {
    it("returns a repo", () => {
      let promise = client.create({ name: 'key' })

      expect(promise).to.eventually.be.an.instanceof(Repo)
    })
  })

  describe("delete", () => {
    it("returns an empty object", () => {
      expect(client.delete('key')).to.eventually.be.an.instanceof(Object)
    })
  })

  describe("update", () => {
    it("returns a repo", () => {
      let repo = new Repo({ name: "CI" })
      let promise = client.update(repo)

      expect(promise).to.eventually.be.an.instanceof(Repo)
    })
  })
})
