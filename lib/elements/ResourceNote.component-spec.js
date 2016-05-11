import ResourceNote from './ResourceNote.component'

describe("ResourceNote", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <ResourceNote className={ classes }>
      { children }
    </ResourceNote>
  )

  const element = renderer.getRenderOutput()

  it("is an article", () => expect(element.type).to.equal(`article`))

  it("has a resource-note class", () => {
    expect(element.props.className).to.include(`resource-note`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

})
