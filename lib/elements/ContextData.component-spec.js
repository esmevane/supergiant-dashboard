import ContextData from './ContextData.component'

describe("ContextData", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <ContextData className={ classes }>
      { children }
    </ContextData>
  )

  const element = renderer.getRenderOutput()

  it("is a section", () => expect(element.type).to.equal('section'))

  it("has a context-data class", () => {
    expect(element.props.className).to.include(`context-data`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
