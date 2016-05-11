import TextNote from './TextNote.component'

describe("TextNote", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <TextNote className={ classes }>
      { children }
    </TextNote>
  )

  const element = renderer.getRenderOutput()

  it("is a paragraph", () => expect(element.type).to.equal('p'))

  it("has a text-note class", () => {
    expect(element.props.className).to.include(`text-note`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
