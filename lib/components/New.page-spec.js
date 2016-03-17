import { create } from '../shared/entities.behavior'
import { Link } from 'react-router'
import New from './New.page'

describe("components/New.page", () => {
  let app = create({ name: "Test app" })
  let renderer = createRenderer()

  renderer.render(<New params={ { appId: app.get('id') }} />)

  let component = renderer.getRenderOutput()
  let [ header, section, footer ] = component.props.children;

  it("layout", () => {
    expect(component.type).to.eql('article')
    expect(component.props.className).to.eql('components-detail')

    expect(header.type).to.eql('header')
    expect(header.props.children).to.eql(
      <h3>Create a new component</h3>
    )

    expect(section.type).to.eql('section')
    expect(section.props.className).to.eql('components-detail-main')

    expect(footer.type).to.eql('footer')
    expect(footer.props.children).to.eql(
      <ul>
        <li>
          <Link to={ `/apps/${app.get('id')}` }>Back to app</Link>
        </li>
        <li>
          <Link to='/'>Back to Dashboard</Link>
        </li>
      </ul>
    )
  })
})
