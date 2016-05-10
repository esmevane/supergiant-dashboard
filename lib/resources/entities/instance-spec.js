import Immutable from 'immutable'
import { kebabCase } from 'lodash'
import App from './app'
import Component from './component'
import Release from './release'
import Instance from './instance'
import Meter from './meter'

describe("Instance", () => {
  describe("initializing", () => {
    const componentName = `Component Name`
    const appName = `App Name`
    const timestamp = 105125018

    const instance = new Instance({
      appName,
      componentName,
      timestamp
    })

    it("responds to cpu", () => {
      expect(instance.cpu).to.be.an.instanceof(Meter)
    })

    it("responds to ram", () => {
      expect(instance.ram).to.be.an.instanceof(Meter)
    })

    it("creates an app entity reference", () => {
      expect(instance.app).to.be.instanceof(App)
    })

    it("creates a component entity reference", () => {
      expect(instance.component).to.be.instanceof(Component)
    })

    it("creates a release entity reference", () => {
      expect(instance.release).to.be.instanceof(Release)
    })

    it("creates a uri", () => {
      const release = instance.release

      expect(instance.uri).to.equal(`${release.uri}/instances/${instance._id}`)
    })
  })

  describe("id", () => {
    const id = 0
    const instance = new Instance({ id })

    it("returns the id", () => expect(instance.id()).to.equal(id))
  })

  describe("bundled clients", () => {
    const appName = 'App Name'
    const componentName = 'Component Name'
    const timestamp = 105125018
    const id = 0
    const instance = new Instance({ appName, componentName, timestamp, id })

    describe("log", () => {
      it("is a client with an instance-specific uri", () => {
        expect(instance.log.route).to.equal(`${instance.uri}/log`)
      })
    })

    describe("start", () => {
      it("is a client with an instance-specific uri", () => {
        expect(instance.start.route).to.equal(`${instance.uri}/start`)
      })
    })

    describe("stop", () => {
      it("is a client with an instance-specific uri", () => {
        expect(instance.stop.route).to.equal(`${instance.uri}/stop`)
      })
    })

  })

  describe("key", () => {
    const id = 0
    const instance = new Instance({ id })

    it("returns the id", () => expect(instance.key()).to.equal(id))
  })

  describe("marshaling from an API", () => {
    const meter = { usage: 0, limit: 0 }
    const payload = {
      id: 0,
      base_name: 'ci-12345',
      name: "ci",
      cpu: meter,
      ram: meter
    }

    const instance = new Instance(payload)

    it("marshals cpu meters", () => {
      expect(instance.cpu.usage).to.equal(meter.usage)
      expect(instance.cpu.limit).to.equal(meter.limit)
    })

    it("marshals ram meters", () => {
      expect(instance.ram.usage).to.equal(meter.usage)
      expect(instance.ram.limit).to.equal(meter.limit)
    })
  })
})
