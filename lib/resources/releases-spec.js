import Release from './entities/release'
import Releases from './releases'

describe("Releases client", () => {
  const client = new Releases({ client: mockClient(Release) })

  describe("get", () => {
    it("returns a release", () => {
      expect(client.get(120582150)).to.eventually.be.an.instanceof(Release)
    })
  })

  describe("fetch", () => {
    it("returns a list", () => {
      expect(client.fetch()).to.eventually.be.an.instanceof(Array)
    })
  })

  describe("create", () => {
    it("returns a release", () => {
      const promise = client.create({ name: 'key' })
      expect(promise).to.eventually.be.an.instanceof(Release)
    })
  })

  describe("delete", () => {
    it("returns an empty object", () => {
      expect(client.delete('key')).to.eventually.be.an.instanceof(Object)
    })
  })

  describe("update", () => {
    it("returns a release", () => {
      let release = new Release({ name: "CI" })
      expect(client.update(release)).to.eventually.be.an.instanceof(Release)
    })
  })
})
