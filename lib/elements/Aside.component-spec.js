import Aside from './Aside.component'

describe("Aside", () => {
  const children = <div />
  const classes = 'some extra classes'
  const size = 12
  const renderer = createRenderer()

  renderer.render(
    <Aside size={ size } className={ classes }>
      { children }
    </Aside>
  )

  const element = renderer.getRenderOutput()

  it("is an aside", () => expect(element.type).to.equal('aside'))

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
