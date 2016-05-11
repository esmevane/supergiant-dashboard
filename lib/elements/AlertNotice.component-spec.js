import AlertNotice from './AlertNotice.component'

describe("AlertNotice", () => {
  const children = <div />
  const renderer = createRenderer()
  const classes = 'some extra classes'
  renderer.render(<AlertNotice className={ classes }>{ children }</AlertNotice>)
  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has alert notice classes", () => {
    expect(element.props.className).to.include('notice alert')
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
