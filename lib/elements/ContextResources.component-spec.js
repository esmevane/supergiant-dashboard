import ContextResources from './ContextResources.component'

describe("ContextResources", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <ContextResources className={ classes }>
      { children }
    </ContextResources>
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has a context-system-resources class", () => {
    expect(element.props.className).to.include(`context-system-resources`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
