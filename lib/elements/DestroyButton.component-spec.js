import DestroyButton from './DestroyButton.component'

describe("DestroyButton", () => {
  const renderer = createRenderer()
  renderer.render(<DestroyButton />)
  const element = renderer.getRenderOutput()

  it("is a button", () => expect(element.type).to.equal('button'))

  it("has an x glyph class", () => {
    expect(element.props.className).to.include('x')
  })

  describe("action colors", () => {
    describe("when an action", () => {
      const renderer = createRenderer()
      renderer.render(<DestroyButton isAction={ true } />)
      const element = renderer.getRenderOutput()

      it("has a transparent class", () => {
        expect(element.props.className).to.include('action-color')
      })
    })

    describe("otherwise", () => {
      const renderer = createRenderer()
      renderer.render(<DestroyButton />)
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
      renderer.render(<DestroyButton className={ customClasses } />)
      const element = renderer.getRenderOutput()

      it("includes the custom classes", () => {
        expect(element.props.className).to.include(customClasses)
      })
    })
  })

  describe("transparency", () => {
    describe("when transparent", () => {
      const renderer = createRenderer()
      renderer.render(<DestroyButton isTransparent={ true } />)
      const element = renderer.getRenderOutput()

      it("has a transparent class", () => {
        expect(element.props.className).to.include('transparent')
      })
    })

    describe("otherwise", () => {
      const renderer = createRenderer()
      renderer.render(<DestroyButton />)
      const element = renderer.getRenderOutput()

      it("has a transparent class", () => {
        expect(element.props.className).not.to.include('transparent')
      })
    })
  })

  describe("functionality", () => {
    const onClick = () => { console.log("A click function") }
    const renderer = createRenderer()
    renderer.render(<DestroyButton onClick={ onClick } />)
    const element = renderer.getRenderOutput()

    it("loads the onClick function", () => {
      expect(element.props.onClick).to.equal(onClick)
    })
  })

  describe("child elements", () => {
    const children = <div />
    const renderer = createRenderer()
    renderer.render(<DestroyButton>{ children }</DestroyButton>)
    const element = renderer.getRenderOutput()

    it("yields to the given children", () => {
      expect(element.props.children).to.equal(children)
    })
  })

})
