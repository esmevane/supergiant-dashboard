import ContextMenu from './ContextMenu.component'

describe("ContextMenu", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <ContextMenu className={ classes }>
      { children }
    </ContextMenu>
  )

  const element = renderer.getRenderOutput()

  it("is a menu", () => expect(element.type).to.equal('menu'))

  it("has a context-menu class", () => {
    expect(element.props.className).to.include(`context-menu`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
