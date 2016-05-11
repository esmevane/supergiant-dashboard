import SubmitButton from './SubmitButton.component'

describe("SubmitButton", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <SubmitButton className={ classes }>
      { children }
    </SubmitButton>
  )

  const element = renderer.getRenderOutput()

  it("is a button", () => expect(element.type).to.equal('button'))

  it("is a submit button", () => {
    expect(element.props.type).to.eql(`submit`)
  })

  it("has submit form button classes", () => {
    expect(element.props.className).to.include(
      `easy block with-glyph glyph-right-arrow-action-color`
    )
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
