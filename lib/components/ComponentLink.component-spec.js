import { create } from '../shared/entities.behavior'
import ComponentLink from './ComponentLink.component'

describe("components/ComponentLink.component", () => {
  let app = create({ name: "Test app" })
  let component = create({ name: "Test component" })
  let renderer = createRenderer()

  renderer.render(<ComponentLink app={ app } component={ component }/>)

  let target = renderer.getRenderOutput()
  let uri = `/apps/${app.get('id')}/components/${component.get('id')}`

  it("has the expected props", () => {
    expect(target.props.to).to.eql(uri)
    expect(target.props.children).to.eql(component.get('name'))
  })
})
