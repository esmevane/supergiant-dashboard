import ContextOverview from './ContextOverview.component'

describe("ContextOverview", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <ContextOverview className={ classes }>
      { children }
    </ContextOverview>
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has a context-overview class", () => {
    expect(element.props.className).to.include(`context-overview`)
  })

  it("has a table-row class", () => {
    expect(element.props.className).to.include(`table-row`)
  })

  it("has a pad class", () => {
    expect(element.props.className).to.include(`pad`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
