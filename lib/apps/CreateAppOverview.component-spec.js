import CreateAppOverview from './CreateAppOverview.component'
import appDefinition from './apps.definition'
import componentDefinition from '../components/components.definition'
import { shallow } from 'enzyme'

describe(`CreateAppOverview`, () => {
  const addApp = event => event.preventDefault()
  const element = shallow(<CreateAppOverview />)

  it(`is an Aside`, () => expect(element.is(`Aside`)).to.eql(true))

  describe(`definitions`, () => {
    const definitions = element.find(`dfn`)
    const [app, component] = definitions.nodes

    it(`contains an app definition`, () => {
      expect(app.props.title).to.include(appDefinition)
    })

    it(`contains a component definition`, () => {
      expect(component.props.title).to.include(componentDefinition)
    })
  })
})
