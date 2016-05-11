import ContextStatus from './ContextStatus.component'

describe("ContextStatus", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <ContextStatus className={ classes }>
      { children }
    </ContextStatus>
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has a context-status class", () => {
    expect(element.props.className).to.include(`context-status`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
