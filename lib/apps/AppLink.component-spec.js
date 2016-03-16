import { createApp } from './apps.behavior'
import AppLink from './AppLink.component'

describe("AppLink", () => {
  let app = createApp({ name: "Test app" })
  let renderer = createRenderer()

  renderer.render(<AppLink app={ app } />)
  let component = renderer.getRenderOutput()

  it("renders a link to /apps/:id", () => {
    expect(component.props.to).to.eql(`/apps/${app.get('id')}`)
  })

  it("shows the app name", () => {
    expect(component.props.children).to.eql(app.get('name'))
  })
})
