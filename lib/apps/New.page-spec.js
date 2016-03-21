import { create } from '../shared/entities.behavior'
import ButtonLink from '../shared/ButtonLink.container'
import New from './New.page'
import CreateApp from './CreateApp.container'

describe("apps/New.page", () => {
  let app = create({ name: "Test app" })
  let renderer = createRenderer()

  renderer.render(<New />)

  let component = renderer.getRenderOutput()
  let [ header, content, footer ] = component.props.children;

  it("is an article", () => { expect(component.type).to.eql('article') })
  it("has a header", () => { expect(header.type).to.eql('header') })
  it("has content", () => { expect(content.type).to.eql('div') })
  it("has a footer", () => { expect(footer.type).to.eql('footer') })

  it(`has an 'apps-detail' className`, () => {
    expect(component.props.className).to.eql('apps-detail')
  })

  it("displays a create new app title", () => {
    expect(header.props.children).to.eql(<h3>Create a new app</h3>)
  })

  it(`adds the 'apps-detail-main' className to the content`, () => {
    expect(content.props.className).to.eql('apps-detail-main')
  })

  it("renders a CreateApp container", () => {
    expect(content.props.children).to.eql(<CreateApp />)
  })

  it("displays a back to dashboard link", () => {
    expect(footer.props.children).to.eql(
      <ButtonLink to='/'>Back to Dashboard</ButtonLink>
    )
  })
})
