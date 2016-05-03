import Immutable from 'immutable'
import { kebabCase } from 'lodash'
import App from './app'
import Component from './component'
import Release from './release'

describe("Release", () => {
  describe("initializing", () => {
    const componentName = `Component Name`
    const appName = `App Name`
    const instance_number = 1
    const termination_grace_period = 10
    const timestamp = 105125018
    const tags = { }

    const release = new Release({
      appName,
      componentName,
      instance_number,
      termination_grace_period,
      tags,
      timestamp
    })

    it("responds to instance_number", () => {
      expect(release.instance_number).to.be.ok
    })

    it("responds to termination_grace_period", () => {
      expect(release.termination_grace_period).to.be.ok
    })

    it("responds to volumes", () => {
      expect(release.volumes).to.be.an.instanceof(Immutable.List)
    })

    it("responds to containers", () => {
      expect(release.containers).to.be.an.instanceof(Immutable.List)
    })

    it("responds to tags", () => {
      expect(release.tags).to.be.an.instanceof(Immutable.Map)
    })

    it("creates an app entity reference", () => {
      expect(release.app).to.be.instanceof(App)
    })

    it("creates a component entity reference", () => {
      expect(release.component).to.be.instanceof(Component)
    })

    it("creates a uri", () => {
      const app = release.app
      const component = release.component

      expect(release.uri).to.equal(
        `${component.uri}/releases/${release.timestamp}`
      )
    })

    it("stores the component name in a tag", () => {
      expect(release.tags.get('componentName')).to.equal(componentName)
    })

    it("stores the component key in a tag", () => {
      expect(release.tags.get('componentKey')).to.equal(
        kebabCase(componentName)
      )
    })

    it("stores an app name in a tag", () => {
      expect(release.tags.get('appName')).to.equal(appName)
    })

    it("stores an app key in a tag", () => {
      expect(release.tags.get('appKey')).to.equal(kebabCase(appName))
    })

    it("it creates an id tag", () => expect(release.tags.get('id')).to.be.ok)
  })

  describe("id", () => {
    const release = new Release({ })

    it("returns the id tag", () => {
      expect(release.id()).to.equal(release.tags.get('id'))
    })
  })

  describe("key", () => {
    const name = "Mega Release Prime"
    const timestamp = 105125018
    const release = new Release({ name, timestamp })

    it("returns the timestamp", () => {
      expect(release.key()).to.equal(release.timestamp)
    })
  })

  describe("toPayload", () => {
    const appName = "Super Fancy New Release"
    const componentName = "Super Fancy New Release"
    const release = new Release({ appName, componentName })
    const payload = release.toPayload()

    it("marshals the right tags for the API", () => {
      let tags = [
        `appKey`,
        `appName`,
        `componentKey`,
        `componentName`,
        `id`
      ]

      for (let tag of tags) {
        let tagValue = Reflect.get(payload.tags, tag)
        expect(tagValue).to.be.ok
      }
    })
  })

  describe("marshaling from an API", () => {
    const payload = {
      name: "ci",
      created: (new Date).toString(),
      timestamp: 1058105825,
      updated: null,
      tags: {}
    }

    const release = new Release(payload)

    it("creates an ID", () => expect(release.tags.get('id')).to.be.ok )
  })
})
