import { create } from '../shared/entities.behavior'
import ButtonLink from '../shared/ButtonLink.container'
import New from './New.page'

describe("components/New.page", () => {
  let app = create({ name: "Test app" })
  let renderer = createRenderer()

  renderer.render(<New params={ { appId: app.get('id') }} />)

  let component = renderer.getRenderOutput()
  let [ header, section, footer ] = component.props.children;

  it("is an article", () => { expect(component.type).to.eql('article') })
  it("has a header", () => { expect(header.type).to.eql('header') })
  it("has a section", () => { expect(section.type).to.eql('section') })
  it("has a footer", () => { expect(footer.type).to.eql('footer') })

  it(`uses a 'components-detail' className`, () => {
    expect(component.props.className).to.eql('components-detail')
  })

  it("prompts the user to create a new component", () => {
    expect(header.props.children).to.eql(<h3>Create a new component</h3>)
  })

  it(`uses a 'components-detail-main' className for section content`, () => {
    expect(section.props.className).to.eql('components-detail-main')
  })

  it("provides back to app and back to dashboard buttons", () => {
    expect(footer.props.children).to.eql([
      <ButtonLink to={ `/apps/${app.get('id')}` }>Back to app</ButtonLink>,
      <ButtonLink to='/'>Back to Dashboard</ButtonLink>
    ])
  })
})
