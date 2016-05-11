import ButtonGroup from './ButtonGroup.component'

describe("ButtonGroup", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <ButtonGroup className={ classes }>
      { children }
    </ButtonGroup>
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has button group classes", () => {
    expect(element.props.className).to.include(`button-group`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
