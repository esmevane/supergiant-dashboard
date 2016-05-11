import EasyLabel from './EasyLabel.component'

describe("EasyLabel", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <EasyLabel className={ classes }>
      { children }
    </EasyLabel>
  )

  const element = renderer.getRenderOutput()

  it("is a label", () => expect(element.type).to.equal('label'))

  it("has an easy class", () => {
    expect(element.props.className).to.include(`easy`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
