import Immutable from 'immutable'
import uuid from 'uuid'
import kebabCase from 'lodash/kebabCase'
import App from './app'
import Command from './command'

describe("Command", () => {
  describe("initializing", () => {
    const name = `Command Name`
    const appName = `A Superb App Name`
    const entries = []
    const command = new Command({ appName, name, entries })

    it("responds to entries", () => {
      expect(command.entries).to.be.an.instanceof(Immutable.List)
    })

    it("responds to appName", () => expect(command.appName).to.equal(appName))

    it("responds to appKey", () => {
      expect(command.appKey).to.equal(kebabCase(appName))
    })

    it("creates a uri", () => {
      expect(command.uri).to.equal(`/api/v0/apps/${command.app.key()}`)
    })

    it("it creates an id", () => expect(command.id()).to.be.ok)
    it('uses the id as a key', () => {
      expect(command.id()).to.equal(command.key())
    })
  })

  describe("app", () => {
    const name = `Command Name`
    const appName = `A Superb App Name`
    const command = new Command({ appName, name })

    it("is a convenience getter for the app", () => {
      expect(command.app).to.be.instanceof(App)
    })
  })

  describe("displayName", () => {
    const name = "A Fancy Command Name"
    const command = new Command({ name })

    it("returns the tag name", () => {
      expect(command.displayName()).to.equal(name)
    })
  })

  describe("toPayload", () => {
    const name = "Super Fancy New Command"
    const entries = []
    const command = new Command({ name, entries })
    const payload = command.toPayload()

    it("marshals the entries", () => expect(payload.entries).to.eql(entries))
    it("marshals the name", () => expect(payload.name).to.equal(name))
  })

  describe("marshaling from an API", () => {
    const payload = {
      id: uuid.v4(),
      name: "ci",
      entries: []
    }

    const command = new Command(payload)

    it("exposes a name", () => expect(command.name).to.equal(payload.name))

    it("has a displayName", () => {
      expect(command.displayName()).to.equal(payload.name)
    })

    it("creates an ID", () => expect(command.id()).to.be.ok )

  })
})
