import TextNoteDiv from './TextNoteDiv.component'

describe("TextNoteDiv", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <TextNoteDiv className={ classes }>
      { children }
    </TextNoteDiv>
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has a context-title class", () => {
    expect(element.props.className).to.include(`text-note`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
