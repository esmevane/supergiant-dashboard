import ContextFooter from './ContextFooter.component'

describe("ContextFooter", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <ContextFooter className={ classes }>
      { children }
    </ContextFooter>
  )

  const element = renderer.getRenderOutput()

  it("is a footer", () => expect(element.type).to.equal('footer'))

  it("has a context-footer class", () => {
    expect(element.props.className).to.include(`context-footer`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
