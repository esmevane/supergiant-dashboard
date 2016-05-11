import InlineTextNote from './InlineTextNote.component'

describe("InlineTextNote", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <InlineTextNote className={ classes }>
      { children }
    </InlineTextNote>
  )

  const element = renderer.getRenderOutput()

  it("is a span", () => expect(element.type).to.equal('span'))

  it("has a 'text-note font-size-reset' class", () => {
    expect(element.props.className).to.include(`text-note font-size-reset`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
