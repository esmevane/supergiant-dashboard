import FeedbackInput from './FeedbackInput.component'

describe("FeedbackInput", () => {
  const value = {}
  const renderer = createRenderer()

  renderer.render(
    <FeedbackInput value={ value } className='stuff' type='color' />
  )

  const element = renderer.getRenderOutput()

  it("is a input", () => expect(element.type).to.equal('input'))

  it("yields to the given type", () => {
    expect(element.props.type).to.include('color')
  })

  it("yields to the given classes", () => {
    expect(element.props.className).to.include('stuff')
  })

  describe("when there's an error", () => {
    const value = { touched: true, error: true }
    const renderer = createRenderer()

    renderer.render(
      <FeedbackInput value={ value } className='stuff' type='color' />
    )

    const element = renderer.getRenderOutput()

    it("expresses an invalid input class", () => {
      expect(element.props.className).to.include('form-input-invalid')
    })

  })

})
