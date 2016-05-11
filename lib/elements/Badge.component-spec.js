import Badge from './Badge.component'

describe("Badge", () => {
  const classes = 'some extra classes'
  const tally = 12
  const renderer = createRenderer()

  renderer.render(<Badge tally={ tally } className={ classes } />)

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has the badge class", () => {
    expect(element.props.className).to.include(`badge`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("features the tally as its child node", () => {
    expect(element.props.children).to.equal(tally)
  })

  describe("when given a tally of 0", () => {
    const tally = 0
    const renderer = createRenderer()

    renderer.render(<Badge tally={ tally } />)

    const element = renderer.getRenderOutput()

    it("is a div", () => expect(element.type).to.equal('div'))

    it("has no classes", () => {
      expect(element.props.className).to.equal(undefined)
    })

    it("has no child nodes", () => {
      expect(element.props.children).to.equal(undefined)
    })
  })

})
