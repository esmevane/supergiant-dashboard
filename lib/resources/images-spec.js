import Image from './entities/image'
import Images from './images'

describe("Images client", () => {
  const client = new Images

  describe("get", () => {
    it("returns an image", () => {
      expect(client.get('ci')).to.eventually.be.an.instanceof(Image)
    })
  })

  describe("fetch", () => {
    it("returns a list", () => {
      expect(client.fetch()).to.eventually.be.an.instanceof(Array)
    })
  })

  describe("create", () => {
    const action = client.create({ name: 'key' })

    it("returns an image", () => {
      expect(action).to.eventually.be.an.instanceof(Image)
    })
  })

  describe("delete", () => {
    it("returns an empty object", () => {
      expect(client.delete('key')).to.eventually.be.an.instanceof(Object)
    })
  })

  describe("update", () => {
    const image = new Image({ name: "CI" })
    const creation = client.create(image.toJS())

    it("returns an image", () => {
      let promise = creation.then(image => client.update(image))

      expect(promise).to.eventually.be.an.instanceof(Image)
    })
  })
})
