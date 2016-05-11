import EscapeButton from './EscapeButton.component'

describe("EscapeButton", () => {
  const onClick = () => { console.log('crazy function') }
  const renderer = createRenderer()
  renderer.render(<EscapeButton onClick={ onClick } className='stuff' />)
  const element = renderer.getRenderOutput()

  it("is a button", () => expect(element.type).to.equal('button'))

  it("has the esc classes", () => {
    expect(element.props.className).to.include(`esc`)
  })

  it("exposes the given function", () => {
    expect(element.props.onClick).to.equal(onClick)
  })

  it("yields to the given classes", () => {
    expect(element.props.className).to.include('stuff')
  })

})
