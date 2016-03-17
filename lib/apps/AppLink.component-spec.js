import { create } from '../shared/entities.behavior'
import AppLink from './AppLink.component'

describe("apps/AppLink.component", () => {
  let app = create({ name: "Test app" })
  let renderer = createRenderer()

  renderer.render(<AppLink app={ app } />)
  let { props } = renderer.getRenderOutput()

  it("links back to the app", () => {
    expect(props.to).to.eql(`/apps/${app.get('id')}`)
  })

  it("displays the name", () => {
    expect(props.children).to.eql(app.get('name'))
  })
})
