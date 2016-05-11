import Star from './Star.component'

describe("Star", () => {
  const onClick = () => console.log("Do the thing")
  const renderer = createRenderer()

  renderer.render(<Star onClick={ onClick } />)

  const element = renderer.getRenderOutput()

  it("is a figure", () => expect(element.type).to.equal('figure'))

  it("the star class", () => {
    expect(element.props.className).to.include(`star`)
  })

  it("yields to given click function", () => {
    expect(element.props.onClick).to.equal(onClick)
  })

})
