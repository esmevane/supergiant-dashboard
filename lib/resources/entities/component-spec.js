import Immutable from 'immutable'
import kebabCase from 'lodash/kebabCase'
import App from './app'
import Component from './component'
import Releases from '../releases'
import Deploys from '../deploys'

describe("Component", () => {
  describe("initializing", () => {
    const name = `Component Name`
    const color = `#828`
    const appName = `A Superb App Name`
    const tags = { }
    const component = new Component({ appName, color, name, color, tags })

    it("creates a slug name", () => {
      expect(component.name).to.equal(kebabCase(name))
    })

    it("responds to tags", () => {
      expect(component.tags).to.be.an.instanceof(Immutable.Map)
    })

    it("stores the original name in a tag", () => {
      expect(component.tags.get('name')).to.equal(name)
    })

    it("stores the color in a tag", () => {
      expect(component.tags.get('color')).to.equal(color)
    })

    it("stores an app name in a tag", () => {
      expect(component.tags.get('appName')).to.equal(appName)
    })

    it("stores an app key in a tag", () => {
      expect(component.tags.get('appKey')).to.equal(kebabCase(appName))
    })

    it("creates a uri", () => {
      expect(component.uri).to.equal(
        `/api/v0/apps/${component.app.key()}/components/${component.name}`
      )
    })

    it("it creates an id tag", () => expect(component.tags.get('id')).to.be.ok)
  })

  describe("app", () => {
    const name = `Component Name`
    const color = `#828`
    const appName = `A Superb App Name`
    const component = new Component({ appName, color, name, color })

    it("is a convenience getter for the app", () => {
      expect(component.app).to.be.instanceof(App)
    })
  })

  describe("id", () => {
    const component = new Component({ })

    it("returns the id tag", () => {
      expect(component.id()).to.equal(component.tags.get('id'))
    })
  })

  describe("key", () => {
    const name = "Mega Component Prime"
    const component = new Component({ name })

    it("returns the kebab name", () => {
      expect(component.key()).to.equal(component.name)
    })
  })

  describe("displayName", () => {
    const name = "A Fancy Component Name"
    const component = new Component({ name })

    it("returns the tag name", () => {
      expect(component.displayName()).to.equal(name)
    })
  })

  describe("toPayload", () => {
    const name = "Super Fancy New Component"
    const component = new Component({ name })
    const payload = component.toPayload()

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

  describe("deploys", () => {
    const name = `Component To Deploy`
    const color = `#828`
    const appName = `App With Components`
    const tags = { }
    const component = new Component({ appName, color, name, color, tags })
    const route = `${component.uri}/deploy`

    it("is a client with a component-specific deploy uri", () => {
      expect(component.deploys.route).to.equal(route)
    })

    it("is a deploys client", () => {
      expect(component.deploys).to.be.instanceof(Deploys)
    })
  })

  describe("releases", () => {
    const name = `Component With Releases`
    const color = `#828`
    const appName = `App With Components`
    const tags = { }
    const component = new Component({ appName, color, name, color, tags })
    const route = `${component.uri}/releases`

    it("is a client with a component-specific releases uri", () => {
      expect(component.releases.route).to.equal(route)
    })

    it("is a releases client", () => {
      expect(component.releases).to.be.instanceof(Releases)
    })
  })

  describe("updateWith", () => {
    const payload = {
      name: "ci",
      created: (new Date).toString(),
      updated: null,
      tags: { name: "Ultra Name" }
    }

    const params = { name: 'New Name' }

    const component = new Component(payload)
    const updated = component.updateWith(params)

    it("changes the displayName", () => {
      expect(updated.displayName()).to.eql(params.name)
    })

    it('does not change the name', () => {
      expect(updated.name).to.eql(component.name)
    })
  })

  describe("marshaling from an API", () => {
    const payload = {
      name: "ci",
      created: (new Date).toString(),
      updated: null,
      tags: {
        name: "Ultra Name"
      }
    }

    const component = new Component(payload)

    it("exposes a name", () => expect(component.name).to.equal(payload.name))

    it("has a displayName", () => {
      expect(component.displayName()).to.equal(payload.tags.name)
    })

    it("creates an ID", () => expect(component.tags.get('id')).to.be.ok )

  })
})
