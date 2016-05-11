import WelcomeMessage from './WelcomeMessage.component'

describe("WelcomeMessage", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <WelcomeMessage className={ classes }>
      { children }
    </WelcomeMessage>
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has a welcome-message class", () => {
    expect(element.props.className).to.include(`welcome-message`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
