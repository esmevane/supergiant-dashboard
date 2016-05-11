import LabelRight from './LabelRight.component'

describe("LabelRight", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <LabelRight className={ classes }>
      { children }
    </LabelRight>
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has a label-right class", () => {
    expect(element.props.className).to.include(`label-right`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

})
