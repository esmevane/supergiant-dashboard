import Line from './Line.component'

describe("Line", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <Line className={ classes }>
      { children }
    </Line>
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has a 'line' class", () => {
    expect(element.props.className).to.include(`line`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
