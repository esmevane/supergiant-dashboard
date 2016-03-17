import Index from './Index.page'
import DraggableAppList from './DraggableAppList.container'

describe("apps/Index.page", () => {
  let renderer = createRenderer()

  it("has a specific layout", () => {
    renderer.render(<Index />)

    let component = renderer.getRenderOutput()

    expect(component.type).to.eql('section')
    expect(component.props.className).to.eql('apps')
  })

  it("renders DraggableAppList when given no children", () => {
    renderer.render(<Index />)

    let component = renderer.getRenderOutput()

    expect(component.props.children).to.eql(<DraggableAppList />)
  })

  it("renders the children otherwise", () => {
    let child = <div />
    renderer.render(<Index>{ child }</Index>)

    let component = renderer.getRenderOutput()

    expect(component.props.children).not.to.eql(<DraggableAppList />)
    expect(component.props.children).to.eql(child)
  })
})
