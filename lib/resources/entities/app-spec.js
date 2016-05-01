import Immutable from 'immutable'
import { kebabCase } from 'lodash'
import App from './app'

describe("App", () => {
  describe("initializing", () => {
    const name = `App Name`
    const tags = { }
    const app = new App({ name, tags })

    it("creates a slug name", () => expect(app.name).to.equal(kebabCase(name)))

    it("responds to tags", () => {
      expect(app.tags).to.be.an.instanceof(Immutable.Map)
    })

    it("stores the original name in a tag", () => {
      expect(app.tags.get('name')).to.equal(name)
    })

    it("it creates an id tag", () => expect(app.tags.get('id')).to.be.ok)
  })

  describe("id", () => {
    const app = new App({ })

    it("returns the id tag", () => expect(app.id()).to.equal(app.tags.get('id')))
  })

  describe("key", () => {
    const name = "Mega App Prime"
    const app = new App({ name })

    it("returns the kebab name", () => expect(app.key()).to.equal(app.name))
  })

  describe("displayName", () => {
    const name = "A Fancy Application Name"
    const app = new App({ name })

    it("returns the tag name", () => expect(app.displayName()).to.equal(name))
  })

  describe("toPayload", () => {
    const name = "Super Fancy New App"
    const app = new App({ name })
    const payload = app.toPayload()

    it("marshals the right tags for the API", () => {
      for (let tag of [`id`, `name`]) {
        let tagValue = Reflect.get(payload.tags, tag)
        expect(tagValue).to.be.ok
      }
    })

    it("marshals a kebab-case name", () => {
      expect(payload.name).to.equal(kebabCase(name))
    })
  })

  describe("marshaling from an API", () => {
    const payload = {
      name: "ci",
      created: (new Date).toString(),
      updated: null,
      tags: { name: "Ultra Name" }
    }

    const app = new App(payload)

    it("exposes a name", () => expect(app.name).to.equal(payload.name))
    it("has a displayName", () => {
      expect(app.displayName()).to.equal(payload.tags.name)
    })

    it("creates an ID", () => expect(app.tags.get('id')).to.be.ok )

  })
})
