import ResourceList from './ResourceList.component'

describe("ResourceList", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <ResourceList className={ classes }>
      { children }
    </ResourceList>
  )

  const element = renderer.getRenderOutput()

  it("is a ul", () => expect(element.type).to.equal('ul'))

  it("has a resources-list class", () => {
    expect(element.props.className).to.include(`resources-list`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

})
