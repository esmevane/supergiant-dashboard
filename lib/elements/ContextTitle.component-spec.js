import ContextTitle from './ContextTitle.component'

describe("ContextTitle", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <ContextTitle className={ classes }>
      { children }
    </ContextTitle>
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has a context-title class", () => {
    expect(element.props.className).to.include(`context-title`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
