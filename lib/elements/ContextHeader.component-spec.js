import ContextHeader from './ContextHeader.component'

describe("ContextHeader", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <ContextHeader className={ classes }>
      { children }
    </ContextHeader>
  )

  const element = renderer.getRenderOutput()

  it("is a header", () => expect(element.type).to.equal('header'))

  it("has a context-header class", () => {
    expect(element.props.className).to.include(`context-header`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
