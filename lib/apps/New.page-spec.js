import { create } from '../shared/entities.behavior'
import { Link } from 'react-router'
import New from './New.page'
import CreateApp from './CreateApp.container'

describe("apps/New.page", () => {
  let app = create({ name: "Test app" })
  let renderer = createRenderer()

  renderer.render(<New />)

  let component = renderer.getRenderOutput()
  let [ header, section, footer ] = component.props.children;

  it("layout", () => {
    expect(component.type).to.eql('article')
    expect(component.props.className).to.eql('apps-detail')

    expect(header.type).to.eql('header')
    expect(header.props.children).to.eql(<h3>Create a new app</h3>)

    expect(section.type).to.eql('section')
    expect(section.props.className).to.eql('apps-detail-main')
    expect(section.props.children).to.eql(<CreateApp />)

    expect(footer.type).to.eql('footer')
    expect(footer.props.children).to.eql(
      <Link to='/'>Back to Dashboard</Link>
    )
  })
})
