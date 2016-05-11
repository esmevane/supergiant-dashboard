import SuccessNotice from './SuccessNotice.component'

describe("SuccessNotice", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <SuccessNotice className={ classes }>
      { children }
    </SuccessNotice>
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has a notice success class", () => {
    expect(element.props.className).to.include(`notice success`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
