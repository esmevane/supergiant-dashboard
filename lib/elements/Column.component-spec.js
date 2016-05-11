import Column from './Column.component'

describe("Column", () => {
  const children = <div />
  const classes = 'some extra classes'
  const size = 12
  const renderer = createRenderer()

  renderer.render(
    <Column size={ size } className={ classes }>
      { children }
    </Column>
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

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
