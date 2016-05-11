import Resource from './Resource.component'

describe("Resource", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <Resource className={ classes }>
      { children }
    </Resource>
  )

  const element = renderer.getRenderOutput()

  it("is a li", () => expect(element.type).to.equal('li'))

  it("has a resource class", () => {
    expect(element.props.className).to.include(`resource`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

})
