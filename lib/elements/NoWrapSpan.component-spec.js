import NoWrapSpan from './NoWrapSpan.component'

describe("NoWrapSpan", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <NoWrapSpan className={ classes }>
      { children }
    </NoWrapSpan>
  )

  const element = renderer.getRenderOutput()

  it("is a span", () => expect(element.type).to.equal('span'))

  it("has a 'nowrap' class", () => {
    expect(element.props.className).to.include(`nowrap`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
