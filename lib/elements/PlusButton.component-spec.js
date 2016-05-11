import PlusButton from './PlusButton.component'

describe("PlusButton", () => {
  const onClick = () => { console.log('crazy function') }
  const renderer = createRenderer()
  renderer.render(<PlusButton onClick={ onClick } className='stuff' />)
  const element = renderer.getRenderOutput()

  it("is a button", () => expect(element.type).to.equal('button'))

  it("has glyph classes", () => {
    expect(element.props.className).to.include(
      `with-glyph glyph-plus-action-color`
    )
  })

  it("exposes the given function", () => {
    expect(element.props.onClick).to.equal(onClick)
  })

  it("yields to the given classes", () => {
    expect(element.props.className).to.include('stuff')
  })

})
