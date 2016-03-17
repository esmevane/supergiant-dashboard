import Immutable from 'immutable'
import { create } from '../shared/entities.behavior'
import { Link } from 'react-router'
import AppDetail from './AppDetail.component'
import ComponentLink from '../components/ComponentLink.component'

describe("apps/AppDetail.component", () => {
  let app = create({ name: "Test app" })
  let components = Immutable.List.of(create({ name: "Test component "}))
  let renderer = createRenderer()

  renderer.render(<AppDetail app={ app } components={ components } />)

  let component = renderer.getRenderOutput()
  let [ header, section, footer ] = component.props.children;

  it("layout", () => {
    expect(component.type).to.eql('article')
    expect(component.props.className).to.eql('apps-detail')

    expect(header.type).to.eql('header')
    expect(header.props.children).to.eql([
      <h3>{ app.get('name') }</h3>,
      <h4>{ app.get('id') }</h4>,
      <Link to={`/apps/${app.get('id')}/components/new`}>
        Add a component
      </Link>
    ])

    expect(section.type).to.eql('section')
    expect(section.props.className).to.eql('apps-detail-main')
    expect(section.props.children).to.eql(
      <ul>
        {
          components.map((component, index) => (
            <li key={ index }>
              <ComponentLink app={ app } component={ component } />
            </li>
          ))
        }
      </ul>
    )

    expect(footer.type).to.eql('footer')
    expect(footer.props.children).to.eql(
      <Link to='/'>Back to Dashboard</Link>
    )
  })
})
