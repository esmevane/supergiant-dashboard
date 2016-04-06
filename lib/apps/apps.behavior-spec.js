import { fromJS } from 'immutable'
import * as AppsBehavior from './apps.behavior'

describe("addComponent", () => {
  it("adds a component to the app", () => {
    let appName = 'app-name'
    let componentName = 'component-name'
    let app = { components: [] }
    let apps = fromJS({ [appName]: app })

    let newApps = AppsBehavior.addComponent(apps, appName, componentName)
    let components = newApps.getIn([appName, 'components'])

    expect(components).to.include(componentName)
  })
})

describe("addApp", () => {
  it("adds an app to a list of apps", () => {
    let name = 'app-name'
    let app = fromJS({ name })
    let apps = fromJS({ })
    let newApps = AppsBehavior.addApp(apps, app)

    expect(newApps.get(name)).to.equal(app)
  })
})

describe("sortComponents", () => {
  it("reorganizes the order of the components", () => {
    let name = 'app-name'
    let components = ['component-one', 'component-two']
    let app = fromJS({ name, components })
    let apps = fromJS({ [name]: app })
    let newApps = AppsBehavior.sortComponents(apps, name, 0, 'component-two')
    let newOrder = newApps.getIn([name, 'components'])
    let expectation = fromJS(['component-two', 'component-one'])

    expect(newOrder).to.equal(expectation)
  })
})

describe("removeComponent", () => {
  it("removes a component from the app's list", () => {
    let name = 'app-name'
    let components = ['component-one', 'component-two']
    let app = fromJS({ name, components })
    let apps = fromJS({ [name]: app })
    let newApps = AppsBehavior.removeComponent(apps, name, 'component-two')
    let newList = newApps.getIn([name, 'components'])
    let expectation = fromJS(['component-one'])

    expect(newList).to.equal(expectation)
  })
})
