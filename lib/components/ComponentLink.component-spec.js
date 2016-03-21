import { create } from '../shared/entities.behavior'
import { hexToRGBA } from './components.behavior'
import ComponentLink from './ComponentLink.component'

describe("components/ComponentLink.component", () => {
  let app = create({ name: "Test app" })
  let component = create({ name: "Test component" })
  let backgroundColor = hexToRGBA(component.get('color'))
  let renderer = createRenderer()

  renderer.render(<ComponentLink app={ app } component={ component }/>)

  let target = renderer.getRenderOutput()
  let uri = `/apps/${app.get('id')}/components/${component.get('id')}`

  it("has the expected destination", () => {
    expect(target.props.to).to.eql(uri)
  })

  it("has the expected className", () => {
    expect(target.props.className).to.eql('component-link')
  })

  it("creates a ", () => {
    expect(target.props.children).to.eql([
      component.get('name'),
      <span className='component-color-dot' style={ { backgroundColor } } />
    ])
  })
})
