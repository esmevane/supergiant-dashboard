import Immutable from 'immutable'
import { kebabCase } from 'lodash'
import App from './app'
import Component from './component'
import Deploy from './deploy'

describe("Deploy", () => {
  describe("initializing", () => {
    const componentName = `Component Name`
    const appName = `App Name`
    const deploy = new Deploy({ appName, componentName })

    it("creates an app entity reference", () => {
      expect(deploy.app).to.be.instanceof(App)
    })

    it("creates a component entity reference", () => {
      expect(deploy.component).to.be.instanceof(Component)
    })

    it("creates a uri", () => {
      const app = deploy.app
      const component = deploy.component

      expect(deploy.uri).to.equal(
        `/api/v0/apps/${app.key()}/components/${component.key()}/deploy`
      )
    })

  })
})
