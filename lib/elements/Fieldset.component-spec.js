import Fieldset from './Fieldset.component'

describe("Fieldset", () => {
  const children = <div />
  const classes = 'some extra classes'
  const size = 12
  const renderer = createRenderer()

  renderer.render(
    <Fieldset size={ size } className={ classes }>
      { children }
    </Fieldset>
  )

  const element = renderer.getRenderOutput()

  it("is a fieldset", () => expect(element.type).to.equal('fieldset'))

  it("has column sizing classes", () => {
    expect(element.props.className).to.include(`col-${size}`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
