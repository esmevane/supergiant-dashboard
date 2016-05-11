import DestroyIcon from './DestroyIcon.component'

describe("DestroyIcon", () => {
  const onClick = () => { console.log('crazy function') }
  const renderer = createRenderer()
  renderer.render(<DestroyIcon onClick={ onClick } className='stuff' />)
  const element = renderer.getRenderOutput()

  it("is a button", () => expect(element.type).to.equal('button'))

  it("has glyph classes", () => {
    expect(element.props.className).to.include('glyph glyph-x')
  })

  it("exposes the given function", () => {
    expect(element.props.onClick).to.equal(onClick)
  })

  it("yields to the given classes", () => {
    expect(element.props.className).to.include('stuff')
  })

})
