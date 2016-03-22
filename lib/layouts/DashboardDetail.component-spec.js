import { create } from '../shared/entities.behavior'
import DashboardDetail from './DashboardDetail.component'
import CloudOverview from './CloudOverview.component'

describe("layouts/DashboardDetail.component", () => {
  let cloud = create({ name: "Test cloud", region: "us-east-1" })
  let renderer = createRenderer()

  renderer.render(<DashboardDetail cloud={ cloud } />)

  let component = renderer.getRenderOutput()

  it("is a section", () => { expect(component.type).to.be.eql('section') })
  it("has a cloud region and overview", () => {
    expect(component.props.children).to.eql([
      <h5>{ cloud.get('region') }</h5>,
      <CloudOverview />
    ])
  })
})
