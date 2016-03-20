import Immutable from 'immutable'
import { create } from '../shared/entities.behavior'
import ButtonLink from '../shared/ButtonLink.container'
import AppDetail from './AppDetail.component'
import DraggableComponents from '../components/DraggableComponents.container'

describe("apps/AppDetail.component", () => {
  let app = create({ name: "Test app" })
  let components = Immutable.List.of(create({ name: "Test component "}))
  let renderer = createRenderer()

  renderer.render(<AppDetail app={ app } components={ components } />)

  let component = renderer.getRenderOutput()
  let [ header, section, footer ] = component.props.children;

  it("is an article", () => { expect(component.type).to.eql('article') })
  it("has a header", () => { expect(header.type).to.eql('header') })
  it("has a section", () => { expect(section.type).to.eql('section') })
  it("has a footer", () => { expect(footer.type).to.eql('footer') })

  it(`has an 'apps-detail' className`, () => {
    expect(component.props.className).to.eql('apps-detail')
  })

  it("has a name title and an id title", () => {
    expect(header.props.children).to.eql([
      <h3>{ app.get('name') }</h3>,
      <h4>{ app.get('id') }</h4>,
    ])
  })

  it(`adds the 'apps-detail-main' className to the section`, () => {
    expect(section.props.className).to.eql('apps-detail-main')
  })

  it("renders DraggableComponents", () => {
    expect(section.props.children).to.eql(
      <DraggableComponents app={ app } components={ components }/>
    )
  })

  it("provides a return to Dashboard button", () => {
    expect(footer.props.children).to.eql(
      <ButtonLink to='/'>Back to Dashboard</ButtonLink>
    )
  })
})
