import ActionButton from './ActionButton.component'

describe("ActionButton", () => {
  const renderer = createRenderer()
  renderer.render(<ActionButton />)
  const element = renderer.getRenderOutput()

  it("is a button", () => expect(element.type).to.equal('button'))

  it("has a right-arrow glyph class", () => {
    expect(element.props.className).to.include('right-arrow')
  })

  describe("action colors", () => {
    describe("when an action", () => {
      const renderer = createRenderer()
      renderer.render(<ActionButton isAction={ true } />)
      const element = renderer.getRenderOutput()

      it("has a transparent class", () => {
        expect(element.props.className).to.include('action-color')
      })
    })

    describe("otherwise", () => {
      const renderer = createRenderer()
      renderer.render(<ActionButton />)
      const element = renderer.getRenderOutput()

      it("has a transparent class", () => {
        expect(element.props.className).not.to.include('action-color')
      })
    })
  })

  describe("custom classes", () => {
    describe("when an action", () => {
      const renderer = createRenderer()
      const customClasses = `stuff and things`
      renderer.render(<ActionButton className={ customClasses } />)
      const element = renderer.getRenderOutput()

      it("includes the custom classes", () => {
        expect(element.props.className).to.include(customClasses)
      })
    })
  })

  describe("transparency", () => {
    describe("when transparent", () => {
      const renderer = createRenderer()
      renderer.render(<ActionButton isTransparent={ true } />)
      const element = renderer.getRenderOutput()

      it("has a transparent class", () => {
        expect(element.props.className).to.include('transparent')
      })
    })

    describe("otherwise", () => {
      const renderer = createRenderer()
      renderer.render(<ActionButton />)
      const element = renderer.getRenderOutput()

      it("has a transparent class", () => {
        expect(element.props.className).not.to.include('transparent')
      })
    })
  })

  describe("functionality", () => {
    const onClick = () => { console.log("A click function") }
    const renderer = createRenderer()
    renderer.render(<ActionButton onClick={ onClick } />)
    const element = renderer.getRenderOutput()

    it("loads the onClick function", () => {
      expect(element.props.onClick).to.equal(onClick)
    })
  })

  describe("child elements", () => {
    const children = <div />
    const renderer = createRenderer()
    renderer.render(<ActionButton>{ children }</ActionButton>)
    const element = renderer.getRenderOutput()

    it("yields to the given children", () => {
      expect(element.props.children).to.equal(children)
    })
  })

})
